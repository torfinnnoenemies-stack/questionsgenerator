from __future__ import annotations

import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent
PORT = int(os.environ.get("PORT", "5174"))
HOST = os.environ.get("HOST", "0.0.0.0")

DIFFICULTY_LABELS = {
    "beginner": "basic",
    "intermediate": "medium",
    "advanced": "advanced",
}

LANGUAGE_NAMES = {
    "ru": "Russian",
    "en": "English",
    "uz": "Uzbek",
    "es": "Spanish",
    "fr": "French",
    "de": "German",
    "tr": "Turkish",
    "ar": "Arabic",
    "zh": "Chinese",
    "hi": "Hindi",
    "pt": "Portuguese",
    "it": "Italian",
    "ja": "Japanese",
    "ko": "Korean",
    "pl": "Polish",
    "uk": "Ukrainian",
    "kk": "Kazakh",
    "ky": "Kyrgyz",
    "tg": "Tajik",
    "az": "Azerbaijani",
    "fa": "Persian",
    "ur": "Urdu",
    "id": "Indonesian",
    "ms": "Malay",
    "vi": "Vietnamese",
    "th": "Thai",
    "he": "Hebrew",
    "nl": "Dutch",
    "sv": "Swedish",
    "el": "Greek",
}


def ai_config() -> dict:
    provider = os.environ.get("AI_PROVIDER", "openrouter").strip().lower()
    api_key = (
        os.environ.get("AI_API_KEY")
        or os.environ.get("OPENROUTER_API_KEY")
        or os.environ.get("GROQ_API_KEY")
        or os.environ.get("HF_TOKEN")
        or ""
    ).strip()

    if provider == "groq":
        base_url = os.environ.get("AI_BASE_URL", "https://api.groq.com/openai/v1")
        model = os.environ.get("AI_MODEL", "openai/gpt-oss-20b")
    elif provider == "huggingface":
        base_url = os.environ.get("AI_BASE_URL", "https://router.huggingface.co/v1")
        model = os.environ.get("AI_MODEL", "openai/gpt-oss-20b")
    elif provider == "openrouter":
        provider = "openrouter"
        base_url = os.environ.get("AI_BASE_URL", "https://openrouter.ai/api/v1")
        model = os.environ.get("AI_MODEL", "openrouter/free")
    else:
        provider = "custom"
        base_url = os.environ.get("AI_BASE_URL", "").rstrip("/")
        model = os.environ.get("AI_MODEL", "")
        if not base_url or not model:
            provider = "openrouter"
            base_url = "https://openrouter.ai/api/v1"
            model = "openrouter/free"

    return {
        "provider": provider,
        "api_key": api_key,
        "base_url": base_url.rstrip("/"),
        "model": model,
        "enabled": bool(api_key),
    }


def json_response(handler: SimpleHTTPRequestHandler, payload: dict, status: int = 200) -> None:
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Cache-Control", "no-store")
    handler.end_headers()
    handler.wfile.write(body)


def read_json_body(handler: SimpleHTTPRequestHandler) -> dict:
    length = int(handler.headers.get("Content-Length", "0") or "0")
    if length <= 0:
        return {}
    raw = handler.rfile.read(min(length, 1024 * 128))
    return json.loads(raw.decode("utf-8"))


def http_json(url: str, *, method: str = "GET", payload: dict | None = None, headers: dict | None = None, timeout: int = 12) -> dict:
    data = None
    request_headers = {
        "User-Agent": "LearningQuestionGenerator/1.0 (local educational tool)",
        **(headers or {}),
    }
    if payload is not None:
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        request_headers["Content-Type"] = "application/json"

    request = urllib.request.Request(url, data=data, method=method, headers=request_headers)
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.loads(response.read().decode("utf-8"))


def fetch_wikipedia_context(topic: str, language: str) -> dict | None:
    params = urllib.parse.urlencode(
        {
            "action": "query",
            "origin": "*",
            "format": "json",
            "generator": "search",
            "gsrsearch": topic,
            "gsrlimit": "1",
            "prop": "extracts|info",
            "exintro": "1",
            "explaintext": "1",
            "inprop": "url",
            "redirects": "1",
        }
    )
    url = f"https://{language}.wikipedia.org/w/api.php?{params}"
    try:
        data = http_json(url, timeout=8)
    except Exception:
        return None

    pages = list((data.get("query", {}).get("pages") or {}).values())
    page = next((item for item in pages if item.get("extract") and item.get("title")), None)
    if not page:
        return None

    extract = normalize_text(page.get("extract", ""))
    if len(extract) < 90:
        return None

    return {
        "title": normalize_text(page.get("title", topic)),
        "extract": extract,
        "source": f"Wikipedia {language.upper()}",
        "url": page.get("fullurl", ""),
        "language": language,
    }


def fetch_context(topic: str, language: str) -> dict | None:
    languages = []
    for candidate in [language, "ru", "en"]:
        if candidate and candidate not in languages:
            languages.append(candidate)

    for candidate in languages:
        context = fetch_wikipedia_context(topic, candidate)
        if context:
            return context
    return None


def normalize_text(value: str) -> str:
    value = re.sub(r"\s+", " ", value or "")
    return value.strip()


def split_sentences(text: str) -> list[str]:
    protected = re.sub(r"\b([A-ZА-ЯЁ][a-zа-яё]{0,3})\.", r"\1<dot>", text)
    parts = re.split(r"(?<=[.!?])\s+", protected)
    return [part.replace("<dot>", ".").strip() for part in parts if len(part.strip()) > 25]


def safe_count(value: object) -> int:
    try:
        return max(4, min(12, int(value)))
    except Exception:
        return 8


def build_research_questions(topic: str, difficulty: str, count: int, language: str, context: dict | None) -> dict:
    title = context["title"] if context else topic
    sentences = split_sentences(context["extract"]) if context else []
    while len(sentences) < count:
        sentences.append(context["extract"][:220] if context else f"{title} needs a reliable definition, key terms, examples, and a way to check understanding.")

    templates = localized_templates(language)
    results = []
    for index in range(count):
        focus, question_template, explanation = templates[index % len(templates)]
        answer = sentences[index % len(sentences)]
        results.append(
            {
                "id": index + 1,
                "focus": focus,
                "question": question_template.format(topic=title),
                "answer": answer,
                "explanation": explanation,
            }
        )

    source = context["source"] if context else "Public research fallback"
    return {
        "topicTitle": title,
        "source": f"AI search fallback + {source}",
        "results": results,
        "mode": "research",
        "url": context.get("url", "") if context else "",
    }


def localized_templates(language: str) -> list[tuple[str, str, str]]:
    if language == "ru":
        return [
            ("Смысл", "Что главное нужно понять о теме «{topic}»?", "Ответ взят из найденной справки и помогает начать с главной идеи."),
            ("Определение", "Как коротко объяснить «{topic}»?", "Короткое определение помогает не потеряться в деталях."),
            ("Факты", "Какие факты важны для темы «{topic}»?", "Факты нужны, чтобы вопрос был учебным, а не случайным."),
            ("Контекст", "В каком контексте встречается «{topic}»?", "Контекст показывает, где тема реально используется."),
            ("Термины", "Какие слова помогут изучать «{topic}» дальше?", "Термины превращают тему в понятную карту."),
            ("Проверка", "Как проверить понимание темы «{topic}»?", "Хорошая проверка требует объяснить тему и привести пример."),
            ("Сравнение", "С чем можно сравнить «{topic}»?", "Сравнение помогает увидеть границы понятия."),
            ("Применение", "Где знания о «{topic}» могут пригодиться?", "Применение связывает тему с практикой."),
        ]
    if language == "uz":
        return [
            ("Mazmun", "«{topic}» mavzusida eng asosiy narsa nima?", "Javob topilgan ma'lumotdan olinadi va mavzuni boshlashga yordam beradi."),
            ("Ta'rif", "«{topic}» ni qisqa qanday tushuntirish mumkin?", "Qisqa ta'rif tafsilotlardan oldin umumiy ma'noni beradi."),
            ("Faktlar", "«{topic}» bo‘yicha qaysi faktlar muhim?", "Faktlar savollarni aniq va foydali qiladi."),
            ("Kontekst", "«{topic}» qayerda yoki qanday vaziyatda uchraydi?", "Kontekst mavzuning real ahamiyatini ko‘rsatadi."),
            ("Tekshiruv", "«{topic}» tushunilganini qanday tekshirish mumkin?", "Tushunish misol va izoh orqali tekshiriladi."),
        ]
    return [
        ("Meaning", "What is the main idea of {topic}?", "The answer is based on the found reference and starts with the core idea."),
        ("Definition", "How can {topic} be explained briefly?", "A short definition keeps the topic clear before details."),
        ("Facts", "Which facts matter most for {topic}?", "Facts make the question useful instead of random."),
        ("Context", "Where does {topic} appear or matter?", "Context shows how the topic is used in real situations."),
        ("Terms", "Which terms help study {topic} further?", "Key terms turn a large topic into a map."),
        ("Check", "How can understanding of {topic} be checked?", "A good check asks for an explanation and an example."),
        ("Comparison", "What can {topic} be compared with?", "Comparison shows the boundaries of the idea."),
        ("Use", "Where can knowledge about {topic} be useful?", "Application connects the topic with practice."),
    ]


def call_ai(topic: str, difficulty: str, count: int, language: str, context: dict) -> list[dict] | None:
    config = ai_config()
    if not config["enabled"]:
        return None

    language_name = LANGUAGE_NAMES.get(language, "English")
    prompt = f"""
Create {count} useful learning questions for the topic "{context['title']}".
Language for all questions and answers: {language_name}.
Difficulty: {DIFFICULTY_LABELS.get(difficulty, difficulty)}.

Use only the facts in this reference. Do not invent details.
Each item must have a different answer. Avoid meta-questions like "what questions should I ask".

Reference:
{context['extract'][:4500]}

Return only valid JSON in this shape:
{{"questions":[{{"focus":"short label","question":"question text","answer":"brief factual answer","explanation":"why this matters for learning"}}]}}
"""

    payload = {
        "model": config["model"],
        "messages": [
            {"role": "system", "content": "You create concise, factual educational quiz questions. Return strict JSON only."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.35,
        "max_tokens": 1800,
    }
    headers = {"Authorization": f"Bearer {config['api_key']}"}
    if config["provider"] == "openrouter":
        headers["HTTP-Referer"] = "http://127.0.0.1:5174"
        headers["X-Title"] = "Learning Question Generator"

    try:
        data = http_json(
            f"{config['base_url']}/chat/completions",
            method="POST",
            payload=payload,
            headers=headers,
            timeout=25,
        )
        content = data["choices"][0]["message"]["content"]
        parsed = parse_ai_json(content)
        items = parsed.get("questions", [])
        return validate_ai_items(items, count)
    except Exception as error:
        print(f"AI request failed: {error}", file=sys.stderr)
        return None


def parse_ai_json(content: str) -> dict:
    content = content.strip()
    content = re.sub(r"^```(?:json)?", "", content).strip()
    content = re.sub(r"```$", "", content).strip()
    start = content.find("{")
    end = content.rfind("}")
    if start >= 0 and end >= start:
        content = content[start : end + 1]
    return json.loads(content)


def validate_ai_items(items: object, count: int) -> list[dict] | None:
    if not isinstance(items, list):
        return None
    results = []
    used_answers = set()
    for item in items:
        if not isinstance(item, dict):
            continue
        question = normalize_text(str(item.get("question", "")))
        answer = normalize_text(str(item.get("answer", "")))
        explanation = normalize_text(str(item.get("explanation", "")))
        focus = normalize_text(str(item.get("focus", ""))) or "AI"
        if len(question) < 8 or len(answer) < 8:
            continue
        answer_key = answer.lower()[:120]
        if answer_key in used_answers:
            continue
        used_answers.add(answer_key)
        results.append(
            {
                "id": len(results) + 1,
                "focus": focus[:48],
                "question": question,
                "answer": answer,
                "explanation": explanation or "This helps connect the fact with the learning goal.",
            }
        )
        if len(results) >= count:
            break
    return results if len(results) >= min(4, count) else None


def generate_ai_response(data: dict) -> dict:
    topic = normalize_text(str(data.get("topic", "")))[:160]
    difficulty = str(data.get("difficulty", "beginner"))
    count = safe_count(data.get("count", 8))
    language = str(data.get("language", "ru")).lower()[:8]
    if not topic:
        raise ValueError("Topic is required")

    context = fetch_context(topic, language)
    if not context:
        return build_research_questions(topic, difficulty, count, language, None)

    ai_items = call_ai(topic, difficulty, count, language, context)
    if ai_items:
        return {
            "topicTitle": context["title"],
            "source": f"AI + {context['source']}",
            "results": ai_items,
            "mode": "ai",
            "url": context.get("url", ""),
        }

    return build_research_questions(topic, difficulty, count, language, context)


class AppHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/health":
            json_response(self, {"ok": True})
            return
        if parsed.path == "/api/ai-status":
            config = ai_config()
            json_response(
                self,
                {
                    "available": True,
                    "aiEnabled": config["enabled"],
                    "provider": config["provider"],
                    "model": config["model"],
                    "searchEnabled": True,
                    "updatedAt": int(time.time()),
                },
            )
            return
        super().do_GET()

    def do_POST(self) -> None:
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/ai-generate":
            try:
                payload = generate_ai_response(read_json_body(self))
                json_response(self, payload)
            except urllib.error.HTTPError as error:
                json_response(self, {"error": f"Upstream API error: {error.code}"}, status=502)
            except Exception as error:
                json_response(self, {"error": str(error)}, status=400)
            return
        json_response(self, {"error": "Not found"}, status=404)


def main() -> None:
    os.chdir(ROOT)
    server = ThreadingHTTPServer((HOST, PORT), AppHandler)
    print(f"Serving on http://{HOST}:{PORT}")
    print("AI key env: AI_API_KEY, OPENROUTER_API_KEY, GROQ_API_KEY, or HF_TOKEN")
    server.serve_forever()


if __name__ == "__main__":
    main()
