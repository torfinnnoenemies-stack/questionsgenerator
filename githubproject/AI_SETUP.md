# AI search setup

Сайт уже работает без ключа: локальный сервер ищет факты через бесплатные публичные источники и строит вопросы по найденной справке.

Чтобы подключить бесплатный AI API, запусти сервер с ключом в переменной окружения. Ключ не попадает в браузер.

## OpenRouter

```powershell
$env:AI_PROVIDER="openrouter"
$env:OPENROUTER_API_KEY="your_key_here"
$env:AI_MODEL="openrouter/free"
python server.py
```

## Groq

```powershell
$env:AI_PROVIDER="groq"
$env:GROQ_API_KEY="your_key_here"
$env:AI_MODEL="openai/gpt-oss-20b"
python server.py
```

## Любой OpenAI-compatible API

```powershell
$env:AI_PROVIDER="custom"
$env:AI_API_KEY="your_key_here"
$env:AI_BASE_URL="https://example.com/v1"
$env:AI_MODEL="model-name"
python server.py
```

Сайт открывается тут:

```text
http://127.0.0.1:5174/
```
