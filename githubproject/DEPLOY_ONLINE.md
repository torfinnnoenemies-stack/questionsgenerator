# Deploy online 24/7

Нужны две вещи:

1. Хостинг для приложения.
2. Домен `questionsgeneratingsite.com`, купленный у регистратора.

Важно: бесплатные web services могут засыпать после простоя. Это значит, что сайт будет открываться, но первый заход после паузы может ждать запуск. Для настоящего 24/7 без сна нужен paid always-on тариф или VPS.

Домен в адресной строке будет выглядеть так:

```text
https://questionsgeneratingsite.com
```

DNS имена обычно пишут маленькими буквами, поэтому `Questionsgeneratingsite.com` и `questionsgeneratingsite.com` считаются одним доменом.

## Вариант Render

1. Залей этот проект в GitHub.
2. Открой Render и создай `New Web Service`.
3. Подключи GitHub repository.
4. Render может прочитать `render.yaml` автоматически.
5. Если вводишь вручную:
   - Build command: `pip install -r requirements.txt`
   - Start command: `python server.py`
   - Health check path: `/health`
6. После деплоя Render даст временную ссылку вида:

```text
https://questionsgeneratingsite.onrender.com
```

## AI ключ

Без ключа сайт всё равно работает через бесплатный поиск по открытым источникам.

Если есть бесплатный OpenRouter key, добавь в Environment Variables:

```text
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=your_key_here
AI_MODEL=openrouter/free
```

## Подключение домена

После покупки `questionsgeneratingsite.com`:

1. В Render открой сервис.
2. Найди `Settings` -> `Custom Domains`.
3. Добавь `questionsgeneratingsite.com`.
4. Render покажет DNS записи.
5. У регистратора домена добавь эти DNS записи.
6. Подожди, пока DNS обновится.

После этого сайт будет открываться по:

```text
https://questionsgeneratingsite.com
```

## Railway

Если используешь Railway, проект тоже готов:

1. Подключи GitHub repo.
2. Start command: `python server.py`
3. Railway сам даст `$PORT`.
4. Добавь домен в настройках Public Networking / Domains.
