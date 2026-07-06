const form = document.querySelector("#question-form");
const topicInput = document.querySelector("#topic");
const countInput = document.querySelector("#question-count");
const clearButton = document.querySelector("#clear-button");
const generateButton = document.querySelector("#generate-button");
const copyButton = document.querySelector("#copy-button");
const txtButton = document.querySelector("#txt-button");
const pdfButton = document.querySelector("#pdf-button");
const list = document.querySelector("#question-list");
const emptyState = document.querySelector("#empty-state");
const resultsTitle = document.querySelector("#results-title");
const sourceLine = document.querySelector("#source-line");
const statusLine = document.querySelector("#status-line");
const languageSelect = document.querySelector("#language-select");
const welcomeLanguageSelect = document.querySelector("#welcome-language");
const languageGate = document.querySelector("#language-gate");
const languageContinueButton = document.querySelector("#language-continue");
const aiModeInput = document.querySelector("#ai-mode");
const aiStatusLine = document.querySelector("#ai-status-line");

const languageStorageKey = "learning-question-language";

const supportedLanguages = [
  { code: "ru", wiki: "ru", name: "Русский", nativeName: "Русский" },
  { code: "en", wiki: "en", name: "English", nativeName: "English" },
  { code: "uz", wiki: "uz", name: "Uzbek", nativeName: "O‘zbekcha" },
  { code: "es", wiki: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", wiki: "fr", name: "French", nativeName: "Français" },
  { code: "de", wiki: "de", name: "German", nativeName: "Deutsch" },
  { code: "tr", wiki: "tr", name: "Turkish", nativeName: "Türkçe" },
  { code: "ar", wiki: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
  { code: "zh", wiki: "zh", name: "Chinese", nativeName: "中文" },
  { code: "hi", wiki: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "pt", wiki: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "it", wiki: "it", name: "Italian", nativeName: "Italiano" },
  { code: "ja", wiki: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", wiki: "ko", name: "Korean", nativeName: "한국어" },
  { code: "pl", wiki: "pl", name: "Polish", nativeName: "Polski" },
  { code: "uk", wiki: "uk", name: "Ukrainian", nativeName: "Українська" },
  { code: "kk", wiki: "kk", name: "Kazakh", nativeName: "Қазақша" },
  { code: "ky", wiki: "ky", name: "Kyrgyz", nativeName: "Кыргызча" },
  { code: "tg", wiki: "tg", name: "Tajik", nativeName: "Тоҷикӣ" },
  { code: "az", wiki: "az", name: "Azerbaijani", nativeName: "Azərbaycanca" },
  { code: "fa", wiki: "fa", name: "Persian", nativeName: "فارسی", dir: "rtl" },
  { code: "ur", wiki: "ur", name: "Urdu", nativeName: "اردو", dir: "rtl" },
  { code: "id", wiki: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "ms", wiki: "ms", name: "Malay", nativeName: "Bahasa Melayu" },
  { code: "vi", wiki: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
  { code: "th", wiki: "th", name: "Thai", nativeName: "ไทย" },
  { code: "he", wiki: "he", name: "Hebrew", nativeName: "עברית", dir: "rtl" },
  { code: "nl", wiki: "nl", name: "Dutch", nativeName: "Nederlands" },
  { code: "sv", wiki: "sv", name: "Swedish", nativeName: "Svenska" },
  { code: "el", wiki: "el", name: "Greek", nativeName: "Ελληνικά" }
];

const ruUi = {
  documentTitle: "Генератор учебных вопросов",
  languageEyebrow: "Выбор языка",
  languageGateTitle: "Выберите язык",
  languageGateText: "Интерфейс запомнит выбор. В списке 30 языков.",
  languageLabel: "Язык",
  languageContinue: "Продолжить",
  eyebrow: "Интерактивный учебный инструмент",
  appTitle: "Генератор вопросов для обучения",
  introCopy: "Введите тему, выберите уровень сложности и получите набор вопросов с короткими пояснениями.",
  topicLabel: "Тема",
  topicPlaceholder: "Например: машинное обучение, фотосинтез, история джаза",
  difficultyLabel: "Сложность",
  beginner: "Базовая",
  intermediate: "Средняя",
  advanced: "Продвинутая",
  countLabel: "Количество",
  generate: "Сгенерировать",
  clear: "Очистить",
  resultsEyebrow: "Результаты",
  emptyTitle: "Вопросы появятся здесь",
  emptyText: "Начните с темы, которую хотите изучить или повторить.",
  copyTitle: "Скопировать текст",
  copiedTitle: "Скопировано",
  txtTitle: "Экспортировать TXT",
  pdfTitle: "Экспортировать PDF",
  sourceLabel: "Источник",
  topicExport: "Тема",
  difficultyExport: "Сложность",
  answerLabel: "Ответ",
  explanationLabel: "Пояснение",
  focusLabel: "Фокус",
  statusSearching: "Ищу факты по теме...",
  popupAlert: "Разрешите всплывающие окна, чтобы открыть PDF-экспорт.",
  questionsTitle: "вопросы",
  sourceBuiltInBank: "Встроенная предметная база",
  sourceBuiltInProfile: "Встроенный предметный профиль",
  sourceFallback: "Фактовая справка не найдена: включён режим учебного исследования",
  aiLabel: "AI поиск",
  aiHint: "Ищет факты по теме и улучшает вопросы.",
  aiStatusReady: "AI API подключён: используется {provider}.",
  aiStatusSearchOnly: "AI ключ не найден: включён бесплатный поиск по источникам.",
  aiStatusOffline: "AI сервер не запущен: будет обычный режим.",
  aiSource: "AI поиск"
};

const enUi = {
  documentTitle: "Learning Question Generator",
  languageEyebrow: "Language",
  languageGateTitle: "Choose a language",
  languageGateText: "The interface will remember your choice. The list has 30 languages.",
  languageLabel: "Language",
  languageContinue: "Continue",
  eyebrow: "Interactive learning tool",
  appTitle: "Learning question generator",
  introCopy: "Enter a topic, choose a difficulty level, and get learning questions with short explanations.",
  topicLabel: "Topic",
  topicPlaceholder: "For example: machine learning, photosynthesis, jazz history",
  difficultyLabel: "Difficulty",
  beginner: "Basic",
  intermediate: "Medium",
  advanced: "Advanced",
  countLabel: "Amount",
  generate: "Generate",
  clear: "Clear",
  resultsEyebrow: "Results",
  emptyTitle: "Questions will appear here",
  emptyText: "Start with a topic you want to learn or review.",
  copyTitle: "Copy text",
  copiedTitle: "Copied",
  txtTitle: "Export TXT",
  pdfTitle: "Export PDF",
  sourceLabel: "Source",
  topicExport: "Topic",
  difficultyExport: "Difficulty",
  answerLabel: "Answer",
  explanationLabel: "Explanation",
  focusLabel: "Focus",
  statusSearching: "Looking for facts about the topic...",
  popupAlert: "Allow pop-ups to open the PDF export.",
  questionsTitle: "questions",
  sourceBuiltInBank: "Built-in subject database",
  sourceBuiltInProfile: "Built-in subject profile",
  sourceFallback: "No factual reference found: study-research mode is on",
  aiLabel: "AI search",
  aiHint: "Finds topic facts and improves the questions.",
  aiStatusReady: "AI API connected: using {provider}.",
  aiStatusSearchOnly: "No AI key found: free source search is on.",
  aiStatusOffline: "AI server is not running: normal mode will be used.",
  aiSource: "AI search"
};

const languageUi = {
  ru: ruUi,
  en: enUi,
  uz: {
    ...enUi,
    documentTitle: "O‘quv savollari generatori",
    languageEyebrow: "Til tanlash",
    languageGateTitle: "Tilni tanlang",
    languageGateText: "Interfeys tanlovingizni eslab qoladi. Ro‘yxatda 30 ta til bor.",
    languageLabel: "Til",
    languageContinue: "Davom etish",
    eyebrow: "Interaktiv o‘quv vositasi",
    appTitle: "O‘quv savollari generatori",
    introCopy: "Mavzuni kiriting, qiyinchilik darajasini tanlang va qisqa izohli savollar oling.",
    topicLabel: "Mavzu",
    topicPlaceholder: "Masalan: fotosintez, fizika, tarix",
    difficultyLabel: "Qiyinlik",
    beginner: "Asosiy",
    intermediate: "O‘rta",
    advanced: "Murakkab",
    countLabel: "Soni",
    generate: "Yaratish",
    clear: "Tozalash",
    resultsEyebrow: "Natijalar",
    emptyTitle: "Savollar shu yerda paydo bo‘ladi",
    emptyText: "O‘rganmoqchi yoki takrorlamoqchi bo‘lgan mavzudan boshlang.",
    sourceLabel: "Manba",
    answerLabel: "Javob",
    explanationLabel: "Izoh",
    focusLabel: "Fokus",
    statusSearching: "Mavzu bo‘yicha faktlar qidirilmoqda...",
    aiLabel: "AI qidiruv",
    aiHint: "Mavzu bo‘yicha faktlarni topadi va savollarni yaxshilaydi.",
    aiStatusReady: "AI API ulangan: {provider}.",
    aiStatusSearchOnly: "AI kaliti topilmadi: bepul manba qidiruvi yoqilgan.",
    aiStatusOffline: "AI server ishlamayapti: oddiy rejim ishlatiladi."
  },
  es: {
    ...enUi,
    documentTitle: "Generador de preguntas de aprendizaje",
    languageGateTitle: "Elige un idioma",
    languageLabel: "Idioma",
    languageContinue: "Continuar",
    appTitle: "Generador de preguntas",
    topicLabel: "Tema",
    difficultyLabel: "Dificultad",
    beginner: "Básico",
    intermediate: "Medio",
    advanced: "Avanzado",
    generate: "Generar",
    clear: "Limpiar",
    resultsEyebrow: "Resultados",
    answerLabel: "Respuesta",
    explanationLabel: "Explicación",
    focusLabel: "Enfoque",
    sourceLabel: "Fuente"
  },
  fr: {
    ...enUi,
    documentTitle: "Générateur de questions d'apprentissage",
    languageGateTitle: "Choisissez une langue",
    languageLabel: "Langue",
    languageContinue: "Continuer",
    appTitle: "Générateur de questions",
    topicLabel: "Sujet",
    difficultyLabel: "Difficulté",
    beginner: "Basique",
    intermediate: "Moyen",
    advanced: "Avancé",
    generate: "Générer",
    clear: "Effacer",
    resultsEyebrow: "Résultats",
    answerLabel: "Réponse",
    explanationLabel: "Explication",
    focusLabel: "Focus",
    sourceLabel: "Source"
  },
  de: {
    ...enUi,
    documentTitle: "Lernfragen-Generator",
    languageGateTitle: "Sprache wählen",
    languageLabel: "Sprache",
    languageContinue: "Weiter",
    appTitle: "Lernfragen-Generator",
    topicLabel: "Thema",
    difficultyLabel: "Schwierigkeit",
    beginner: "Grundlage",
    intermediate: "Mittel",
    advanced: "Fortgeschritten",
    generate: "Generieren",
    clear: "Leeren",
    resultsEyebrow: "Ergebnisse",
    answerLabel: "Antwort",
    explanationLabel: "Erklärung",
    focusLabel: "Fokus",
    sourceLabel: "Quelle"
  },
  tr: {
    ...enUi,
    documentTitle: "Öğrenme Soruları Üretici",
    languageGateTitle: "Dil seçin",
    languageLabel: "Dil",
    languageContinue: "Devam et",
    appTitle: "Öğrenme soruları üretici",
    topicLabel: "Konu",
    difficultyLabel: "Zorluk",
    beginner: "Temel",
    intermediate: "Orta",
    advanced: "İleri",
    generate: "Oluştur",
    clear: "Temizle",
    resultsEyebrow: "Sonuçlar",
    answerLabel: "Cevap",
    explanationLabel: "Açıklama",
    focusLabel: "Odak",
    sourceLabel: "Kaynak"
  },
  ar: {
    ...enUi,
    documentTitle: "مولد أسئلة التعلم",
    languageGateTitle: "اختر اللغة",
    languageLabel: "اللغة",
    languageContinue: "متابعة",
    appTitle: "مولد أسئلة التعلم",
    topicLabel: "الموضوع",
    difficultyLabel: "الصعوبة",
    beginner: "أساسي",
    intermediate: "متوسط",
    advanced: "متقدم",
    generate: "إنشاء",
    clear: "مسح",
    resultsEyebrow: "النتائج",
    answerLabel: "الإجابة",
    explanationLabel: "الشرح",
    focusLabel: "التركيز",
    sourceLabel: "المصدر"
  },
  zh: {
    ...enUi,
    documentTitle: "学习问题生成器",
    languageGateTitle: "选择语言",
    languageLabel: "语言",
    languageContinue: "继续",
    appTitle: "学习问题生成器",
    topicLabel: "主题",
    difficultyLabel: "难度",
    beginner: "基础",
    intermediate: "中级",
    advanced: "高级",
    generate: "生成",
    clear: "清除",
    resultsEyebrow: "结果",
    answerLabel: "答案",
    explanationLabel: "解释",
    focusLabel: "重点",
    sourceLabel: "来源"
  },
  hi: {
    ...enUi,
    documentTitle: "लर्निंग प्रश्न जनरेटर",
    languageGateTitle: "भाषा चुनें",
    languageLabel: "भाषा",
    languageContinue: "जारी रखें",
    appTitle: "लर्निंग प्रश्न जनरेटर",
    topicLabel: "विषय",
    difficultyLabel: "कठिनाई",
    beginner: "बुनियादी",
    intermediate: "मध्यम",
    advanced: "उन्नत",
    generate: "बनाएँ",
    clear: "साफ़ करें",
    resultsEyebrow: "परिणाम",
    answerLabel: "उत्तर",
    explanationLabel: "व्याख्या",
    focusLabel: "केंद्र",
    sourceLabel: "स्रोत"
  },
  pt: { ...enUi, languageGateTitle: "Escolha um idioma", languageLabel: "Idioma", languageContinue: "Continuar", appTitle: "Gerador de perguntas", topicLabel: "Tema", difficultyLabel: "Dificuldade", beginner: "Básico", intermediate: "Médio", advanced: "Avançado", generate: "Gerar", clear: "Limpar", resultsEyebrow: "Resultados", answerLabel: "Resposta", explanationLabel: "Explicação", focusLabel: "Foco", sourceLabel: "Fonte" },
  it: { ...enUi, languageGateTitle: "Scegli una lingua", languageLabel: "Lingua", languageContinue: "Continua", appTitle: "Generatore di domande", topicLabel: "Argomento", difficultyLabel: "Difficoltà", beginner: "Base", intermediate: "Media", advanced: "Avanzata", generate: "Genera", clear: "Pulisci", resultsEyebrow: "Risultati", answerLabel: "Risposta", explanationLabel: "Spiegazione", focusLabel: "Focus", sourceLabel: "Fonte" },
  ja: { ...enUi, languageGateTitle: "言語を選択", languageLabel: "言語", languageContinue: "続行", appTitle: "学習質問ジェネレーター", topicLabel: "トピック", difficultyLabel: "難易度", beginner: "基本", intermediate: "中級", advanced: "上級", generate: "生成", clear: "クリア", resultsEyebrow: "結果", answerLabel: "回答", explanationLabel: "説明", focusLabel: "焦点", sourceLabel: "出典" },
  ko: { ...enUi, languageGateTitle: "언어 선택", languageLabel: "언어", languageContinue: "계속", appTitle: "학습 질문 생성기", topicLabel: "주제", difficultyLabel: "난이도", beginner: "기본", intermediate: "중간", advanced: "고급", generate: "생성", clear: "지우기", resultsEyebrow: "결과", answerLabel: "답변", explanationLabel: "설명", focusLabel: "초점", sourceLabel: "출처" },
  uk: { ...ruUi, documentTitle: "Генератор навчальних запитань", languageGateTitle: "Оберіть мову", languageLabel: "Мова", languageContinue: "Продовжити", appTitle: "Генератор запитань", topicLabel: "Тема", difficultyLabel: "Складність", beginner: "Базова", intermediate: "Середня", advanced: "Просунута", generate: "Згенерувати", clear: "Очистити", resultsEyebrow: "Результати", answerLabel: "Відповідь", explanationLabel: "Пояснення", focusLabel: "Фокус", sourceLabel: "Джерело" },
  kk: { ...ruUi, documentTitle: "Оқу сұрақтарының генераторы", languageGateTitle: "Тілді таңдаңыз", languageLabel: "Тіл", languageContinue: "Жалғастыру", appTitle: "Оқу сұрақтарының генераторы", topicLabel: "Тақырып", difficultyLabel: "Қиындық", beginner: "Негізгі", intermediate: "Орта", advanced: "Күрделі", generate: "Жасау", clear: "Тазалау", resultsEyebrow: "Нәтижелер", answerLabel: "Жауап", explanationLabel: "Түсіндірме", focusLabel: "Фокус", sourceLabel: "Дереккөз" },
  he: { ...enUi, documentTitle: "מחולל שאלות למידה", languageGateTitle: "בחרו שפה", languageLabel: "שפה", languageContinue: "המשך", appTitle: "מחולל שאלות למידה", topicLabel: "נושא", difficultyLabel: "רמה", beginner: "בסיסי", intermediate: "בינוני", advanced: "מתקדם", generate: "צור", clear: "נקה", resultsEyebrow: "תוצאות", answerLabel: "תשובה", explanationLabel: "הסבר", focusLabel: "מוקד", sourceLabel: "מקור" }
};

let selectedLanguage = normalizeLanguageCode(readStoredLanguage() || "ru");
let activeUi = getLanguageUi(selectedLanguage);

const difficultyLabels = {
  beginner: activeUi.beginner,
  intermediate: activeUi.intermediate,
  advanced: activeUi.advanced
};

const templates = {
  beginner: [
    {
      question: "Что такое {topic} простыми словами?",
      explanation: "Начните с определения: это помогает закрепить общий смысл темы до деталей."
    },
    {
      question: "Какие три ключевые идеи чаще всего связаны с темой {topic}?",
      explanation: "Выделение нескольких опорных идей превращает большую тему в удобную карту."
    },
    {
      question: "Где {topic} встречается в повседневной жизни или работе?",
      explanation: "Связь с реальными примерами ускоряет понимание и делает материал запоминаемым."
    },
    {
      question: "Какие базовые термины нужно знать, чтобы уверенно говорить про {topic}?",
      explanation: "Словарь темы снижает путаницу и помогает читать более сложные источники."
    },
    {
      question: "Как объяснить {topic} человеку, который впервые слышит об этом?",
      explanation: "Такой вопрос проверяет, можете ли вы отделить главное от второстепенного."
    },
    {
      question: "Какая самая распространенная ошибка новичков при изучении темы {topic}?",
      explanation: "Знание типичных ошибок помогает быстрее распознавать неверные представления."
    },
    {
      question: "Какие вопросы стоит задать себе после первого знакомства с темой {topic}?",
      explanation: "Самопроверка переводит пассивное чтение в активное обучение."
    },
    {
      question: "Какой простой пример лучше всего показывает идею {topic}?",
      explanation: "Один ясный пример часто работает лучше длинного списка определений."
    },
    {
      question: "Какие части темы {topic} стоит изучать в первую очередь?",
      explanation: "Правильная последовательность снижает перегрузку и помогает видеть прогресс."
    },
    {
      question: "Как понять, что базовое понимание темы {topic} уже сформировано?",
      explanation: "Критерии понимания помогают решить, когда переходить к следующему уровню."
    },
    {
      question: "Какие источники или форматы обучения лучше подходят для старта в теме {topic}?",
      explanation: "Разные темы лучше раскрываются через книги, видео, практику или обсуждение."
    },
    {
      question: "Как связать тему {topic} с уже известными вам знаниями?",
      explanation: "Новые идеи легче запоминаются, когда цепляются за существующие понятия."
    }
  ],
  intermediate: [
    {
      question: "Какие основные подходы или школы мысли существуют вокруг темы {topic}?",
      explanation: "Сравнение подходов помогает увидеть, что тема не сводится к одному объяснению."
    },
    {
      question: "Как устроена причинно-следственная логика внутри темы {topic}?",
      explanation: "На среднем уровне важно понимать не только факты, но и связи между ними."
    },
    {
      question: "Какие ограничения есть у популярных объяснений темы {topic}?",
      explanation: "Ограничения показывают границы применимости идей и защищают от упрощений."
    },
    {
      question: "Как можно применить {topic} для решения практической задачи?",
      explanation: "Применение проверяет, умеете ли вы переносить знания из теории в действие."
    },
    {
      question: "Какие данные, наблюдения или аргументы подтверждают ключевые идеи темы {topic}?",
      explanation: "Аргументация делает понимание более надежным и менее зависимым от запоминания."
    },
    {
      question: "Какие похожие темы легко перепутать с {topic}, и чем они отличаются?",
      explanation: "Сравнение близких понятий очищает границы и укрепляет терминологию."
    },
    {
      question: "Какие этапы нужно пройти, чтобы самостоятельно разобраться в задаче по теме {topic}?",
      explanation: "Пошаговое мышление помогает превратить знание в рабочий алгоритм."
    },
    {
      question: "Какие компромиссы чаще всего возникают при использовании темы {topic}?",
      explanation: "Компромиссы раскрывают реальные условия выбора между вариантами."
    },
    {
      question: "Как объяснить спорный вопрос внутри темы {topic} с двух разных сторон?",
      explanation: "Умение видеть альтернативные позиции развивает критическое мышление."
    },
    {
      question: "Какие метрики или признаки показывают успех в работе с темой {topic}?",
      explanation: "Измеримые признаки помогают оценивать результат, а не только процесс."
    },
    {
      question: "Как меняется понимание темы {topic}, если рассмотреть ее исторически?",
      explanation: "История идеи показывает, почему текущие взгляды стали именно такими."
    },
    {
      question: "Какой мини-проект поможет закрепить тему {topic} на практике?",
      explanation: "Небольшой проект превращает разрозненные знания в связный навык."
    }
  ],
  advanced: [
    {
      question: "Какие скрытые предпосылки лежат в основе современных взглядов на {topic}?",
      explanation: "Продвинутый уровень требует видеть основания, на которых строятся выводы."
    },
    {
      question: "В каких ситуациях стандартные методы темы {topic} дают сбой?",
      explanation: "Крайние случаи показывают глубину понимания лучше, чем типовые примеры."
    },
    {
      question: "Как можно формализовать ключевую проблему в теме {topic}?",
      explanation: "Формализация помогает перейти от интуитивного описания к строгому анализу."
    },
    {
      question: "Какие нерешенные вопросы или активные дискуссии существуют вокруг темы {topic}?",
      explanation: "Такие вопросы показывают передний край области и зоны неопределенности."
    },
    {
      question: "Как оценить качество экспертного утверждения о теме {topic}?",
      explanation: "Критерии оценки источников важны, когда ответы зависят от контекста и доказательств."
    },
    {
      question: "Как связать {topic} с соседней дисциплиной и получить новый взгляд на проблему?",
      explanation: "Междисциплинарные связи часто раскрывают неожиданные методы и ограничения."
    },
    {
      question: "Какие этические, социальные или системные последствия может иметь {topic}?",
      explanation: "Сложные темы редко существуют отдельно от людей, институтов и последствий."
    },
    {
      question: "Как построить аргумент против популярного тезиса о теме {topic}?",
      explanation: "Контраргументация проверяет устойчивость понимания и качество доказательств."
    },
    {
      question: "Какие переменные сильнее всего влияют на результат в теме {topic}?",
      explanation: "Выделение ключевых переменных помогает управлять сложностью."
    },
    {
      question: "Как бы вы спроектировали исследование или эксперимент по теме {topic}?",
      explanation: "Проектирование исследования проверяет понимание гипотез, данных и ограничений."
    },
    {
      question: "Как отличить глубокое понимание темы {topic} от уверенного пересказа?",
      explanation: "Этот вопрос помогает оценивать перенос знаний, объяснение причин и работу с исключениями."
    },
    {
      question: "Как изменятся выводы о теме {topic}, если изменить исходные допущения?",
      explanation: "Работа с допущениями раскрывает зависимость выводов от модели мышления."
    }
  ]
};

const topicBanks = [
  {
    title: "фотосинтез",
    aliases: [
      "photosynthesis",
      "photo synthesis",
      "photo-synthesis",
      "photosintez",
      "photosintezis",
      "photosyntesis",
      "photosintesis",
      "fotosintez",
      "fotosintezis",
      "фотосинтез",
      "фотосинтеза"
    ],
    matcher: (topicKey) =>
      topicKey.includes("photosynth") ||
      topicKey.includes("photosynt") ||
      topicKey.includes("photosint") ||
      topicKey.includes("photosinte") ||
      topicKey.includes("fotosint") ||
      topicKey.includes("фотосинт"),
    questions: {
      beginner: [
        {
          focus: "Основы",
          question: "Что такое фотосинтез и зачем он нужен растениям?",
          explanation: "Фотосинтез превращает энергию света в химическую энергию сахаров, которые растение использует для роста и жизни."
        },
        {
          focus: "Вещества",
          question: "Какие вещества нужны растению для фотосинтеза?",
          explanation: "Нужны углекислый газ, вода и свет; хлорофилл помогает улавливать световую энергию."
        },
        {
          focus: "Продукты",
          question: "Какие вещества образуются в результате фотосинтеза?",
          explanation: "Главные продукты - глюкоза и кислород; глюкоза запасает энергию, а кислород выделяется в атмосферу."
        },
        {
          focus: "Клетка",
          question: "Где в растительной клетке происходит фотосинтез?",
          explanation: "Фотосинтез идет в хлоропластах: световые реакции связаны с тилакоидами, а образование сахаров происходит в строме."
        },
        {
          focus: "Пигменты",
          question: "Какую роль играет хлорофилл в фотосинтезе?",
          explanation: "Хлорофилл поглощает свет, особенно красный и синий, и запускает перенос энергии к химическим реакциям."
        },
        {
          focus: "Кислород",
          question: "Почему при фотосинтезе выделяется кислород?",
          explanation: "Кислород появляется при расщеплении воды в световых реакциях, а не напрямую из углекислого газа."
        },
        {
          focus: "Сравнение",
          question: "Чем фотосинтез отличается от дыхания растений?",
          explanation: "Фотосинтез запасает энергию в сахарах, а дыхание высвобождает энергию из сахаров для работы клетки."
        },
        {
          focus: "Свет",
          question: "Почему без света фотосинтез резко замедляется?",
          explanation: "Без света не образуются ATP и NADPH, поэтому растению не хватает энергии для синтеза сахаров."
        },
        {
          focus: "Лист",
          question: "Как устьица листа помогают фотосинтезу?",
          explanation: "Через устьица в лист поступает углекислый газ, но при этом растение теряет воду, поэтому устьица регулируются."
        },
        {
          focus: "Цвет",
          question: "Почему большинство листьев выглядят зелеными?",
          explanation: "Хлорофилл хуже поглощает зеленый свет и частично отражает его, поэтому листья кажутся зелеными."
        },
        {
          focus: "Уравнение",
          question: "Как записать общее уравнение фотосинтеза?",
          explanation: "Упрощенная запись: 6CO2 + 6H2O + световая энергия -> C6H12O6 + 6O2."
        },
        {
          focus: "Значение",
          question: "Почему фотосинтез важен для животных и человека?",
          explanation: "Он создает органическое вещество в пищевых цепях и поддерживает кислород в атмосфере."
        }
      ],
      intermediate: [
        {
          focus: "Этапы",
          question: "Какие две основные стадии включает фотосинтез?",
          explanation: "Световые реакции создают ATP и NADPH, а цикл Кальвина использует их для фиксации CO2 и образования сахаров."
        },
        {
          focus: "Световые реакции",
          question: "Что происходит в светозависимых реакциях фотосинтеза?",
          explanation: "Свет возбуждает электроны, вода расщепляется, выделяется O2, а энергия сохраняется в ATP и NADPH."
        },
        {
          focus: "Цикл Кальвина",
          question: "Почему цикл Кальвина может идти без прямого света, но зависит от световых реакций?",
          explanation: "Сам цикл не ловит фотоны, но ему нужны ATP и NADPH, которые образуются только в световых реакциях."
        },
        {
          focus: "Хлоропласт",
          question: "Как строение хлоропласта связано с этапами фотосинтеза?",
          explanation: "Тилакоидные мембраны подходят для переноса электронов, а строма содержит ферменты цикла Кальвина."
        },
        {
          focus: "Ограничители",
          question: "Как свет, CO2 и температура ограничивают скорость фотосинтеза?",
          explanation: "Если один фактор в дефиците, он становится ограничивающим: больше света не поможет, если не хватает CO2 или ферменты работают плохо."
        },
        {
          focus: "Устьица",
          question: "Почему закрытие устьиц защищает растение, но снижает фотосинтез?",
          explanation: "Закрытые устьица уменьшают потерю воды, но одновременно ограничивают поступление CO2 в лист."
        },
        {
          focus: "Адаптации",
          question: "Чем C3-, C4- и CAM-фотосинтез отличаются как стратегии растений?",
          explanation: "C4 и CAM помогают уменьшать потери воды и фотодыхание в жарких или сухих условиях, но требуют дополнительных затрат энергии."
        },
        {
          focus: "Вода",
          question: "Почему вода считается источником электронов в фотосинтезе?",
          explanation: "При фотолизе вода отдает электроны фотосистеме II, а побочным продуктом становится кислород."
        },
        {
          focus: "Энергия",
          question: "Как энергия света превращается в энергию химических связей?",
          explanation: "Свет запускает поток электронов, он создает протонный градиент, затем ATP и NADPH помогают синтезировать углеводы."
        },
        {
          focus: "Эксперимент",
          question: "Как можно измерить скорость фотосинтеза в простом школьном опыте?",
          explanation: "Можно наблюдать выделение пузырьков кислорода у водного растения или измерять изменение CO2 при разных условиях."
        },
        {
          focus: "Сахара",
          question: "Почему глюкоза не всегда сразу остается в листе?",
          explanation: "Растение может превращать ее в крахмал для запаса или транспортировать сахарозу к другим органам."
        },
        {
          focus: "Баланс",
          question: "Что такое компенсационная точка света у растения?",
          explanation: "Это уровень освещенности, при котором фотосинтез и дыхание уравновешены по обмену CO2."
        }
      ],
      advanced: [
        {
          focus: "Ферменты",
          question: "Почему Rubisco одновременно важен для фотосинтеза и связан с фотодыханием?",
          explanation: "Rubisco фиксирует CO2, но может связывать O2; это запускает фотодыхание и снижает эффективность синтеза сахаров."
        },
        {
          focus: "Электроны",
          question: "Как поток электронов в тилакоидной мембране создает протонный градиент?",
          explanation: "Электрон-транспортная цепь переносит энергию так, что протоны накапливаются внутри тилакоида и затем проходят через ATP-синтазу."
        },
        {
          focus: "Фотосистемы",
          question: "Зачем фотосинтезу две фотосистемы, II и I?",
          explanation: "Фотосистема II извлекает электроны из воды, а фотосистема I повторно возбуждает их для восстановления NADP+ до NADPH."
        },
        {
          focus: "ATP/NADPH",
          question: "Чем циклическое фотофосфорилирование отличается от нециклического?",
          explanation: "Циклический путь производит дополнительный ATP без образования NADPH и O2, помогая сбалансировать потребности цикла Кальвина."
        },
        {
          focus: "Фотоrespiration",
          question: "Почему фотодыхание усиливается при жаре и низком уровне CO2?",
          explanation: "При закрытых устьицах CO2 падает, O2 относительно растет, и Rubisco чаще работает как оксигеназа."
        },
        {
          focus: "Кривые",
          question: "Как интерпретировать световую кривую фотосинтеза?",
          explanation: "На ней видны компенсационная точка, участок роста скорости и насыщение, когда другие факторы становятся ограничивающими."
        },
        {
          focus: "Адаптации",
          question: "Почему C4-фотосинтез энергетически дороже, но выгоден в жарком климате?",
          explanation: "Он тратит дополнительный ATP на концентрацию CO2 возле Rubisco, зато снижает потери от фотодыхания."
        },
        {
          focus: "Стресс",
          question: "Как растение защищается от избытка света?",
          explanation: "Оно может рассеивать лишнюю энергию как тепло, менять положение листьев и использовать антиоксидантные системы."
        },
        {
          focus: "Флуоресценция",
          question: "Почему хлорофилльная флуоресценция помогает оценивать состояние фотосинтеза?",
          explanation: "Она показывает, насколько эффективно энергия света идет в фотохимию, а не теряется или вызывает стресс."
        },
        {
          focus: "Климат",
          question: "Как повышение CO2 и температуры может по-разному влиять на фотосинтез?",
          explanation: "Больше CO2 может усиливать фиксацию углерода у C3-растений, но жара и засуха могут закрывать устьица и повреждать ферменты."
        },
        {
          focus: "Изотопы",
          question: "Как изотопные метки помогают изучать путь углерода в фотосинтезе?",
          explanation: "Метки вроде 14C позволяют проследить, в какие молекулы попадает углерод после фиксации CO2."
        },
        {
          focus: "Технологии",
          question: "Что пытается повторить искусственный фотосинтез?",
          explanation: "Он стремится использовать свет для получения топлива или полезных химических веществ, имитируя ключевую идею природного процесса."
        }
      ]
    }
  }
];

const topicProfiles = [
  createTopicProfile({
    title: "клубника",
    aliases: ["клубника", "клубники", "strawberry", "strawberries", "садовая земляника", "земляника"],
    definition: "В быту клубникой чаще называют сладкие плоды садовой земляники; это низкое травянистое растение из семейства Розовые.",
    essentials: ["садовая земляника", "семейство Розовые", "усы", "цветок", "семянки", "сорт"],
    process: "выбрать сорт, подготовить солнечную грядку с рыхлой почвой, посадить розетки, регулярно поливать и обновлять посадки",
    example: "клубнику выращивают на грядках или в теплицах ради сочных сладких плодов, которые едят свежими и используют в десертах",
    application: "в садоводстве, питании, кулинарии, селекции и изучении размножения растений",
    commonMistake: "считать клубнику обычной ягодой в строгом ботаническом смысле; съедобная красная часть - разросшееся цветоложе, а мелкие точки на поверхности являются плодиками-семянками",
    comparison: "лесной земляникой и настоящей клубникой, потому что в быту эти названия часто смешивают",
    variables: "сорт, освещенность, почва, влажность, температура, болезни, опыление и возраст посадки",
    evidence: "строение цветка и плода, описание сорта, урожайность, условия выращивания и наблюдения за растением",
    model: "схема строения растения: корни, листья, цветки, усы и плодовая часть",
    advancedIssue: "различие бытового и ботанического значения слова, селекция сортов, болезни и устойчивость к условиям выращивания",
    experiment: "сравнить рост двух кустов при разном освещении или режиме полива и записать различия в листьях, цветении и урожае",
    ethics: "при выращивании важны безопасное использование удобрений, бережное отношение к почве и разумный расход воды",
    quiz: {
      beginner: [
        quizItem("Ботаника", "К какому семейству относится клубника?", "К семейству Розовые.", "Это связывает клубнику с такими растениями, как роза, малина и яблоня."),
        quizItem("Название", "Почему клубнику часто называют садовой земляникой?", "Потому что в быту словом «клубника» обычно называют плоды садовой земляники.", "Так легче не путать бытовое название с точной ботанической классификацией."),
        quizItem("Строение", "Что на поверхности клубники выглядит как маленькие семена?", "Это семянки, то есть маленькие плодики на поверхности разросшегося цветоложа.", "Поэтому клубника в строгом ботаническом смысле не является обычной ягодой."),
        quizItem("Размножение", "Как клубника часто размножается на грядке?", "С помощью усов, на которых образуются новые розетки.", "Так садоводы быстро получают новые растения от материнского куста."),
        quizItem("Условия", "Какие условия помогают клубнике хорошо расти?", "Солнечное место, рыхлая почва, регулярный полив и здоровая рассада.", "Эти факторы влияют на цветение, размер плодов и урожай."),
        quizItem("Использование", "Для чего человек выращивает клубнику?", "Ради сладких плодов, которые едят свежими и используют в десертах, варенье и напитках.", "Это связывает тему не только с биологией, но и с питанием и кулинарией."),
        quizItem("Ошибка", "Какая частая ошибка есть в понимании клубники?", "Считать красную сочную часть обычной ягодой.", "На самом деле съедобная часть в основном является разросшимся цветоложем."),
        quizItem("Проверка", "Как отличить хорошее объяснение клубники от простого описания вкуса?", "В хорошем объяснении есть строение растения, способ размножения, условия выращивания и ботаническое уточнение.", "Так ответ становится учебным, а не просто бытовым.")
      ],
      intermediate: [
        quizItem("Классификация", "Почему классификация клубники важна для изучения темы?", "Она показывает, что клубника относится к Розовым и имеет особенности строения, общие с родственными растениями.", "Классификация помогает объяснять признаки, а не только запоминать название."),
        quizItem("Плод", "Почему ботаники описывают плод клубники иначе, чем люди в быту?", "Потому что бытовое слово «ягода» описывает еду, а ботаника описывает происхождение частей цветка.", "Это хороший пример различия между бытовым и научным языком."),
        quizItem("Урожай", "Какие факторы сильнее всего влияют на урожай клубники?", "Сорт, освещение, вода, почва, опыление, болезни и возраст посадки.", "Если один фактор плохой, хороший сорт сам по себе не спасает урожай."),
        quizItem("Опыт", "Какой простой опыт можно провести с клубникой?", "Сравнить два куста при разном освещении или поливе и записывать рост, цветение и количество плодов.", "Так тема превращается из текста в наблюдение и данные."),
        quizItem("Размножение", "Почему усы полезны для садоводов?", "Они дают новые розетки, которые можно укоренить и пересадить.", "Это вегетативное размножение сохраняет признаки материнского растения."),
        quizItem("Болезни", "Почему клубнику нельзя изучать только через вкус плодов?", "Потому что важны также здоровье листьев, корней, цветков и устойчивость к болезням.", "Растение — это система, а плод только одна её часть."),
        quizItem("Сравнение", "С чем полезно сравнить клубнику при изучении?", "С лесной земляникой, малиной и другими растениями семейства Розовые.", "Сравнение показывает сходства, различия и причины путаницы в названиях."),
        quizItem("Схема", "Какую схему стоит нарисовать для темы «клубника»?", "Корни → листья → цветки → усы → цветоложе с семянками → урожай.", "Такая схема помогает связать строение, размножение и результат выращивания.")
      ],
      advanced: [
        quizItem("Научный язык", "Почему тема клубники хорошо показывает разницу между бытовым и научным языком?", "Потому что в быту её называют ягодой, а ботаническое описание устроено сложнее.", "Это учит проверять, в каком смысле используется слово."),
        quizItem("Селекция", "Что меняет селекция сортов клубники?", "Размер, вкус, устойчивость к болезням, сроки созревания и урожайность.", "Сорт — это не просто название, а набор наследуемых признаков."),
        quizItem("Модель", "Как построить модель урожайности клубники?", "Связать сорт, свет, воду, почву, опыление, болезни и возраст посадки с количеством и качеством плодов.", "Модель помогает видеть, почему урожай зависит от нескольких факторов одновременно."),
        quizItem("Ограничения", "Почему один совет по выращиванию клубники не подходит всем?", "Потому что климат, почва, сорт и уход могут сильно отличаться.", "Продвинутый ответ всегда учитывает условия применения."),
        quizItem("Экология", "Какие экологические вопросы связаны с выращиванием клубники?", "Использование воды, удобрений, защиты от вредителей и состояние почвы.", "Даже обычная садовая культура связана с ресурсами и устойчивым уходом."),
        quizItem("Исследование", "Как проверить, какой фактор ограничивает рост клубники?", "Менять по одному условию, например полив или освещение, и сравнивать результат с контрольным кустом.", "Так можно отделить догадку от наблюдаемого эффекта."),
        quizItem("Критика", "Как проверить утверждение «клубника плохо растёт из-за плохого сорта»?", "Сравнить сорт с условиями выращивания: почвой, светом, водой, болезнями и возрастом посадки.", "Причина может быть не в сорте, а в среде или уходе."),
        quizItem("Синтез", "С какими предметами связана тема клубники?", "С биологией, химией почвы, экологией, кулинарией и сельским хозяйством.", "Так тема становится не отдельным фактом, а узлом нескольких областей знания.")
      ]
    }
  }),
  createTopicProfile({
    title: "алгебра",
    aliases: ["algebra", "алгебра", "equations", "уравнения"],
    definition: "Алгебра изучает, как неизвестные величины, выражения и уравнения связаны между собой.",
    essentials: ["переменная", "выражение", "уравнение", "функция"],
    process: "составить выражение, упростить его, решить уравнение и проверить ответ подстановкой",
    example: "нахождение неизвестной цены, скорости или количества через уравнение",
    application: "в расчетах, программировании, физике, экономике и анализе данных",
    commonMistake: "переносить члены уравнения без изменения знака или делить на выражение, которое может быть равно нулю",
    comparison: "арифметикой, где обычно работают с известными числами",
    variables: "выбор переменной, область допустимых значений и порядок преобразований",
    evidence: "правильность решения подтверждается подстановкой и сохранением равносильности преобразований",
    model: "уравнение или система уравнений, описывающая связь величин",
    advancedIssue: "потеря решений, лишние корни и ограничения области определения",
    experiment: "смоделировать реальную задачу формулой, решить ее и сравнить результат с исходными условиями",
    ethics: "алгебраические модели могут упрощать реальность, поэтому важно помнить об ограничениях данных"
  }),
  createTopicProfile({
    title: "геометрия",
    aliases: ["geometry", "геометрия", "triangles", "треугольники", "площадь", "периметр"],
    definition: "Геометрия изучает формы, размеры, расположение фигур и отношения между точками, линиями и поверхностями.",
    essentials: ["точка", "прямая", "угол", "площадь", "доказательство"],
    process: "распознать фигуру, отметить известные величины, выбрать теорему и логически вывести результат",
    example: "расчет площади комнаты, высоты здания по тени или расстояния по карте",
    application: "в архитектуре, инженерии, дизайне, навигации и компьютерной графике",
    commonMistake: "подставлять формулы без проверки условий, например применять теорему Пифагора не к прямоугольному треугольнику",
    comparison: "алгеброй, где главную роль играют символические преобразования",
    variables: "форма фигуры, углы, длины сторон, масштаб и выбранная система координат",
    evidence: "доказательство строится на аксиомах, теоремах и корректных логических шагах",
    model: "чертеж, координатная модель или система геометрических ограничений",
    advancedIssue: "связь между евклидовой и неевклидовой геометрией, а также роль аксиом",
    experiment: "построить фигуру, изменить один параметр и проследить, какие свойства сохраняются",
    ethics: "геометрические модели в проектировании должны учитывать безопасность, материалы и реальные допуски"
  }),
  createTopicProfile({
    title: "математический анализ",
    aliases: ["calculus", "матанализ", "математический анализ", "derivative", "integral", "производная", "интеграл"],
    definition: "Математический анализ изучает изменение величин, пределы, производные и интегралы.",
    essentials: ["предел", "производная", "интеграл", "непрерывность"],
    process: "описать функцию, понять ее поведение около точки, найти скорость изменения или накопленную величину",
    example: "скорость автомобиля как производная пути по времени или площадь под графиком как интеграл",
    application: "в физике, экономике, машинном обучении, инженерии и статистике",
    commonMistake: "механически применять правила дифференцирования без понимания области определения и смысла результата",
    comparison: "алгеброй, которая чаще работает с преобразованием выражений без анализа непрерывного изменения",
    variables: "поведение функции, пределы, гладкость, масштаб изменения и граничные условия",
    evidence: "выводы подтверждаются определениями предела, теоремами и проверкой условий применимости",
    model: "функция, дифференциальное уравнение или интегральная модель процесса",
    advancedIssue: "строгость пределов, сходимость рядов и связь локального поведения с глобальным",
    experiment: "построить график функции, менять параметр и наблюдать производную или интеграл",
    ethics: "модели непрерывного изменения могут быть убедительными, но опасны при неверных предположениях"
  }),
  createTopicProfile({
    title: "физика",
    aliases: ["physics", "физика", "newton", "ньютон", "механика", "mechanics", "force", "сила"],
    definition: "Физика изучает материю, энергию, движение и законы, по которым взаимодействуют объекты.",
    essentials: ["сила", "энергия", "масса", "скорость", "закон сохранения"],
    process: "выделить систему, определить силы или энергии, выбрать закон и проверить единицы измерения",
    example: "падение тела, движение автомобиля, нагрев воды или работа электрической цепи",
    application: "в инженерии, медицине, транспорте, энергетике и технологиях",
    commonMistake: "путать массу и вес или использовать формулу без учета условий задачи",
    comparison: "химией, которая больше фокусируется на составе и превращениях веществ",
    variables: "масса, сила, энергия, время, расстояние, среда и начальные условия",
    evidence: "физические идеи проверяются измерениями, экспериментами и предсказательной силой модели",
    model: "схема сил, уравнение движения, энергетический баланс или полевая модель",
    advancedIssue: "границы применимости классических законов при больших скоростях, малых масштабах или сложных системах",
    experiment: "измерить зависимость движения от силы или массы и сравнить данные с моделью",
    ethics: "физические технологии дают мощные инструменты, поэтому важны безопасность и ответственность применения"
  }),
  createTopicProfile({
    title: "электричество",
    aliases: ["electricity", "электричество", "electric circuits", "цепи", "ток", "напряжение", "current", "voltage"],
    definition: "Электричество связано с движением и взаимодействием электрических зарядов.",
    essentials: ["заряд", "ток", "напряжение", "сопротивление", "мощность"],
    process: "определить элементы цепи, направление тока, напряжения на участках и применить закон Ома или правила Кирхгофа",
    example: "фонарик, зарядное устройство, домашняя проводка или простая цепь с лампочкой",
    application: "в электронике, энергетике, связи, бытовых устройствах и робототехнике",
    commonMistake: "думать, что ток расходуется в цепи, хотя энергия передается нагрузке",
    comparison: "магнетизмом, который связан с движущимися зарядами и магнитными полями",
    variables: "напряжение, сопротивление, сила тока, схема соединения и мощность нагрузки",
    evidence: "измерения мультиметром и расчеты по законам цепей должны согласовываться",
    model: "электрическая схема с источниками, резисторами, узлами и ветвями",
    advancedIssue: "переход от постоянного тока к переменному, импеданс и поведение цепей во времени",
    experiment: "собрать цепь с разными резисторами и измерить, как меняется ток",
    ethics: "работа с электричеством требует строгой безопасности и понимания рисков"
  }),
  createTopicProfile({
    title: "химия",
    aliases: ["chemistry", "химия", "chemical reactions", "реакции", "molecule", "молекулы"],
    definition: "Химия изучает вещества, их строение, свойства и превращения.",
    essentials: ["атом", "молекула", "реакция", "связь", "раствор"],
    process: "определить реагенты, продукты, тип реакции, условия и баланс уравнения",
    example: "ржавление железа, горение, нейтрализация кислоты или растворение соли",
    application: "в медицине, материалах, энергетике, пищевой промышленности и экологии",
    commonMistake: "путать физическое изменение с химической реакцией или не балансировать уравнение",
    comparison: "физикой, которая чаще описывает общие законы движения и энергии",
    variables: "температура, концентрация, давление, катализатор и природа реагентов",
    evidence: "изменение цвета, газ, осадок, тепло и анализ состава могут подтверждать реакцию",
    model: "уравнение реакции, электронная схема или модель столкновений частиц",
    advancedIssue: "механизмы реакций, равновесие и связь микроструктуры со свойствами вещества",
    experiment: "изменить концентрацию или температуру и измерить скорость реакции",
    ethics: "химические знания требуют ответственного обращения с веществами и отходами"
  }),
  createTopicProfile({
    title: "периодическая таблица",
    aliases: ["periodic table", "таблица менделеева", "периодическая таблица", "elements", "элементы"],
    definition: "Периодическая таблица упорядочивает химические элементы по строению атомов и повторяющимся свойствам.",
    essentials: ["атомный номер", "период", "группа", "валентные электроны", "металлы"],
    process: "найти элемент, определить группу и период, затем предсказать свойства по положению",
    example: "щелочные металлы похожи по реакционной способности, потому что имеют один валентный электрон",
    application: "в химических расчетах, выборе материалов, анализе реакций и обучении строению атома",
    commonMistake: "считать атомную массу главным принципом порядка, хотя современная таблица основана на атомном номере",
    comparison: "простым списком элементов, который не показывает периодические закономерности",
    variables: "заряд ядра, электронная конфигурация, радиус атома и электроотрицательность",
    evidence: "свойства элементов повторяются по группам и меняются закономерно по периодам",
    model: "табличная модель электронной структуры и химического поведения элементов",
    advancedIssue: "исключения в электронных конфигурациях и поведение переходных металлов",
    experiment: "сравнить свойства элементов одной группы и объяснить сходство через валентные электроны",
    ethics: "добыча и использование элементов связаны с экологией, редкостью ресурсов и безопасностью"
  }),
  createTopicProfile({
    title: "биология",
    aliases: ["biology", "биология", "living organisms", "организмы"],
    definition: "Биология изучает живые организмы, их строение, функции, развитие и взаимодействие со средой.",
    essentials: ["клетка", "ДНК", "обмен веществ", "эволюция", "экосистема"],
    process: "рассмотреть уровень организации: молекулы, клетки, органы, организм, популяцию и экосистему",
    example: "рост растения, работа иммунитета, наследование признака или пищевые цепи",
    application: "в медицине, сельском хозяйстве, экологии, биотехнологиях и охране природы",
    commonMistake: "объяснять живые системы одной причиной, игнорируя уровни организации и обратные связи",
    comparison: "химией, которая изучает вещества, но не всегда целые живые системы",
    variables: "генетика, среда, энергия, взаимодействия организмов и время",
    evidence: "наблюдения, эксперименты, микроскопия, генетические данные и сравнительный анализ",
    model: "схема жизненного процесса, сеть взаимодействий или эволюционная модель",
    advancedIssue: "сложность причинности в живых системах и связь генов, среды и поведения",
    experiment: "изменить один фактор среды и наблюдать реакцию организма или популяции",
    ethics: "биологические знания связаны с медициной, генетикой, животными и экосистемами, поэтому важны границы вмешательства"
  }),
  createTopicProfile({
    title: "клетка",
    aliases: ["cell", "cells", "cell biology", "клетка", "клетки", "клеточная биология"],
    definition: "Клетка - базовая структурная и функциональная единица живых организмов.",
    essentials: ["мембрана", "цитоплазма", "ядро", "митохондрия", "рибосома"],
    process: "клетка получает вещества, преобразует энергию, синтезирует молекулы и регулирует обмен с внешней средой",
    example: "нейрон передает сигнал, мышечная клетка сокращается, а растительная клетка поддерживает форму вакуолью",
    application: "в медицине, генетике, микробиологии, биотехнологии и изучении болезней",
    commonMistake: "представлять клетку как мешок с органоидами, а не как регулируемую динамическую систему",
    comparison: "организмом, который состоит из множества взаимодействующих клеток",
    variables: "тип клетки, органоиды, сигналы, энергия, мембранный транспорт и гены",
    evidence: "микроскопия, окрашивание, молекулярные маркеры и эксперименты с культурами клеток",
    model: "схема органоидов, мембранного транспорта или клеточного цикла",
    advancedIssue: "регуляция экспрессии генов, клеточная специализация и нарушение контроля деления",
    experiment: "сравнить клетки разных тканей и связать форму с функцией",
    ethics: "исследования клеток связаны со стволовыми клетками, медицинскими вмешательствами и биоэтикой"
  }),
  createTopicProfile({
    title: "генетика",
    aliases: ["genetics", "генетика", "dna", "днк", "genes", "гены", "heredity", "наследственность"],
    definition: "Генетика изучает наследственность, изменчивость и передачу информации через ДНК.",
    essentials: ["ДНК", "ген", "аллель", "хромосома", "мутация"],
    process: "информация кодируется в ДНК, копируется, передается потомкам и влияет на признаки через работу генов",
    example: "наследование группы крови, цвета семян у гороха или генетическая диагностика",
    application: "в медицине, селекции, криминалистике, биотехнологиях и изучении эволюции",
    commonMistake: "думать, что один ген всегда полностью определяет сложный признак",
    comparison: "эволюцией, которая рассматривает изменение наследственных признаков в популяциях со временем",
    variables: "аллели, среда, доминантность, мутации, рекомбинация и взаимодействие генов",
    evidence: "родословные, скрещивания, секвенирование ДНК и статистика наследования",
    model: "решетка Пеннета, генетическая карта или модель экспрессии генов",
    advancedIssue: "эпигенетика, полигенные признаки и редактирование генома",
    experiment: "смоделировать скрещивание и сравнить ожидаемые доли признаков с наблюдаемыми",
    ethics: "генетические данные требуют приватности, справедливости и осторожного обращения с редактированием генома"
  }),
  createTopicProfile({
    title: "эволюция",
    aliases: ["evolution", "эволюция", "natural selection", "естественный отбор", "darwin", "дарвин"],
    definition: "Эволюция описывает изменение наследственных признаков популяций во времени.",
    essentials: ["наследственность", "изменчивость", "естественный отбор", "адаптация", "популяция"],
    process: "вариации признаков наследуются, среда влияет на выживание и размножение, а частоты признаков меняются",
    example: "устойчивость бактерий к антибиотикам или форма клювов у птиц на разных островах",
    application: "в медицине, сельском хозяйстве, охране видов и понимании происхождения биоразнообразия",
    commonMistake: "думать, что отдельный организм эволюционирует намеренно ради нужной цели",
    comparison: "индивидуальным развитием организма, которое происходит в течение жизни одной особи",
    variables: "мутации, отбор, дрейф генов, миграция, размер популяции и давление среды",
    evidence: "ископаемые, сравнительная анатомия, генетика, биогеография и наблюдаемая адаптация",
    model: "популяционная модель изменения частот аллелей",
    advancedIssue: "баланс естественного отбора, генетического дрейфа и исторических ограничений",
    experiment: "наблюдать изменение частот признаков в модельной популяции при разных условиях отбора",
    ethics: "эволюционные идеи нельзя использовать для оправдания социальных иерархий или дискриминации"
  }),
  createTopicProfile({
    title: "экология",
    aliases: ["ecology", "экология", "ecosystem", "экосистема", "food chain", "пищевая цепь"],
    definition: "Экология изучает взаимодействия организмов между собой и со средой.",
    essentials: ["экосистема", "популяция", "ниша", "пищевая цепь", "биоразнообразие"],
    process: "энергия проходит через пищевые сети, вещества циркулируют, а популяции реагируют на условия и друг друга",
    example: "отношения хищника и жертвы, опыление растений или восстановление леса после пожара",
    application: "в охране природы, сельском хозяйстве, климатической политике и управлении ресурсами",
    commonMistake: "рассматривать вид отдельно от сети связей, ресурсов и условий среды",
    comparison: "биологией организма, которая фокусируется на отдельном живом существе",
    variables: "ресурсы, климат, численность популяций, конкуренция, хищничество и загрязнение",
    evidence: "полевые наблюдения, эксперименты, спутниковые данные и модели популяций",
    model: "пищевая сеть, круговорот вещества или модель роста популяции",
    advancedIssue: "устойчивость экосистем, каскадные эффекты и восстановление после нарушений",
    experiment: "изменить доступность ресурса в модели и проследить реакцию разных видов",
    ethics: "экологические решения затрагивают людей, виды, территории и будущие поколения"
  }),
  createTopicProfile({
    title: "анатомия человека",
    aliases: ["anatomy", "human anatomy", "анатомия", "анатомия человека", "body systems", "органы"],
    definition: "Анатомия человека изучает строение тела, органов и систем органов.",
    essentials: ["орган", "ткань", "система органов", "скелет", "нервы"],
    process: "рассмотреть структуру, ее функцию, связь с другими системами и последствия нарушения",
    example: "сердце перекачивает кровь, легкие обеспечивают газообмен, а мышцы создают движение",
    application: "в медицине, спорте, первой помощи, биологии и понимании здоровья",
    commonMistake: "учить органы изолированно, не связывая их с функциями и системами",
    comparison: "физиологией, которая больше объясняет, как органы работают",
    variables: "строение ткани, кровоснабжение, нервная регуляция, нагрузка и возраст",
    evidence: "анатомические препараты, визуализация, микроскопия и клинические наблюдения",
    model: "схема системы органов или трехмерная модель тела",
    advancedIssue: "вариативность строения людей и связь анатомии с патологией",
    experiment: "сравнить строение органа с его функцией и предсказать последствия повреждения",
    ethics: "изучение тела требует уважения, медицинской конфиденциальности и корректной работы с данными"
  }),
  createTopicProfile({
    title: "история",
    aliases: ["history", "история", "historical", "исторический"],
    definition: "История изучает прошлое людей, обществ, государств и культур через источники и интерпретации.",
    essentials: ["источник", "причина", "последствие", "контекст", "хронология"],
    process: "определить период, участников, причины, ход событий, последствия и надежность источников",
    example: "анализ революции, войны, реформы или культурного движения",
    application: "в гражданском мышлении, политике, культуре, образовании и понимании современности",
    commonMistake: "объяснять событие одной причиной или смотреть на прошлое только современными оценками",
    comparison: "хронологией, которая перечисляет даты, но не объясняет связи и контекст",
    variables: "экономика, идеи, лидеры, институты, технологии, география и случайные события",
    evidence: "письменные источники, археология, статистика, свидетельства и сравнение версий",
    model: "причинно-следственная карта события или периодизация",
    advancedIssue: "спор интерпретаций, предвзятость источников и роль структуры против личности",
    experiment: "сравнить два источника об одном событии и найти различия в перспективе",
    ethics: "исторические интерпретации влияют на память, идентичность и политические решения"
  }),
  createTopicProfile({
    title: "Вторая мировая война",
    aliases: ["world war 2", "world war ii", "ww2", "wwii", "вторая мировая", "вторая мировая война"],
    definition: "Вторая мировая война была глобальным конфликтом 1939-1945 годов, затронувшим большинство крупных держав.",
    essentials: ["оси", "союзники", "тотальная война", "Холокост", "капитуляция"],
    process: "изучить причины, ключевые фронты, переломные события, тыл, последствия и источники",
    example: "нападение Германии на Польшу, битва за Британию, Сталинград, высадка в Нормандии и война на Тихом океане",
    application: "для понимания международных отношений, прав человека, памяти о войне и устройства послевоенного мира",
    commonMistake: "сводить войну к одной стране или одному фронту, игнорируя глобальный масштаб",
    comparison: "Первой мировой войной, после которой остались нерешенные политические и экономические напряжения",
    variables: "идеологии, экономика, технологии, союзы, ресурсы, командование и гражданское население",
    evidence: "документы, карты, дневники, фото, статистика потерь и международные договоры",
    model: "хронология фронтов, карта союзов и причинно-следственная схема",
    advancedIssue: "споры о причинах, ответственности, памяти, коллаборации и цене победы",
    experiment: "сравнить карты войны в разные годы и объяснить, почему менялась инициатива",
    ethics: "тема требует точности и уважения к жертвам, особенно при обсуждении геноцида и военных преступлений"
  }),
  createTopicProfile({
    title: "география",
    aliases: ["geography", "география", "map", "карта", "countries", "страны"],
    definition: "География изучает Землю, территории, природные условия, население и связи между местами.",
    essentials: ["карта", "масштаб", "климат", "рельеф", "население"],
    process: "определить положение места, природные условия, ресурсы, население и связи с другими регионами",
    example: "объяснение климата пустыни, размещения городов или торговых путей",
    application: "в планировании городов, логистике, экологии, экономике и международных отношениях",
    commonMistake: "учить названия мест без объяснения, почему они расположены и развиваются именно так",
    comparison: "геологией, которая глубже изучает строение и историю земной коры",
    variables: "широта, высота, рельеф, вода, ресурсы, транспорт и человеческая деятельность",
    evidence: "карты, спутниковые снимки, климатические данные, переписи и полевые наблюдения",
    model: "карта слоев, региональная схема или пространственная модель",
    advancedIssue: "взаимодействие природных и социальных факторов в развитии территорий",
    experiment: "сравнить две территории по картам и объяснить различия в климате или населении",
    ethics: "географические решения связаны с доступом к ресурсам, границами и влиянием на сообщества"
  }),
  createTopicProfile({
    title: "изменение климата",
    aliases: ["climate change", "global warming", "изменение климата", "глобальное потепление", "климат"],
    definition: "Изменение климата означает долгосрочные изменения температуры, осадков и экстремальных явлений, усиленные выбросами парниковых газов.",
    essentials: ["парниковые газы", "CO2", "температура", "ледники", "адаптация"],
    process: "выбросы усиливают парниковый эффект, меняют энергетический баланс Земли и влияют на океаны, погоду и экосистемы",
    example: "рост средней температуры, таяние ледников, волны жары и изменение режима осадков",
    application: "в энергетике, городском планировании, сельском хозяйстве, экологии и политике",
    commonMistake: "путать отдельную погоду за день с долгосрочной климатической тенденцией",
    comparison: "погодой, которая описывает краткосрочное состояние атмосферы",
    variables: "выбросы, альбедо, океаны, облачность, землепользование и обратные связи",
    evidence: "температурные ряды, ледяные керны, спутники, уровень моря и климатические модели",
    model: "климатическая модель энергетического баланса и сценариев выбросов",
    advancedIssue: "неопределенности моделей, климатическая чувствительность и справедливость перехода",
    experiment: "сравнить графики CO2 и температуры за разные периоды и оценить тренды",
    ethics: "решения о климате затрагивают поколения, страны с разной ответственностью и уязвимые сообщества"
  }),
  createTopicProfile({
    title: "программирование",
    aliases: ["programming", "coding", "программирование", "кодинг", "code"],
    definition: "Программирование - это создание инструкций, которые компьютер выполняет для решения задач.",
    essentials: ["переменная", "условие", "цикл", "функция", "структура данных"],
    process: "понять задачу, разбить ее на шаги, написать код, проверить ошибки и улучшить решение",
    example: "калькулятор, игра, веб-форма, бот или обработка таблицы данных",
    application: "в веб-разработке, автоматизации, анализе данных, играх, робототехнике и бизнесе",
    commonMistake: "писать код сразу, не уточнив входные данные, результат и крайние случаи",
    comparison: "алгоритмами, которые описывают логику решения независимо от языка",
    variables: "входные данные, состояние программы, сложность алгоритма, ошибки и пользовательские сценарии",
    evidence: "тесты, запуск программы, чтение логов и проверка ожидаемого результата",
    model: "алгоритм, блок-схема, архитектура модулей или модель данных",
    advancedIssue: "масштабируемость, сопровождение, безопасность и компромисс между простотой и гибкостью",
    experiment: "реализовать одну задачу двумя способами и сравнить читаемость, скорость и надежность",
    ethics: "программы влияют на людей, данные и решения, поэтому важны приватность и доступность"
  }),
  createTopicProfile({
    title: "Python",
    aliases: ["python", "питон", "пайсон", "python programming"],
    definition: "Python - язык программирования с понятным синтаксисом, который часто используют для автоматизации, веба, данных и AI.",
    essentials: ["переменные", "списки", "словари", "функции", "модули"],
    process: "описать данные, написать функции, использовать библиотеки, обработать ошибки и проверить результат тестами",
    example: "скрипт для чтения CSV, веб-приложение, анализ данных или бот",
    application: "в data science, backend-разработке, автоматизации, образовании и машинном обучении",
    commonMistake: "путать изменяемые объекты, области видимости или использовать глобальные переменные без нужды",
    comparison: "JavaScript, который чаще выполняется в браузере и тесно связан с интерфейсами",
    variables: "типы данных, зависимости, версия Python, окружение и структура проекта",
    evidence: "работающие тесты, понятный вывод, отсутствие исключений и читаемый код",
    model: "скрипт, пакет, pipeline данных или API-сервис",
    advancedIssue: "асинхронность, производительность, типизация и управление зависимостями",
    experiment: "написать функцию, покрыть ее тестами и проверить поведение на крайних случаях",
    ethics: "автоматизация на Python может обрабатывать личные данные, поэтому важны безопасность и согласие"
  }),
  createTopicProfile({
    title: "JavaScript",
    aliases: ["javascript", "js", "джаваскрипт", "java script"],
    definition: "JavaScript - язык, который оживляет веб-страницы и также используется на сервере через Node.js.",
    essentials: ["DOM", "событие", "функция", "объект", "Promise"],
    process: "найти элементы страницы, обработать события, изменить состояние и обновить интерфейс",
    example: "интерактивная форма, слайдер, игра в браузере или запрос данных с API",
    application: "в frontend-разработке, Node.js, мобильных приложениях, инструментах и интерактивных сайтах",
    commonMistake: "путать асинхронный код с синхронным или изменять DOM без контроля состояния",
    comparison: "Python, который чаще используют для скриптов, данных и backend-задач",
    variables: "состояние интерфейса, события пользователя, асинхронные запросы, типы и область видимости",
    evidence: "работа UI, тесты, отсутствие ошибок в консоли и корректное состояние DOM",
    model: "компонент, обработчик событий, состояние приложения или цепочка Promise",
    advancedIssue: "замыкания, event loop, сборка проекта и управление состоянием",
    experiment: "создать компонент, вызвать несколько событий и проверить, что интерфейс обновляется правильно",
    ethics: "клиентский код должен уважать приватность, доступность и безопасность пользователя"
  }),
  createTopicProfile({
    title: "веб-разработка",
    aliases: ["web development", "web dev", "веб разработка", "веб-разработка", "html css", "frontend"],
    definition: "Веб-разработка создает сайты и приложения, которые работают в браузере и взаимодействуют с серверами.",
    essentials: ["HTML", "CSS", "JavaScript", "HTTP", "адаптивность"],
    process: "собрать структуру страницы, оформить ее стилями, добавить поведение и проверить на разных устройствах",
    example: "личный сайт, интернет-магазин, dashboard или интерактивный учебный инструмент",
    application: "в бизнесе, образовании, медиа, сервисах, внутренних инструментах и продуктах",
    commonMistake: "делать красивую страницу без проверки доступности, мобильной версии и реальных пользовательских сценариев",
    comparison: "дизайном интерфейсов, который определяет опыт пользователя, но не всегда реализует код",
    variables: "размер экрана, сеть, браузер, состояние данных, доступность и производительность",
    evidence: "визуальная проверка, Lighthouse, тесты, аналитика и обратная связь пользователей",
    model: "страница, компонентная система, API-контракт или поток пользовательского действия",
    advancedIssue: "производительность, безопасность, состояние приложения и согласованность frontend/backend",
    experiment: "проверить одну страницу на desktop и mobile, затем исправить переполнения и ошибки доступности",
    ethics: "веб-продукты должны быть доступными, честными и бережными к данным пользователя"
  }),
  createTopicProfile({
    title: "искусственный интеллект",
    aliases: ["artificial intelligence", "ai", "искусственный интеллект", "ии", "нейросети", "neural networks"],
    definition: "Искусственный интеллект создает системы, которые выполняют задачи, обычно требующие человеческого мышления.",
    essentials: ["модель", "данные", "обучение", "вывод", "оценка"],
    process: "собрать данные, обучить модель, проверить качество, встроить в задачу и отслеживать ошибки",
    example: "распознавание изображений, чат-бот, рекомендательная система или анализ текста",
    application: "в медицине, образовании, поиске, робототехнике, бизнесе и творческих инструментах",
    commonMistake: "считать, что AI понимает задачу как человек, хотя он опирается на данные и вероятностные закономерности",
    comparison: "обычным программированием, где правила часто задаются явно человеком",
    variables: "данные, архитектура модели, метрики, смещения, контекст применения и человеческий контроль",
    evidence: "качество модели проверяется тестовыми данными, метриками, ошибками и поведением в реальных сценариях",
    model: "pipeline данных, модель машинного обучения или система принятия решений",
    advancedIssue: "объяснимость, смещения, надежность, безопасность и ответственность за решения",
    experiment: "сравнить ответы модели на разных примерах и классифицировать типы ошибок",
    ethics: "AI может влиять на права, работу, приватность и доступ к возможностям, поэтому нужен контроль"
  }),
  createTopicProfile({
    title: "машинное обучение",
    aliases: ["machine learning", "ml", "машинное обучение", "машинное обучения"],
    definition: "Машинное обучение позволяет моделям находить закономерности в данных и делать предсказания.",
    essentials: ["признак", "датасет", "обучение", "валидация", "переобучение"],
    process: "подготовить данные, выбрать модель, обучить ее, оценить на тесте и улучшить по ошибкам",
    example: "предсказание цены дома, классификация писем или рекомендация фильмов",
    application: "в аналитике, поиске, медицине, финансах, производстве и персонализации",
    commonMistake: "оценивать модель на тех же данных, на которых она обучалась",
    comparison: "статистикой, с которой ML разделяет методы, но чаще фокусируется на предсказании и автоматизации",
    variables: "качество данных, признаки, гиперпараметры, метрика, размер выборки и распределение данных",
    evidence: "результат проверяется на отложенной выборке, кросс-валидации и анализе ошибок",
    model: "модель классификации, регрессии, кластеризации или нейронная сеть",
    advancedIssue: "переобучение, утечка данных, смещение выборки и переносимость модели",
    experiment: "обучить две модели на одном датасете и сравнить метрики и ошибки",
    ethics: "ML-модели могут усиливать смещения данных и принимать непрозрачные решения"
  }),
  createTopicProfile({
    title: "базы данных",
    aliases: ["database", "databases", "sql", "база данных", "базы данных", "db"],
    definition: "База данных хранит организованные данные и позволяет надежно искать, изменять и связывать их.",
    essentials: ["таблица", "запрос", "ключ", "индекс", "транзакция"],
    process: "спроектировать схему, определить связи, записать данные, выполнить запросы и обеспечить целостность",
    example: "каталог товаров, пользователи приложения, заказы или журнал событий",
    application: "почти во всех приложениях: от банков и магазинов до аналитики и игр",
    commonMistake: "хранить повторяющиеся данные без понимания связей и ограничений целостности",
    comparison: "электронной таблицей, которая проще, но хуже подходит для сложных связей и многопользовательской работы",
    variables: "структура данных, объем, частота запросов, индексы, транзакции и права доступа",
    evidence: "корректность проверяется запросами, ограничениями, тестами миграций и планами выполнения",
    model: "ER-диаграмма, реляционная схема или документная модель",
    advancedIssue: "нормализация, индексация, транзакционная изоляция и масштабирование",
    experiment: "создать таблицы, добавить индекс и сравнить скорость запроса до и после",
    ethics: "данные пользователей требуют защиты, минимизации сбора и прозрачных правил доступа"
  }),
  createTopicProfile({
    title: "кибербезопасность",
    aliases: ["cybersecurity", "security", "кибербезопасность", "информационная безопасность", "хакеры"],
    definition: "Кибербезопасность защищает системы, данные и пользователей от несанкционированного доступа и атак.",
    essentials: ["угроза", "уязвимость", "аутентификация", "шифрование", "риск"],
    process: "найти активы, оценить угрозы, закрыть уязвимости, настроить контроль и реагировать на инциденты",
    example: "защита паролей, HTTPS, двухфакторная аутентификация или проверка фишинга",
    application: "в бизнесе, государстве, личных устройствах, облаках и разработке ПО",
    commonMistake: "думать, что безопасность - это только антивирус, а не процесс управления рисками",
    comparison: "разработкой ПО, где безопасность должна быть частью проектирования, а не финальной проверкой",
    variables: "ценность данных, поверхность атаки, права доступа, обновления и человеческий фактор",
    evidence: "аудит, логи, тесты проникновения, моделирование угроз и мониторинг событий",
    model: "модель угроз, матрица рисков или схема контроля доступа",
    advancedIssue: "баланс удобства и защиты, supply chain атаки и zero trust подход",
    experiment: "проанализировать простую систему и составить список вероятных угроз и мер защиты",
    ethics: "исследование безопасности должно быть законным, согласованным и не вредить чужим системам"
  }),
  createTopicProfile({
    title: "экономика",
    aliases: ["economics", "economy", "экономика", "рынок", "inflation", "инфляция"],
    definition: "Экономика изучает, как люди и общества распределяют ограниченные ресурсы.",
    essentials: ["спрос", "предложение", "цена", "стимулы", "издержки"],
    process: "определить участников, ресурсы, стимулы, ограничения и последствия выбора",
    example: "изменение цены на товар, инфляция, безработица или выбор бюджета",
    application: "в бизнесе, государственной политике, личных финансах и международной торговле",
    commonMistake: "думать только о деньгах, хотя экономика шире и изучает выбор при ограничениях",
    comparison: "бухгалтерией, которая фиксирует операции, а не объясняет поведение рынков и стимулы",
    variables: "доход, цена, ожидания, конкуренция, налоги, проценты и внешние эффекты",
    evidence: "статистика, модели, эксперименты, исторические сравнения и поведение рынков",
    model: "модель спроса и предложения, бюджетное ограничение или макроэкономическая схема",
    advancedIssue: "провалы рынка, неравенство, ожидания и ограничения экономических моделей",
    experiment: "изменить цену или налог в модели и проследить реакцию спроса и предложения",
    ethics: "экономические решения распределяют выгоды и потери между людьми"
  }),
  createTopicProfile({
    title: "психология",
    aliases: ["psychology", "психология", "behavior", "поведение", "memory", "память"],
    definition: "Психология изучает поведение, мышление, эмоции и психические процессы.",
    essentials: ["восприятие", "память", "мотивация", "эмоции", "поведение"],
    process: "сформулировать вопрос, наблюдать поведение, собрать данные и осторожно интерпретировать причины",
    example: "изучение памяти, стресса, привычек, принятия решений или общения",
    application: "в образовании, терапии, UX, управлении, спорте и личном развитии",
    commonMistake: "делать вывод о человеке по одному поведению без контекста и данных",
    comparison: "нейробиологией, которая глубже изучает мозговые механизмы",
    variables: "ситуация, опыт, биология, культура, мотивация и социальная среда",
    evidence: "эксперименты, опросники, наблюдения, клинические данные и статистика",
    model: "когнитивная модель, поведенческая схема или модель мотивации",
    advancedIssue: "репликация исследований, измерение скрытых процессов и влияние культуры",
    experiment: "проверить гипотезу о памяти или внимании на небольшой выборке с контролем условий",
    ethics: "психологические исследования требуют согласия, конфиденциальности и защиты участников"
  }),
  createTopicProfile({
    title: "философия",
    aliases: ["philosophy", "философия", "ethics", "logic", "этика", "логика"],
    definition: "Философия исследует фундаментальные вопросы о знании, реальности, ценностях и мышлении.",
    essentials: ["аргумент", "понятие", "истина", "этика", "логика"],
    process: "уточнить понятия, сформулировать тезис, разобрать аргументы и проверить скрытые предпосылки",
    example: "спор о свободе воли, справедливости, сознании или природе знания",
    application: "в этике технологий, праве, науке, политике и критическом мышлении",
    commonMistake: "считать философию набором мнений, хотя в ней важны аргументы и точность понятий",
    comparison: "наукой, которая чаще проверяет гипотезы эмпирическими методами",
    variables: "определения, логические связи, предпосылки, контрпримеры и ценности",
    evidence: "качество аргумента оценивается логикой, ясностью понятий и силой возражений",
    model: "структура аргумента, мысленный эксперимент или карта позиций",
    advancedIssue: "границы знания, проблема сознания, моральные дилеммы и основания рациональности",
    experiment: "построить аргумент за тезис и затем самый сильный контраргумент",
    ethics: "философские идеи влияют на нормы, права, технологии и общественные решения"
  }),
  createTopicProfile({
    title: "литература",
    aliases: ["literature", "литература", "novel", "poetry", "роман", "поэзия", "shakespeare", "шекспир"],
    definition: "Литература изучает художественные тексты, их язык, образы, идеи и культурный контекст.",
    essentials: ["сюжет", "персонаж", "тема", "образ", "стиль"],
    process: "прочитать текст, выделить конфликт, проследить образы, язык и связь с контекстом",
    example: "анализ романа, стихотворения, пьесы или рассказа",
    application: "в образовании, культуре, письме, критическом чтении и понимании человеческого опыта",
    commonMistake: "пересказывать сюжет вместо анализа того, как текст создает смысл",
    comparison: "историей, которая изучает прошлое напрямую через источники, а литература работает с художественной формой",
    variables: "жанр, повествователь, символы, композиция, эпоха и читательская перспектива",
    evidence: "интерпретация подтверждается деталями текста, цитатами и контекстом",
    model: "карта персонажей, схема конфликта или анализ мотивов",
    advancedIssue: "множественность интерпретаций, авторская позиция и роль читателя",
    experiment: "сравнить две сцены и показать, как меняется персонаж или тема",
    ethics: "литературный анализ требует уважения к культурному контексту и неоднозначности текста"
  }),
  createTopicProfile({
    title: "английская грамматика",
    aliases: ["english grammar", "grammar", "английская грамматика", "грамматика английского", "tenses"],
    definition: "Английская грамматика описывает правила построения фраз, времен, вопросов и связей между словами.",
    essentials: ["время", "подлежащее", "сказуемое", "артикль", "порядок слов"],
    process: "определить смысл, время, субъект действия, структуру предложения и нужную форму слова",
    example: "выбор между Present Simple и Present Continuous или постановка вопроса с do/does",
    application: "в письме, разговоре, экзаменах, чтении и профессиональной коммуникации",
    commonMistake: "переводить структуру дословно с родного языка и нарушать порядок слов",
    comparison: "лексикой, где главная задача - значение слов, а не структура предложения",
    variables: "время действия, завершенность, лицо, число, контекст и тип предложения",
    evidence: "правильность видна по грамматической форме, смыслу и естественности в контексте",
    model: "схема предложения, таблица времен или шаблон вопроса",
    advancedIssue: "аспекты времен, модальность, артикли и различия между формальной и разговорной речью",
    experiment: "взять одно предложение и преобразовать его в вопрос, отрицание и разные времена",
    ethics: "языковое обучение должно поддерживать ясность общения, а не стыдить за ошибки"
  }),
  createTopicProfile({
    title: "астрономия",
    aliases: ["astronomy", "астрономия", "space", "космос", "stars", "звезды", "black holes", "черные дыры"],
    definition: "Астрономия изучает небесные объекты, космос и физические процессы за пределами Земли.",
    essentials: ["звезда", "планета", "галактика", "гравитация", "световой год"],
    process: "наблюдать объект, измерить свет, движение или спектр и объяснить данные физической моделью",
    example: "фазы Луны, движение планет, жизнь звезды или черная дыра",
    application: "в навигации, технологиях наблюдения, понимании Земли и фундаментальной физике",
    commonMistake: "путать астрономию с астрологией или недооценивать масштабы расстояний",
    comparison: "космологией, которая изучает Вселенную как целое и ее развитие",
    variables: "масса, расстояние, светимость, температура, скорость и гравитация",
    evidence: "телескопические наблюдения, спектры, орбиты, радиосигналы и космические миссии",
    model: "орбитальная модель, диаграмма звезды или модель эволюции объекта",
    advancedIssue: "темная материя, темная энергия, формирование галактик и пределы наблюдаемого",
    experiment: "сравнить спектры звезд и сделать вывод о температуре или составе",
    ethics: "космические исследования связаны с ресурсами, загрязнением орбит и международным сотрудничеством"
  }),
  createTopicProfile({
    title: "Солнечная система",
    aliases: ["solar system", "солнечная система", "planets", "планеты", "sun", "солнце"],
    definition: "Солнечная система включает Солнце, планеты, спутники, астероиды, кометы и другие тела, связанные гравитацией.",
    essentials: ["Солнце", "планета", "орбита", "спутник", "астероид"],
    process: "рассмотреть центральную роль Солнца, орбиты тел, различия планет и малые объекты",
    example: "смена сезонов на Земле, фазы Луны, кольца Сатурна или орбиты комет",
    application: "в астрономии, космических миссиях, календарях, навигации и изучении происхождения Земли",
    commonMistake: "думать, что сезоны возникают из-за расстояния до Солнца, а не из-за наклона оси Земли",
    comparison: "галактикой, которая содержит миллиарды звезд и намного больше одной планетной системы",
    variables: "масса, расстояние от Солнца, наклон оси, атмосфера, орбита и состав планеты",
    evidence: "наблюдения, орбитальные расчеты, спектры и данные космических аппаратов",
    model: "масштабная модель орбит или сравнительная таблица планет",
    advancedIssue: "формирование планет, миграция орбит и условия обитаемости",
    experiment: "построить модель расстояний планет в масштабе и сравнить реальные пропорции",
    ethics: "исследование планет связано с защитой космической среды и планетарной защитой"
  })
];

const profileQuestionTemplates = {
  beginner: [
    {
      focus: "Смысл",
      question: (profile) => `Что такое ${profile.title} простыми словами?`,
      explanation: (profile) => profile.definition
    },
    {
      focus: "Термины",
      question: (profile) => `Какие базовые термины нужны для понимания темы "${profile.title}"?`,
      explanation: (profile) => `Начните с понятий: ${joinHuman(profile.essentials)}. Они задают каркас темы.`
    },
    {
      focus: "Процесс",
      question: (profile) => `Как обычно работает или изучается ${profile.title} шаг за шагом?`,
      explanation: (profile) => `Полезная последовательность: ${profile.process}.`
    },
    {
      focus: "Пример",
      question: (profile) => `Какой простой пример показывает идею темы "${profile.title}"?`,
      explanation: (profile) => `Хороший стартовый пример: ${profile.example}.`
    },
    {
      focus: "Практика",
      question: (profile) => `Где ${profile.title} применяется на практике?`,
      explanation: (profile) => `Тема встречается ${profile.application}.`
    },
    {
      focus: "Ошибка",
      question: (profile) => `Какую ошибку новички часто делают в теме "${profile.title}"?`,
      explanation: (profile) => `Частая ловушка: ${profile.commonMistake}.`
    },
    {
      focus: "Сравнение",
      question: (profile) => `Чем ${profile.title} отличается от похожей темы?`,
      explanation: (profile) => `Удобное сравнение - с ${profile.comparison}.`
    },
    {
      focus: "Проверка",
      question: (profile) => `Как понять, что базовое понимание темы "${profile.title}" уже есть?`,
      explanation: (profile) => `Вы можете объяснить ${joinHuman(profile.essentials.slice(0, 3))}, привести пример и не попасть в типичную ошибку.`
    },
    {
      focus: "Причины",
      question: (profile) => `Какие факторы сильнее всего влияют на результат в теме "${profile.title}"?`,
      explanation: (profile) => `Следите за такими переменными: ${profile.variables}.`
    },
    {
      focus: "Данные",
      question: (profile) => `Какие наблюдения или данные помогают изучать ${profile.title}?`,
      explanation: (profile) => profile.evidence
    },
    {
      focus: "Модель",
      question: (profile) => `Какую простую схему можно нарисовать для темы "${profile.title}"?`,
      explanation: (profile) => `Подойдет такая модель: ${profile.model}.`
    },
    {
      focus: "Значение",
      question: (profile) => `Почему тема "${profile.title}" важна за пределами учебника?`,
      explanation: (profile) => `Она важна потому, что применяется ${profile.application} и помогает понимать реальные решения.`
    }
  ],
  intermediate: [
    {
      focus: "Структура",
      question: (profile) => `Из каких ключевых частей состоит тема "${profile.title}"?`,
      explanation: (profile) => `Соберите карту из понятий: ${joinHuman(profile.essentials)}.`
    },
    {
      focus: "Связи",
      question: (profile) => `Как связаны между собой главные идеи темы "${profile.title}"?`,
      explanation: (profile) => `Связь лучше всего видеть через процесс: ${profile.process}.`
    },
    {
      focus: "Переменные",
      question: (profile) => `Какие переменные меняют результат в теме "${profile.title}"?`,
      explanation: (profile) => profile.variables
    },
    {
      focus: "Доказательства",
      question: (profile) => `Какие доказательства или данные подтверждают идеи темы "${profile.title}"?`,
      explanation: (profile) => profile.evidence
    },
    {
      focus: "Сценарий",
      question: (profile) => `Как применить ${profile.title} к реальной задаче?`,
      explanation: (profile) => `Возьмите пример вроде "${profile.example}" и разберите его через ключевые понятия.`
    },
    {
      focus: "Ограничения",
      question: (profile) => `Где упрощенное объяснение темы "${profile.title}" может дать сбой?`,
      explanation: (profile) => `Проверьте условия, переменные и типичную ошибку: ${profile.commonMistake}.`
    },
    {
      focus: "Сравнение",
      question: (profile) => `Как сравнение с ${profile.comparison} помогает лучше понять ${profile.title}?`,
      explanation: (profile) => `Сравнение показывает границы темы и помогает не смешивать похожие идеи.`
    },
    {
      focus: "Мини-проект",
      question: (profile) => `Какой мини-проект закрепит тему "${profile.title}"?`,
      explanation: (profile) => profile.experiment
    },
    {
      focus: "Анализ",
      question: (profile) => `Как объяснить причинно-следственную цепочку в теме "${profile.title}"?`,
      explanation: (profile) => `Начните с факторов: ${profile.variables}, затем покажите, как они меняют результат.`
    },
    {
      focus: "Критерии",
      question: (profile) => `Как оценить качество ответа или решения по теме "${profile.title}"?`,
      explanation: (profile) => `Ответ должен использовать ключевые термины, учитывать ограничения и опираться на данные: ${profile.evidence}.`
    },
    {
      focus: "Контекст",
      question: (profile) => `Почему контекст важен для темы "${profile.title}"?`,
      explanation: (profile) => `Без контекста легко применить правильную идею не к тем условиям.`
    },
    {
      focus: "Перенос",
      question: (profile) => `Как перенести знания по теме "${profile.title}" на новую ситуацию?`,
      explanation: (profile) => `Найдите знакомые элементы, сопоставьте переменные и проверьте, сохраняются ли условия модели.`
    }
  ],
  advanced: [
    {
      focus: "Предпосылки",
      question: (profile) => `Какие скрытые предпосылки есть в теме "${profile.title}"?`,
      explanation: (profile) => `Ищите допущения в модели: ${profile.model}, а затем проверяйте, где они перестают работать.`
    },
    {
      focus: "Крайние случаи",
      question: (profile) => `В каких крайних случаях тема "${profile.title}" становится сложнее, чем кажется?`,
      explanation: (profile) => profile.advancedIssue
    },
    {
      focus: "Формализация",
      question: (profile) => `Как формализовать проблему из темы "${profile.title}"?`,
      explanation: (profile) => `Используйте ${profile.model} и явно задайте переменные: ${profile.variables}.`
    },
    {
      focus: "Метод",
      question: (profile) => `Как спроектировать исследование или проверку по теме "${profile.title}"?`,
      explanation: (profile) => profile.experiment
    },
    {
      focus: "Критика",
      question: (profile) => `Как проверить экспертное утверждение о теме "${profile.title}"?`,
      explanation: (profile) => `Сравните его с данными: ${profile.evidence}, и проверьте, не скрыта ли типичная ошибка.`
    },
    {
      focus: "Ограничения",
      question: (profile) => `Какие ограничения есть у моделей в теме "${profile.title}"?`,
      explanation: (profile) => profile.advancedIssue
    },
    {
      focus: "Система",
      question: (profile) => `Какие системные или этические последствия связаны с темой "${profile.title}"?`,
      explanation: (profile) => profile.ethics
    },
    {
      focus: "Спор",
      question: (profile) => `Как построить сильный контраргумент к популярному тезису о теме "${profile.title}"?`,
      explanation: (profile) => `Найдите слабое допущение, проверьте данные и покажите случай, где объяснение не работает.`
    },
    {
      focus: "Синтез",
      question: (profile) => `Как связать ${profile.title} с соседней областью?`,
      explanation: (profile) => `Начните со сравнения с ${profile.comparison}, а затем перенесите модель на новый контекст.`
    },
    {
      focus: "Диагностика",
      question: (profile) => `Как отличить глубокое понимание темы "${profile.title}" от пересказа?`,
      explanation: (profile) => `Глубокое понимание видно, когда человек объясняет причины, ограничения, данные и крайние случаи.`
    },
    {
      focus: "Изменение условий",
      question: (profile) => `Как изменятся выводы о теме "${profile.title}", если поменять исходные условия?`,
      explanation: (profile) => `Меняйте по одной переменной из списка: ${profile.variables}, и отслеживайте результат.`
    },
    {
      focus: "Будущее",
      question: (profile) => `Какие открытые вопросы или будущие направления есть в теме "${profile.title}"?`,
      explanation: (profile) => profile.advancedIssue
    }
  ]
};

const adaptiveQuestionTemplates = {
  beginner: [
    ["Смысл", (topic) => `Что именно означает "${topic}"?`, () => "Сначала нужно отделить определение темы от примеров, ассоциаций и похожих понятий."],
    ["Границы", (topic) => `Что входит в тему "${topic}", а что уже относится к соседним темам?`, () => "Границы темы помогают не получать слишком расплывчатые ответы."],
    ["Термины", (topic) => `Какие 5 терминов чаще всего нужны для старта в теме "${topic}"?`, () => "Словарь темы лучше собрать до деталей, иначе объяснения будут казаться случайными."],
    ["Пример", (topic) => `Какой реальный пример лучше всего показывает "${topic}"?`, () => "Один конкретный пример быстро проверяет, понята ли главная идея."],
    ["Причина", (topic) => `Почему тема "${topic}" вообще важна?`, () => "Важность темы обычно проявляется через задачи, решения или явления, которые без нее трудно объяснить."],
    ["Ошибка", (topic) => `Какую ошибку новичок может сделать при изучении "${topic}"?`, () => "Частые ошибки показывают, где тема интуитивно обманчива."],
    ["Части", (topic) => `На какие маленькие части удобно разбить "${topic}"?`, () => "Разбиение снижает перегрузку и превращает тему в маршрут обучения."],
    ["Проверка", (topic) => `Как проверить, что базовое понимание "${topic}" уже есть?`, () => "Попробуйте объяснить тему простыми словами, привести пример и ответить на вопрос 'зачем это нужно'."],
    ["Объяснение", (topic) => `Как объяснить "${topic}" человеку без подготовки?`, () => "Хорошее объяснение использует простые слова, один пример и не перегружает деталями."],
    ["Последовательность", (topic) => `Что изучать первым, вторым и третьим в теме "${topic}"?`, () => "Порядок изучения важен: сначала смысл, затем ключевые части, потом применение."],
    ["Источник", (topic) => `Какие источники помогут начать тему "${topic}"?`, () => "Лучше сочетать краткое объяснение, пример и проверочный вопрос, а не полагаться на один формат."],
    ["Связь", (topic) => `С какими уже известными знаниями можно связать "${topic}"?`, () => "Новая тема легче запоминается, когда она прикреплена к знакомым идеям."]
  ],
  intermediate: [
    ["Структура", (topic) => `Какие основные компоненты или этапы есть в теме "${topic}"?`, () => "На среднем уровне важно видеть структуру, а не отдельные факты."],
    ["Связи", (topic) => `Как главные идеи темы "${topic}" связаны причинно-следственно?`, () => "Причинные связи помогают применять знания, а не только пересказывать."],
    ["Сравнение", (topic) => `С какой похожей темой стоит сравнить "${topic}"?`, () => "Сравнение очищает границы и показывает, что делает тему особенной."],
    ["Данные", (topic) => `Какие данные, источники или наблюдения нужны для проверки утверждений о "${topic}"?`, () => "Хороший ответ должен опираться на проверяемые признаки, а не только на звучащую уверенно формулировку."],
    ["Применение", (topic) => `Как применить "${topic}" к практической задаче?`, () => "Практическая задача показывает, какие части темы действительно работают."],
    ["Ограничения", (topic) => `Где обычное объяснение "${topic}" может быть слишком упрощенным?`, () => "Ограничения помогают понять, когда правило перестает быть надежным."],
    ["Сценарий", (topic) => `Что изменится в теме "${topic}", если поменять контекст или условия?`, () => "Изменение условий показывает, какие факторы управляют результатом."],
    ["Проект", (topic) => `Какой мини-проект поможет разобраться в "${topic}"?`, () => "Мини-проект должен включать пример, проверку результата и объяснение ошибок."],
    ["Метрики", (topic) => `По каким признакам можно оценить прогресс в теме "${topic}"?`, () => "Критерии прогресса превращают обучение из ощущения в проверяемый результат."],
    ["Позиции", (topic) => `Какие две разные точки зрения могут существовать вокруг "${topic}"?`, () => "Разные позиции помогают увидеть спорные места и скрытые предпосылки."],
    ["План", (topic) => `Как построить план изучения "${topic}" на одну неделю?`, () => "Хороший план чередует объяснение, практику, проверку и повторение."],
    ["Зависимости", (topic) => `От каких условий сильнее всего зависит понимание "${topic}"?`, () => "Условия показывают, почему один и тот же совет работает не всегда."]
  ],
  advanced: [
    ["Предпосылки", (topic) => `Какие скрытые предпосылки лежат в основе темы "${topic}"?`, () => "Продвинутый анализ начинается с того, что именно считается очевидным, но не доказанным."],
    ["Модель", (topic) => `Как построить модель или схему для анализа "${topic}"?`, () => "Модель должна явно показывать элементы, связи, ограничения и ожидаемый результат."],
    ["Критика", (topic) => `Как проверить сильное утверждение о "${topic}"?`, () => "Проверьте источник, данные, альтернативные объяснения и крайние случаи."],
    ["Крайний случай", (topic) => `В каком крайнем случае объяснение "${topic}" ломается?`, () => "Крайние случаи быстро показывают глубину понимания."],
    ["Метод", (topic) => `Как спроектировать исследование или эксперимент по теме "${topic}"?`, () => "Нужно задать вопрос, переменные, способ измерения и критерий качества ответа."],
    ["Этика", (topic) => `Какие этические или социальные последствия может иметь "${topic}"?`, () => "Даже технические темы часто влияют на людей, ресурсы и решения."],
    ["Синтез", (topic) => `Как связать "${topic}" с другой дисциплиной?`, () => "Связь с соседней областью помогает найти новые методы и увидеть ограничения."],
    ["Будущее", (topic) => `Какие открытые вопросы остаются в теме "${topic}"?`, () => "Открытые вопросы показывают, где знание еще развивается."],
    ["Контраргумент", (topic) => `Какой сильный контраргумент можно построить против популярного тезиса о "${topic}"?`, () => "Контраргумент проверяет, насколько хорошо понятны основания и ограничения тезиса."],
    ["Качество", (topic) => `Как измерить качество объяснения или решения по теме "${topic}"?`, () => "Нужны критерии: точность, проверяемость, применимость и работа с исключениями."],
    ["Новые данные", (topic) => `Как новые данные могут изменить выводы о "${topic}"?`, () => "Продвинутый ответ должен уметь обновляться, когда появляются более сильные доказательства."],
    ["Риски", (topic) => `Какие риски возникают, если применять "${topic}" без понимания контекста?`, () => "Риски обычно появляются там, где модель упрощает людей, данные или реальные условия."]
  ]
};

const profileQuizTemplates = {
  beginner: [
    profileQuizItem("Смысл", (p) => `Что изучает или объясняет тема «${p.title}»?`, (p) => p.definition, () => "Это базовое определение, от него удобно строить остальные ответы."),
    profileQuizItem("Термины", (p) => `Назовите ключевые понятия темы «${p.title}».`, (p) => joinHuman(p.essentials.slice(0, 5)), () => "Эти слова работают как словарь темы и помогают понимать объяснения."),
    profileQuizItem("Процесс", (p) => `Какой основной процесс или порядок действий связан с темой «${p.title}»?`, (p) => p.process, () => "Последовательность помогает не учить тему как набор случайных фактов."),
    profileQuizItem("Пример", (p) => `Какой пример показывает тему «${p.title}» в реальной ситуации?`, (p) => p.example, () => "Пример проверяет, можете ли вы узнать тему вне учебника."),
    profileQuizItem("Применение", (p) => `Где применяется тема «${p.title}»?`, (p) => p.application, () => "Применения показывают, зачем тема нужна на практике."),
    profileQuizItem("Ошибка", (p) => `Какую ошибку часто делают новички в теме «${p.title}»?`, (p) => p.commonMistake, () => "Если вы знаете типичную ошибку, вы быстрее замечаете неправильное понимание."),
    profileQuizItem("Сравнение", (p) => `С чем полезно сравнить тему «${p.title}»?`, (p) => p.comparison, () => "Сравнение помогает увидеть границы темы."),
    profileQuizItem("Факторы", (p) => `Какие факторы влияют на результат в теме «${p.title}»?`, (p) => p.variables, () => "Факторы объясняют, почему один и тот же принцип работает по-разному в разных условиях."),
    profileQuizItem("Доказательства", (p) => `Какие данные помогают проверить утверждения по теме «${p.title}»?`, (p) => p.evidence, () => "Ответ должен опираться на проверяемые признаки, а не только на уверенное звучание."),
    profileQuizItem("Модель", (p) => `Какую схему или модель можно построить для темы «${p.title}»?`, (p) => p.model, () => "Модель связывает элементы темы в понятную структуру."),
    profileQuizItem("Практика", (p) => `Какой маленький проект поможет закрепить «${p.title}»?`, (p) => p.experiment, () => "Практика превращает знание в навык."),
    profileQuizItem("Значение", (p) => `Почему тема «${p.title}» важна?`, (p) => `Потому что она применяется ${p.application}.`, () => "Значение темы лучше видно через реальные задачи.")
  ],
  intermediate: [
    profileQuizItem("Структура", (p) => `Какие элементы образуют основу темы «${p.title}»?`, (p) => joinHuman(p.essentials), () => "На среднем уровне важно видеть структуру, а не отдельные слова."),
    profileQuizItem("Связи", (p) => `Как связать главные идеи темы «${p.title}» в одну цепочку?`, (p) => p.process, () => "Цепочка показывает причинно-следственные связи."),
    profileQuizItem("Переменные", (p) => `Какие переменные нужно учитывать в теме «${p.title}»?`, (p) => p.variables, () => "Переменные помогают объяснять разные результаты."),
    profileQuizItem("Проверка", (p) => `Как проверить правильность ответа по теме «${p.title}»?`, (p) => p.evidence, () => "Так вы отличаете знание от пересказа."),
    profileQuizItem("Сценарий", (p) => `Как применить «${p.title}» к конкретной задаче?`, (p) => p.example, () => "Конкретная задача показывает, какие понятия действительно нужны."),
    profileQuizItem("Ограничение", (p) => `Где простое объяснение темы «${p.title}» может ошибиться?`, (p) => p.commonMistake, () => "Ограничения защищают от слишком грубого понимания."),
    profileQuizItem("Сравнение", (p) => `Какая соседняя тема помогает лучше понять «${p.title}»?`, (p) => p.comparison, () => "Сравнение очищает границы понятий."),
    profileQuizItem("Проект", (p) => `Какой мини-проект проверит понимание темы «${p.title}»?`, (p) => p.experiment, () => "Хороший мини-проект включает действие, наблюдение и вывод."),
    profileQuizItem("Модель", (p) => `Какая модель подходит для анализа темы «${p.title}»?`, (p) => p.model, () => "Модель помогает увидеть связи между частями темы."),
    profileQuizItem("Контекст", (p) => `Почему контекст важен для темы «${p.title}»?`, (p) => `Потому что результат зависит от таких условий: ${p.variables}.`, () => "Без контекста легко применить правильную идею неправильно."),
    profileQuizItem("Аргумент", (p) => `На какие факты опираться в аргументе по теме «${p.title}»?`, (p) => p.evidence, () => "Аргумент становится сильнее, когда опирается на проверяемые данные."),
    profileQuizItem("Ошибки", (p) => `Как заранее избежать типичной ошибки в теме «${p.title}»?`, (p) => `Проверять себя на это: ${p.commonMistake}.`, () => "Это делает обучение более точным.")
  ],
  advanced: [
    profileQuizItem("Предпосылки", (p) => `Какие допущения скрыты в теме «${p.title}»?`, (p) => p.model, () => "Допущения часто спрятаны внутри модели, схемы или метода."),
    profileQuizItem("Крайний случай", (p) => `В каком случае тема «${p.title}» становится сложной?`, (p) => p.advancedIssue, () => "Крайние случаи показывают глубину понимания."),
    profileQuizItem("Формализация", (p) => `Как формализовать задачу по теме «${p.title}»?`, (p) => `Использовать модель: ${p.model}; затем явно задать переменные: ${p.variables}.`, () => "Формализация делает рассуждение проверяемым."),
    profileQuizItem("Исследование", (p) => `Как исследовать тему «${p.title}» на практике?`, (p) => p.experiment, () => "Исследование должно отделять наблюдения от догадок."),
    profileQuizItem("Критика", (p) => `Как проверить экспертное утверждение по теме «${p.title}»?`, (p) => `Сравнить его с такими данными: ${p.evidence}.`, () => "Критика нужна не для спора, а для проверки качества объяснения."),
    profileQuizItem("Этика", (p) => `Какие этические или социальные вопросы связаны с темой «${p.title}»?`, (p) => p.ethics, () => "Продвинутый уровень учитывает последствия применения знаний."),
    profileQuizItem("Синтез", (p) => `С какой соседней областью можно связать «${p.title}»?`, (p) => p.comparison, () => "Связь с соседней областью помогает переносить знания."),
    profileQuizItem("Ограничения", (p) => `Какие ограничения есть у моделей в теме «${p.title}»?`, (p) => p.advancedIssue, () => "Модель полезна только пока соблюдаются её условия."),
    profileQuizItem("Контраргумент", (p) => `Какой тезис по теме «${p.title}» стоит проверить особенно осторожно?`, (p) => p.commonMistake, () => "Частая ошибка часто указывает на слабое место популярного объяснения."),
    profileQuizItem("Качество", (p) => `Как отличить глубокий ответ по теме «${p.title}»?`, (p) => `Он использует ${joinHuman(p.essentials.slice(0, 4))}, учитывает ${p.variables} и опирается на ${p.evidence}.`, () => "Глубокий ответ объясняет связи, а не просто называет факты."),
    profileQuizItem("Будущее", (p) => `Какие открытые вопросы остаются в теме «${p.title}»?`, (p) => p.advancedIssue, () => "Открытые вопросы показывают, где тема развивается."),
    profileQuizItem("Риски", (p) => `Что может пойти не так при применении темы «${p.title}»?`, (p) => p.ethics, () => "Риски помогают применять знания аккуратнее.")
  ]
};

topicProfiles.push(
  createTopicProfile({
    title: "математика",
    aliases: ["математика", "math", "maths", "mathematics"],
    definition: "Математика изучает числа, формы, структуры, зависимости и способы строгого рассуждения.",
    essentials: ["число", "выражение", "уравнение", "функция", "доказательство"],
    process: "понять условие, выбрать модель, выполнить преобразования, проверить результат и объяснить ход решения",
    example: "решение задачи через уравнение, график, формулу или геометрическую схему",
    application: "в науке, технике, программировании, финансах, статистике и повседневных расчетах",
    commonMistake: "механически применять формулу без проверки условий задачи",
    comparison: "логикой и информатикой, где тоже важны правила вывода и структуры",
    variables: "данные задачи, неизвестные величины, ограничения, единицы измерения и выбранная модель",
    evidence: "решение проверяется подстановкой, доказательством, оценкой результата и условиями задачи",
    model: "уравнение, график, таблица, чертеж или система условий",
    advancedIssue: "границы применимости моделей, строгие доказательства и работа с абстракциями",
    experiment: "решить одну задачу разными способами и сравнить, какой путь яснее",
    ethics: "математические модели могут влиять на решения людей, поэтому важны корректные допущения"
  }),
  createTopicProfile({
    title: "информатика",
    aliases: ["информатика", "computer science", "cs", "informatics", "алгоритмы", "алгоритм"],
    definition: "Информатика изучает информацию, алгоритмы, данные, компьютеры и способы автоматического решения задач.",
    essentials: ["алгоритм", "данные", "переменная", "условие", "цикл"],
    process: "описать задачу, построить алгоритм, представить данные, выполнить шаги и проверить результат",
    example: "сортировка списка, поиск информации, программа-калькулятор или таблица данных",
    application: "в программировании, анализе данных, робототехнике, интернете, безопасности и автоматизации",
    commonMistake: "путать программу с алгоритмом: алгоритм можно описать и без конкретного языка",
    comparison: "математикой, потому что обе области используют строгие правила и модели",
    variables: "входные данные, состояние, условия, количество операций и формат результата",
    evidence: "алгоритм проверяется трассировкой, тестами, примерами и крайними случаями",
    model: "блок-схема, псевдокод, таблица состояний или структура данных",
    advancedIssue: "сложность алгоритмов, корректность, безопасность и обработка больших данных",
    experiment: "прогнать алгоритм на нескольких входах и записать, как меняется состояние",
    ethics: "информационные технологии связаны с приватностью, безопасностью и влиянием автоматизации"
  }),
  createTopicProfile({
    title: "русский язык",
    aliases: ["русский язык", "russian language", "грамматика русского", "орфография", "пунктуация"],
    definition: "Русский язык изучает систему звуков, слов, предложений, правил письма и выразительной речи.",
    essentials: ["часть речи", "морфема", "орфограмма", "синтаксис", "пунктуация"],
    process: "разобрать слово или предложение, найти правило, проверить условие и применить его в тексте",
    example: "разбор слова по составу, постановка запятой или выбор безударной гласной",
    application: "в письме, чтении, устной речи, экзаменах, анализе текстов и деловом общении",
    commonMistake: "учить правило без условий его применения и исключений",
    comparison: "литературой, где важнее художественный смысл текста, а не языковая система",
    variables: "контекст, часть речи, форма слова, синтаксическая роль и интонация",
    evidence: "ответ проверяется правилом, грамматическим разбором, проверочным словом или структурой предложения",
    model: "схема предложения, морфемная схема или алгоритм применения правила",
    advancedIssue: "исключения, авторская пунктуация, стилистика и исторические изменения языка",
    experiment: "взять предложение, разобрать его и объяснить каждую запятую правилом",
    ethics: "язык влияет на ясность, уважение и точность общения"
  }),
  createTopicProfile({
    title: "обществознание",
    aliases: ["обществознание", "social studies", "civics", "граждановедение", "право и общество"],
    definition: "Обществознание изучает человека, общество, право, экономику, политику и социальные отношения.",
    essentials: ["личность", "общество", "право", "государство", "экономика"],
    process: "определить понятие, найти признаки, привести пример, связать с институтами и последствиями",
    example: "анализ прав гражданина, семейных отношений, рынка труда или роли государства",
    application: "в гражданской жизни, правовой грамотности, финансовых решениях и понимании общества",
    commonMistake: "давать бытовое мнение вместо ответа через понятия, признаки и примеры",
    comparison: "историей, которая изучает развитие общества во времени",
    variables: "нормы, институты, права, обязанности, интересы групп и социальный контекст",
    evidence: "ответ подтверждается определениями, законами, примерами и логикой общественных связей",
    model: "схема общественного института, правовой ситуации или экономического выбора",
    advancedIssue: "конфликт интересов, права и обязанности, справедливость и роль государства",
    experiment: "разобрать жизненную ситуацию через права, обязанности, участников и возможные последствия",
    ethics: "тема связана с ответственностью, правами людей и уважением к разным группам"
  })
);

function schoolQuiz(items) {
  const quizItems = items.map(([focus, question, answer, explanation]) =>
    quizItem(focus, question, answer, explanation)
  );

  return {
    beginner: quizItems,
    intermediate: quizItems,
    advanced: quizItems
  };
}

function applySchoolSubjectQuizzes() {
  topicProfiles.forEach((profile) => {
    const quiz = schoolSubjectQuizzes[profile.title];
    if (quiz) {
      profile.quiz = quiz;
    }
  });
}

const schoolSubjectQuizzes = {
  "математика": schoolQuiz([
    ["Числа", "Что показывает дробь?", "Дробь показывает, на сколько равных частей разделили целое и сколько таких частей взяли.", "Это основа для процентов, пропорций и измерений."],
    ["Уравнение", "Что значит решить уравнение?", "Найти такое значение неизвестного, при котором равенство становится верным.", "Проверка подстановкой сразу показывает, найден ли правильный ответ."],
    ["Функция", "Что такое функция в школьной математике?", "Это правило, которое каждому допустимому значению аргумента ставит в соответствие значение результата.", "Функции помогают описывать зависимости: скорость, цену, рост, температуру."],
    ["График", "Зачем строят график функции?", "Чтобы увидеть зависимость между величинами на координатной плоскости.", "График быстро показывает рост, спад, нули и пересечения."],
    ["Формула", "Что делает формула?", "Формула кратко записывает правило вычисления или связь величин.", "Она экономит время и делает рассуждение точным."],
    ["Процент", "Что означает один процент?", "Один процент — это одна сотая часть величины.", "Проценты нужны для скидок, статистики, вероятности и финансов."],
    ["Доказательство", "Что такое математическое доказательство?", "Это последовательность логических шагов, которая показывает, почему утверждение верно.", "Доказательство важнее угадывания ответа."],
    ["Проверка", "Как проверить решение задачи?", "Подставить ответ в условие, проверить единицы измерения и смысл результата.", "Так можно поймать вычислительные и логические ошибки."]
  ]),
  "алгебра": schoolQuiz([
    ["Переменная", "Что такое переменная в алгебре?", "Это символ для неизвестного или изменяющегося числа.", "Без переменной нельзя записать общую зависимость."],
    ["Выражение", "Чем выражение отличается от уравнения?", "Выражение не содержит знака равенства с условием, а уравнение требует найти неизвестное.", "Это помогает выбрать правильный способ решения."],
    ["Скобки", "Зачем раскрывают скобки?", "Чтобы преобразовать выражение к более удобному виду.", "При раскрытии важно правильно менять знаки и умножать каждый член."],
    ["Корень", "Что такое корень уравнения?", "Это значение переменной, которое делает уравнение верным.", "Корень всегда стоит проверять подстановкой."],
    ["Функция", "Что показывает линейная функция?", "Она показывает зависимость с постоянной скоростью изменения.", "Её график — прямая линия."],
    ["Система", "Что значит решить систему уравнений?", "Найти значения переменных, которые подходят сразу ко всем уравнениям системы.", "Ответ должен удовлетворять каждому уравнению."],
    ["ОДЗ", "Зачем нужна область допустимых значений?", "Она показывает, какие значения переменной вообще можно подставлять.", "Без ОДЗ можно получить лишние или запрещенные решения."],
    ["Ошибка", "Какая частая ошибка бывает при переносе членов уравнения?", "Забыть поменять знак при переносе через знак равенства.", "Это одна из самых частых причин неверного ответа."]
  ]),
  "геометрия": schoolQuiz([
    ["Фигура", "Что изучает геометрия?", "Свойства фигур, расстояний, углов, площадей и взаимного расположения объектов.", "Геометрия учит видеть структуру пространства."],
    ["Угол", "Что показывает величина угла?", "Насколько одна сторона угла повернута относительно другой.", "Углы помогают описывать форму и направление."],
    ["Треугольник", "Чему равна сумма углов треугольника на плоскости?", "180 градусов.", "Это базовый факт для решения многих задач."],
    ["Пифагор", "Когда можно применять теорему Пифагора?", "Только в прямоугольном треугольнике.", "Если угол не прямой, формула не работает напрямую."],
    ["Площадь", "Что показывает площадь фигуры?", "Сколько места занимает фигура на плоскости.", "Площадь измеряют в квадратных единицах."],
    ["Подобие", "Что значит, что фигуры подобны?", "У них одинаковая форма, а соответствующие стороны пропорциональны.", "Подобие удобно для масштабов и чертежей."],
    ["Доказательство", "Зачем в геометрии нужны доказательства?", "Чтобы показать, что свойство верно не только на рисунке, а всегда при данных условиях.", "Рисунок может обмануть, доказательство — нет."],
    ["Чертеж", "Почему чертеж надо подписывать?", "Чтобы видеть данные, искомые величины и связи между элементами.", "Хороший чертеж часто половина решения."]
  ]),
  "физика": schoolQuiz([
    ["Сила", "Что такое сила в физике?", "Это воздействие, которое может изменить скорость тела или деформировать его.", "Сила измеряется в ньютонах."],
    ["Масса", "Чем масса отличается от веса?", "Масса — количество вещества и мера инертности, а вес — сила, с которой тело действует на опору или подвес.", "На Луне вес меняется, а масса остается той же."],
    ["Скорость", "Что показывает скорость?", "Какой путь тело проходит за единицу времени.", "Скорость связывает расстояние и время."],
    ["Энергия", "Что означает закон сохранения энергии?", "Энергия не исчезает и не появляется из ничего, а переходит из одной формы в другую.", "Это помогает анализировать движение, тепло и электричество."],
    ["Давление", "От чего зависит давление?", "От силы и площади, на которую эта сила действует.", "Чем меньше площадь при той же силе, тем больше давление."],
    ["Ток", "Что такое электрический ток?", "Упорядоченное движение заряженных частиц.", "Для тока нужна цепь и источник напряжения."],
    ["Эксперимент", "Зачем физике эксперимент?", "Чтобы проверить, совпадают ли предсказания модели с реальностью.", "Физика держится на измерениях, а не только на формулах."],
    ["Единицы", "Почему важно проверять единицы измерения?", "Они показывают физический смысл величины и помогают находить ошибки.", "Нельзя складывать величины с разными единицами без преобразования."]
  ]),
  "химия": schoolQuiz([
    ["Вещество", "Что изучает химия?", "Вещества, их состав, строение, свойства и превращения.", "Химия объясняет, почему вещества ведут себя по-разному."],
    ["Атом", "Что такое атом?", "Наименьшая частица химического элемента, сохраняющая его свойства.", "Атомы соединяются в молекулы и кристаллы."],
    ["Молекула", "Что такое молекула?", "Частица, состоящая из связанных атомов.", "Состав молекулы записывают химической формулой."],
    ["Реакция", "Что происходит в химической реакции?", "Одни вещества превращаются в другие за счет разрыва и образования химических связей.", "Атомы сохраняются, но группируются иначе."],
    ["Уравнение", "Зачем уравнивают химические реакции?", "Чтобы число атомов каждого элемента было одинаковым слева и справа.", "Это отражает закон сохранения массы."],
    ["Кислота", "Какой признак часто связан с кислотами?", "Кислоты могут отдавать ионы водорода и реагировать с основаниями.", "Но свойства кислоты всегда нужно проверять по конкретному веществу."],
    ["Катализатор", "Что делает катализатор?", "Ускоряет реакцию, но сам в итоге не расходуется.", "Катализаторы важны в промышленности и живых организмах."],
    ["Ошибка", "Какая частая ошибка в химии?", "Путать физическое изменение с химической реакцией.", "Растворение или плавление не всегда означает образование нового вещества."]
  ]),
  "биология": schoolQuiz([
    ["Жизнь", "Что изучает биология?", "Живые организмы, их строение, функции, развитие и связь со средой.", "Биология связывает клетки, организмы и экосистемы."],
    ["Клетка", "Почему клетку называют единицей жизни?", "Потому что она выполняет основные жизненные процессы.", "Даже сложный организм состоит из работающих клеток."],
    ["ДНК", "Какую роль играет ДНК?", "Она хранит наследственную информацию.", "Информация ДНК влияет на признаки организма."],
    ["Обмен", "Что такое обмен веществ?", "Получение, превращение и использование веществ и энергии организмом.", "Без обмена веществ организм не может жить."],
    ["Эволюция", "Что объясняет эволюция?", "Как наследственные признаки популяций меняются со временем.", "Эволюция помогает понять разнообразие живых организмов."],
    ["Экосистема", "Что такое экосистема?", "Сообщество организмов вместе со средой их обитания.", "В экосистеме важны связи, а не только отдельные виды."],
    ["Адаптация", "Что такое адаптация?", "Признак или поведение, помогающее организму выживать и размножаться в среде.", "Адаптация полезна только в конкретных условиях."],
    ["Метод", "Зачем биологу наблюдение и эксперимент?", "Чтобы проверять объяснения о живых системах.", "Живые системы сложны, поэтому нужны данные."]
  ]),
  "история": schoolQuiz([
    ["Источник", "Что такое исторический источник?", "Любое свидетельство прошлого: документ, предмет, фото, письмо, карта или воспоминание.", "Историк строит выводы на источниках."],
    ["Причина", "Почему нельзя объяснять событие одной причиной?", "Исторические события обычно зависят от экономики, политики, идей, людей и обстоятельств.", "Одна причина часто делает ответ слишком простым."],
    ["Хронология", "Зачем нужна хронология?", "Она показывает порядок событий во времени.", "Без порядка трудно понять причины и последствия."],
    ["Контекст", "Что значит изучать событие в контексте?", "Учитывать условия эпохи, интересы участников и доступные им знания.", "Это помогает не судить прошлое слишком поверхностно."],
    ["Последствие", "Что такое историческое последствие?", "Изменение, которое произошло после события и было с ним связано.", "Последствия могут быть политическими, экономическими и культурными."],
    ["Период", "Зачем делят историю на периоды?", "Чтобы удобнее изучать большие отрезки прошлого.", "Периодизация помогает видеть изменения и этапы."],
    ["Версия", "Почему у историков бывают разные версии?", "Источники могут быть неполными, противоречивыми или написанными с разной позиции.", "Поэтому важно сравнивать доказательства."],
    ["Карта", "Зачем в истории карта?", "Она показывает территории, границы, походы, торговые пути и изменения пространства.", "Многие события легче понять через географию."]
  ]),
  "география": schoolQuiz([
    ["Карта", "Что показывает карта?", "Уменьшенное изображение территории с условными знаками.", "Карта помогает видеть расположение объектов и связи между ними."],
    ["Масштаб", "Что такое масштаб карты?", "Отношение расстояния на карте к расстоянию на местности.", "Без масштаба нельзя правильно измерять расстояния."],
    ["Климат", "Чем климат отличается от погоды?", "Погода — состояние атмосферы сейчас, климат — многолетний режим погоды.", "Один холодный день не отменяет климатическую тенденцию."],
    ["Рельеф", "Что такое рельеф?", "Неровности земной поверхности: горы, равнины, долины, впадины.", "Рельеф влияет на климат, реки, дороги и расселение."],
    ["Ресурсы", "Что называют природными ресурсами?", "Компоненты природы, которые человек использует: вода, почвы, леса, полезные ископаемые.", "Ресурсы влияют на экономику регионов."],
    ["Население", "Что показывает плотность населения?", "Сколько людей в среднем живет на единице площади.", "Она помогает сравнивать заселенность территорий."],
    ["Широта", "Почему географическая широта влияет на климат?", "Она определяет угол падения солнечных лучей.", "Чем ближе к экватору, тем больше солнечной энергии получает территория."],
    ["Связи", "Почему география изучает связи?", "Потому что природа, население и хозяйство влияют друг на друга.", "Город, климат и транспорт нельзя понимать отдельно."]
  ]),
  "литература": schoolQuiz([
    ["Тема", "Что такое тема произведения?", "То, о чем произведение говорит на самом общем уровне.", "Тема отвечает на вопрос: о чем текст?"],
    ["Идея", "Чем идея отличается от темы?", "Идея — главная мысль или авторский смысл, а тема — предмет изображения.", "Можно иметь одну тему, но разные идеи."],
    ["Конфликт", "Что такое конфликт в литературе?", "Столкновение сил, героев, взглядов или желаний.", "Конфликт двигает сюжет и раскрывает персонажей."],
    ["Герой", "Как анализировать персонажа?", "Смотреть на поступки, речь, отношения, мотивы и изменения героя.", "Характер раскрывается через действия, а не только описание."],
    ["Образ", "Что такое художественный образ?", "Способ показать явление через конкретную деталь, героя, картину или символ.", "Образ делает смысл живым и запоминающимся."],
    ["Сюжет", "Что такое сюжет?", "Последовательность событий произведения.", "Сюжет помогает понять развитие конфликта."],
    ["Деталь", "Зачем нужна художественная деталь?", "Она концентрирует смысл в маленьком элементе текста.", "Деталь может раскрывать характер, атмосферу или идею."],
    ["Цитата", "Зачем использовать цитаты в анализе?", "Цитаты доказывают интерпретацию текстом.", "Без опоры на текст анализ превращается в мнение."]
  ]),
  "русский язык": schoolQuiz([
    ["Часть речи", "Что такое часть речи?", "Группа слов с общим грамматическим значением и признаками.", "Например, существительное называет предмет, а глагол — действие."],
    ["Морфема", "Что такое морфема?", "Минимальная значимая часть слова: корень, приставка, суффикс или окончание.", "Морфемный разбор помогает понимать правописание."],
    ["Орфограмма", "Что такое орфограмма?", "Место в слове, где нужно выбрать правильное написание по правилу.", "Орфограмма требует проверки, а не угадывания."],
    ["Проверочное слово", "Зачем нужно проверочное слово?", "Чтобы поставить сомнительный звук в сильную позицию.", "Так проверяют многие безударные гласные и парные согласные."],
    ["Синтаксис", "Что изучает синтаксис?", "Словосочетания, предложения и связи слов в них.", "Синтаксис помогает объяснять знаки препинания."],
    ["Запятая", "Почему ставят запятую?", "Она показывает границы частей предложения, однородных членов, обращений или вводных конструкций.", "Запятая должна объясняться правилом."],
    ["Основа", "Что такое грамматическая основа?", "Подлежащее и сказуемое или один главный член предложения.", "Основа помогает определить структуру предложения."],
    ["Стиль", "Что такое стиль речи?", "Способ выражения, подходящий цели и ситуации общения.", "Научный, разговорный и деловой стиль устроены по-разному."]
  ]),
  "английская грамматика": schoolQuiz([
    ["Порядок слов", "Какой базовый порядок слов в английском утверждении?", "Подлежащее + сказуемое + дополнение.", "Английский сильнее зависит от порядка слов, чем русский."],
    ["Present Simple", "Когда используют Present Simple?", "Для привычек, фактов, расписаний и регулярных действий.", "Например: She plays tennis every week."],
    ["Present Continuous", "Когда используют Present Continuous?", "Для действия, которое происходит сейчас или временно.", "Например: She is playing tennis now."],
    ["Do/Does", "Зачем нужны do и does в вопросах?", "Они помогают строить вопросы и отрицания в Present Simple.", "Does используется с he, she, it."],
    ["Артикль", "Что показывает артикль a/an?", "Что речь идет об одном неопределенном предмете.", "A ставят перед согласным звуком, an — перед гласным."],
    ["The", "Когда используют the?", "Когда предмет уже известен или уникален в контексте.", "The помогает показать конкретность."],
    ["Past Simple", "Когда используют Past Simple?", "Для завершенного действия в прошлом.", "Обычно есть время или понятный прошлый контекст."],
    ["Ошибка", "Какая частая ошибка в английском предложении?", "Забыть вспомогательный глагол или поставить слова в русском порядке.", "Лучше проверять структуру предложения."]
  ]),
  "информатика": schoolQuiz([
    ["Алгоритм", "Что такое алгоритм?", "Точный порядок действий для решения задачи.", "Алгоритм можно записать словами, блок-схемой или кодом."],
    ["Данные", "Что такое данные?", "Информация, представленная в форме, пригодной для хранения и обработки.", "Компьютер работает не с смыслом напрямую, а с представлением данных."],
    ["Переменная", "Зачем нужна переменная в программе?", "Чтобы хранить значение и использовать его в вычислениях.", "Значение переменной может изменяться во время работы программы."],
    ["Условие", "Что делает условный оператор?", "Выбирает разные действия в зависимости от истинности условия.", "Это позволяет программе принимать решения."],
    ["Цикл", "Зачем нужен цикл?", "Чтобы повторять действия несколько раз.", "Циклы экономят код и помогают обрабатывать списки данных."],
    ["Тест", "Зачем тестировать алгоритм?", "Чтобы проверить правильность на обычных и крайних случаях.", "Без тестов ошибка может остаться незаметной."],
    ["Сложность", "Что показывает сложность алгоритма?", "Как растет количество операций при увеличении входных данных.", "Это важно для больших задач."],
    ["Безопасность", "Почему важна защита данных?", "Потому что данные могут быть личными, ценными или опасными при утечке.", "Информатика связана с ответственностью."]
  ]),
  "программирование": schoolQuiz([
    ["Код", "Что такое программа?", "Набор инструкций, которые компьютер выполняет для решения задачи.", "Программа должна быть понятной и проверяемой."],
    ["Функция", "Зачем нужны функции?", "Чтобы оформить часть логики с именем и переиспользовать её.", "Функции делают код короче и понятнее."],
    ["Ошибка", "Что такое bug?", "Ошибка в программе, из-за которой она работает не так, как ожидалось.", "Ошибки ищут через тесты, логи и отладку."],
    ["Ввод", "Что такое входные данные?", "Данные, которые программа получает для обработки.", "Разные входы могут менять результат."],
    ["Вывод", "Что такое результат программы?", "То, что программа возвращает, показывает или сохраняет после выполнения.", "Результат должен соответствовать задаче."],
    ["Список", "Зачем нужен список или массив?", "Чтобы хранить несколько значений в одном порядке.", "Списки удобны для перебора и обработки данных."],
    ["Условие", "Зачем программе if?", "Чтобы выполнять разные действия при разных условиях.", "Без условий программа всегда идет одним путем."],
    ["Тестирование", "Как проверить функцию?", "Дать ей разные входы и сравнить результат с ожидаемым.", "Особенно важны крайние случаи."]
  ]),
  "обществознание": schoolQuiz([
    ["Общество", "Что такое общество?", "Люди и устойчивые связи между ними: группы, нормы, институты и отношения.", "Общество нельзя понять только через отдельного человека."],
    ["Личность", "Чем личность отличается от индивида?", "Индивид — отдельный человек, личность — человек как носитель социальных качеств.", "Личность формируется в обществе."],
    ["Право", "Что такое право?", "Система общеобязательных правил, охраняемых государством.", "Право регулирует поведение и защищает интересы."],
    ["Государство", "Что отличает государство?", "Публичная власть, территория, законы, налоги и суверенитет.", "Государство организует управление обществом."],
    ["Экономика", "Что изучает экономика в обществознании?", "Как люди используют ограниченные ресурсы для удовлетворения потребностей.", "Выбор всегда связан с затратами и альтернативами."],
    ["Права", "Зачем нужны права человека?", "Чтобы защищать свободу, достоинство и возможности личности.", "Права связаны и с обязанностями."],
    ["Социализация", "Что такое социализация?", "Процесс усвоения норм, ролей и ценностей общества.", "Через социализацию человек учится жить среди людей."],
    ["Пример", "Почему в ответе по обществознанию нужен пример?", "Пример показывает, что понятие понято и применено к жизни.", "Без примера ответ часто остается слишком абстрактным."]
  ]),
  "экология": schoolQuiz([
    ["Экосистема", "Что такое экосистема?", "Организмы вместе со средой и связями между ними.", "В экосистеме важны потоки энергии и круговороты веществ."],
    ["Популяция", "Что такое популяция?", "Группа особей одного вида, живущих на одной территории и размножающихся между собой.", "Популяция — единица многих экологических процессов."],
    ["Пищевая цепь", "Что показывает пищевая цепь?", "Кто кого ест и как энергия переходит между организмами.", "На каждом уровне часть энергии теряется."],
    ["Ниша", "Что такое экологическая ниша?", "Роль вида в экосистеме и условия, в которых он живет.", "Ниша включает питание, место, поведение и связи."],
    ["Биоразнообразие", "Почему важно биоразнообразие?", "Оно повышает устойчивость экосистем и сохраняет разные функции природы.", "Потеря видов может разрушать связи."],
    ["Фактор", "Что такое экологический фактор?", "Условие среды, влияющее на организм.", "Факторы бывают абиотические, биотические и антропогенные."],
    ["Человек", "Как человек влияет на экосистемы?", "Через вырубку, загрязнение, охоту, земледелие, города и изменение климата.", "Влияние может быть разрушительным или восстановительным."],
    ["Охрана", "Зачем нужны заповедники?", "Чтобы сохранять виды, местообитания и природные процессы.", "Охрана природы защищает не только отдельные виды, но и связи между ними."]
  ]),
  "анатомия человека": schoolQuiz([
    ["Орган", "Что такое орган?", "Часть тела, имеющая строение и выполняющая определенную функцию.", "Органы работают не отдельно, а в системах."],
    ["Скелет", "Зачем нужен скелет?", "Он поддерживает тело, защищает органы и участвует в движении.", "Кости также связаны с кроветворением и минералами."],
    ["Мышцы", "Как мышцы создают движение?", "Они сокращаются и тянут кости через сухожилия.", "Мышцы работают вместе с суставами и нервной системой."],
    ["Кровь", "Что переносит кровь?", "Кислород, углекислый газ, питательные вещества, гормоны и продукты обмена.", "Кровь связывает разные органы тела."],
    ["Легкие", "Что происходит в легких?", "Газообмен: кислород поступает в кровь, а углекислый газ удаляется.", "Это нужно для клеточного дыхания."],
    ["Сердце", "Какую функцию выполняет сердце?", "Перекачивает кровь по сосудам.", "Сердце поддерживает кровообращение."],
    ["Нервы", "Зачем нужна нервная система?", "Она принимает сигналы, обрабатывает информацию и управляет реакциями организма.", "Нервная система связывает органы в единую систему."],
    ["Связь", "Почему тело изучают по системам органов?", "Потому что одна функция обычно требует работы нескольких органов.", "Например, движение требует мышц, костей, нервов и энергии."]
  ])
};

Object.assign(schoolSubjectQuizzes, {
  "английский язык": schoolSubjectQuizzes["английская грамматика"],
  "музыка": schoolQuiz([
    ["Звук", "Что изучают на уроках музыки?", "Музыку как искусство звуков: мелодию, ритм, тембр, форму и выразительность.", "Музыку легче понимать, когда слышишь не только песню целиком, но и ее элементы."],
    ["Ритм", "Что такое ритм?", "Организация звуков и пауз во времени.", "Ритм помогает музыке двигаться и запоминаться."],
    ["Мелодия", "Чем мелодия отличается от ритма?", "Мелодия - последовательность звуков разной высоты, а ритм задает их длительность и пульс.", "В песне мелодию обычно можно напеть."],
    ["Тембр", "Что такое тембр?", "Окраска звука, по которой мы отличаем голос, скрипку, флейту или барабан.", "Даже одна и та же нота звучит по-разному на разных инструментах."],
    ["Жанр", "Зачем различают музыкальные жанры?", "Жанр помогает понять назначение, форму и стиль произведения.", "Марш, песня, опера и симфония устроены по-разному."],
    ["Динамика", "Что показывает динамика в музыке?", "Громкость звучания и ее изменения.", "Динамика делает исполнение выразительным."],
    ["Композитор", "Чем композитор отличается от исполнителя?", "Композитор создает музыку, исполнитель ее исполняет.", "Один и тот же текст музыки может звучать иначе у разных исполнителей."],
    ["Слушание", "Как осмысленно слушать музыкальное произведение?", "Отмечать ритм, мелодию, настроение, инструменты, форму и изменения звучания.", "Так слушание превращается в анализ, а не просто фон."]
  ]),
  "изобразительное искусство": schoolQuiz([
    ["Образ", "Что изучают на ИЗО?", "Способы создавать визуальные образы через линию, цвет, форму, композицию и материал.", "ИЗО учит видеть, как изображение передает смысл."],
    ["Композиция", "Что такое композиция?", "Расположение частей изображения на листе или в пространстве.", "Хорошая композиция направляет взгляд зрителя."],
    ["Цвет", "Зачем художнику нужен цветовой круг?", "Он помогает понимать сочетания цветов, контраст и гармонию.", "Цвет влияет на настроение работы."],
    ["Перспектива", "Что дает перспектива в рисунке?", "Она помогает показать глубину и расстояние на плоскости.", "Без перспективы пространство выглядит плоским или случайным."],
    ["Светотень", "Как светотень помогает изображать объем?", "Свет, тень и полутон показывают форму предмета.", "Объем появляется не только линией, но и распределением света."],
    ["Материал", "Почему техника влияет на результат?", "Карандаш, акварель, гуашь, пастель и цифровые инструменты дают разную фактуру и выразительность.", "Материал нужно выбирать под задачу."],
    ["Жанр", "Какие бывают жанры в изобразительном искусстве?", "Портрет, пейзаж, натюрморт, бытовой жанр, историческая картина и другие.", "Жанр подсказывает, что именно изображено и зачем."],
    ["Анализ", "Как анализировать картину?", "Смотреть на сюжет, композицию, цвет, свет, детали, настроение и исторический контекст.", "Так работа раскрывается глубже, чем просто 'нравится' или 'не нравится'."]
  ]),
  "технология": schoolQuiz([
    ["Проект", "Что такое проект на уроке технологии?", "Планируемая работа, которая приводит к конкретному изделию или решению задачи.", "Проект включает идею, материалы, этапы и оценку результата."],
    ["Материал", "Почему важно знать свойства материалов?", "От свойств зависит, как материал обрабатывать и где его можно использовать.", "Дерево, ткань, металл и пластик ведут себя по-разному."],
    ["Инструмент", "Зачем подбирать инструмент под операцию?", "Неправильный инструмент ухудшает результат и может быть опасен.", "Безопасность и точность зависят от выбора инструмента."],
    ["Чертеж", "Для чего нужен чертеж или схема?", "Он показывает форму, размеры, детали и порядок изготовления.", "Чертеж помогает не делать изделие наугад."],
    ["Этапы", "Почему работу делят на этапы?", "Так легче контролировать качество, время и ошибки.", "Планирование экономит материалы и силы."],
    ["Безопасность", "Почему техника безопасности обязательна?", "Она снижает риск травм при работе с инструментами, электричеством и материалами.", "Правила нужны до начала работы, а не после ошибки."],
    ["Качество", "Как понять, что изделие сделано качественно?", "Оно выполняет задачу, аккуратно выглядит, прочное и соответствует размерам.", "Качество проверяют по критериям."],
    ["Экономия", "Зачем учитывать расход материалов?", "Чтобы снизить лишние затраты и отходы.", "Технология связана не только с изготовлением, но и с рациональным выбором."]
  ]),
  "основы безопасности жизнедеятельности": schoolQuiz([
    ["Риск", "Что изучает ОБЖ?", "Правила безопасного поведения в быту, школе, на улице, природе и при чрезвычайных ситуациях.", "Главная цель - заранее понимать риск и действовать спокойно."],
    ["Опасность", "Чем опасность отличается от риска?", "Опасность - возможный источник вреда, риск - вероятность и последствия этого вреда.", "Так проще оценивать ситуацию."],
    ["Алгоритм", "Почему в чрезвычайной ситуации нужен алгоритм действий?", "Он помогает не паниковать и выполнять шаги в правильном порядке.", "При стрессе заранее выученный порядок особенно важен."],
    ["Пожар", "Что делать при пожаре в здании?", "Сообщить взрослым или вызвать службу спасения, покинуть помещение, не пользоваться лифтом и закрывать двери за собой.", "Главное - быстро уйти из дыма и огня."],
    ["Первая помощь", "Что такое первая помощь?", "Простейшие действия до приезда специалистов, которые помогают сохранить жизнь и снизить вред.", "Первая помощь не заменяет врачей."],
    ["Дорога", "Зачем нужны правила дорожного движения?", "Они делают поведение пешеходов, водителей и пассажиров предсказуемым.", "Предсказуемость снижает количество аварий."],
    ["Природа", "Почему в природе нельзя действовать самоуверенно?", "Погода, вода, животные, растения и расстояния могут быстро стать опасными.", "Нужно заранее думать о маршруте, связи и помощи."],
    ["Цифровая безопасность", "Что значит безопасно вести себя в интернете?", "Не раскрывать личные данные, проверять ссылки, пароли и источники информации.", "Онлайн-риск может иметь реальные последствия."]
  ]),
  "физическая культура": schoolQuiz([
    ["Здоровье", "Что изучают на физкультуре?", "Движение, упражнения, развитие силы, выносливости, координации, гибкости и безопасной активности.", "Цель не только спорт, но и здоровье."],
    ["Разминка", "Зачем нужна разминка?", "Она готовит мышцы, суставы, сердце и дыхание к нагрузке.", "Разминка снижает риск травм."],
    ["Выносливость", "Что такое выносливость?", "Способность долго выполнять работу без резкого снижения эффективности.", "Ее развивают постепенной регулярной нагрузкой."],
    ["Сила", "Что показывает физическая сила?", "Способность мышц преодолевать сопротивление.", "Силу важно развивать техникой, а не рывками."],
    ["Координация", "Зачем нужна координация?", "Она помогает точно управлять движениями и сохранять равновесие.", "Координация важна в играх, гимнастике и повседневной жизни."],
    ["Техника", "Почему техника упражнения важнее скорости?", "Правильная техника делает движение эффективным и безопасным.", "Быстрое неправильное движение часто приводит к ошибкам."],
    ["Команда", "Чему учат командные игры?", "Взаимодействию, правилам, тактике, ответственности и уважению к партнерам.", "Игра - это не только результат, но и совместные действия."],
    ["Восстановление", "Почему после нагрузки нужно восстановление?", "Организму нужно вернуть дыхание, пульс и состояние мышц к норме.", "Без восстановления растет усталость и риск травм."]
  ]),
  "астрономия": schoolQuiz([
    ["Небесные тела", "Что изучает астрономия?", "Небесные объекты, космос и физические процессы за пределами Земли.", "Астрономия опирается на наблюдения и физические законы."],
    ["Планета", "Чем планета отличается от звезды?", "Планета не светит сама как звезда, а отражает свет и движется вокруг звезды.", "Звезда излучает энергию благодаря процессам внутри нее."],
    ["Орбита", "Что такое орбита?", "Путь движения небесного тела под действием гравитации.", "Орбиты помогают объяснять движение планет и спутников."],
    ["Световой год", "Что измеряют световым годом?", "Расстояние, которое свет проходит за один год.", "Это единица расстояния, а не времени."],
    ["Фазы Луны", "Почему меняются фазы Луны?", "Мы видим разную освещенную часть Луны из-за ее движения вокруг Земли.", "Фазы не связаны с тенью Земли, кроме лунного затмения."],
    ["Гравитация", "Почему гравитация важна в космосе?", "Она удерживает планеты на орбитах, формирует звезды, галактики и системы спутников.", "Без гравитации космические системы не были бы устойчивыми."],
    ["Спектр", "Как ученые узнают состав звезд?", "По спектру света, где линии показывают химические элементы.", "Так можно изучать объект, не долетая до него."],
    ["Масштаб", "Почему в астрономии трудно представить расстояния?", "Космические расстояния намного больше привычных земных масштабов.", "Поэтому используют модели, степени и специальные единицы."]
  ]),
  "экономика": schoolQuiz([
    ["Ресурсы", "Что изучает экономика?", "Как люди и общества распределяют ограниченные ресурсы.", "Экономика начинается там, где нужно выбирать."],
    ["Потребности", "Почему потребности связаны с ограниченностью?", "Желаний обычно больше, чем доступных ресурсов.", "Из-за этого приходится выбирать приоритеты."],
    ["Спрос", "Что такое спрос?", "Готовность и возможность покупателей купить товар по определенной цене.", "Спрос зависит не только от желания, но и от денег."],
    ["Предложение", "Что такое предложение?", "Готовность продавцов произвести и продать товар по определенной цене.", "Цена влияет на поведение производителей."],
    ["Цена", "Как цена помогает рынку?", "Она передает сигнал о дефиците, ценности и готовности людей покупать или продавать.", "Цена связывает спрос и предложение."],
    ["Издержки", "Что такое издержки?", "Затраты, которые нужны для производства товара или услуги.", "Без учета издержек нельзя понять прибыль."],
    ["Инфляция", "Что такое инфляция?", "Общий рост уровня цен, из-за которого покупательная способность денег снижается.", "Важно отличать инфляцию от роста цены одного товара."],
    ["Выбор", "Что такое альтернативная стоимость?", "Лучший вариант, от которого пришлось отказаться при выборе.", "Она показывает настоящую цену решения."]
  ])
});

topicProfiles.push(
  createTopicProfile({
    title: "английский язык",
    aliases: ["английский язык", "английский", "english", "english language"],
    definition: "Английский язык изучает лексику, грамматику, произношение, чтение, письмо и общение на английском.",
    essentials: ["слово", "время", "порядок слов", "произношение", "контекст"],
    process: "понять смысл, выбрать грамматическую форму, подобрать слова и проверить естественность фразы",
    example: "составить вопрос, прочитать текст, написать короткое письмо или объяснить правило времени",
    application: "в учебе, путешествиях, интернете, экзаменах и международном общении"
  }),
  createTopicProfile({
    title: "музыка",
    aliases: ["музыка", "music", "музыкальное искусство"],
    definition: "Музыка изучает выразительность звуков, ритма, мелодии, тембра, формы и исполнения.",
    essentials: ["ритм", "мелодия", "тембр", "жанр", "динамика"],
    process: "слушать произведение, выделять элементы звучания, определять настроение, жанр и выразительные средства",
    example: "анализ песни, марша, симфонии или звучания разных инструментов",
    application: "в культуре, искусстве, исполнении, творчестве и понимании эмоций"
  }),
  createTopicProfile({
    title: "изобразительное искусство",
    aliases: ["изобразительное искусство", "изо", "рисование", "art", "fine arts"],
    definition: "Изобразительное искусство изучает создание визуальных образов через линию, цвет, форму, композицию и материал.",
    essentials: ["линия", "цвет", "композиция", "перспектива", "светотень"],
    process: "наблюдать объект, выбрать композицию, построить форму, передать объем, цвет и настроение",
    example: "натюрморт, пейзаж, портрет, иллюстрация или анализ картины",
    application: "в искусстве, дизайне, визуальном мышлении, культуре и творческих профессиях"
  }),
  createTopicProfile({
    title: "технология",
    aliases: ["технология", "technology", "труд", "труды"],
    definition: "Технология изучает, как планировать, создавать и оценивать изделия, проекты и практические решения.",
    essentials: ["проект", "материал", "инструмент", "чертеж", "безопасность"],
    process: "поставить задачу, выбрать материалы, составить план, выполнить изделие и проверить качество",
    example: "изготовление модели, работа с тканью, деревом, схемой или простым техническим проектом",
    application: "в быту, инженерии, дизайне, производстве и рациональной организации работы"
  }),
  createTopicProfile({
    title: "основы безопасности жизнедеятельности",
    aliases: ["основы безопасности жизнедеятельности", "обж", "безопасность", "safety"],
    definition: "ОБЖ изучает безопасное поведение и действия при рисках, авариях, травмах и чрезвычайных ситуациях.",
    essentials: ["риск", "опасность", "алгоритм", "первая помощь", "эвакуация"],
    process: "оценить ситуацию, снизить риск, вызвать помощь и действовать по безопасному алгоритму",
    example: "поведение при пожаре, на дороге, в интернете, на воде или при травме",
    application: "в повседневной жизни, школе, дороге, природе, интернете и чрезвычайных ситуациях"
  }),
  createTopicProfile({
    title: "физическая культура",
    aliases: ["физическая культура", "физкультура", "physical education", "pe", "спорт"],
    definition: "Физическая культура изучает упражнения, движение, развитие физических качеств и безопасную активность.",
    essentials: ["разминка", "сила", "выносливость", "координация", "техника"],
    process: "подготовить тело, выполнить упражнение с правильной техникой, контролировать нагрузку и восстановиться",
    example: "разминка, бег, гимнастика, командная игра или упражнение на силу",
    application: "в здоровье, спорте, командной работе, самодисциплине и активной жизни"
  })
);

applySchoolSubjectQuizzes();

let currentResults = [];
let currentTopicTitle = "";
let currentTopicSource = "";

populateLanguageControls();
applyLanguage(selectedLanguage, { persist: false, rerender: false });
refreshAiStatus();

languageGate.hidden = false;

languageSelect.addEventListener("change", () => {
  applyLanguage(languageSelect.value, { persist: true, rerender: true });
  refreshAiStatus();
});

welcomeLanguageSelect.addEventListener("change", () => {
  applyLanguage(welcomeLanguageSelect.value, { persist: false, rerender: false });
});

languageContinueButton.addEventListener("click", () => {
  applyLanguage(welcomeLanguageSelect.value, { persist: true, rerender: true });
  languageGate.hidden = true;
  topicInput.focus();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const topic = normalizeTopic(topicInput.value);
  const difficulty = new FormData(form).get("difficulty");
  const count = clamp(Number(countInput.value), 4, 12);

  topicInput.value = topic;
  countInput.value = count;

  setBusy(true, t("statusSearching"));
  try {
    const generated = await generateQuestions(topic, difficulty, count);
    currentResults = generated.results;
    currentTopicTitle = generated.topicTitle;
    currentTopicSource = generated.source ?? "";
    renderResults(currentTopicTitle, difficulty, currentResults, currentTopicSource);
  } catch (error) {
    const generated = buildFallbackGeneration(topic, difficulty, count);
    currentResults = generated.results;
    currentTopicTitle = generated.topicTitle;
    currentTopicSource = generated.source;
    renderResults(currentTopicTitle, difficulty, currentResults, currentTopicSource);
  } finally {
    setBusy(false, "");
  }
});

clearButton.addEventListener("click", () => {
  form.reset();
  languageSelect.value = selectedLanguage;
  countInput.value = 8;
  currentResults = [];
  currentTopicTitle = "";
  currentTopicSource = "";
  list.replaceChildren();
  emptyState.hidden = false;
  resultsTitle.textContent = t("emptyTitle");
  sourceLine.hidden = true;
  sourceLine.textContent = "";
  statusLine.textContent = "";
  setExportState(false);
  topicInput.focus();
});

copyButton.addEventListener("click", async () => {
  if (!currentResults.length) return;

  await navigator.clipboard.writeText(buildPlainText());
  copyButton.classList.add("is-done");
  copyButton.setAttribute("title", t("copiedTitle"));
  setTimeout(() => {
    copyButton.classList.remove("is-done");
    copyButton.setAttribute("title", t("copyTitle"));
  }, 1400);
});

txtButton.addEventListener("click", () => {
  if (!currentResults.length) return;

  const blob = new Blob([buildPlainText()], { type: "text/plain;charset=utf-8" });
  downloadBlob(blob, makeFilename("questions", "txt"));
});

pdfButton.addEventListener("click", () => {
  if (!currentResults.length) return;
  openPrintExport();
});

function readStoredLanguage() {
  try {
    return window.localStorage?.getItem(languageStorageKey);
  } catch (error) {
    return null;
  }
}

function storeLanguage(code) {
  try {
    window.localStorage?.setItem(languageStorageKey, code);
  } catch (error) {
    // The selector still works for the current session if storage is blocked.
  }
}

function normalizeLanguageCode(code) {
  return supportedLanguages.some((language) => language.code === code) ? code : "ru";
}

function getLanguageMeta(code = selectedLanguage) {
  return supportedLanguages.find((language) => language.code === code) ?? supportedLanguages[0];
}

function getLanguageUi(code = selectedLanguage) {
  return languageUi[code] ?? enUi;
}

function t(key) {
  return activeUi[key] ?? enUi[key] ?? ruUi[key] ?? key;
}

function populateLanguageControls() {
  [languageSelect, welcomeLanguageSelect].forEach((select) => {
    const fragment = document.createDocumentFragment();
    supportedLanguages.forEach((language) => {
      const option = document.createElement("option");
      option.value = language.code;
      option.textContent = `${language.nativeName} (${language.name})`;
      fragment.append(option);
    });
    select.replaceChildren(fragment);
    select.value = selectedLanguage;
  });
}

function applyLanguage(code, options = {}) {
  const { persist = true, rerender = true } = options;
  selectedLanguage = normalizeLanguageCode(code);
  activeUi = getLanguageUi(selectedLanguage);

  if (persist) {
    storeLanguage(selectedLanguage);
  }

  const meta = getLanguageMeta(selectedLanguage);
  document.documentElement.lang = selectedLanguage;
  document.documentElement.dir = meta.dir ?? "ltr";
  document.title = t("documentTitle");

  difficultyLabels.beginner = t("beginner");
  difficultyLabels.intermediate = t("intermediate");
  difficultyLabels.advanced = t("advanced");

  languageSelect.value = selectedLanguage;
  welcomeLanguageSelect.value = selectedLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.setAttribute("title", t(element.dataset.i18nTitle));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  if (rerender && currentResults.length) {
    renderResults(currentTopicTitle, new FormData(form).get("difficulty"), currentResults, currentTopicSource);
  }
}

async function refreshAiStatus() {
  if (!aiStatusLine) return;

  try {
    const response = await fetch("/api/ai-status", { cache: "no-store" });
    if (!response.ok) throw new Error("AI status failed");
    const status = await response.json();
    aiStatusLine.textContent = status.aiEnabled
      ? t("aiStatusReady").replace("{provider}", status.provider)
      : t("aiStatusSearchOnly");
  } catch (error) {
    aiStatusLine.textContent = t("aiStatusOffline");
  }
}

async function generateWithAiSearch(topic, difficulty, count) {
  if (!aiModeInput?.checked) return null;

  try {
    const response = await fetch("/api/ai-generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topic,
        difficulty,
        count,
        language: selectedLanguage
      })
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!Array.isArray(data.results) || !data.results.length) return null;

    return {
      topicTitle: data.topicTitle || topic,
      source: data.source || t("aiSource"),
      results: data.results.slice(0, count).map((item, index) => ({
        id: index + 1,
        question: item.question,
        answer: item.answer ?? item.explanation,
        explanation: item.explanation ?? item.answer,
        focus: item.focus || t("aiSource")
      }))
    };
  } catch (error) {
    return null;
  }
}

function localizeSource(source) {
  const sourceMap = {
    "Встроенная предметная база": t("sourceBuiltInBank"),
    "Встроенный предметный профиль": t("sourceBuiltInProfile"),
    "Фактовая справка не найдена: включён режим учебного исследования": t("sourceFallback")
  };

  return sourceMap[source] ?? source;
}

function normalizeTopic(value) {
  return value.trim().replace(/\s+/g, " ");
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

async function generateQuestions(topic, difficulty, count) {
  const aiGenerated = await generateWithAiSearch(topic, difficulty, count);
  if (aiGenerated) {
    return aiGenerated;
  }

  const topicBank = findTopicBank(topic);
  if (topicBank) {
    return {
      topicTitle: topicBank.title,
      source: "Встроенная предметная база",
      results: buildBankQuestions(topicBank, difficulty, count)
    };
  }

  const topicProfile = findTopicProfile(topic);
  if (topicProfile) {
    return {
      topicTitle: topicProfile.title,
      source: "Встроенный предметный профиль",
      results: buildProfileQuestions(topicProfile, difficulty, count)
    };
  }

  const topicContext = await fetchTopicContext(topic);
  if (topicContext) {
    return {
      topicTitle: topicContext.title,
      source: topicContext.source,
      results: buildContextQuestions(topicContext, difficulty, count)
    };
  }

  return buildFallbackGeneration(topic, difficulty, count);
}

function buildFallbackGeneration(topic, difficulty, count) {
  return {
    topicTitle: topic,
    source: "Фактовая справка не найдена: включён режим учебного исследования",
    results: buildAdaptiveQuestions(topic, difficulty, count)
  };
}

function buildBankQuestions(topicBank, difficulty, count) {
  const source = topicBank.questions[difficulty] ?? topicBank.questions.beginner;
  return source.slice(0, count).map((item, index) => ({
    id: index + 1,
    question: fillTopic(item.question, topicBank.title),
    answer: item.answer ?? item.explanation,
    explanation: item.answer ? item.explanation : "Это ключевой факт для понимания темы.",
    focus: item.focus ?? getFocusLabel(difficulty, index)
  }));
}

function buildProfileQuestions(profile, difficulty, count) {
  const source = profile.quiz?.[difficulty] ?? profileQuizTemplates[difficulty] ?? profileQuizTemplates.beginner;
  return source.slice(0, count).map((item, index) => ({
    id: index + 1,
    question: item.question(profile),
    answer: cleanExplanation(item.answer(profile)),
    explanation: cleanExplanation(item.explanation(profile)),
    focus: item.focus
  }));
}

function buildContextQuestions(context, difficulty, count) {
  const domain = inferContextDomain(context);
  const templatesByDifficulty = getContextTemplates(domain);
  const source = templatesByDifficulty[difficulty] ?? templatesByDifficulty.beginner;
  const expanded = repeatToCount(source, count);
  const usedAnswers = new Set();
  const usedExplanations = new Set();

  return expanded.slice(0, count).map((item, index) => ({
    id: index + 1,
    ...buildContextCard(context, item, index, usedAnswers, usedExplanations)
  }));
}

function buildContextCard(context, item, index, usedAnswers, usedExplanations) {
  const question = item.question(context);
  let answer = cleanExplanation(item.answer(context));
  answer = makeUniqueFact(answer, context, usedAnswers, index);
  usedAnswers.add(factKey(answer));

  let explanation = cleanExplanation(item.explanation(context, answer));
  if (isWeakFact(explanation) || factsAreSimilar(answer, explanation) || usedExplanations.has(factKey(explanation))) {
    explanation = makeUniqueDetail(answer, context, usedAnswers, usedExplanations);
  }
  usedExplanations.add(factKey(explanation));

  return {
    question,
    answer,
    explanation,
    focus: item.focus
  };
}

function buildAdaptiveQuestions(topic, difficulty, count) {
  const source = adaptiveQuestionTemplates[difficulty] ?? adaptiveQuestionTemplates.beginner;
  const offset = Math.abs(hashTopic(topic)) % source.length;
  const rotated = [...source.slice(offset), ...source.slice(0, offset)];

  return rotated.slice(0, count).map(([focus, question, explanation], index) => ({
    id: index + 1,
    question: question(topic),
    answer: explanation(topic),
    explanation: "Это исследовательский вопрос: для точного ответа нужна фактовая справка по теме.",
    focus
  }));
}

async function fetchTopicContext(topic) {
  const preferredWiki = getLanguageMeta(selectedLanguage).wiki;
  const fallbackLanguages = hasCyrillic(topic) ? ["ru", "en"] : ["en", "ru"];
  const languages = [...new Set([preferredWiki, ...fallbackLanguages])];

  for (const language of languages) {
    const context = await fetchWikipediaContext(topic, language);
    if (context) return context;
  }

  return null;
}

async function fetchWikipediaContext(topic, language) {
  const params = new URLSearchParams({
    action: "query",
    origin: "*",
    format: "json",
    generator: "search",
    gsrsearch: topic,
    gsrlimit: "1",
    prop: "extracts|info",
    exintro: "1",
    explaintext: "1",
    inprop: "url",
    redirects: "1"
  });

  try {
    const response = await fetchWithTimeout(`https://${language}.wikipedia.org/w/api.php?${params}`, 6000);
    if (!response.ok) return null;

    const data = await response.json();
    const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
    const page = pages.find((item) => item.extract && item.title);
    if (!page) return null;

    const extract = normalizeExtract(page.extract);
    if (extract.length < 90) return null;

    const sentences = splitSentences(extract);
    return {
      title: page.title,
      extract,
      sentences,
      keyTerms: extractKeyTerms(`${page.title} ${extract}`),
      source: `Википедия ${language.toUpperCase()}`,
      url: page.fullurl ?? "",
      language
    };
  } catch (error) {
    return null;
  }
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

function getContextTemplates(domain) {
  const generic = {
    beginner: [
      contextItem("Определение", (c) => `Что такое ${c.title}?`, (c) => sentenceAt(c, 0)),
      contextItem("Главный факт", (c) => `Какой главный факт о теме "${c.title}" нужно запомнить первым?`, (c) => sentenceAt(c, 1, 0)),
      contextItem("Термины", (c) => `Какие слова и понятия чаще всего связаны с темой "${c.title}"?`, (c) => `В справке выделяются понятия: ${joinHuman(c.keyTerms.slice(0, 6))}.`),
      contextItem("Контекст", (c) => `В каком контексте обычно изучают ${c.title}?`, (c) => pickSentence(c, ["использ", "примен", "явля", "отно", "извест", "used", "known", "part", "type"], 2)),
      contextItem("Отличие", (c) => `С чем можно спутать ${c.title}, и как различить эти понятия?`, (c) => pickSentence(c, ["отлич", "называ", "пута", "также", "however", "also", "called"], 1)),
      contextItem("Пример", (c) => `Какой пример помогает понять тему "${c.title}"?`, (c) => pickSentence(c, ["пример", "включ", "например", "such as", "include"], 2)),
      contextItem("Практика", (c) => `Как применить знания о теме "${c.title}" в учебной задаче?`, (c) => `Составьте короткую карту: ${c.title} -> ${joinHuman(c.keyTerms.slice(0, 4))}, затем объясните каждую связь одним предложением.`),
      contextItem("Проверка", (c) => `Как проверить, что вы поняли ${c.title}?`, (c) => `Попробуйте пересказать факт: "${shorten(sentenceAt(c, 0), 150)}" и объяснить его без подсказок.`),
      contextItem("Причины", (c) => `Какие причины или условия важны для темы "${c.title}"?`, (c) => pickSentence(c, ["прич", "услов", "из-за", "because", "due to", "caused"], 1)),
      contextItem("Значение", (c) => `Почему тема "${c.title}" заслуживает внимания?`, (c) => pickSentence(c, ["важ", "извест", "знач", "использ", "important", "notable", "used"], 0)),
      contextItem("Связи", (c) => `С какими соседними понятиями связана тема "${c.title}"?`, (c) => `Ближайшие опорные слова: ${joinHuman(c.keyTerms.slice(0, 8))}. По ним удобно строить план изучения.`),
      contextItem("Итог", (c) => `Как сформулировать краткий вывод по теме "${c.title}"?`, (c) => shorten(c.extract, 220))
    ],
    intermediate: [
      contextItem("Структура", (c) => `Из каких частей или аспектов состоит тема "${c.title}"?`, (c) => `Разберите тему через опорные понятия: ${joinHuman(c.keyTerms.slice(0, 7))}.`),
      contextItem("Связи", (c) => `Как связаны главные факты о теме "${c.title}"?`, (c) => combineSentences(c, [0, 1])),
      contextItem("Классификация", (c) => `К какой группе, области или типу относится ${c.title}?`, (c) => pickSentence(c, ["явля", "отно", "тип", "класс", "род", "семейств", "is a", "type", "family"], 0)),
      contextItem("Функция", (c) => `Какую роль или функцию выполняет ${c.title}?`, (c) => pickSentence(c, ["использ", "служ", "роль", "функц", "used", "function", "role"], 1)),
      contextItem("Сравнение", (c) => `Чем ${c.title} отличается от похожих понятий?`, (c) => pickSentence(c, ["отлич", "однако", "также", "называ", "however", "unlike", "also"], 1)),
      contextItem("Доказательства", (c) => `Какие факты из справки подтверждают понимание темы "${c.title}"?`, (c) => combineSentences(c, [0, 2])),
      contextItem("Ограничения", (c) => `Где простое объяснение темы "${c.title}" может быть неполным?`, (c) => `Проверьте, не скрыты ли разные значения слова и связанные понятия: ${joinHuman(c.keyTerms.slice(0, 6))}.`),
      contextItem("Мини-проект", (c) => `Какой мини-проект поможет изучить ${c.title}?`, (c) => `Сделайте карточку темы: определение, 5 ключевых слов, 2 похожих понятия и один пример из справки.`),
      contextItem("Причины", (c) => `Какие условия, причины или происхождение важны для темы "${c.title}"?`, (c) => pickSentence(c, ["происх", "создан", "возник", "because", "origin", "formed"], 1)),
      contextItem("Ошибки", (c) => `Какую ошибку легко сделать при изучении "${c.title}"?`, (c) => `Легко запомнить только название. Лучше связать его с фактами: ${combineSentences(c, [0, 1])}`),
      contextItem("Вопросы", (c) => `Какие уточняющие вопросы стоит задать после первого знакомства с "${c.title}"?`, (c) => `Спросите: что это, к чему относится, где используется, чем отличается, и какие слова из списка ${joinHuman(c.keyTerms.slice(0, 4))} нужно объяснить.`),
      contextItem("Вывод", (c) => `Как объяснить ${c.title} человеку на одну ступень младше?`, (c) => shorten(c.extract, 240))
    ],
    advanced: [
      contextItem("Предпосылки", (c) => `Какие скрытые предпосылки есть в обычном объяснении темы "${c.title}"?`, (c) => `Проверьте, какие слова требуют определения: ${joinHuman(c.keyTerms.slice(0, 8))}. Без них объяснение может казаться ясным, но быть поверхностным.`),
      contextItem("Неоднозначность", (c) => `Есть ли у темы "${c.title}" разные значения или спорные границы?`, (c) => pickSentence(c, ["называ", "также", "может", "однако", "also", "may", "however", "called"], 1)),
      contextItem("Модель", (c) => `Как построить модель для анализа темы "${c.title}"?`, (c) => `Используйте узлы "${c.title}", ${joinHuman(c.keyTerms.slice(0, 5))}; затем подпишите связи между ними.`),
      contextItem("Критика", (c) => `Как проверить качество источника о теме "${c.title}"?`, (c) => `Сравните определение из справки с другими источниками и проверьте факты: ${combineSentences(c, [0, 1])}`),
      contextItem("Исключения", (c) => `Какие исключения или уточнения могут усложнить тему "${c.title}"?`, (c) => pickSentence(c, ["однако", "несмотря", "кроме", "although", "however", "despite"], 2)),
      contextItem("Синтез", (c) => `Как связать ${c.title} с другой областью знания?`, (c) => `Возьмите два ключевых слова - ${joinHuman(c.keyTerms.slice(0, 2))} - и найдите, как они встречаются в соседних темах.`),
      contextItem("Метод", (c) => `Как исследовать тему "${c.title}" глубже?`, (c) => `Соберите определения, историю/происхождение, классификацию, применение и спорные места. Начните с: ${shorten(c.extract, 180)}`),
      contextItem("Контраргумент", (c) => `Какой популярный тезис о "${c.title}" стоит проверить критически?`, (c) => `Проверьте слишком простые утверждения через конкретные факты справки и связанные термины: ${joinHuman(c.keyTerms.slice(0, 6))}.`),
      contextItem("Данные", (c) => `Какие данные нужны, чтобы говорить о "${c.title}" точно?`, (c) => `Нужны определение, контекст, источник и проверяемые признаки. В справке уже есть отправная точка: ${sentenceAt(c, 0)}`),
      contextItem("Сравнение", (c) => `С чем лучше всего сравнить ${c.title} для глубокого понимания?`, (c) => `Выберите похожее понятие из ключевых слов: ${joinHuman(c.keyTerms.slice(0, 5))}, и сравните признаки.`),
      contextItem("Риски", (c) => `Что можно неправильно понять в теме "${c.title}"?`, (c) => `Риск - запомнить одно предложение без контекста. Сравните несколько фактов: ${combineSentences(c, [0, 1, 2])}`),
      contextItem("Вывод", (c) => `Какой сильный итоговый вопрос можно задать по теме "${c.title}"?`, (c) => `Как определение, контекст и связанные понятия вместе объясняют, почему "${c.title}" важно изучать?`)
    ]
  };

  const plantFood = {
    beginner: [
      contextItem("Что это", (c) => `Что такое ${c.title}?`, (c) => plantDefinitionAnswer(c), () => "Это базовый факт: сначала нужно понять, какой объект вы изучаете."),
      contextItem("Классификация", (c) => `К какой биологической группе относится ${c.title}?`, (c) => plantClassificationAnswer(c), () => "Классификация показывает родство с другими растениями и помогает не путать бытовое название с научным."),
      contextItem("Строение", (c) => `Какие части или признаки важны у ${c.title}?`, (c) => plantStructureAnswer(c), () => "Строение помогает понять, почему растение выглядит и используется именно так."),
      contextItem("Название", (c) => `Почему название "${c.title}" может путать новичков?`, (c) => plantNamingAnswer(c), () => "У растений часто есть бытовые, сортовые и научные названия, и они не всегда совпадают."),
      contextItem("Выращивание", (c) => `Какие условия важны для выращивания ${c.title}?`, (c) => plantConditionsAnswer(c), () => "Условия выращивания объясняют, почему урожай зависит не только от самого растения."),
      contextItem("Использование", (c) => `Как человек использует ${c.title}?`, (c) => plantUseAnswer(c), () => "Использование связывает тему с питанием, хозяйством или культурой."),
      contextItem("Термины", (c) => `Какие термины помогут изучить ${c.title}?`, (c) => `Опорные слова: ${joinHuman(c.keyTerms.slice(0, 6))}.`, () => "Эти слова стоит выучить, чтобы понимать дальнейшие объяснения."),
      contextItem("Проверка", (c) => `Как проверить, что вы поняли тему "${c.title}"?`, (c) => `Назовите определение, классификацию, важный признак строения и один способ использования.`, () => "Если вы можете связать эти четыре пункта, тема уже не выглядит случайным набором фактов.")
    ],
    intermediate: [
      contextItem("Биология", (c) => `Как биологическая классификация помогает понять ${c.title}?`, (c) => pickSentence(c, ["семейств", "род", "вид", "species", "genus", "family"], 0)),
      contextItem("Жизненный цикл", (c) => `Какой жизненный цикл или способ размножения связан с темой "${c.title}"?`, (c) => pickSentence(c, ["размнож", "сем", "цвет", "ус", "seed", "reproduc", "flower"], 2)),
      contextItem("Условия", (c) => `Какие условия влияют на качество или рост ${c.title}?`, (c) => pickSentence(c, ["климат", "почв", "вод", "темпера", "climate", "soil", "water"], 2)),
      contextItem("Пищевое значение", (c) => `Какую роль ${c.title} играет в питании или кулинарии?`, (c) => pickSentence(c, ["пищ", "десерт", "еда", "food", "culinary", "edible"], 1)),
      contextItem("Различия", (c) => `Чем ${c.title} отличается от похожих растений или продуктов?`, (c) => pickSentence(c, ["отлич", "называ", "также", "variety", "also", "called"], 1)),
      contextItem("Наблюдение", (c) => `Какой простой опыт поможет изучить ${c.title}?`, (c) => `Сравните два образца или растения по признакам: ${joinHuman(c.keyTerms.slice(0, 5))}, и запишите различия.`),
      contextItem("Ошибки", (c) => `Какую ошибку легко сделать при изучении "${c.title}"?`, (c) => `Не ограничивайтесь бытовым названием; проверьте ботаническое значение и связанные термины.`),
      contextItem("Схема", (c) => `Какую схему стоит нарисовать по теме "${c.title}"?`, (c) => `Схема: название -> классификация -> строение -> условия роста -> использование.`)
    ],
    advanced: generic.advanced
  };

  const ecosystem = {
    beginner: [
      contextItem("Определение", (c) => `Что такое ${c.title} как природная система?`, (c) => sentenceAt(c, 0)),
      contextItem("Условия", (c) => `Какие условия формируют ${c.title}?`, (c) => pickSentence(c, ["moisture", "rain", "climate", "влаж", "дожд", "климат"], 1)),
      contextItem("Живые организмы", (c) => `Какие живые организмы или группы связаны с ${c.title}?`, (c) => pickSentence(c, ["species", "biotic", "plants", "animals", "вид", "раст", "живот"], 1)),
      contextItem("Типы", (c) => `Какие типы или разновидности есть у темы "${c.title}"?`, (c) => pickSentence(c, ["classified", "types", "tropical", "temperate", "классифиц", "тип"], 2)),
      contextItem("Значение", (c) => `Почему ${c.title} важен для природы?`, (c) => pickSentence(c, ["species", "biodiversity", "carbon", "climate", "биоразно", "климат"], 1)),
      contextItem("Угрозы", (c) => `Какие угрозы или изменения могут влиять на ${c.title}?`, (c) => pickSentence(c, ["deforestation", "threat", "loss", "выруб", "угроз", "сокращ"], 3)),
      contextItem("Термины", (c) => `Какие термины помогут изучить ${c.title}?`, (c) => `Опорные слова: ${joinHuman(c.keyTerms.slice(0, 6))}.`),
      contextItem("Проверка", (c) => `Как проверить, что вы поняли ${c.title}?`, (c) => `Объясните условия, живые компоненты, типы и значение этой природной системы.`)
    ],
    intermediate: [
      contextItem("Структура", (c) => `Из каких слоев, компонентов или процессов состоит ${c.title}?`, (c) => `Разберите тему через опорные понятия: ${joinHuman(c.keyTerms.slice(0, 7))}.`),
      contextItem("Причины", (c) => `Почему ${c.title} возникает именно при таких условиях?`, (c) => pickSentence(c, ["rain", "moisture", "climate", "temperature", "дожд", "влаж", "темпера"], 1)),
      contextItem("Биоразнообразие", (c) => `Как ${c.title} связан с биоразнообразием?`, (c) => pickSentence(c, ["species", "biodiversity", "biotic", "вид", "биоразно"], 1)),
      contextItem("Сравнение", (c) => `Чем ${c.title} отличается от похожих природных зон?`, (c) => pickSentence(c, ["classified", "tropical", "temperate", "types", "классифиц", "тип"], 2)),
      contextItem("Влияние человека", (c) => `Как деятельность человека может менять ${c.title}?`, (c) => pickSentence(c, ["deforestation", "human", "loss", "выруб", "человек", "угроз"], 3)),
      contextItem("Мини-проект", (c) => `Какой мини-проект поможет изучить ${c.title}?`, (c) => `Сделайте карту: климат -> растения -> животные -> круговороты -> угрозы, затем подпишите факты из справки.`),
      contextItem("Данные", (c) => `Какие данные нужны, чтобы изучать ${c.title} точно?`, (c) => `Нужны данные о климате, видах, площади, изменениях во времени и влиянии человека.`),
      contextItem("Вывод", (c) => `Как коротко объяснить роль ${c.title}?`, (c) => shorten(c.extract, 240))
    ],
    advanced: generic.advanced
  };

  const person = {
    beginner: [
      contextItem("Кто это", (c) => `Кто такой/такая ${c.title}?`, (c) => sentenceAt(c, 0)),
      contextItem("Известность", (c) => `Чем ${c.title} известен/известна?`, (c) => pickSentence(c, ["known", "famous", "извест", "лауреат", "автор"], 0)),
      contextItem("Область", (c) => `В какой области работал или работает ${c.title}?`, (c) => pickSentence(c, ["actor", "writer", "scientist", "politician", "музыкан", "писател", "учен", "полит"], 0)),
      contextItem("Факты", (c) => `Какие 3 факта нужно запомнить о ${c.title}?`, (c) => combineSentences(c, [0, 1, 2])),
      contextItem("Контекст", (c) => `Почему ${c.title} важен/важна в своей области?`, (c) => pickSentence(c, ["known", "notable", "award", "извест", "важ", "прем"], 1)),
      contextItem("Термины", (c) => `Какие имена, места или понятия связаны с ${c.title}?`, (c) => `Опорные слова: ${joinHuman(c.keyTerms.slice(0, 6))}.`)
    ],
    intermediate: generic.intermediate,
    advanced: generic.advanced
  };

  const place = {
    beginner: [
      contextItem("Где это", (c) => `Где находится ${c.title}?`, (c) => pickSentence(c, ["located", "city", "country", "region", "наход", "город", "страна", "регион"], 0)),
      contextItem("Что это", (c) => `Что представляет собой ${c.title}?`, (c) => sentenceAt(c, 0)),
      contextItem("Известность", (c) => `Чем ${c.title} известно?`, (c) => pickSentence(c, ["known", "capital", "largest", "извест", "столица", "крупн"], 1)),
      contextItem("География", (c) => `Какие географические признаки важны для ${c.title}?`, (c) => pickSentence(c, ["river", "mountain", "coast", "climate", "река", "гора", "климат"], 1)),
      contextItem("Люди", (c) => `Что важно знать о населении или культуре ${c.title}?`, (c) => pickSentence(c, ["population", "culture", "language", "населен", "культур", "язык"], 2)),
      contextItem("Термины", (c) => `Какие слова помогут изучить ${c.title}?`, (c) => `Опорные слова: ${joinHuman(c.keyTerms.slice(0, 6))}.`)
    ],
    intermediate: generic.intermediate,
    advanced: generic.advanced
  };

  const event = {
    beginner: [
      contextItem("Событие", (c) => `Что произошло в теме "${c.title}"?`, (c) => sentenceAt(c, 0)),
      contextItem("Участники", (c) => `Кто или какие стороны участвовали в "${c.title}"?`, (c) => pickSentence(c, ["between", "forces", "army", "party", "между", "войск", "сторон"], 1)),
      contextItem("Причины", (c) => `Какие причины привели к "${c.title}"?`, (c) => pickSentence(c, ["cause", "because", "led to", "прич", "из-за", "привел"], 1)),
      contextItem("Ход", (c) => `Какие ключевые этапы были у "${c.title}"?`, (c) => combineSentences(c, [0, 1, 2])),
      contextItem("Последствия", (c) => `Какие последствия имело "${c.title}"?`, (c) => pickSentence(c, ["result", "after", "led", "послед", "результ", "после"], 2)),
      contextItem("Термины", (c) => `Какие термины и имена связаны с "${c.title}"?`, (c) => `Опорные слова: ${joinHuman(c.keyTerms.slice(0, 6))}.`)
    ],
    intermediate: generic.intermediate,
    advanced: generic.advanced
  };

  const frames = {
    ecosystem,
    event,
    person,
    place,
    plantFood,
    generic
  };

  return frames[domain] ?? generic;
}

function quizItem(focus, question, answer, explanation) {
  return {
    focus,
    question: () => question,
    answer: () => answer,
    explanation: () => explanation
  };
}

function profileQuizItem(focus, question, answer, explanation) {
  return { focus, question, answer, explanation };
}

function contextItem(focus, question, answer, explanation) {
  return {
    focus,
    question,
    answer,
    explanation: explanation ?? ((context) => supportingDetail(context, answer(context)))
  };
}

function inferContextDomain(context) {
  const text = `${context.title} ${context.extract}`.toLowerCase();
  if (/(forest|rainforest|ecosystem|biome|habitat|biodiversity|лес|экосистем|биом|среда обит|биоразно)/iu.test(text)) {
    return "ecosystem";
  }
  if (/(war|battle|revolution|conflict|invasion|treaty|война|битва|революц|конфликт|договор)/iu.test(text)) {
    return "event";
  }
  if (/(born|died|actor|writer|scientist|politician|singer|родил|умер|актер|актёр|писател|учен|учён|политик|пев)/iu.test(text)) {
    return "person";
  }
  if (/(city|country|capital|located|population|province|region|город|страна|столица|находится|население|провинц|регион)/iu.test(text)) {
    return "place";
  }
  if (/(plant|fruit|berry|vegetable|edible|cultivat|crop|раст|плод|ягод|овощ|фрукт|съедоб|культив|урож)/iu.test(text)) {
    return "plantFood";
  }

  return "generic";
}

function plantDefinitionAnswer(context) {
  const sentence = sentenceAt(context, 0);
  return shorten(sentence, 220);
}

function plantClassificationAnswer(context) {
  const text = context.extract;
  const genusFamily = text.match(/вид(?:ом)?\s+рода\s+([^,.—;]+).*?семейств[ао]\s+([^,.—;]+)/iu);
  if (genusFamily) {
    return `Это вид рода ${genusFamily[1].trim()} семейства ${genusFamily[2].trim()}.`;
  }

  const family = text.match(/семейств[ао]\s+([^,.—;]+)/iu);
  if (family) return `Относится к семейству ${family[1].trim()}.`;

  const englishFamily = text.match(/species\s+of\s+[^.]*?\bfamily\s+([A-Z][A-Za-z-]+)/iu);
  if (englishFamily) return `It is a species in the family ${englishFamily[1].trim()}.`;

  return pickSentence(context, ["семейств", "род", "вид", "species", "genus", "family"], 0);
}

function plantStructureAnswer(context) {
  const fruitSentence = findSentence(context, ["плод", "семя", "семен", "мякот", "кора", "цвет", "fruit", "seed", "flesh", "rind", "flower"]);
  if (fruitSentence) return fruitSentence;

  const terms = context.keyTerms.filter((term) => /плод|семя|семен|лист|цвет|корень|fruit|seed|leaf|flower|root/iu.test(term));
  if (terms.length) return `Важные части и признаки: ${joinHuman(terms.slice(0, 5))}.`;

  return "Обратите внимание на форму, наружную оболочку, мякоть, семена и другие видимые признаки.";
}

function plantConditionsAnswer(context) {
  const sentence = findSentence(context, ["выращ", "культив", "почва", "полив", "темпера", "климат", "grow", "cultivat", "soil", "water", "climate"]);
  if (sentence) return sentence;
  return "Для выращивания важны сорт, свет, температура, вода, почва и защита от болезней.";
}

function plantUseAnswer(context) {
  const sentence = findSentence(context, ["пищ", "еда", "кулинар", "съед", "использ", "food", "edible", "culinary", "used"]);
  if (sentence) return sentence;
  return "Человек использует эту культуру в питании, кулинарии и сельском хозяйстве.";
}

function plantNamingAnswer(context) {
  const sentence = findSentence(context, ["называ", "также", "сорт", "столов", "кормов", "called", "also", "variety"]);
  if (sentence && !factsAreSimilar(sentence, sentenceAt(context, 0))) return sentence;
  return "Название может путать, потому что бытовые, сортовые и научные названия не всегда обозначают одно и то же.";
}

function normalizeExtract(extract) {
  return extract
    .normalize("NFD")
    .replace(/[\u0300\u0301]/gu, "")
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .replace(/\[\d+\]/g, "")
    .trim();
}

function splitSentences(text) {
  const protectedText = text
    .replace(/(^|[\s(])(лат|англ|рус|нем|фр|исп|ит|греч|др|им|рис|стр|см|г|в|н|э)\./giu, "$1$2§")
    .replace(/т\.\s?д\./giu, "т§ д§")
    .replace(/т\.\s?п\./giu, "т§ п§")
    .replace(/т\.\s?е\./giu, "т§ е§")
    .replace(/и\.\s?т\.\s?д\./giu, "и§ т§ д§")
    .replace(/([A-ZА-ЯЁ])\./gu, "$1§");

  const sentences = protectedText
    .match(/[^.!?]+[.!?]+|[^.!?]+$/gu)
    ?.map((sentence) => sentence.trim())
    .map((sentence) => sentence.replaceAll("§", "."))
    .filter((sentence) => sentence.length > 24 && !isBrokenSentence(sentence)) ?? [text];

  return uniqueFacts(sentences);
}

function sentenceAt(context, index, fallbackIndex = 0) {
  return context.sentences[index] ?? context.sentences[fallbackIndex] ?? context.extract;
}

function combineSentences(context, indexes) {
  const sentences = indexes.map((index) => context.sentences[index]).filter(Boolean);
  return sentences.length ? shorten(sentences.join(" "), 280) : shorten(context.extract, 280);
}

function supportingDetail(context, answer) {
  const normalizedAnswer = normalizeTopicKey(answer).slice(0, 80);
  const detail = context.sentences.find((sentence) => {
    const normalizedSentence = normalizeTopicKey(sentence);
    return normalizedSentence && !normalizedSentence.includes(normalizedAnswer);
  });

  if (detail) return detail;
  if (context.keyTerms.length) return `Связанные понятия: ${joinHuman(context.keyTerms.slice(0, 6))}.`;
  return "Этот факт стоит связать с определением темы и проверить на примере.";
}

function makeUniqueFact(answer, context, usedAnswers, index) {
  if (!isWeakFact(answer) && !hasSimilarFact(usedAnswers, answer)) return answer;

  const pool = contextFactPool(context);
  const replacement = pool.find((fact, factIndex) =>
    factIndex >= index &&
    !isWeakFact(fact) &&
    !hasSimilarFact(usedAnswers, fact)
  ) ?? pool.find((fact) => !isWeakFact(fact) && !hasSimilarFact(usedAnswers, fact));

  return replacement ?? answer;
}

function makeUniqueDetail(answer, context, usedAnswers, usedExplanations) {
  const pool = contextFactPool(context);
  const detail = pool.find((fact) =>
    !factsAreSimilar(answer, fact) &&
    !hasSimilarFact(usedAnswers, fact) &&
    !hasSimilarFact(usedExplanations, fact)
  );

  if (detail) return detail;
  if (context.keyTerms.length) return `Связанные понятия для повторения: ${joinHuman(context.keyTerms.slice(0, 6))}.`;
  return "Этот ответ стоит проверить на примере и связать с определением темы.";
}

function contextFactPool(context) {
  if (context.factPool) return context.factPool;

  context.factPool = uniqueFacts([
    plantClassificationAnswer(context),
    plantStructureAnswer(context),
    plantUseAnswer(context),
    plantConditionsAnswer(context),
    ...context.sentences,
    context.extract,
    context.keyTerms.length ? `Ключевые понятия: ${joinHuman(context.keyTerms.slice(0, 8))}.` : ""
  ]).filter((fact) => !isWeakFact(fact));

  return context.factPool;
}

function uniqueFacts(facts) {
  const seen = new Set();
  const result = [];

  facts.filter(Boolean).forEach((fact) => {
    const cleaned = cleanExplanation(fact);
    const key = factKey(cleaned);
    if (!key || seen.has(key)) return;
    seen.add(key);
    result.push(cleaned);
  });

  return result;
}

function factKey(value) {
  return normalizeTopicKey(String(value)).slice(0, 140);
}

function hasSimilarFact(keys, value) {
  return [...keys].some((key) => factsAreSimilar(key, value));
}

function factsAreSimilar(left, right) {
  const leftKey = factKey(left);
  const rightKey = factKey(right);
  if (!leftKey || !rightKey) return false;
  if (leftKey === rightKey) return true;

  const shorter = leftKey.length < rightKey.length ? leftKey : rightKey;
  const longer = leftKey.length < rightKey.length ? rightKey : leftKey;
  return shorter.length > 110 && longer.includes(shorter);
}

function isWeakFact(value) {
  const text = String(value).trim();
  if (text.length < 28) return true;
  if (/(^|[\s(])(лат|англ|рус|нем|фр|др)\.$/iu.test(text)) return true;
  if (/^[\p{L}\s-]+$/u.test(text) && text.split(/\s+/).length < 4) return true;
  return isBrokenSentence(text);
}

function isBrokenSentence(value) {
  return /\b(лат|англ|рус|нем|фр|др)\.$/iu.test(value.trim()) || /[,—-]\s*$/.test(value.trim());
}

function pickSentence(context, patterns, fallbackIndex = 0) {
  const found = findSentence(context, patterns);

  return found ?? sentenceAt(context, fallbackIndex);
}

function findSentence(context, patterns) {
  return context.sentences.find((sentence) => {
    const lower = sentence.toLowerCase();
    return patterns.some((pattern) => lower.includes(pattern));
  });
}

function cleanExplanation(value) {
  return shorten(String(value).replace(/\s+/g, " ").trim(), 320);
}

function shorten(value, maxLength) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trim()}...`;
}

function repeatToCount(items, count) {
  const repeated = [];
  while (repeated.length < count) {
    repeated.push(...items);
  }
  return repeated;
}

function hasCyrillic(value) {
  return /[а-яё]/iu.test(value);
}

function extractKeyTerms(text) {
  const stopWords = new Set([
    "который", "которая", "которые", "также", "является", "были", "было", "была", "этого", "этот", "этой", "могут", "может", "после",
    "через", "между", "однако", "часто", "более", "менее", "самый", "самая", "такие", "таких", "виде", "быть", "белая", "белой",
    "the", "and", "that", "with", "from",
    "this", "these", "those", "which", "also", "were", "was", "have", "has", "been", "often", "more", "most", "such", "into"
  ]);
  const words = text
    .toLowerCase()
    .replaceAll("ё", "е")
    .match(/[a-zа-я0-9]{4,}/gu) ?? [];
  const counts = new Map();

  words.forEach((word) => {
    if (stopWords.has(word)) return;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)
    .map(([word]) => word);
}

function findTopicBank(topic) {
  const topicKey = normalizeTopicKey(topic);
  const topicWords = normalizeTopicWords(topic);
  return topicBanks.find((bank) =>
    bank.aliases.some((alias) => matchesAlias(topicKey, topicWords, alias)) ||
    bank.matcher?.(topicKey)
  );
}

function findTopicProfile(topic) {
  const topicKey = normalizeTopicKey(topic);
  const topicWords = normalizeTopicWords(topic);
  return topicProfiles.find((profile) =>
    profile.aliases.some((alias) => matchesAlias(topicKey, topicWords, alias)) ||
    profile.matcher?.(topicKey)
  );
}

function matchesAlias(topicKey, topicWords, alias) {
  const aliasKey = normalizeTopicKey(alias);
  if (aliasKey.length <= 3) {
    return topicKey === aliasKey || topicWords.includes(aliasKey);
  }

  return topicKey.includes(aliasKey);
}

function createTopicProfile(profile) {
  return {
    aliases: [],
    matcher: null,
    essentials: ["ключевые понятия", "примеры", "связи"],
    process: "выделить главные элементы, понять связи и проверить на примере",
    example: "конкретный случай, где тема объясняет наблюдаемый результат",
    application: "в учебных и практических задачах",
    commonMistake: "учить отдельные факты без связи с условиями применения",
    comparison: "соседней областью, где похожие слова имеют другой смысл",
    variables: "условия, контекст, исходные данные и выбранная модель",
    evidence: "надежные источники, наблюдения, примеры и проверяемые результаты",
    model: "схема элементов и связей",
    advancedIssue: "границы применимости модели и спорные интерпретации",
    experiment: "разобрать один пример, изменить условие и сравнить результат",
    ethics: "любое знание важно применять с учетом людей, контекста и последствий",
    ...profile
  };
}

function joinHuman(items) {
  if (!items.length) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} и ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} и ${items.at(-1)}`;
}

function normalizeTopicKey(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300\u0301]/gu, "")
    .normalize("NFC")
    .toLowerCase()
    .replaceAll("ё", "е")
    .replace(/[^a-zа-я0-9]+/gu, "");
}

function normalizeTopicWords(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300\u0301]/gu, "")
    .normalize("NFC")
    .toLowerCase()
    .replaceAll("ё", "е")
    .match(/[a-zа-я0-9]+/gu) ?? [];
}

function hashTopic(topic) {
  return [...topic].reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);
}

function fillTopic(template, topic) {
  return template.replaceAll("{topic}", topic);
}

function getFocusLabel(difficulty, index) {
  const labels = {
    beginner: ["Определение", "Пример", "Термины", "Самопроверка"],
    intermediate: ["Сравнение", "Применение", "Аргументы", "Практика"],
    advanced: ["Критика", "Модель", "Исследование", "Синтез"]
  };

  const pool = labels[difficulty] ?? labels.beginner;
  return pool[index % pool.length];
}

function renderResults(topic, difficulty, results, source = "") {
  resultsTitle.textContent = `${topic}: ${difficultyLabels[difficulty]}`;
  sourceLine.textContent = source ? `${t("sourceLabel")}: ${localizeSource(source)}` : "";
  sourceLine.hidden = !source;
  emptyState.hidden = true;
  setExportState(true);

  const fragment = document.createDocumentFragment();
  results.forEach((result) => {
    const item = document.createElement("li");
    item.className = "question-card";

    const content = document.createElement("div");
    content.className = "question-content";

    const meta = document.createElement("div");
    meta.className = "meta-line";
    meta.textContent = result.focus;

    const title = document.createElement("h3");
    title.textContent = result.question;

    const answer = document.createElement("div");
    answer.className = "answer-box";

    const answerLabel = document.createElement("strong");
    answerLabel.textContent = t("answerLabel");

    const answerText = document.createElement("span");
    answerText.textContent = result.answer ?? result.explanation;

    answer.append(answerLabel, answerText);

    const explanation = document.createElement("p");
    explanation.textContent = result.explanation;

    content.append(meta, title, answer, explanation);
    item.append(content);
    fragment.append(item);
  });

  list.replaceChildren(fragment);
}

function setExportState(isEnabled) {
  copyButton.disabled = !isEnabled;
  txtButton.disabled = !isEnabled;
  pdfButton.disabled = !isEnabled;
}

function setBusy(isBusy, message) {
  generateButton.disabled = isBusy;
  generateButton.querySelector("span").textContent = isBusy ? "..." : "+";
  statusLine.textContent = message;
}

function buildPlainText() {
  const topic = currentTopicTitle || normalizeTopic(topicInput.value);
  const difficulty = new FormData(form).get("difficulty");
  const lines = [
    `${t("topicExport")}: ${topic}`,
    `${t("difficultyExport")}: ${difficultyLabels[difficulty]}`,
    currentTopicSource ? `${t("sourceLabel")}: ${localizeSource(currentTopicSource)}` : "",
    "",
    ...currentResults.flatMap((item) => [
      `${item.id}. ${item.question}`,
      `${t("answerLabel")}: ${item.answer ?? item.explanation}`,
      `${t("explanationLabel")}: ${item.explanation}`,
      `${t("focusLabel")}: ${item.focus}`,
      ""
    ])
  ];

  return lines.join("\n").trim() + "\n";
}

function makeFilename(base, extension) {
  const topic = (currentTopicTitle || normalizeTopic(topicInput.value))
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 42);

  return `${base}-${topic || "topic"}.${extension}`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function openPrintExport() {
  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) {
    alert(t("popupAlert"));
    return;
  }

  const topic = escapeHtml(currentTopicTitle || normalizeTopic(topicInput.value));
  const difficulty = escapeHtml(difficultyLabels[new FormData(form).get("difficulty")]);
  const source = currentTopicSource ? `<p class="meta">${escapeHtml(t("sourceLabel"))}: ${escapeHtml(localizeSource(currentTopicSource))}</p>` : "";
  const rows = currentResults.map((item) => `
    <li>
      <h2>${item.id}. ${escapeHtml(item.question)}</h2>
      <p><strong>${escapeHtml(t("focusLabel"))}:</strong> ${escapeHtml(item.focus)}</p>
      <p><strong>${escapeHtml(t("answerLabel"))}:</strong> ${escapeHtml(item.answer ?? item.explanation)}</p>
      <p>${escapeHtml(item.explanation)}</p>
    </li>
  `).join("");

  printWindow.document.write(`
    <!doctype html>
    <html lang="${escapeHtml(selectedLanguage)}" dir="${escapeHtml(getLanguageMeta(selectedLanguage).dir ?? "ltr")}">
      <head>
        <meta charset="utf-8">
        <title>${topic} - ${escapeHtml(t("questionsTitle"))}</title>
        <style>
          @page { margin: 18mm; }
          body {
            color: #1f2933;
            font-family: Arial, sans-serif;
            line-height: 1.5;
          }
          h1 {
            margin: 0 0 8px;
            font-size: 28px;
          }
          .meta {
            margin: 0 0 22px;
            color: #5f6b76;
          }
          ol {
            display: grid;
            gap: 14px;
            margin: 0;
            padding-left: 22px;
          }
          li {
            break-inside: avoid;
          }
          h2 {
            margin: 0 0 6px;
            font-size: 17px;
          }
          p {
            margin: 4px 0;
          }
        </style>
      </head>
      <body>
        <h1>Учебные вопросы: ${topic}</h1>
        <p class="meta">Сложность: ${difficulty}</p>
        ${source}
        <ol>${rows}</ol>
        <script>
          window.addEventListener("load", () => {
            window.print();
          });
        <\/script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
