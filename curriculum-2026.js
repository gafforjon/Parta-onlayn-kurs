/*
 * Parta: Uzbekistan general school plan for 2026–2027.
 * Weekly hours and grade bands follow the ministry's Order No. 133 (10 Apr 2026).
 * The school-language selector is separate from the site's display-language switch.
 */
(() => {
  const plan = {
    version: "2026–2027",
    sources: [
      {
        label: ["Базовый учебный план Узбекистана на 2026–2027 год (приказ №133)", "O‘zbekistonning 2026–2027-o‘quv yili tayanch rejasi (133-son buyruq)"],
        url: "https://idum.uz/wp-content/uploads/max%20file/www.idum.uz__Tayanch_oquv_reja_2026-2027.pdf",
      },
      {
        label: ["Каталог программ по школьным предметам", "Maktab fanlari bo‘yicha o‘quv dasturlari katalogi"],
        url: "https://uzbmb.uz/page/o_dasturlar",
      },
      {
        label: ["Электронные учебники на EduPortal", "EduPortal elektron darsliklari"],
        url: "https://eduportal.uz/",
      },
    ],
    common: {
      read: [4, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0],
      lit: [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
      eng: [1, 2, 2, 2, 4, 4, 4, 3, 3, 2, 2],
      stories: [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
      ancient: [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
      hist: [0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1],
      whist: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      law: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      edu: Array(11).fill(1),
      math: [5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0],
      alg: [0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3],
      geom: [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
      inf: [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
      phys: [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2],
      astro: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      chem: [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2],
      bio: [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2],
      geog: [0, 0, 0, 0, 0, 0, 2, 1.5, 1.5, 2, 0],
      econ: [0, 0, 0, 0, 0, 0, 0, 0.5, 0.5, 0, 0],
      biz: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      nat: [1, 1, 1, 1, 2, 3, 0, 0, 0, 0, 0],
      music: [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      draw: [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      draft: [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      tech: [1, 1, 1, 1, 2, 2, 2, 1, 1, 0, 0],
      pe: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      mil: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    },
    tracks: {
      uz: {
        uz: [4, 4, 4, 4, 4, 4, 3, 3, 3, 2, 2],
        rus: [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      },
      ru: {
        rus: [4, 4, 4, 4, 3, 3, 2, 2, 2, 1, 1],
        uz: [0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3],
      },
    },
    order: [
      "uz", "rus", "read", "lit", "eng", "stories", "ancient", "hist", "whist", "law", "edu",
      "math", "alg", "geom", "inf", "nat", "phys", "astro", "chem", "bio", "geog", "econ", "biz",
      "music", "draw", "draft", "tech", "pe", "mil",
    ],
  };

  // These topic maps give students a grade-level route through the main strands.
  // The school's approved calendar plan and the current textbook remain authoritative.
  const scope = {
    math: {
      1: ["Числа и счёт до 20|20 gacha sonlar va sanash", "Сложение и вычитание в пределах 20|20 ichida qo‘shish va ayirish", "Длина, масса и время|Uzunlik, massa va vaqt", "Простые фигуры и узоры|Sodda shakllar va naqshlar"],
      2: ["Числа до 100 и разрядный состав|100 gacha sonlar va xona tarkibi", "Письменные сложение и вычитание|Ustun shaklida qo‘shish va ayirish", "Умножение и деление как группы|Ko‘paytirish va bo‘lish — teng guruhlar", "Измерения, деньги и геометрические фигуры|O‘lchash, pul va geometrik shakllar"],
      3: ["Многозначные числа и вычисления|Ko‘p xonali sonlar va hisoblash", "Таблица умножения и деление|Ko‘paytirish jadvali va bo‘lish", "Доли и простые дроби|Ulushlar va sodda kasrlar", "Периметр, площадь и измерения|Perimetr, yuza va o‘lchovlar"],
      4: ["Числа до миллиона и письменные действия|Milliongacha sonlar va yozma amallar", "Многозначное умножение и деление|Ko‘p xonali sonlarni ko‘paytirish va bo‘lish", "Дроби, величины и задачи|Kasrlar, kattaliklar va masalalar", "Углы, фигуры, периметр и площадь|Burchaklar, shakllar, perimetr va yuza"],
      5: ["Натуральные числа и делимость|Natural sonlar va bo‘linish alomatlari", "Обыкновенные дроби и действия с ними|Oddiy kasrlar va ular ustida amallar", "Десятичные дроби и величины|O‘nli kasrlar va kattaliklar", "Углы, многоугольники, периметр и площадь|Burchaklar, ko‘pburchaklar, perimetr va yuza"],
      6: ["Отношения, пропорции и проценты|Nisbat, proporsiya va foizlar", "Рациональные числа и координатная прямая|Ratsional sonlar va koordinata o‘qi", "Выражения, уравнения и задачи|Ifodalar, tenglamalar va masalalar", "Геометрические построения и площади|Geometrik yasashlar va yuzalar"],
      7: ["Рациональные числа и преобразование выражений|Ratsional sonlar va ifodalarni almashtirish", "Проценты, пропорции и линейные зависимости|Foizlar, proporsiyalar va chiziqli bog‘lanishlar", "Уравнения и задачи|Tenglamalar va masalalar", "Координаты, углы и геометрические фигуры|Koordinatalar, burchaklar va geometrik shakllar"],
    },
    alg: {
      8: ["Алгебраические дроби и выражения|Algebraik kasrlar va ifodalar", "Линейные и квадратные уравнения|Chiziqli va kvadrat tenglamalar", "Функции и графики|Funksiyalar va grafiklar", "Системы уравнений и текстовые задачи|Tenglamalar sistemasi va matnli masalalar"],
      9: ["Квадратные уравнения и неравенства|Kvadrat tenglamalar va tengsizliklar", "Функции, графики и преобразования|Funksiyalar, grafiklar va almashtirishlar", "Последовательности и прогрессии|Ketma-ketliklar va progressiyalar", "Тригонометрические выражения|Trigonometrik ifodalar"],
      10: ["Степени, корни и многочлены|Darajalar, ildizlar va ko‘phadlar", "Показательная и логарифмическая функции|Ko‘rsatkichli va logarifmik funksiyalar", "Тригонометрические функции и уравнения|Trigonometrik funksiyalar va tenglamalar", "Производная и исследование функций|Hosila va funksiyalarni tekshirish"],
      11: ["Тригонометрические и обратные функции|Trigonometrik va teskari funksiyalar", "Производная и её приложения|Hosila va uning tatbiqlari", "Первообразная и интеграл|Boshlang‘ich funksiya va integral", "Комбинаторика, вероятность и повторение|Kombinatorika, ehtimollik va takrorlash"],
    },
    geom: {
      8: ["Четырёхугольники и их свойства|To‘rtburchaklar va ularning xossalari", "Подобие треугольников|Uchburchaklar o‘xshashligi", "Теорема Пифагора и метрические соотношения|Pifagor teoremasi va metrik munosabatlar", "Окружность и вписанные углы|Aylana va ichki chizilgan burchaklar"],
      9: ["Векторы и координаты|Vektorlar va koordinatalar", "Преобразования плоскости|Tekislikdagi almashtirishlar", "Правильные многоугольники и окружность|Muntazam ko‘pburchaklar va aylana", "Площади и геометрические задачи|Yuzalar va geometrik masalalar"],
      10: ["Аксиомы стереометрии и прямые в пространстве|Stereometriya aksiomalari va fazodagi to‘g‘ri chiziqlar", "Параллельность и перпендикулярность в пространстве|Fazoda parallellik va perpendikulyarlik", "Многогранники и их сечения|Ko‘pyoqlar va ularning kesimlari", "Объёмы и площади поверхностей|Hajm va sirt yuzalari"],
      11: ["Цилиндр, конус и сфера|Silindr, konus va shar", "Объёмы и площади тел вращения|Aylanish jismlarining hajmi va sirt yuzi", "Координаты и векторы в пространстве|Fazoda koordinatalar va vektorlar", "Повторение планиметрии и стереометрии|Planimetriya va stereometriyani takrorlash"],
    },
    nat: {
      1: ["Наблюдения и свойства окружающих предметов|Kuzatishlar va atrofdagi buyumlarning xossalari", "Живое и неживое|Jonli va jonsiz tabiat", "Растения, животные и человек|O‘simliklar, hayvonlar va inson", "Погода, вода и забота о природе|Ob-havo, suv va tabiatni asrash"],
      2: ["Живые организмы и их среда|Tirik organizmlar va ularning muhiti", "Растения и сезонные изменения|O‘simliklar va fasliy o‘zgarishlar", "Вода, воздух и полезные ископаемые|Suv, havo va foydali qazilmalar", "Земля, Солнце и безопасность|Yer, Quyosh va xavfsizlik"],
      3: ["Человек и здоровье|Inson va salomatlik", "Растения, животные и экосистемы|O‘simliklar, hayvonlar va ekotizimlar", "Материалы, вода и воздух|Materiallar, suv va havo", "Земля, погода и природные ресурсы|Yer, ob-havo va tabiiy boyliklar"],
      4: ["Организм человека и здоровый образ жизни|Inson organizmi va sog‘lom turmush tarzi", "Разнообразие растений и животных|O‘simliklar va hayvonlar xilma-xilligi", "Земля, Солнечная система и природные явления|Yer, Quyosh tizimi va tabiat hodisalari", "Экосистемы и охрана природы|Ekotizimlar va tabiatni muhofaza qilish"],
      5: ["Исследование природы и научные модели|Tabiatni o‘rganish va ilmiy modellar", "Вещество, частицы и смеси|Modda, zarrachalar va aralashmalar", "Движение, силы и энергия|Harakat, kuchlar va energiya", "Живые системы, Земля и экология|Tirik tizimlar, Yer va ekologiya"],
      6: ["Измерения и строение вещества|O‘lchash va moddaning tuzilishi", "Силы, давление, тепло и свет|Kuchlar, bosim, issiqlik va yorug‘lik", "Клетки, организмы и биоразнообразие|Hujayralar, organizmlar va biologik xilma-xillik", "Земные оболочки, климат и ресурсы|Yer qobiqlari, iqlim va resurslar"],
    },
    inf: {
      1: ["Устройства вокруг нас|Atrofimizdagi qurilmalar", "Клавиатура, мышь и экран|Klaviatura, sichqoncha va ekran", "Алгоритмы из знакомых действий|Tanish amallardan tuzilgan algoritmlar", "Правила безопасной работы|Xavfsiz ishlash qoidalari"],
      2: ["Информация и цифровые устройства|Axborot va raqamli qurilmalar", "Файлы, рисунки и простые тексты|Fayllar, rasmlar va sodda matnlar", "Пошаговые алгоритмы|Bosqichma-bosqich algoritmlar", "Безопасность и цифровой этикет|Xavfsizlik va raqamli odob"],
      3: ["Данные и способы их представления|Ma’lumotlar va ularni ifodalash", "Текстовые и графические документы|Matnli va grafik hujjatlar", "Ветвления и повторения в алгоритмах|Algoritmlarda tarmoqlanish va takrorlash", "Ответственное использование интернета|Internetdan mas’uliyat bilan foydalanish"],
      4: ["Устройство компьютера и хранение данных|Kompyuter tuzilishi va ma’lumotlarni saqlash", "Текст, изображение и презентация|Matn, tasvir va taqdimot", "Алгоритмы и исполнители|Algoritmlar va ijrochilar", "Персональные данные и цифровая безопасность|Shaxsiy ma’lumotlar va raqamli xavfsizlik"],
      5: ["Информация и компьютерные системы|Axborot va kompyuter tizimlari", "Файловая система и поиск данных|Fayl tizimi va ma’lumot izlash", "Алгоритмы и блок-схемы|Algoritmlar va blok-sxemalar", "Сети и безопасная работа в интернете|Tarmoqlar va internetda xavfsiz ishlash"],
      6: ["Кодирование и измерение информации|Axborotni kodlash va o‘lchash", "Текстовые документы и презентации|Matnli hujjatlar va taqdimotlar", "Таблицы, формулы и диаграммы|Jadvallar, formulalar va diagrammalar", "Алгоритмы с условиями и циклами|Shartli va takrorlanuvchi algoritmlar"],
      7: ["Компьютерные сети и цифровые сервисы|Kompyuter tarmoqlari va raqamli xizmatlar", "Электронные таблицы и обработка данных|Elektron jadvallar va ma’lumotlarni qayta ishlash", "Основы программирования|Dasturlash asoslari", "Кибербезопасность и цифровая ответственность|Kiberxavfsizlik va raqamli mas’uliyat"],
      8: ["Моделирование и информационные системы|Modellashtirish va axborot tizimlari", "Программирование с данными и функциями|Ma’lumotlar va funksiyalar bilan dasturlash", "Базы данных и электронные таблицы|Ma’lumotlar bazasi va elektron jadvallar", "Интернет, авторское право и безопасность|Internet, mualliflik huquqi va xavfsizlik"],
      9: ["Алгоритмы и структуры данных|Algoritmlar va ma’lumotlar tuzilmalari", "Язык программирования и отладка|Dasturlash tili va xatolarni tuzatish", "Сети, веб-технологии и базы данных|Tarmoqlar, veb-texnologiyalar va bazalar", "Кибергигиена и защита данных|Kiber gigiyena va ma’lumotlarni himoya qilish"],
      10: ["Компьютерные системы и логика|Kompyuter tizimlari va mantiq", "Программные проекты и командная работа|Dasturiy loyihalar va jamoaviy ish", "Базы данных и автоматизация|Ma’lumotlar bazasi va avtomatlashtirish", "Искусственный интеллект, этика и безопасность|Sun’iy intellekt, etika va xavfsizlik"],
      11: ["Информационные системы и цифровая экономика|Axborot tizimlari va raqamli iqtisodiyot", "Алгоритмические методы и программирование|Algoritmik usullar va dasturlash", "Работа с данными и цифровые проекты|Ma’lumotlar bilan ishlash va raqamli loyihalar", "Кибербезопасность и ответственное применение ИИ|Kiberxavfsizlik va SIdan mas’uliyatli foydalanish"],
    },
    rus: {
      1: ["Звуки речи и буквы|Nutq tovushlari va harflar", "Слоги и простые слова|Bo‘g‘inlar va sodda so‘zlar", "Предложение и устная речь|Gap va og‘zaki nutq", "Списывание и короткие тексты|Ko‘chirib yozish va qisqa matnlar"],
      2: ["Звуки, ударение и орфограммы|Tovushlar, urg‘u va imlo", "Состав слова и части речи|So‘z tarkibi va so‘z turkumlari", "Предложение и текст|Gap va matn", "Связная речь и письмо|Izchil nutq va yozuv"],
      3: ["Состав слова и орфография|So‘z tarkibi va imlo", "Имя существительное и имя прилагательное|Ot va sifat", "Глагол и местоимение|Fe’l va olmosh", "Предложение, текст и изложение|Gap, matn va bayon"],
      4: ["Части речи и их грамматические признаки|So‘z turkumlari va grammatik belgilari", "Падежи и склонение|Kelishiklar va turlanish", "Времена глагола и спряжение|Fe’l zamonlari va tuslanishi", "Сложные предложения и связный текст|Qo‘shma gaplar va izchil matn"],
      5: ["Фонетика и орфоэпия|Fonetika va orfoepiya", "Морфемика и словообразование|Morfemika va so‘z yasalishi", "Имя существительное и прилагательное|Ot va sifat", "Предложение, текст и нормы речи|Gap, matn va nutq me’yorlari"],
      6: ["Лексика, фразеология и словообразование|Leksika, frazeologiya va so‘z yasalishi", "Имя существительное, прилагательное и числительное|Ot, sifat va son", "Местоимение и глагол|Olmosh va fe’l", "Орфография и типы речи|Imlo va nutq uslublari"],
      7: ["Причастие и деепричастие|Sifatdosh va ravishdosh", "Наречие и категория состояния|Ravish va holat kategoriyasi", "Служебные части речи|Yordamchi so‘z turkumlari", "Синтаксис простого предложения|Sodda gap sintaksisi"],
      8: ["Словосочетание и простое предложение|So‘z birikmasi va sodda gap", "Главные и второстепенные члены предложения|Gapning bosh va ikkinchi darajali bo‘laklari", "Односоставные предложения|Bir bosh bo‘lakli gaplar", "Пунктуация и культура речи|Tinish belgilari va nutq madaniyati"],
      9: ["Сложносочинённые предложения|Bog‘langan qo‘shma gaplar", "Сложноподчинённые предложения|Ergashgan qo‘shma gaplar", "Бессоюзные сложные предложения|Bog‘lovchisiz qo‘shma gaplar", "Стили речи, изложение и сочинение|Nutq uslublari, bayon va insho"],
      10: ["Нормы современного литературного языка|Hozirgi adabiy til me’yorlari", "Синтаксис и пунктуация сложного предложения|Qo‘shma gap sintaksisi va punktuatsiya", "Функциональные стили и редактирование текста|Nutq uslublari va matn tahriri", "Академическое письмо и аргументация|Akademik yozuv va dalillash"],
      11: ["Система языка и языковые нормы|Til tizimi va til me’yorlari", "Стилистика, выразительность и редактирование|Uslubiyat, ifodalilik va tahrir", "Текст, аргументация и публичная речь|Matn, dalillash va ommaviy nutq", "Итоговое повторение и грамотное письмо|Yakuniy takrorlash va savodli yozuv"],
    },
    uz: {
      1: ["Tovush va harf|Звук и буква", "Bo‘g‘in va sodda so‘zlar|Слог и простые слова", "Gap va og‘zaki nutq|Предложение и устная речь", "Husnixat va qisqa matn|Каллиграфия и короткий текст"],
      2: ["Unli va undosh tovushlar|Гласные и согласные звуки", "So‘z va gap|Слово и предложение", "Ot va sifat haqida boshlang‘ich tushuncha|Начальное понятие об имени и прилагательном", "Matn tuzish va imlo|Составление текста и правописание"],
      3: ["So‘z tarkibi va qo‘shimchalar|Состав слова и аффиксы", "Ot, sifat va son|Имя существительное, прилагательное и числительное", "Fe’l va zamon|Глагол и время", "Gap bo‘laklari va matn|Члены предложения и текст"],
      4: ["So‘z turkumlari|Части речи", "Kelishik va egalik qo‘shimchalari|Падежные и притяжательные аффиксы", "Fe’l shakllari va gap tuzilishi|Формы глагола и строение предложения", "Matn, bayon va imlo|Текст, изложение и правописание"],
      5: ["Fonetika va imlo|Фонетика и правописание", "Leksik ma’no va iboralar|Лексическое значение и выражения", "So‘z tarkibi va so‘z yasalishi|Состав слова и словообразование", "So‘z turkumlari va gap|Части речи и предложение"],
      6: ["Leksikologiya va uslubiy qatlamlar|Лексикология и стилистические слои", "Morfemika va so‘z yasalishi|Морфемика и словообразование", "Mustaqil so‘z turkumlari|Самостоятельные части речи", "Matn tahlili va nutq me’yorlari|Анализ текста и нормы речи"],
      7: ["Morfologiya va fe’l shakllari|Морфология и формы глагола", "Ravish va yordamchi so‘zlar|Наречие и служебные слова", "So‘z birikmasi va sodda gap|Словосочетание и простое предложение", "Nutq uslublari va matn yaratish|Стили речи и создание текста"],
      8: ["Gap bo‘laklari va sintaksis|Члены предложения и синтаксис", "Uyushiq bo‘laklar va ajratilgan qurilmalar|Однородные члены и обособленные конструкции", "Qo‘shma gapga kirish|Введение в сложное предложение", "Tinish belgilari va nutq madaniyati|Пунктуация и культура речи"],
      9: ["Qo‘shma gap turlari|Виды сложных предложений", "Bog‘lovchisiz va ergash gapli qurilmalar|Бессоюзные и сложноподчинённые конструкции", "Uslubiyat va matn tahriri|Стилистика и редактирование текста", "Insho, bayon va dalillash|Сочинение, изложение и аргументация"],
      10: ["Adabiy til me’yorlari|Нормы литературного языка", "Sintaksis va punktuatsiya|Синтаксис и пунктуация", "Matn uslublari va tahrir|Стили текста и редактирование", "Akademik yozuv va nutq|Академическое письмо и речь"],
      11: ["Til sathlari va nutq me’yorlari|Ярусы языка и нормы речи", "Uslubiyat va badiiy ifoda|Стилистика и художественная выразительность", "Matn yaratish va ommaviy nutq|Создание текста и публичная речь", "Yakuniy takrorlash|Итоговое повторение"],
    },
    read: {
      1: ["Harf, bo‘g‘in va so‘zni ravon o‘qish|Плавное чтение букв, слогов и слов", "Matn mazmunini tushunish|Понимание содержания текста", "Qahramon va voqeani aniqlash|Определение героя и события", "She’r va ertaklarni ifodali o‘qish|Выразительное чтение стихов и сказок"],
      2: ["Hikoya va ertakni tushunish|Понимание рассказа и сказки", "Asosiy fikr va tafsilotlar|Главная мысль и детали", "Qahramonlarning xatti-harakati|Поступки героев", "Ifodali o‘qish va qisqa qayta hikoya|Выразительное чтение и краткий пересказ"],
      3: ["Badiiy va axborot matnlari|Художественные и информационные тексты", "Voqealar ketma-ketligi|Последовательность событий", "Matndan dalil topish|Поиск доказательств в тексте", "Reja tuzish va qayta hikoyalash|Составление плана и пересказ"],
      4: ["Matn turi va tuzilishi|Тип и структура текста", "Asosiy fikr, sabab va xulosa|Главная мысль, причина и вывод", "Qahramon va muallif nuqtayi nazari|Герой и точка зрения автора", "Mustaqil o‘qish va fikrni asoslash|Самостоятельное чтение и обоснование мнения"],
    },
    lit: {
      5: ["Xalq og‘zaki ijodi va ertaklar|Устное народное творчество и сказки", "She’r va hikoya janrlari|Жанры стихотворения и рассказа", "Asar qahramoni va voqealar|Герой произведения и события", "Ifodali o‘qish va sodda tahlil|Выразительное чтение и простой анализ"],
      6: ["Afsona, rivoyat va xalq dostonlari|Легенды, предания и народные эпосы", "She’riy va nasriy asarlar|Стихотворные и прозаические произведения", "Obraz, mavzu va g‘oya|Образ, тема и идея", "O‘zbek va jahon adabiyoti|Узбекская и мировая литература"],
      7: ["Mumtoz adabiyot namunalari|Образцы классической литературы", "She’riy san’at va badiiy tasvir|Поэтические приёмы и художественный образ", "Hikoya va qissa tahlili|Анализ рассказа и повести", "Muallif uslubi va davr|Стиль автора и эпоха"],
      8: ["Mumtoz va zamonaviy adabiyot|Классическая и современная литература", "Lirik asar va she’riy obraz|Лирическое произведение и поэтический образ", "Nasriy asar kompozitsiyasi|Композиция прозаического произведения", "Mavzu, g‘oya va qahramonlar tizimi|Тема, идея и система персонажей"],
      9: ["Adabiy davrlar va yo‘nalishlar|Литературные эпохи и направления", "Janr va kompozitsiya|Жанр и композиция", "Badiiy til va muallif pozitsiyasi|Художественный язык и позиция автора", "Qiyosiy tahlil va insho|Сравнительный анализ и сочинение"],
      10: ["O‘zbek adabiyoti taraqqiyot bosqichlari|Этапы развития узбекской литературы", "Jahon adabiyoti va adabiy jarayon|Мировая литература и литературный процесс", "Badiiy asar tahlili va talqin|Анализ и интерпретация произведения", "Adabiy esse va dalillangan fikr|Литературное эссе и аргументированное мнение"],
      11: ["Mumtoz meros va zamonaviy adabiyot|Классическое наследие и современная литература", "Adabiy oqim va janrlar|Литературные направления и жанры", "Muallif uslubi va badiiy tafakkur|Стиль автора и художественное мышление", "Mustaqil talqin va yakuniy tahlil|Самостоятельная интерпретация и итоговый анализ"],
    },
    stories: { 5: ["Историческое время и источники|Tarixiy vaqt va manbalar", "Рассказы о древних обществах|Qadimgi jamiyatlar haqida hikoyalar", "Древние памятники на территории Узбекистана|O‘zbekiston hududidagi qadimiy yodgorliklar", "Изучение исторической личности и события по источникам|Tarixiy shaxs va voqeani manbaga tayangan holda o‘rganish"] },
    ancient: { 6: ["Ibtidoiy jamiyat va dastlabki manzilgohlar|Первобытное общество и первые поселения", "Qadimgi Sharq davlatlari|Древние государства Востока", "Qadimgi Yunoniston va Rim|Древняя Греция и Рим", "Qadimgi dunyo madaniyati|Культура древнего мира"] },
    hist: {
      7: ["O‘rta Osiyoning ilk o‘rta asr davlatlari|Раннесредневековые государства Средней Азии", "Arablar istilosi va mahalliy sulolalar|Арабское завоевание и местные династии", "Amir Temur va Temuriylar|Амир Темур и Тимуриды", "Tarixiy manba va xronologiya bilan ishlash|Работа с историческими источниками и хронологией"],
      8: ["Temuriylardan keyingi davlatlar|Государства после Тимуридов", "Xonliklar va ijtimoiy hayot|Ханства и общественная жизнь", "Rossiya imperiyasi davridagi Turkiston|Туркестан в период Российской империи", "XIX asr oxiri va XX asr boshidagi o‘zgarishlar|Изменения конца XIX — начала XX века"],
      9: ["Turkiston XX asr boshlarida|Туркестан в начале XX века", "Sovet davri va O‘zbekiston SSR|Советский период и Узбекская ССР", "Ikkinchi jahon urushi va uning oqibatlari|Вторая мировая война и её последствия", "Mustaqillik davri va zamonaviy O‘zbekiston|Период независимости и современный Узбекистан"],
      10: ["O‘zbekiston davlatchiligi va mustaqillikka olib kelgan jarayonlar|Государственность Узбекистана и путь к независимости", "Mustaqillikning dastlabki yillari|Первые годы независимости", "Davlat va jamiyat taraqqiyoti|Развитие государства и общества", "Tarixiy manbalarni qiyoslash|Сопоставление исторических источников"],
      11: ["Mustaqil O‘zbekiston: siyosiy va ijtimoiy rivojlanish|Независимый Узбекистан: политическое и общественное развитие", "Iqtisodiy va madaniy islohotlar|Экономические и культурные реформы", "O‘zbekiston xalqaro munosabatlarda|Узбекистан в международных отношениях", "Tarixiy jarayonni dalillar asosida tahlil qilish|Анализ исторического процесса на основе фактов"],
    },
    whist: {
      7: ["O‘rta asrlar dunyosi|Мир в Средние века", "Islom sivilizatsiyasi va savdo yo‘llari|Исламская цивилизация и торговые пути", "Yevropa va Osiyodagi davlatlar|Государства Европы и Азии", "Tarixiy xarita va xronologiya|Историческая карта и хронология"],
      8: ["Buyuk geografik kashfiyotlar|Великие географические открытия", "Yangi davr davlatlari va jamiyat|Государства и общество Нового времени", "Sanoat inqilobi va mustamlakachilik|Промышленная революция и колониализм", "XIX asr siyosiy o‘zgarishlari|Политические изменения XIX века"],
      9: ["Birinchi jahon urushi va uning oqibatlari|Первая мировая война и её последствия", "Inqiloblar va yangi davlatlar|Революции и новые государства", "Ikkinchi jahon urushi|Вторая мировая война", "Urushdan keyingi dunyo|Послевоенный мир"],
      10: ["XX asrning ikkinchi yarmi|Вторая половина XX века", "Sovuq urush va xalqaro tashkilotlar|Холодная война и международные организации", "Mustamlaka tizimining tugashi|Распад колониальной системы", "Globallashuv va zamonaviy dunyo|Глобализация и современный мир"],
      11: ["Zamonaviy xalqaro munosabatlar|Современные международные отношения", "Global iqtisodiy va siyosiy jarayonlar|Глобальные экономические и политические процессы", "Fan-texnika va jamiyat o‘zgarishlari|Научно-технические и общественные изменения", "Tarixiy hodisalarni qiyosiy tahlil qilish|Сравнительный анализ исторических событий"],
    },
    geog: {
      7: ["Geografik xarita va koordinatalar|Географическая карта и координаты", "Materiklar va okeanlar tabiati|Природа материков и океанов", "Aholi va hududlar|Население и территории", "O‘zbekistonning tabiiy geografiyasi|Физическая география Узбекистана"],
      8: ["O‘zbekistonning iqtisodiy geografiyasi|Экономическая география Узбекистана", "Tabiiy resurslar va xo‘jalik|Природные ресурсы и хозяйство", "Aholi va shaharlar|Население и города", "Hududiy rivojlanish va ekologiya|Региональное развитие и экология"],
      9: ["Jahonning siyosiy xaritasi|Политическая карта мира", "Aholi va urbanizatsiya|Население и урбанизация", "Jahon xo‘jaligi va tarmoqlar|Мировое хозяйство и отрасли", "Mintaqalar va xalqaro aloqalar|Регионы и международные связи"],
      10: ["Jahon tabiiy resurslari va ekologik muammolar|Природные ресурсы мира и экологические проблемы", "Jahon aholisi va joylashuvi|Население мира и его размещение", "Jahon iqtisodiyoti va transport|Мировая экономика и транспорт", "Mintaqaviy geografik tahlil|Региональный географический анализ"],
    },
    phys: {
      7: ["Fizik kattaliklar va o‘lchash|Физические величины и измерения", "Mexanik harakat va tezlik|Механическое движение и скорость", "Massa, zichlik va kuch|Масса, плотность и сила", "Bosim, ish va energiya|Давление, работа и энергия"],
      8: ["Issiqlik hodisalari va ichki energiya|Тепловые явления и внутренняя энергия", "Elektr zaryadi va elektr toki|Электрический заряд и электрический ток", "Elektr zanjiri va qonunlar|Электрическая цепь и законы", "Magnit hodisalar va energiya o‘zgarishi|Магнитные явления и превращение энергии"],
      9: ["Mexanika va saqlanish qonunlari|Механика и законы сохранения", "Tebranishlar va to‘lqinlar|Колебания и волны", "Optika va yorug‘lik hodisalari|Оптика и световые явления", "Atom va yadro fizikasi|Физика атома и ядра"],
      10: ["Kinematika va dinamika|Кинематика и динамика", "Saqlanish qonunlari va mexanik energiya|Законы сохранения и механическая энергия", "Molekulyar fizika va termodinamika|Молекулярная физика и термодинамика", "Elektr va magnit maydon|Электрическое и магнитное поле"],
      11: ["Elektromagnit induksiya va o‘zgaruvchan tok|Электромагнитная индукция и переменный ток", "Elektromagnit to‘lqinlar va optika|Электромагнитные волны и оптика", "Nisbiylik, kvant va atom fizikasi|Теория относительности, квантовая и атомная физика", "Fizika qonunlarini masalalarda qo‘llash|Применение законов физики в задачах"],
    },
    chem: {
      7: ["Kimyo fani va laboratoriya xavfsizligi|Химия и безопасность в лаборатории", "Modda, aralashma va ajratish usullari|Вещество, смесь и способы разделения", "Atom, molekula va kimyoviy formula|Атом, молекула и химическая формула", "Kimyoviy reaksiya va massa saqlanishi|Химическая реакция и сохранение массы"],
      8: ["Kimyoviy elementlar va davriy qonun|Химические элементы и периодический закон", "Kimyoviy bog‘lanish va kristall panjara|Химическая связь и кристаллическая решётка", "Kislotalar, asoslar, oksidlar va tuzlar|Кислоты, основания, оксиды и соли", "Reaksiya tenglamalari va hisoblashlar|Уравнения реакций и расчёты"],
      9: ["Noorganik birikmalar va xossalari|Неорганические соединения и их свойства", "Eritmalar va elektrolitik dissotsiatsiya|Растворы и электролитическая диссоциация", "Metallar va metallmaslar|Металлы и неметаллы", "Kimyoviy ishlab chiqarish va ekologiya|Химическое производство и экология"],
      10: ["Organik kimyoga kirish va uglevodorodlar|Введение в органическую химию и углеводороды", "Kislorodli va azotli organik moddalar|Кислород- и азотсодержащие органические вещества", "Polimerlar va biologik muhim moddalar|Полимеры и биологически важные вещества", "Reaksiya mexanizmlari va amaliy kimyo|Механизмы реакций и прикладная химия"],
      11: ["Organik moddalar sinflarini takrorlash|Повторение классов органических веществ", "Reaksiya tezligi va kimyoviy muvozanat|Скорость реакции и химическое равновесие", "Elektroliz va oksidlanish-qaytarilish|Электролиз и окислительно-восстановительные реакции", "Kimyo, materiallar va barqaror rivojlanish|Химия, материалы и устойчивое развитие"],
    },
    bio: {
      7: ["Biologiya va tirik organizmlar|Биология и живые организмы", "Hujayra va mikroskopik hayot|Клетка и микроскопическая жизнь", "O‘simliklar tuzilishi va hayot faoliyati|Строение и жизнедеятельность растений", "Ekotizim va tirik organizmlar aloqasi|Экосистема и связи организмов"],
      8: ["Hayvonlar xilma-xilligi va moslanish|Разнообразие животных и приспособление", "Odam organizmi va tayanch-harakat tizimi|Организм человека и опорно-двигательная система", "Qon aylanish, nafas olish va hazm|Кровообращение, дыхание и пищеварение", "Gigiyena va salomatlik|Гигиена и здоровье"],
      9: ["Asab va endokrin tizimlar|Нервная и эндокринная системы", "Ko‘payish va rivojlanish|Размножение и развитие", "Irsiyat va o‘zgaruvchanlik|Наследственность и изменчивость", "Evolyutsiya va ekologik muvozanat|Эволюция и экологическое равновесие"],
      10: ["Hujayra biologiyasi va modda almashinuvi|Клеточная биология и обмен веществ", "Genetika va irsiyat qonuniyatlari|Генетика и закономерности наследования", "Organizmlar ko‘payishi va rivojlanishi|Размножение и развитие организмов", "Evolyutsiya, biosfera va ekologiya|Эволюция, биосфера и экология"],
      11: ["Molekulyar biologiya va hujayra jarayonlari|Молекулярная биология и клеточные процессы", "Genetika, seleksiya va biotexnologiya|Генетика, селекция и биотехнология", "Evolyutsion ta’limot va hayot tarixi|Эволюционное учение и история жизни", "Ekologiya va biosfera barqarorligi|Экология и устойчивость биосферы"],
    },
    law: {
      8: ["Davlat, jamiyat va huquq tushunchalari|Понятия государства, общества и права", "Konstitutsiya va davlat hokimiyati|Конституция и государственная власть", "Fuqarolarning huquq va burchlari|Права и обязанности граждан", "Huquqbuzarlik va javobgarlik|Правонарушение и ответственность"],
      9: ["Konstitutsiyaviy tuzum va davlat organlari|Конституционный строй и органы государства", "Fuqarolik, oila va mehnat huquqi asoslari|Основы гражданского, семейного и трудового права", "Voyaga yetmaganlarning huquqlari|Права несовершеннолетних", "Huquqiy vaziyatni tahlil qilish|Анализ правовой ситуации"],
      10: ["Huquq manbalari va huquqiy munosabatlar|Источники права и правоотношения", "Davlat va konstitutsiyaviy huquq|Государственное и конституционное право", "Fuqarolik va ma’muriy javobgarlik|Гражданская и административная ответственность", "Qonuniy qaror va huquqiy savodxonlik|Законное решение и правовая грамотность"],
      11: ["Inson huquqlari va xalqaro huquq|Права человека и международное право", "Fuqarolik, mehnat va oila huquqi|Гражданское, трудовое и семейное право", "Jinoyat huquqi va javobgarlik|Уголовное право и ответственность", "Huquqiy hujjat va amaliy vaziyatlar|Правовые документы и практические ситуации"],
    },
    econ: {
      8: ["Ehtiyoj, resurs va tanlov|Потребности, ресурсы и выбор", "Bozor, talab va taklif|Рынок, спрос и предложение", "Pul, daromad va xarajat|Деньги, доходы и расходы", "Oila budjeti va moliyaviy reja|Семейный бюджет и финансовый план"],
      9: ["Tadbirkorlik va ishlab chiqarish|Предпринимательство и производство", "Korxona, xarajat va foyda|Предприятие, издержки и прибыль", "Raqobat, narx va bozor|Конкуренция, цена и рынок", "Soliq, bank va shaxsiy moliya|Налоги, банк и личные финансы"],
    },
    biz: { 11: ["Biznes g‘oya va mijoz ehtiyoji|Бизнес-идея и потребность клиента", "Bozorni o‘rganish va raqobat|Изучение рынка и конкуренция", "Biznes-reja, xarajat va daromad|Бизнес-план, расходы и доходы", "Taqdimot, jamoa va mas’uliyatli biznes|Презентация, команда и ответственное дело"] },
    eng: {
      1: ["Greetings, names and classroom language|Salomlashish, ism va sinfdagi iboralar", "Numbers, colours and school things|Sonlar, ranglar va maktab buyumlari", "Family, toys and simple descriptions|Oila, o‘yinchoqlar va sodda tasvirlash", "Songs, listening and letter sounds|Qo‘shiqlar, tinglab tushunish va harf tovushlari"],
      2: ["Family, home and daily routines|Oila, uy va kundalik ishlar", "Food, animals and the weather|Taomlar, hayvonlar va ob-havo", "Asking and answering simple questions|Sodda savollar berish va javob qaytarish", "Reading short messages and stories|Qisqa xabarlar va hikoyalarni o‘qish"],
      3: ["School, hobbies and the local area|Maktab, qiziqishlar va yashash joyi", "Daily routines and telling the time|Kundalik ishlar va vaqtni aytish", "Describing people, places and things|Odamlar, joylar va narsalarni tasvirlash", "Short dialogues and guided writing|Qisqa dialoglar va yo‘naltirilgan yozuv"],
      4: ["People, places and everyday plans|Odamlar, joylar va kundalik rejalar", "Past events and personal experiences|O‘tgan voqealar va shaxsiy tajriba", "Directions, shopping and useful requests|Yo‘l so‘rash, xarid va kerakli iltimoslar", "Short letters, stories and presentations|Qisqa xatlar, hikoyalar va taqdimotlar"],
      5: ["Personal information, family and school|Shaxsiy ma’lumot, oila va maktab", "Daily routines and free-time activities|Kundalik ishlar va bo‘sh vaqt", "Food, shopping and town directions|Taomlar, xarid va shahar yo‘nalishlari", "Present simple/continuous and short writing|Present Simple/Continuous va qisqa yozuv"],
      6: ["Travel, transport and holidays|Sayohat, transport va ta’til", "Sports, health and past events|Sport, salomatlik va o‘tgan voqealar", "Plans, predictions and invitations|Rejalar, taxminlar va takliflar", "Past simple, future forms and short stories|Past Simple, kelasi zamon shakllari va qisqa hikoyalar"],
      7: ["People, culture and communication|Odamlar, madaniyat va muloqot", "Comparisons, quantities and descriptions|Taqqoslash, miqdor va tasvirlash", "Past experiences and future intentions|O‘tgan tajriba va kelajak niyatlari", "Reading for detail and paragraph writing|Batafsil o‘qish va xatboshi yozish"],
      8: ["Environment, technology and society|Atrof-muhit, texnologiya va jamiyat", "Present perfect and life experiences|Present Perfect va hayotiy tajribalar", "Modals, advice and obligation|Modal fe’llar, maslahat va majburiyat", "Reports, emails and spoken presentations|Hisobot, elektron xat va og‘zaki taqdimot"],
      9: ["Education, work and future choices|Ta’lim, kasb va kelajak tanlovi", "News, media and evaluating information|Yangiliklar, media va axborotni baholash", "Conditionals, passive voice and reported speech|Shart gaplar, majhul nisbat va o‘zlashtirma gap", "Essays, summaries and discussion|Insho, qisqa mazmun va munozara"],
      10: ["Global issues, science and culture|Global muammolar, fan va madaniyat", "Complex clauses and advanced verb patterns|Murakkab gaplar va fe’l shakllari", "Academic reading and evidence-based argument|Akademik o‘qish va dalilli fikr", "Formal correspondence, reports and presentations|Rasmiy yozishma, hisobot va taqdimot"],
      11: ["Academic and professional communication|Akademik va kasbiy muloqot", "Critical reading and source evaluation|Tanqidiy o‘qish va manbani baholash", "Essay structure, argument and revision|Insho tuzilishi, dalillash va tahrir", "Listening, speaking and examination practice|Tinglash, gapirish va imtihonga tayyorgarlik"],
    },
    edu: {
      1: ["O‘zim, oilam va maktabim|Я, моя семья и школа", "Do‘stlik, hurmat va tartib|Дружба, уважение и порядок", "Sog‘lom odatlar va xavfsizlik|Здоровые привычки и безопасность", "Tabiatga mehr va g‘amxo‘rlik|Любовь и забота о природе"],
      2: ["Oila va mahalladagi hamkorlik|Сотрудничество в семье и махалле", "Do‘stlik va nizoni tinch hal etish|Дружба и мирное решение конфликта", "Mehnatsevarlik va mas’uliyat|Трудолюбие и ответственность", "Yo‘l va raqamli xavfsizlik|Дорожная и цифровая безопасность"],
      3: ["Huquq, burch va sinf jamoasi|Права, обязанности и классный коллектив", "Mehr-oqibat va boshqalarni tushunish|Доброта и понимание других", "Sog‘lom turmush va tabiatni asrash|Здоровый образ жизни и охрана природы", "Maqsad qo‘yish va vaqtni boshqarish|Постановка цели и управление временем"],
      4: ["Vatan, mahalla va fuqarolik mas’uliyati|Родина, махалля и гражданская ответственность", "Muloqot, hurmat va bag‘rikenglik|Общение, уважение и толерантность", "Raqamli muhitda xavfsiz xulq|Безопасное поведение в цифровой среде", "Kasblar, qiziqishlar va shaxsiy maqsad|Профессии, интересы и личная цель"],
      5: ["O‘zini anglash va ijobiy munosabat|Самопознание и позитивные отношения", "Maktab jamoasi va hamkorlik|Школьный коллектив и сотрудничество", "Qadriyatlar, odob va mas’uliyat|Ценности, этикет и ответственность", "Raqamli madaniyat va xavfsizlik|Цифровая культура и безопасность"],
      6: ["Maqsad, iroda va o‘zini boshqarish|Цель, воля и самоуправление", "Samarali muloqot va nizolarni hal etish|Эффективное общение и решение конфликтов", "Fuqarolik, qonun va jamoaga xizmat|Гражданственность, закон и служение обществу", "Media savodxonlik va shaxsiy ma’lumot|Медиаграмотность и личные данные"],
      7: ["Shaxsiy mas’uliyat va qaror qabul qilish|Личная ответственность и принятие решений", "Jamoa, yetakchilik va hamkorlik|Команда, лидерство и сотрудничество", "Huquq, burch va fuqarolik qadriyatlari|Права, обязанности и гражданские ценности", "Kasb tanlash va raqamli iz|Выбор профессии и цифровой след"],
      8: ["O‘zligini anglash va hayotiy maqsad|Самоопределение и жизненная цель", "Huquqiy madaniyat va bag‘rikenglik|Правовая культура и толерантность", "Sog‘lom munosabat va ruhiy farovonlik|Здоровые отношения и психологическое благополучие", "Kasbiy yo‘nalish va media savodxonlik|Профессиональное самоопределение и медиаграмотность"],
      9: ["Fuqarolik pozitsiyasi va jamoat hayoti|Гражданская позиция и общественная жизнь", "Oila, jamiyat va mas’uliyatli munosabat|Семья, общество и ответственное отношение", "Kasbiy reja va mustaqil qaror|Профессиональный план и самостоятельное решение", "Axborotni tahlil qilish va raqamli etika|Анализ информации и цифровая этика"],
      10: ["Yetakchilik, tashabbus va jamoaviy loyiha|Лидерство, инициатива и командный проект", "Fuqarolik jamiyati va qonun ustuvorligi|Гражданское общество и верховенство закона", "Kasbiy rivojlanish va moliyaviy mas’uliyat|Профессиональное развитие и финансовая ответственность", "Media, axborot va ijtimoiy mas’uliyat|Медиа, информация и общественная ответственность"],
      11: ["Shaxsiy hayotiy reja va kasb tanlovi|Личный жизненный план и выбор профессии", "Fuqarolik mas’uliyati va jamiyatga hissa|Гражданская ответственность и вклад в общество", "Mustaqil hayot, moliyaviy va huquqiy savodxonlik|Самостоятельная жизнь, финансовая и правовая грамотность", "Raqamli fuqarolik va kelajak maqsadlari|Цифровое гражданство и цели на будущее"],
    },
    music: {
      1: ["Tovush, ritm va qo‘shiq|Звук, ритм и песня", "Bolalar qo‘shiqlari va jo‘r bo‘lish|Детские песни и сопровождение", "Musiqani tinglash va kayfiyat|Слушание музыки и настроение", "O‘zbek xalq kuylariga tanishuv|Знакомство с узбекскими народными мелодиями"],
      2: ["Ritm va oddiy nota belgilar|Ритм и простые нотные знаки", "Xalq qo‘shiqlari va mavsumiy kuylar|Народные песни и сезонные мелодии", "Musiqa asboblari va tembr|Музыкальные инструменты и тембр", "Jamoa bo‘lib kuylash|Коллективное пение"],
      3: ["Nota savodi va kuy tuzilishi|Нотная грамота и строение мелодии", "O‘zbek xalq va bolalar musiqasi|Узбекская народная и детская музыка", "Musiqa asboblari va ijrochilik|Музыкальные инструменты и исполнительство", "Tinglangan asarni tavsiflash|Описание прослушанного произведения"],
      4: ["Musiqiy janr va shakllar|Музыкальные жанры и формы", "Maqom va xalq musiqasi bilan tanishuv|Знакомство с макомом и народной музыкой", "Kompozitor va ijrochi|Композитор и исполнитель", "Ansambl va musiqiy ifoda|Ансамбль и музыкальная выразительность"],
      5: ["Musiqa ifoda vositalari|Средства музыкальной выразительности", "O‘zbek mumtoz va xalq musiqasi|Узбекская классическая и народная музыка", "Maqom, ashula va cholg‘u ijrosi|Маком, ашула и инструментальное исполнение", "Jahon musiqa madaniyatiga kirish|Введение в мировую музыкальную культуру"],
      6: ["Musiqiy shakl va janrlar|Музыкальные формы и жанры", "Maqom va maqom yo‘llari|Маком и его циклы", "O‘zbek bastakor va kompozitorlari|Узбекские композиторы", "Musiqani tahlil qilish va ijro|Анализ и исполнение музыки"],
      7: ["Musiqa tarixi va uslublari|История музыки и стили", "O‘zbek mumtoz merosi|Узбекское классическое наследие", "Jahon musiqa madaniyati|Мировая музыкальная культура", "Ijro, tinglash va musiqiy tahlil|Исполнение, слушание и музыкальный анализ"],
    },
    draw: {
      1: ["Chiziq, nuqta va rang|Линия, точка и цвет", "Asosiy geometrik shakllar|Основные геометрические формы", "Tabiatdan sodda rasmlar|Простые рисунки с натуры", "Qog‘oz va rangli materiallar bilan ishlash|Работа с бумагой и цветными материалами"],
      2: ["Ranglar va rang aralashtirish|Цвета и смешивание красок", "Shakl va naqsh|Форма и орнамент", "Natyurmort va tabiat manzarasi|Натюрморт и пейзаж", "Milliy bezak san’ati|Национальное декоративное искусство"],
      3: ["Kompozitsiya va tasvir markazi|Композиция и центр изображения", "Iliq va sovuq ranglar|Тёплые и холодные цвета", "Hajm, soya va yorug‘lik|Объём, тень и свет", "Amaliy bezak va milliy naqsh|Декоративная работа и национальный орнамент"],
      4: ["Perspektiva va masofa|Перспектива и расстояние", "Rang uyg‘unligi va kompozitsiya|Цветовая гармония и композиция", "Portret, manzara va natyurmort|Портрет, пейзаж и натюрморт", "Amaliy san’at va ijodiy loyiha|Прикладное искусство и творческий проект"],
      5: ["Rangtasvir va kompozitsiya|Живопись и композиция", "Perspektiva va fazoni tasvirlash|Перспектива и изображение пространства", "O‘zbek amaliy bezak san’ati|Узбекское прикладное декоративное искусство", "Grafika va ijodiy loyiha|Графика и творческий проект"],
      6: ["Tasviriy san’at turlari va janrlari|Виды и жанры изобразительного искусства", "Rang, shakl va kompozitsiya|Цвет, форма и композиция", "Milliy me’morchilik va bezak|Национальная архитектура и декор", "San’at asarini tahlil qilish|Анализ произведения искусства"],
      7: ["San’at tarixi va badiiy uslublar|История искусства и художественные стили", "Rangtasvir, grafika va haykaltaroshlik|Живопись, графика и скульптура", "O‘zbek miniatyurasi va naqsh san’ati|Узбекская миниатюра и орнаментальное искусство", "Mustaqil kompozitsiya va loyiha|Самостоятельная композиция и проект"],
    },
    tech: {
      1: ["Materiallar va ularning xossalari|Материалы и их свойства", "Qog‘ozni buklash va qirqish|Складывание и вырезание бумаги", "Oddiy buyum yasash|Изготовление простой поделки", "Asboblar bilan xavfsiz ishlash|Безопасная работа с инструментами"],
      2: ["Qog‘oz, mato va tabiiy materiallar|Бумага, ткань и природные материалы", "O‘lchash, belgilash va biriktirish|Измерение, разметка и соединение", "Foydali buyum loyihasi|Проект полезного изделия", "Ish joyi va mehnat xavfsizligi|Рабочее место и безопасность труда"],
      3: ["Material tanlash va xususiyatlari|Выбор материала и его свойства", "Chizma, o‘lchov va andaza|Чертёж, измерение и выкройка", "Buyumni bosqichma-bosqich tayyorlash|Поэтапное изготовление изделия", "Qayta ishlash va tejamkorlik|Переработка и бережливость"],
      4: ["Loyiha va texnologik ketma-ketlik|Проект и технологическая последовательность", "Yog‘och, mato va boshqa materiallar|Дерево, ткань и другие материалы", "Oddiy mexanizmlar va konstruktorlik|Простые механизмы и конструирование", "Mahsulot sifati va xavfsizlik|Качество изделия и безопасность"],
      5: ["Texnik rasm, o‘lchash va rejalash|Технический рисунок, измерение и планирование", "Materiallarga qo‘lda ishlov berish|Ручная обработка материалов", "Tikuvchilik va uy-ro‘zg‘or ishlari|Шитьё и бытовые работы", "Loyihalash va tayyor buyumni baholash|Проектирование и оценка готового изделия"],
      6: ["Asbob-uskunalar va ishlov berish usullari|Инструменты и способы обработки", "Konstruksiyalash va birikmalar|Конструирование и соединения", "Elektr va maishiy texnika xavfsizligi|Электро- и бытовая безопасность", "Amaliy loyiha va taqdimot|Практический проект и презентация"],
      7: ["Dizayn, chizma va texnologik xarita|Дизайн, чертёж и технологическая карта", "Materiallarga mexanik ishlov berish|Механическая обработка материалов", "Tikuvchilik, pazandachilik va maishiy ko‘nikmalar|Шитьё, кулинария и бытовые навыки", "Mahsulot loyihasi va tannarx|Проект изделия и себестоимость"],
      8: ["Loyihalash va texnik hujjatlar|Проектирование и техническая документация", "Material va ishlab chiqarish jarayoni|Материалы и производственный процесс", "Maishiy xizmat va iste’molchi madaniyati|Бытовые услуги и культура потребителя", "Kasblar va kichik loyiha|Профессии и небольшой проект"],
      9: ["Texnik ijod va loyiha boshqaruvi|Техническое творчество и управление проектом", "Ishlab chiqarish, sifat va xavfsizlik|Производство, качество и безопасность", "Tadbirkorlik va kasbiy yo‘nalish|Предпринимательство и профессиональное направление", "Yakuniy amaliy loyiha|Итоговый практический проект"],
    },
    pe: {
      1: ["Saflanish, yurish va xavfsiz harakat|Строевые упражнения, ходьба и безопасное движение", "Yugurish, sakrash va uloqtirish|Бег, прыжки и метание", "Muvozanat, chaqqonlik va harakatli o‘yinlar|Равновесие, ловкость и подвижные игры", "Shaxsiy gigiyena va badantarbiya|Личная гигиена и разминка"],
      2: ["Yengil atletika va umumiy rivojlantiruvchi mashqlar|Лёгкая атлетика и общеразвивающие упражнения", "Gimnastika va muvozanat|Гимнастика и равновесие", "Harakatli va jamoaviy o‘yinlar|Подвижные и командные игры", "Qomat, nafas va xavfsizlik|Осанка, дыхание и безопасность"],
      3: ["Yugurish va sakrash texnikasi|Техника бега и прыжков", "Gimnastika va koordinatsiya|Гимнастика и координация", "To‘p bilan o‘yinlar|Игры с мячом", "Jismoniy sifatlar va sog‘lom turmush|Физические качества и здоровый образ жизни"],
      4: ["Yengil atletika va jismoniy tayyorgarlik|Лёгкая атлетика и физическая подготовка", "Gimnastika va akrobatika asoslari|Основы гимнастики и акробатики", "Sport o‘yinlari qoidalari|Правила спортивных игр", "O‘zini nazorat qilish va xavfsizlik|Самоконтроль и безопасность"],
      5: ["Yengil atletika va chidamlilik|Лёгкая атлетика и выносливость", "Gimnastika va kuch mashqlari|Гимнастика и силовые упражнения", "Basketbol, voleybol va futbol asoslari|Основы баскетбола, волейбола и футбола", "Jismoniy rivojlanish va gigiyena|Физическое развитие и гигиена"],
      6: ["Tezlik, kuch va chidamlilikni rivojlantirish|Развитие скорости, силы и выносливости", "Gimnastika va akrobatik elementlar|Гимнастика и акробатические элементы", "Jamoaviy sport o‘yinlari|Командные спортивные игры", "Mashg‘ulotni rejalash va o‘zini nazorat qilish|Планирование тренировки и самоконтроль"],
      7: ["Yengil atletika texnikasi va natijani o‘lchash|Техника лёгкой атлетики и измерение результата", "Gimnastika va harakat koordinatsiyasi|Гимнастика и координация движений", "Sport o‘yinlarida taktika va hamkorlik|Тактика и взаимодействие в спортивных играх", "Jismoniy yuklama va sog‘lom turmush|Физическая нагрузка и здоровый образ жизни"],
      8: ["Kuch va umumiy chidamlilik mashqlari|Силовые упражнения и общая выносливость", "Yengil atletika va gimnastika majmuasi|Комплекс лёгкой атлетики и гимнастики", "Sport texnikasi, taktika va hakamlik|Спортивная техника, тактика и судейство", "Yuklamani boshqarish va jarohatdan saqlanish|Управление нагрузкой и профилактика травм"],
      9: ["Jismoniy tayyorgarlik va individual natijalar|Физическая подготовка и личные результаты", "Sport o‘yinlarida taktika va strategiya|Тактика и стратегия в спортивных играх", "Sog‘lomlashtiruvchi mashqlar va tiklanish|Оздоровительные упражнения и восстановление", "Sport madaniyati, xavfsizlik va o‘zini nazorat qilish|Спортивная культура, безопасность и самоконтроль"],
      10: ["Jismoniy tayyorgarlik va mashg‘ulot nazariyasi|Физическая подготовка и теория тренировки", "Yengil atletika va sport o‘yinlari|Лёгкая атлетика и спортивные игры", "Yuklama, tiklanish va jarohatlarning oldini olish|Нагрузка, восстановление и профилактика травм", "Sog‘lom turmush va individual reja|Здоровый образ жизни и индивидуальный план"],
      11: ["Individual jismoniy rivojlanish rejasini tuzish|Составление плана личного физического развития", "Sport o‘yinlari, taktika va hakamlik|Спортивные игры, тактика и судейство", "Mashg‘ulot samaradorligi va tiklanish|Эффективность тренировки и восстановление", "Jismoniy faollik va umrboqiy salomatlik|Физическая активность и здоровье на всю жизнь"],
    },
    draft: {
      8: ["Chizma asboblari va chiziq turlari|Чертёжные инструменты и виды линий", "Masshtab, o‘lcham va geometrik yasash|Масштаб, размер и геометрические построения", "Ortogonal proyeksiyalar|Ортогональные проекции", "Detalning ko‘rinishlari va sodda chizma|Виды детали и простой чертёж"],
      9: ["Aksonometrik proyeksiya|Аксонометрическая проекция", "Kesim va qirqimlar|Сечения и разрезы", "Yig‘ish chizmalari va shartli belgilar|Сборочные чертежи и условные обозначения", "Chizmani o‘qish va loyiha topshirig‘i|Чтение чертежа и проектное задание"],
    },
    astro: { 11: ["Osmon sferasi va koordinatalar|Небесная сфера и координаты", "Quyosh tizimi va sayyoralar harakati|Солнечная система и движение планет", "Yulduzlar, galaktikalar va koinot|Звёзды, галактики и Вселенная", "Astronomik kuzatish va kosmik tadqiqotlar|Астрономические наблюдения и космические исследования"] },
    mil: {
      10: ["Saf tayyorgarligi va fuqarolik mudofaasi|Строевая подготовка и гражданская защита", "Favqulodda vaziyatlarda harakat|Действия в чрезвычайных ситуациях", "Birinchi tibbiy yordam|Первая медицинская помощь", "Harbiy xizmat asoslari va xavfsizlik|Основы военной службы и безопасность"],
      11: ["Fuqarolik himoyasi va favqulodda vaziyatlar|Гражданская защита и чрезвычайные ситуации", "Birinchi yordam va jabrlanuvchini ko‘chirish|Первая помощь и эвакуация пострадавшего", "Harbiy xizmat, saf va amaliy tayyorgarlik|Военная служба, строевая и практическая подготовка", "Vatan himoyasi va jamoaviy mas’uliyat|Защита Родины и коллективная ответственность"],
    },
  };

  // Detailed mathematics units transcribed and translated from the grade-level
  // programs published by the national assessment agency. The topic-level
  // open questions below are original practice prompts, not copied exercises.
  const mathProgramTopics = {
    math: {
      5: [
        "Натуральные числа, ноль, десятичная система, координатный луч, сравнение и округление|Natural sonlar, nol, o‘nli sanoq tizimi, sonlar nuri, taqqoslash va yaxlitlash",
        "Плоскость, прямая, луч, отрезок, длина отрезка и треугольник|Tekislik, to‘g‘ri chiziq, nur, kesma, kesma uzunligi va uchburchak",
        "Сложение и вычитание натуральных чисел, их свойства, буквенные выражения и уравнения|Natural sonlarni qo‘shish va ayirish, xossalari, harfli ifodalar va tenglamalar",
        "Умножение и деление натуральных чисел, порядок действий, квадрат и куб числа|Natural sonlarni ko‘paytirish va bo‘lish, amallar tartibi, sonning kvadrati va kubi",
        "Текстовые задачи: части и величины, движение, покупка, производительность и время|Matnli masalalar: ulush va kattaliklar, harakat, xarid, ish unumdorligi va vaqt",
        "Углы, транспортир, параллельные и перпендикулярные прямые, периметр и площадь|Burchaklar, transportir, parallel va perpendikulyar to‘g‘ri chiziqlar, perimetr va yuza",
        "Обыкновенные дроби: доля, сравнение, правильные и неправильные дроби, смешанные числа|Oddiy kasrlar: ulush, taqqoslash, to‘g‘ri va noto‘g‘ri kasrlar, aralash sonlar",
        "Пространственные фигуры, куб и прямоугольный параллелепипед, объём и развёртки|Fazoviy shakllar, kub va to‘g‘ri burchakli parallelepiped, hajm va yoyilmalar",
        "Десятичные дроби, вычисления с ними, проценты, таблицы, диаграммы и анализ данных|O‘nli kasrlar, ular ustida amallar, foizlar, jadvallar, diagrammalar va ma’lumotlar tahlili",
      ],
      6: [
        "Делители и кратные, признаки делимости, простые и составные числа, НОД и НОК|Bo‘luvchi va karrali sonlar, bo‘linish belgilari, tub va murakkab sonlar, EKUB va EKUK",
        "Основное свойство дроби, сокращение, общий знаменатель, сравнение дробей|Kasrning asosiy xossasi, qisqartirish, umumiy maxraj, kasrlarni taqqoslash",
        "Сложение и вычитание дробей с разными знаменателями и смешанных чисел|Har xil maxrajli kasrlar va aralash sonlarni qo‘shish va ayirish",
        "Умножение и деление обыкновенных дробей, обратные числа и нахождение части числа|Oddiy kasrlarni ko‘paytirish va bo‘lish, teskari sonlar va sonning qismini topish",
        "Отношения, пропорции, прямая и обратная пропорциональность, масштаб|Nisbat, proporsiya, to‘g‘ri va teskari proporsional miqdorlar, masshtab",
        "Положительные и отрицательные числа, модуль и координатная прямая|Musbat va manfiy sonlar, modul va koordinata to‘g‘ri chizig‘i",
        "Сложение, вычитание, умножение и деление целых и рациональных чисел|Butun va ratsional sonlarni qo‘shish, ayirish, ko‘paytirish va bo‘lish",
        "Степени натуральных чисел, квадратные корни рациональных чисел и периодические дроби|Natural sonlarning darajalari, ratsional sonlarning kvadrat ildizlari va davriy kasrlar",
        "Буквенные выражения, раскрытие скобок, коэффициент и линейные уравнения|Harfli ifodalar, qavslarni ochish, koeffitsient va chiziqli tenglamalar",
        "Сбор и представление данных, среднее, мода, медиана и простые правила комбинаторики|Ma’lumotlarni yig‘ish va ifodalash, o‘rta qiymat, moda, mediana va sodda kombinatorika qoidalari",
        "Геометрические фигуры, углы, треугольники, периметр, площадь, окружность и круг|Geometrik shakllar, burchaklar, uchburchaklar, perimetr, yuza, aylana va doira",
      ],
      7: [
        "Числовые и алгебраические выражения, формулы, свойства действий и раскрытие скобок|Sonli va algebraik ifodalar, formulalar, amallar xossalari va qavslarni ochish",
        "Линейные уравнения с одной переменной и текстовые задачи, сводимые к уравнению|Bir noma’lumli chiziqli tenglamalar va tenglamaga keltiriladigan matnli masalalar",
        "Степени, одночлены, многочлены и действия над ними|Darajalar, birhadlar, ko‘phadlar va ular ustida amallar",
        "Разложение многочлена на множители и формулы сокращённого умножения|Ko‘phadni ko‘paytuvchilarga ajratish va qisqa ko‘paytirish formulalari",
        "Алгебраические дроби, их сокращение и арифметические действия|Algebraik kasrlar, ularni qisqartirish va ular ustida arifmetik amallar",
        "Элементы комбинаторики и простые задачи на подсчёт вариантов|Kombinatorika elementlari va variantlarni sanashga doir sodda masalalar",
        "Начальные геометрические понятия, отрезки, углы, измерение и перпендикулярность|Geometriyaning boshlang‘ich tushunchalari, kesmalar, burchaklar, o‘lchash va perpendikulyarlik",
        "Треугольники: виды, равенство, свойства равнобедренного треугольника|Uchburchaklar: turlari, tengligi va teng yonli uchburchak xossalari",
        "Параллельные прямые, углы при секущей, свойства сторон и углов треугольника|Parallel to‘g‘ri chiziqlar, kesuvchi hosil qilgan burchaklar, uchburchak tomonlari va burchaklari xossalari",
        "Построения циркулем и линейкой: биссектриса, перпендикуляр, равный угол и отрезок|Sirkul va chizg‘ich bilan yasash: bissektrisa, perpendikulyar, teng burchak va kesma",
      ],
    },
    alg: {
      8: [
        "Алгебраические дроби: допустимые значения, сокращение и приведение к общему знаменателю|Algebraik kasrlar: joiz qiymatlar, qisqartirish va umumiy maxrajga keltirish",
        "Сложение, вычитание, умножение и деление алгебраических дробей|Algebraik kasrlarni qo‘shish, ayirish, ko‘paytirish va bo‘lish",
        "Степени с целым показателем и преобразование степенных выражений|Butun ko‘rsatkichli darajalar va darajali ifodalarni almashtirish",
        "Функция, область определения, таблица значений и график|Funksiya, aniqlanish sohasi, qiymatlar jadvali va grafik",
        "Линейные неравенства, системы неравенств и их изображение на числовой прямой|Chiziqli tengsizliklar, tengsizliklar sistemasi va ularni sonlar o‘qida tasvirlash",
        "Квадратные уравнения, дискриминант и формула корней|Kvadrat tenglamalar, diskriminant va ildizlar formulasi",
        "Теорема Виета, квадратный трёхчлен и разложение на множители|Viyet teoremasi, kvadrat uchhad va ko‘paytuvchilarga ajratish",
        "Текстовые задачи, которые решаются с помощью квадратных уравнений|Kvadrat tenglamalar yordamida yechiladigan matnli masalalar",
      ],
      9: [
        "Квадратичная функция y=ax²+bx+c, её график и свойства|y=ax²+bx+c kvadratik funksiya, uning grafigi va xossalari",
        "Квадратные неравенства, метод интервалов, область определения и чётность функции|Kvadrat tengsizliklar, intervallar usuli, aniqlanish sohasi va funksiyaning juft-toqligi",
        "Системы уравнений и неравенств, в том числе с уравнением второй степени|Tenglamalar va tengsizliklar sistemasi, jumladan ikkinchi darajali tenglamali sistemalar",
        "Тригонометрические функции угла, радианная мера и тригонометрические тождества|Burchakning trigonometrik funksiyalari, radian o‘lchovi va trigonometrik ayniyatlar",
        "Формулы сложения, приведения и двойного угла|Qo‘shish, keltirish va ikkilangan burchak formulalari",
        "Числовые последовательности, арифметическая и геометрическая прогрессии|Sonli ketma-ketliklar, arifmetik va geometrik progressiyalar",
        "Случайные события, вероятность, частотные таблицы и статистический анализ|Tasodifiy hodisalar, ehtimollik, chastotalar jadvali va statistik tahlil",
      ],
      10: [
        "Функции: область определения, чётность, периодичность, монотонность и экстремумы|Funksiyalar: aniqlanish sohasi, juft-toqlik, davriylik, monotonlik va ekstremumlar",
        "Преобразование графиков, обратная и сложная функции|Grafiklarni almashtirish, teskari va murakkab funksiyalar",
        "Показательная и логарифмическая функции, их графики и свойства|Ko‘rsatkichli va logarifmik funksiyalar, ularning grafiklari va xossalari",
        "Показательные и логарифмические уравнения, неравенства и системы|Ko‘rsatkichli va logarifmik tenglamalar, tengsizliklar va sistemalar",
        "Тригонометрические и обратные тригонометрические функции, их графики|Trigonometrik va teskari trigonometrik funksiyalar, ularning grafiklari",
        "Тригонометрические уравнения и неравенства|Trigonometrik tenglamalar va tengsizliklar",
        "Сложные проценты и математическое моделирование|Murakkab foizlar va matematik modellashtirish",
        "Случайные события и элементы статистики|Tasodifiy hodisalar va statistika elementlari",
      ],
      11: [
        "Производная, предел и средняя и мгновенная скорость изменения|Hosila, limit, o‘rtacha va oniy o‘zgarish tezligi",
        "Правила дифференцирования, производная сложной функции, касательная и нормаль|Differensiallash qoidalari, murakkab funksiya hosilasi, urinma va normal",
        "Исследование функции, интервалы возрастания, экстремумы и оптимизационные задачи|Funksiyani tekshirish, o‘sish oraliqlari, ekstremumlar va optimallashtirish masalalari",
        "Первообразная, неопределённый и определённый интеграл, формула Ньютона–Лейбница|Boshlang‘ich funksiya, aniqmas va aniq integral, Nyuton–Leybnits formulasi",
        "Применение интеграла: площадь, объём, работа и приближённые вычисления|Integralning tatbiqlari: yuza, hajm, ish va taqribiy hisoblashlar",
        "Комбинаторика, перестановки, размещения, сочетания и биномиальная формула Ньютона|Kombinatorika, o‘rin almashtirish, o‘rinlashtirish, guruhlash va Nyuton binomi",
        "Статистические данные, среднее, мода, медиана, разброс и корреляция|Statistik ma’lumotlar, o‘rta qiymat, moda, mediana, tarqoqlik va korrelyatsiya",
        "Случайные события, операции над событиями, вероятность, биномиальное и нормальное распределения|Tasodifiy hodisalar, ular ustida amallar, ehtimollik, binomial va normal taqsimotlar",
      ],
    },
    geom: {
      8: [
        "Основные свойства четырёхугольников и параллелограмма|To‘rtburchaklar va parallelogrammning asosiy xossalari",
        "Признаки и свойства параллелограмма, прямоугольника, ромба и квадрата|Parallelogramm, to‘g‘ri to‘rtburchak, romb va kvadratning alomatlari va xossalari",
        "Трапеция, средняя линия трапеции и её свойства|Trapetsiya, trapetsiyaning o‘rta chizig‘i va uning xossalari",
        "Теорема Фалеса, подобные треугольники и признаки подобия|Fales teoremasi, o‘xshash uchburchaklar va o‘xshashlik alomatlari",
        "Теорема Пифагора и метрические соотношения в прямоугольном треугольнике|Pifagor teoremasi va to‘g‘ri burchakli uchburchakdagi metrik munosabatlar",
        "Окружность, хорды, касательные и вписанные углы|Aylana, vatarlar, urinmalar va ichki chizilgan burchaklar",
        "Площади треугольников и четырёхугольников|Uchburchaklar va to‘rtburchaklar yuzlari",
      ],
      9: [
        "Подобные многоугольники, коэффициент подобия и преобразования плоскости|O‘xshash ko‘pburchaklar, o‘xshashlik koeffitsienti va tekislik almashtirishlari",
        "Синус, косинус, тангенс и котангенс угла от 0° до 180°|0° dan 180° gacha bo‘lgan burchakning sinusi, kosinusi, tangensi va kotangensi",
        "Теоремы синусов и косинусов и решение треугольников|Sinuslar va kosinuslar teoremalari hamda uchburchaklarni yechish",
        "Скалярное произведение векторов и угол между векторами|Vektorlarning skalyar ko‘paytmasi va ular orasidagi burchak",
        "Правильные многоугольники, вписанные и описанные окружности|Muntazam ko‘pburchaklar, ichki va tashqi chizilgan aylanalar",
        "Длина окружности и дуги, радианная мера угла|Aylana va yoy uzunligi, burchakning radian o‘lchovi",
        "Площадь круга и его частей|Doira va uning bo‘laklari yuzi",
      ],
      10: [
        "Аксиомы стереометрии и взаимное расположение прямых и плоскостей|Stereometriya aksiomalari va to‘g‘ri chiziq hamda tekisliklarning o‘zaro joylashuvi",
        "Параллельность прямых и плоскостей в пространстве|Fazoda to‘g‘ri chiziq va tekisliklarning parallelligi",
        "Перпендикулярность прямой и плоскости, расстояния и углы в пространстве|To‘g‘ri chiziq va tekislik perpendikulyarligi, masofalar va fazodagi burchaklar",
        "Многогранники, призмы и пирамиды, их сечения|Ko‘pyoqlar, prizmalar va piramidalar, ularning kesimlari",
        "Площади поверхностей и объёмы пространственных фигур|Fazoviy jismlarning sirt yuzalari va hajmlari",
        "Декартовы координаты и векторы в пространстве|Fazoda Dekart koordinatalari va vektorlar",
      ],
      11: [
        "Декартовы координаты и векторы в пространстве, уравнение сферы|Fazoda Dekart koordinatalari va vektorlar, sfera tenglamasi",
        "Многогранники и призмы: виды, сечения, развёртки, площадь и объём|Ko‘pyoqlar va prizmalar: turlari, kesimlari, yoyilmalari, yuza va hajm",
        "Цилиндр: элементы, сечения, развёртка, площадь поверхности и объём|Silindr: elementlari, kesimlari, yoyilmasi, sirt yuzi va hajmi",
        "Пирамида и усечённая пирамида: элементы, поверхность и объём|Piramida va kesik piramida: elementlari, sirti va hajmi",
        "Конус и усечённый конус: элементы, поверхность и объём|Konus va kesik konus: elementlari, sirti va hajmi",
        "Сфера и шар, касательная плоскость, сечения и объём|Sfera va shar, urinma tekislik, kesimlar va hajm",
        "Сегмент, сектор и слой шара, площади сферических частей|Shar segmenti, sektori va qatlami, sferik qismlar yuzalari",
      ],
    },
  };
  Object.entries(mathProgramTopics).forEach(([subjectId, gradesBySubject]) => {
    Object.entries(gradesBySubject).forEach(([grade, topics]) => {
      scope[subjectId] ||= {};
      scope[subjectId][grade] = topics;
    });
  });

  const extraSubjects = {
    stories: ["#A16207", "📜", "Рассказы по истории", "Tarixdan hikoyalar"],
    ancient: ["#B45309", "🏺", "История древнего мира", "Qadimgi dunyo tarixi"],
    biz: ["#0F766E", "💼", "Основы предпринимательства", "Tadbirkorlik asoslari"],
  };
  Object.entries(extraSubjects).forEach(([id, value]) => { if (!S[id]) S[id] = value; });
  st.schoolLang = st.schoolLang === "ru" ? "ru" : "uz";

  // These 2026–27 plan entries split topics that the lesson bank previously grouped together.
  // Reuse the matching fact banks so the new subject cards open real lessons and quizzes.
  if (typeof GS !== "undefined") {
    if (!GS.stories && GS.hist) GS.stories = () => GS.hist(5);
    if (!GS.ancient && GS.whist) GS.ancient = () => GS.whist(6);
    if (!GS.biz && GS.econ) GS.biz = () => GS.econ(11);
  }
  if (typeof QZ !== "undefined") {
    if (!QZ.stories && QZ.whist) QZ.stories = QZ.whist;
    if (!QZ.ancient && QZ.whist) QZ.ancient = QZ.whist;
    if (!QZ.biz && QZ.econ) QZ.biz = QZ.econ;
  }

  const hours = (id, grade, track = st.schoolLang) => {
    const values = (plan.tracks[track] && plan.tracks[track][id]) || plan.common[id];
    return values ? Number(values[grade - 1] || 0) : 0;
  };
  const displayName = (id, lang = st.lang) => {
    if (id === "uz" && st.schoolLang === "uz") return lang === "uz" ? "Ona tili" : "Родной узбекский язык";
    if (id === "rus" && st.schoolLang === "ru") return lang === "uz" ? "Rus tili (ona tili)" : "Русский язык (родной)";
    if (id === "rus" && st.schoolLang === "uz") return lang === "uz" ? "Rus tili" : "Русский язык";
    if (id === "uz" && st.schoolLang === "ru") return lang === "uz" ? "O‘zbek tili" : "Узбекский язык";
    if (id === "stories") return lang === "uz" ? "Tarixdan hikoyalar" : "Рассказы по истории";
    if (id === "ancient") return lang === "uz" ? "Qadimgi dunyo tarixi" : "История древнего мира";
    if (id === "biz") return lang === "uz" ? "Tadbirkorlik asoslari" : "Основы предпринимательства";
    return S[id] ? S[id][lang === "uz" ? 3 : 2] : id;
  };
  const outlineFor = (id, grade) => {
    const exact = scope[id] && scope[id][grade];
    if (exact) return exact;
    const generic = typeof UZ_CURRICULUM !== "undefined" && UZ_CURRICULUM[id];
    if (generic) return generic.map((pair) => pair.map(String).join("|"));
    return [];
  };
  const topicPair = (entry) => {
    const at = entry.indexOf("|");
    return at < 0 ? [entry, entry] : [entry.slice(0, at), entry.slice(at + 1)];
  };
  const uzFirst = new Set(["uz", "read", "lit", "ancient", "hist", "whist", "geog", "phys", "chem", "bio", "law", "econ", "biz", "edu", "music", "draw", "tech", "pe", "draft", "astro", "mil"]);
  // Agentlikning sinflar bo‘yicha fan dasturlari. Links are surfaced beside
  // the site's supplementary material so learners can compare the official
  // program and their current textbook.
  const officialProgramPages = {
    math: "matematika_dastur11", alg: "matematika_dastur11", geom: "matematika_dastur11",
    rus: "rus_tili_dastur", uz: "uzbek_tili", lit: "ona_tili_dastur11",
    eng: "xorijiy_til_dastur", hist: "tarix_dastur11", whist: "tarix_dastur11",
    law: "huquq_dastur11", phys: "fizika_dastur11", astro: "fizika_dastur11",
    chem: "kimyo_dastur", bio: "biologiya_dastur", geog: "geografiya_dastur11", inf: "informatika_dastur11",
  };
  const programPage = (id) => {
    let page = officialProgramPages[id];
    if (id === "uz") page = st.schoolLang === "ru" ? "uzbek_tili" : "ona_tili_dastur11";
    if (id === "rus") page = st.schoolLang === "ru" ? "rus_tili_dastur" : "rus_tili_dastur9";
    if (id === "lit") page = st.schoolLang === "ru" ? "rus_tili_dastur11" : "ona_tili_dastur11";
    return page ? `https://uzbmb.uz/page/${page}` : "";
  };
  const questionsFor = (id, topic, grade) => {
    const normalized = uzFirst.has(id) ? [topic[1], topic[0]] : topic;
    const ruTopic = normalized[0], uzTopic = normalized[1];
    const sets = {
      math: [[`Какие правила и вычисления нужны для темы «${ruTopic}»? Приведи пример.`, `«${uzTopic}» mavzusi uchun qaysi qoida va hisoblashlar kerak? Misol keltir.`], [`Составь задачу по теме «${ruTopic}», реши её и проверь ответ.`, `«${uzTopic}» mavzusi bo‘yicha masala tuz, yech va javobni tekshir.`]],
      alg: [[`Какое правило или свойство помогает решать задания по теме «${ruTopic}»?`, `«${uzTopic}» mavzusidagi topshiriqlarni yechishda qaysi qoida yoki xossa yordam beradi?`], [`Реши пример по теме «${ruTopic}» и объясни каждый шаг.`, `«${uzTopic}» mavzusi bo‘yicha misol yechib, har bir qadamni tushuntir.`]],
      geom: [[`Какое свойство или теорема относится к теме «${ruTopic}»?`, `«${uzTopic}» mavzusiga qaysi xossa yoki teorema tegishli?`], [`Нарисуй пример по теме «${ruTopic}» и обоснуй решение.`, `«${uzTopic}» mavzusi bo‘yicha chizma chizib, yechimni asosla.`]],
      hist: [[`Какие события, люди или даты связаны с темой «${ruTopic}»?`, `«${uzTopic}» mavzusi bilan qaysi voqealar, shaxslar yoki sanalar bog‘liq?`], [`Назови причины и последствия одного события из темы «${ruTopic}».`, `«${uzTopic}» mavzusidagi bir voqeaning sabablari va oqibatlarini ayt.`]],
      whist: [[`К какому времени и региону относится тема «${ruTopic}»?`, `«${uzTopic}» mavzusi qaysi davr va hududga tegishli?`], [`Сравни два события или явления из темы «${ruTopic}».`, `«${uzTopic}» mavzusidagi ikkita voqea yoki hodisani taqqosla.`]],
      phys: [[`Какие физические величины и законы нужны для темы «${ruTopic}»?`, `«${uzTopic}» mavzusi uchun qaysi fizik kattaliklar va qonunlar kerak?`], [`Приведи пример явления из темы «${ruTopic}» и объясни его.`, `«${uzTopic}» mavzusiga oid hodisaga misol keltir va uni tushuntir.`]],
      chem: [[`Какие вещества, свойства или превращения изучаются в теме «${ruTopic}»?`, `«${uzTopic}» mavzusida qaysi moddalar, xossalar yoki o‘zgarishlar o‘rganiladi?`], [`Запиши или опиши пример химического процесса по теме «${ruTopic}».`, `«${uzTopic}» mavzusiga oid kimyoviy jarayonni yoz yoki tasvirla.`]],
      bio: [[`Какие организмы, органы или процессы изучаются в теме «${ruTopic}»?`, `«${uzTopic}» mavzusida qaysi organizmlar, a’zolar yoki jarayonlar o‘rganiladi?`], [`Объясни, как тема «${ruTopic}» связана с жизнью человека или природы.`, `«${uzTopic}» mavzusi inson yoki tabiat hayoti bilan qanday bog‘liqligini tushuntir.`]],
      geog: [[`Какие места, объекты или природные процессы связаны с темой «${ruTopic}»?`, `«${uzTopic}» mavzusi bilan qaysi joylar, obyektlar yoki tabiiy jarayonlar bog‘liq?`], [`Покажи пример по теме «${ruTopic}» на карте или схеме и объясни его.`, `«${uzTopic}» mavzusi bo‘yicha xarita yoki sxemada misol ko‘rsatib, tushuntir.`]],
      inf: [[`Какой алгоритм или цифровой инструмент используется в теме «${ruTopic}»?`, `«${uzTopic}» mavzusida qaysi algoritm yoki raqamli vosita qo‘llanadi?`], [`Опиши шаги практического задания по теме «${ruTopic}».`, `«${uzTopic}» mavzusi bo‘yicha amaliy topshiriq qadamlarini tasvirla.`]],
      eng: [[`Какие слова и языковая конструкция нужны, чтобы говорить о теме «${ruTopic}»?`, `«${uzTopic}» mavzusi haqida gapirish uchun qaysi so‘zlar va til qurilmasi kerak?`], [`Составь короткий текст или диалог по теме «${ruTopic}».`, `«${uzTopic}» mavzusi bo‘yicha qisqa matn yoki dialog tuz.`]],
      rus: [[`Какое языковое правило изучается в теме «${ruTopic}»?`, `«${uzTopic}» mavzusida qaysi til qoidasi o‘rganiladi?`], [`Составь предложение с примером по теме «${ruTopic}».`, `«${uzTopic}» mavzusiga oid misol bilan gap tuz.`]],
      uz: [[`Какое языковое правило изучается в теме «${ruTopic}»?`, `«${uzTopic}» mavzusida qaysi til qoidasi o‘rganiladi?`], [`Составь предложение с примером по теме «${ruTopic}».`, `«${uzTopic}» mavzusiga oid misol bilan gap tuz.`]],
      lit: [[`Какова главная мысль или особенность темы «${ruTopic}»?`, `«${uzTopic}» mavzusining asosiy g‘oyasi yoki xususiyati nima?`], [`Подкрепи свой ответ примером из прочитанного произведения по теме «${ruTopic}».`, `Javobingni «${uzTopic}» mavzusida o‘qilgan asardan misol bilan asosla.`]],
      read: [[`О чём текст по теме «${ruTopic}» и какова его главная мысль?`, `«${uzTopic}» mavzusidagi matn nima haqida va uning asosiy fikri qanday?`], [`Какие слова или детали текста помогают понять тему «${ruTopic}»?`, `«${uzTopic}» mavzusini tushunishga matndagi qaysi so‘z yoki tafsilotlar yordam beradi?`]],
    };
    const prompts = sets[id] || [[`Что нужно знать по теме «${ruTopic}»? Назови основные понятия и приведи пример.`, `«${uzTopic}» mavzusi bo‘yicha nimalarni bilish kerak? Asosiy tushunchalarni aytib, misol keltir.`], [`Как применить тему «${ruTopic}» в задании или повседневной ситуации?`, `«${uzTopic}» mavzusini topshiriq yoki kundalik vaziyatda qanday qo‘llash mumkin?`]];
    return prompts;
  };
  const englishRu = {
    1: ["Приветствия, имена и фразы для урока", "Числа, цвета и школьные предметы", "Семья, игрушки и простые описания", "Песни, аудирование и звуки букв"],
    2: ["Семья, дом и повседневные дела", "Еда, животные и погода", "Простые вопросы и ответы", "Чтение коротких сообщений и рассказов"],
    3: ["Школа, увлечения и родной город", "Распорядок дня и время", "Описание людей, мест и предметов", "Короткие диалоги и письмо по образцу"],
    4: ["Люди, места и повседневные планы", "Прошедшие события и личный опыт", "Как спросить дорогу, сделать покупку и обратиться с просьбой", "Короткие письма, рассказы и презентации"],
    5: ["Личная информация, семья и школа", "Распорядок дня и досуг", "Еда, покупки и как спросить дорогу", "Present Simple/Continuous и короткие тексты"],
    6: ["Путешествия, транспорт и каникулы", "Спорт, здоровье и события в прошлом", "Планы, прогнозы и приглашения", "Past Simple, формы будущего времени и рассказы"],
    7: ["Люди, культура и общение", "Сравнения, количество и описания", "Прошлый опыт и намерения на будущее", "Чтение с пониманием деталей и абзац"],
    8: ["Экология, технологии и общество", "Present Perfect и жизненный опыт", "Модальные глаголы, советы и обязанности", "Доклады, письма и устные презентации"],
    9: ["Образование, работа и выбор будущего", "Новости, медиа и оценка информации", "Условные предложения, пассивный залог и косвенная речь", "Эссе, краткое изложение и дискуссия"],
    10: ["Глобальные проблемы, наука и культура", "Сложные предложения и продвинутые глагольные конструкции", "Академическое чтение и аргументы с доказательствами", "Официальная переписка, доклады и презентации"],
    11: ["Академическое и профессиональное общение", "Критическое чтение и оценка источников", "Структура эссе, аргументация и редактирование", "Аудирование, говорение и подготовка к экзаменам"],
  };

  window.PARTA_CURRICULUM_2026 = plan;
  window.PARTA_CURRICULUM_SCOPE_2026 = scope;
  window.partaSchoolLanguage = () => st.schoolLang;
  window.setSchoolLang2026 = (lang) => {
    st.schoolLang = lang === "ru" ? "ru" : "uz";
    save();
    route();
  };
  window.subsAll = (grade) => plan.order.filter((id) => hours(id, +grade) > 0 && S[id]);
  window.subs = (grade) => window.subsAll(grade);

  const trackControl = () => {
    const ru = st.lang !== "uz";
    return `<div class="box" style="margin:12px 0"><b>${ru ? "Язык обучения в школе" : "Maktabdagi ta’lim tili"}</b><div class="seg" role="group" style="margin-top:9px"><button type="button" class="${st.schoolLang === "ru" ? "on" : ""}" aria-pressed="${st.schoolLang === "ru"}" onclick="setSchoolLang2026('ru')">${ru ? "Русский" : "Rus tili"}</button><button type="button" class="${st.schoolLang === "uz" ? "on" : ""}" aria-pressed="${st.schoolLang === "uz"}" onclick="setSchoolLang2026('uz')">${ru ? "Узбекский" : "O‘zbek tili"}</button></div><p class="muted" style="margin-bottom:0">${ru ? "Это выбирает школьную программу. Переключатель языка сайта в шапке только меняет язык интерфейса." : "Bu maktab dasturini tanlaydi. Sayt tilini yuqoridagi tugma orqali alohida o‘zgartirasiz."}</p></div>`;
  };

  window.grades = () => `<section><h1>${t("pick2")}</h1>${trackControl()}${gradeGrid()}<p class="muted">${st.lang === "uz" ? "Fanlar va haftalik soatlar 2026–2027-o‘quv yiliga mo‘ljallangan tayanch o‘quv rejasidan olindi." : "Состав предметов и недельные часы взяты из базового учебного плана на 2026–2027 учебный год."}</p></section>`;
  window.subjects = (grade) => {
    st.grade = +grade;
    save();
    const q = (st.q || "").toLowerCase();
    const ids = window.subsAll(+grade).filter((id) => displayName(id).toLowerCase().includes(q) || nm(id).toLowerCase().includes(q));
    const cards = ids.map((id) => {
      const c = S[id], done = doneN(cid(id, grade)), h = hours(id, +grade);
      return `<a class="card" style="--c:${c[0]}" href="#/course/${cid(id, grade)}"><div class="ico" aria-hidden="true">${c[1]}</div><h3>${displayName(id)}</h3><div class="muted">${grade}${t("grade")} · ${h} ${st.lang === "uz" ? "soat/hafta" : "ч/нед"} · ${done}/3</div><div class="bar" style="margin-top:10px"><i style="width:${(done * 100) / 3}%"></i></div></a>`;
    }).join("");
    const source = plan.sources[0], indexSource = plan.sources[1], booksSource = plan.sources[2];
    return `<section><h1>${grade}${t("grade")}</h1>${trackControl()}<div class="tools"><input id="sq" type="search" placeholder="${t("search")}" aria-label="${t("search")}" value="${esc(st.q || "")}" oninput="st.q=this.value;route(1)"><div class="seg" role="group" aria-label="${t("grades")}">${Array.from({ length: 11 }, (_, i) => `<button class="${i + 1 == grade ? "on" : ""}" aria-pressed="${i + 1 == grade}" onclick="pickGrade(${i + 1})">${i + 1}</button>`).join("")}</div></div><p class="muted">${st.lang === "uz" ? `2026–2027-o‘quv yilidagi tayanch reja · ${window.subsAll(+grade).length} ta fan` : `Базовый учебный план на 2026–2027 год · предметов: ${window.subsAll(+grade).length}`}</p><div class="grid">${cards || `<p class="muted">${t("none")}</p>`}</div><p class="muted" style="margin-top:18px">${st.lang === "uz" ? "Maktabning tasdiqlangan rejasi va tanlangan chet tili ayrim farqlar kiritishi mumkin." : "Утверждённый план конкретной школы и выбранный иностранный язык могут вносить отличия."} <a href="${source.url}" target="_blank" rel="noopener">${source.label[st.lang === "uz" ? 1 : 0]}</a> · <a href="${indexSource.url}" target="_blank" rel="noopener">${indexSource.label[st.lang === "uz" ? 1 : 0]}</a> · <a href="${booksSource.url}" target="_blank" rel="noopener">${booksSource.label[st.lang === "uz" ? 1 : 0]}</a></p></section>`;
  };

  window.curriculumSection = (subject, grade) => {
    const entries = outlineFor(subject, +grade);
    const langIndex = st.lang === "uz" ? 1 : 0;
    let localized = entries.map(topicPair);
    if (uzFirst.has(subject)) localized = localized.map(([ru, uz]) => [uz, ru]);
    const englishRussianTopics = (window.PARTA_ENGLISH_TOPIC_RU_2026 && window.PARTA_ENGLISH_TOPIC_RU_2026[grade]) || englishRu[grade] || [];
    if (subject === "eng") localized = localized.map((pair, index) => [englishRussianTopics[index] || pair[0], pair[1]]);
    const source = plan.sources[0], indexSource = plan.sources[1], booksSource = plan.sources[2];
    const verified = hours(subject, +grade) > 0;
    const canonicalTopics = localized.map((pair, index) => {
      const original = uzFirst.has(subject) ? [pair[1], pair[0]] : pair;
      if (subject === "eng") original[0] = englishRussianTopics[index] || original[0];
      return original;
    });
    const units = localized.length
      ? `<ol>${localized.map((pair, index) => {
          const qs = questionsFor(subject, canonicalTopics[index], +grade);
          return `<li style="margin-bottom:12px"><b>${esc(pair[langIndex])}</b><div style="margin-top:5px"><span class="muted">${st.lang === "uz" ? "O‘zini tekshirish savollari:" : "Вопросы для самопроверки:"}</span><ol style="margin:4px 0 0;padding-left:22px">${qs.map((q) => `<li>${esc(q[langIndex])}</li>`).join("")}</ol></div></li>`;
        }).join("")}</ol><a class="btn ghost" style="display:inline-block;text-decoration:none;margin-top:8px" href="#/quiz/${subject}-${grade}">${st.lang === "uz" ? "Fan bo‘yicha testni boshlash" : "Пройти тест по предмету"}</a>`
      : `<p class="muted">${st.lang === "uz" ? "Bu fan bo‘yicha sinfga xos mavzular katalogi hali kiritilmagan. Rasmiy o‘quv dasturiga havolani ko‘ring." : "Для этого предмета список тем по классу пока не добавлен. Откройте ссылку на утверждённые учебные программы."}</p>`;
    const general = st.lang === "uz"
      ? "Mavzular e’lon qilingan dastur va darsliklar bo‘yicha bo‘limlarga jamlangan. Darslarning aniq nomi va taqvimdagi tartibini maktab rejasi va amaldagi darslikdan tekshiring."
      : "Темы сгруппированы в разделы по опубликованным программам и учебникам. Точные названия уроков и их календарный порядок сверяйте с планом школы и действующим учебником.";
    const programUrl = programPage(subject);
    const officialLink = programUrl
      ? `<a href="${programUrl}" target="_blank" rel="noopener">${st.lang === "uz" ? "Agentlikdagi fan dasturlari" : "Программы предмета на сайте Агентства оценки знаний"}</a> · `
      : "";
    const schoolNote = st.lang === "uz"
      ? "Savollar ochiq shaklda berilgan; avtomatik tekshirish uchun fan testini ishlating."
      : "Вопросы открытые, для самостоятельного повторения; автоматическая проверка доступна в тесте по предмету.";
    return `<div class="box" style="margin-top:18px"><h3>📚 ${st.lang === "uz" ? `${grade}-sinf mavzulari va savollari` : `Темы и вопросы · ${grade} класс`}</h3><p class="muted">${verified ? `${hours(subject, +grade)} ${st.lang === "uz" ? "soat/hafta" : "ч/нед · " + plan.version + " год"}` : ""}${verified ? " · " : ""}${general} ${schoolNote}</p>${units}<p class="muted">${officialLink}<a href="${source.url}" target="_blank" rel="noopener">${source.label[langIndex]}</a> · <a href="${indexSource.url}" target="_blank" rel="noopener">${indexSource.label[langIndex]}</a> · <a href="${booksSource.url}" target="_blank" rel="noopener">${booksSource.label[langIndex]}</a></p></div>`;
  };

  // Repaint the current screen so the saved school track takes effect immediately.
  if (typeof route === "function") route(1);
})();
