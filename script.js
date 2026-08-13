// ✅ 多语言配置 (16种语言，按首字母排序，默认English)
const texts = {
    'en': { // 默认
        panelTitle: 'Watch Settings', lang: 'Language', region: 'Timezone', dial: 'Dial Color',
        bg: 'Background Image', bgHint: 'Upload to ImgBB/SM.MS, copy link, then click Paste',
        about: 'About', aboutText: 'A minimalist watch face by SpringCherry. All rights reserved. Contact: springcherry@126.com',
        random: 'Random Color', pasteBtn: 'Paste', pasteSuccess: 'Image loaded!', pasteFail: 'Clipboard read failed.', pasteInvalid: 'Invalid image link.',
        dialOptions: [{v:'#000000',l:'Black'},{v:'#FFFFFF',l:'White'},{v:'random',l:'Random Color'}]
    },
    'ar': { panelTitle: 'إعدادات الساعة', lang: 'اللغة', region: 'المنطقة الزمنية', dial: 'لون القرص', bg: 'صورة الخلفية', bgHint: 'ارفع الصورة وانسخ الرابط ثم الصق هنا', about: 'حول', aboutText: 'وجه ساعة بسيط من SpringCherry. جميع الحقوق محفوظة.', random: 'لون عشوائي', pasteBtn: 'لصق', pasteSuccess: 'تم التحميل!', pasteFail: 'فشل القراءة.', pasteInvalid: 'رابط غير صالح.', dialOptions: [{v:'#000000',l:'أسود'},{v:'#FFFFFF',l:'أبيض'},{v:'random',l:'عشوائي'}] },
    'de': { panelTitle: 'Uhreneinstellungen', lang: 'Sprache', region: 'Zeitzone', dial: 'Zifferblattfarbe', bg: 'Hintergrundbild', bgHint: 'Upload zu ImgBB/SM.MS, Link kopieren und einfügen', about: 'Über', aboutText: 'Ein minimalistisches Zifferblatt von SpringCherry. Alle Rechte vorbehalten.', random: 'Zufallsfarbe', pasteBtn: 'Einfügen', pasteSuccess: 'Bild geladen!', pasteFail: 'Fehler.', pasteInvalid: 'Ungültiger Link.', dialOptions: [{v:'#000000',l:'Schwarz'},{v:'#FFFFFF',l:'Weiß'},{v:'random',l:'Zufall'}] },
    'es': { panelTitle: 'Configuración', lang: 'Idioma', region: 'Zona Horaria', dial: 'Color del Dial', bg: 'Imagen de Fondo', bgHint: 'Sube a ImgBB/SM.MS, copia el enlace y pega', about: 'Acerca de', aboutText: 'Esfera minimalista por SpringCherry. Todos los derechos reservados.', random: 'Color Aleatorio', pasteBtn: 'Pegar', pasteSuccess: '¡Imagen cargada!', pasteFail: 'Error.', pasteInvalid: 'Enlace inválido.', dialOptions: [{v:'#000000',l:'Negro'},{v:'#FFFFFF',l:'Blanco'},{v:'random',l:'Aleatorio'}] },
    'fr': { panelTitle: 'Paramètres', lang: 'Langue', region: 'Fuseau Horaire', dial: 'Couleur du Cadran', bg: 'Image de Fond', bgHint: 'Uploader sur ImgBB/SM.MS, copier le lien et coller', about: 'À propos', aboutText: 'Cadran minimaliste par SpringCherry. Tous droits réservés.', random: 'Couleur Aléatoire', pasteBtn: 'Coller', pasteSuccess: 'Image chargée!', pasteFail: 'Échec.', pasteInvalid: 'Lien invalide.', dialOptions: [{v:'#000000',l:'Noir'},{v:'#FFFFFF',l:'Blanc'},{v:'random',l:'Aléatoire'}] },
    'hi': { panelTitle: 'घड़ी सेटिंग', lang: 'भाषा', region: 'समय क्षेत्र', dial: 'डायल रंग', bg: 'पृष्ठभूमि चित्र', bgHint: 'ImgBB/SM.MS पर अपलोड करें, लिंक कॉपी करें और पेस्ट करें', about: 'परिचय', aboutText: 'SpringCherry द्वारा एक मिनिमलिस्ट वॉच फेस। सर्वाधिकार सुरक्षित।', random: 'रैंडम रंग', pasteBtn: 'पेस्ट', pasteSuccess: 'छवि लोड हुई!', pasteFail: 'विफल।', pasteInvalid: 'अमान्य लिंक।', dialOptions: [{v:'#000000',l:'काला'},{v:'#FFFFFF',l:'सफेद'},{v:'random',l:'रैंडम'}] },
    'id': { panelTitle: 'Pengaturan Jam', lang: 'Bahasa', region: 'Zona Waktu', dial: 'Warna Dial', bg: 'Gambar Latar', bgHint: 'Unggah ke ImgBB/SM.MS, salin tautan lalu tempel', about: 'Tentang', aboutText: 'Wajah jam minimalis oleh SpringCherry. Hak cipta dilindungi.', random: 'Warna Acak', pasteBtn: 'Tempel', pasteSuccess: 'Gambar dimuat!', pasteFail: 'Gagal.', pasteInvalid: 'Tautan tidak valid.', dialOptions: [{v:'#000000',l:'Hitam'},{v:'#FFFFFF',l:'Putih'},{v:'random',l:'Acak'}] },
    'ja': { panelTitle: '時計設定', lang: '言語', region: 'タイムゾーン', dial: '文字盤の色', bg: '背景画像', bgHint: 'ImgBB/SM.MSにアップロードし、リンクをコピーして貼り付け', about: '概要', aboutText: 'SpringCherryによるミニマリストな文字盤。全権利保有。', random: 'ランダム色', pasteBtn: '貼り付け', pasteSuccess: '読み込み完了！', pasteFail: '失敗。', pasteInvalid: '無効なリンク。', dialOptions: [{v:'#000000',l:'黒'},{v:'#FFFFFF',l:'白'},{v:'random',l:'ランダム'}] },
    'ko': { panelTitle: '시계 설정', lang: '언어', region: '시간대', dial: '다이얼 색상', bg: '배경 이미지', bgHint: 'ImgBB/SM.MS에 업로드 후 링크 복사하여 붙여넣기', about: '정보', aboutText: 'SpringCherry의 미니멀 시계 페이스입니다. 모든 권리 보유.', random: '무작위 색상', pasteBtn: '붙여넣기', pasteSuccess: '이미지 로드 완료!', pasteFail: '실패.', pasteInvalid: '잘못된 링크.', dialOptions: [{v:'#000000',l:'검정'},{v:'#FFFFFF',l:'흰색'},{v:'random',l:'무작위'}] },
    'ms': { panelTitle: 'Tetapan Jam', lang: 'Bahasa', region: 'Zon Masa', dial: 'Warna Dial', bg: 'Imej Latar', bgHint: 'Muat naik ke ImgBB/SM.MS, salin pautan dan tampal', about: 'Perihal', aboutText: 'Muka jam minimalis oleh SpringCherry. Hak cipta terpelihara.', random: 'Warna Rawak', pasteBtn: 'Tampal', pasteSuccess: 'Imej dimuat!', pasteFail: 'Gagal.', pasteInvalid: 'Pautan tidak sah.', dialOptions: [{v:'#000000',l:'Hitam'},{v:'#FFFFFF',l:'Putih'},{v:'random',l:'Rawak'}] },
    'pt': { panelTitle: 'Configurações', lang: 'Idioma', region: 'Fuso Horário', dial: 'Cor do Mostrador', bg: 'Imagem de Fundo', bgHint: 'Envie para ImgBB/SM.MS, copie o link e cole', about: 'Sobre', aboutText: 'Mostrador minimalista por SpringCherry. Todos os direitos reservados.', random: 'Cor Aleatória', pasteBtn: 'Colar', pasteSuccess: 'Imagem carregada!', pasteFail: 'Falha.', pasteInvalid: 'Link inválido.', dialOptions: [{v:'#000000',l:'Preto'},{v:'#FFFFFF',l:'Branco'},{v:'random',l:'Aleatório'}] },
    'ru': { panelTitle: 'Настройки', lang: 'Язык', region: 'Часовой пояс', dial: 'Цвет циферблата', bg: 'Фоновое изображение', bgHint: 'Загрузите на ImgBB/SM.MS, скопируйте ссылку и вставьте', about: 'О нас', aboutText: 'Минималистичный циферблат от SpringCherry. Все права защищены.', random: 'Случайный цвет', pasteBtn: 'Вставить', pasteSuccess: 'Загружено!', pasteFail: 'Ошибка.', pasteInvalid: 'Неверная ссылка.', dialOptions: [{v:'#000000',l:'Чёрный'},{v:'#FFFFFF',l:'Белый'},{v:'random',l:'Случайный'}] },
    'th': { panelTitle: 'ตั้งค่านาฬิกา', lang: 'ภาษา', region: 'เขตเวลา', dial: 'สีหน้าปัด', bg: 'ภาพพื้นหลัง', bgHint: 'อัปโหลดไปที่ ImgBB/SM.MS คัดลอกลิงก์แล้ววางที่นี่', about: 'เกี่ยวกับ', aboutText: 'หน้าปัดนาฬิกาสไตล์มินิมอลโดย SpringCherry สงวนลิขสิทธิ์', random: 'สีสุ่ม', pasteBtn: 'วาง', pasteSuccess: 'โหลดภาพสำเร็จ!', pasteFail: 'ล้มเหลว', pasteInvalid: 'ลิงก์ไม่ถูกต้อง', dialOptions: [{v:'#000000',l:'ดำ'},{v:'#FFFFFF',l:'ขาว'},{v:'random',l:'สุ่ม'}] },
    'tl': { panelTitle: 'Mga Setting', lang: 'Wika', region: 'Timezone', dial: 'Kulay ng Dial', bg: 'Larawan sa Likod', bgHint: 'I-upload sa ImgBB/SM.MS, kopyahin ang link at i-paste', about: 'Tungkol', aboutText: 'Minimalist watch face mula sa SpringCherry. Lahat ng karapatan ay nakalaan.', random: 'Random na Kulay', pasteBtn: 'Paste', pasteSuccess: 'Na-load ang imahe!', pasteFail: 'Sira.', pasteInvalid: 'Hindi wastong link.', dialOptions: [{v:'#000000',l:'Itim'},{v:'#FFFFFF',l:'Puti'},{v:'random',l:'Random'}] },
    'vi': { panelTitle: 'Cài đặt Đồng hồ', lang: 'Ngôn ngữ', region: 'Múi giờ', dial: 'Màu mặt số', bg: 'Hình nền', bgHint: 'Tải lên ImgBB/SM.MS, sao chép liên kết và dán vào đây', about: 'Giới thiệu', aboutText: 'Mặt đồng hồ tối giản bởi SpringCherry. Bảo lưu mọi quyền.', random: 'Màu Ngẫu nhiên', pasteBtn: 'Dán', pasteSuccess: 'Tải ảnh thành công!', pasteFail: 'Lỗi.', pasteInvalid: 'Liên kết không hợp lệ.', dialOptions: [{v:'#000000',l:'Đen'},{v:'#FFFFFF',l:'Trắng'},{v:'random',l:'Ngẫu nhiên'}] },
    'zh-CN': { panelTitle: '表盘设置', lang: '简体中文', region: '时区', dial: '表盘颜色', bg: '背景图片', bgHint: '请上传至ImgBB/SM.MS，复制链接后粘贴', about: '关于我们', aboutText: 'SpringCherry极简表盘，依法享有全部知识产权。', random: '随机颜色', pasteBtn: '粘贴', pasteSuccess: '图片加载成功！', pasteFail: '读取失败。', pasteInvalid: '无效链接。', dialOptions: [{v:'#000000',l:'黑色'},{v:'#FFFFFF',l:'白色'},{v:'random',l:'随机颜色'}] },
    'zh-TW': { panelTitle: '錶盤設置', lang: '繁體中文', region: '時區', dial: '錶盤顏色', bg: '背景圖片', bgHint: '請上傳至ImgBB/SM.MS，複製鏈接後粘貼', about: '關於我們', aboutText: 'SpringCherry極簡錶盤，依法享有全部知識產權。', random: '隨機顏色', pasteBtn: '粘貼', pasteSuccess: '圖片加載成功！', pasteFail: '讀取失敗。', pasteInvalid: '無效鏈接。', dialOptions: [{v:'#000000',l:'黑色'},{v:'#FFFFFF',l:'白色'},{v:'random',l:'隨機顏色'}] }
};

// ✅ 全球全时区列表 (UTC-12 到 UTC+14)
const timezones = [
    { v: -12, n: 'Baker Island' }, { v: -11, n: 'Pago Pago' }, { v: -10, n: 'Honolulu' },
    { v: -9, n: 'Anchorage' }, { v: -8, n: 'Los Angeles' }, { v: -7, n: 'Denver' },
    { v: -6, n: 'Chicago' }, { v: -5, n: 'New York' }, { v: -4, n: 'Santiago' },
    { v: -3, n: 'Sao Paulo' }, { v: -2, n: 'Atlantic Ocean' }, { v: -1, n: 'Azores' },
    { v: 0, n: 'London' }, { v: 1, n: 'Paris' }, { v: 2, n: 'Cairo' },
    { v: 3, n: 'Moscow' }, { v: 4, n: 'Dubai' }, { v: 5, n: 'Karachi' },
    { v: 6, n: 'Dhaka' }, { v: 7, n: 'Bangkok' }, { v: 8, n: 'Beijing' },
    { v: 9, n: 'Tokyo' }, { v: 10, n: 'Sydney' }, { v: 11, n: 'Noumea' },
    { v: 12, n: 'Auckland' }, { v: 13, n: 'Phoenix Islands' }, { v: 14, n: 'Kiritimati' }
];

// ✅ 强制默认语言为 English
let currentLang = 'en';
let currentRegionOffset = 8;

// DOM
const settingsPanel = document.getElementById('settingsPanel');
const openSettingsBtn = document.getElementById('openSettings');
const langSelect = document.getElementById('langSelect');
const regionSelect = document.getElementById('regionSelect');
const dialStyleSelect = document.getElementById('dialStyleSelect');
const bgImageUrlInput = document.getElementById('bgImageUrl');
const pasteBtn = document.getElementById('pasteBtn');
const watchFace = document.getElementById('watchFace');
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const bgImage = document.getElementById('bgImage');

// 生成刻度
function createTicks() {
    const ticksContainer = document.getElementById('ticks');
    ticksContainer.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const tick = document.createElement('div');
        tick.className = 'tick';
        tick.style.transform = `rotate(${i * 30}deg)`;
        ticksContainer.appendChild(tick);
    }
}

// ✅ 点击齿轮开关菜单 (唯一开关)
openSettingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsPanel.classList.toggle('show');
});

// 点击外部关闭
document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) && !openSettingsBtn.contains(e.target)) {
        settingsPanel.classList.remove('show');
    }
});

// ✅ 语言切换 (按首字母排序填充)
function applyLanguage() {
    const t = texts[currentLang];
    
    // 保存当前UI状态
    const currentDial = dialStyleSelect.value;
    const currentBg = bgImageUrlInput.value;
    const currentRegion = regionSelect.value;

    // 更新文字
    document.getElementById('panelTitle').textContent = t.panelTitle;
    document.getElementById('labelLang').textContent = t.lang;
    document.getElementById('labelRegion').textContent = t.region;
    document.getElementById('labelDial').textContent = t.dial;
    document.getElementById('labelBg').textContent = t.bg;
    document.getElementById('bgHint').textContent = t.bgHint;
    document.getElementById('labelAbout').textContent = t.about;
    document.getElementById('aboutText').textContent = t.aboutText;
    pasteBtn.textContent = t.pasteBtn;
    openSettingsBtn.title = t.panelTitle;

    // 填充语言选项 (按首字母排序)
    langSelect.innerHTML = '';
    Object.keys(texts).sort((a, b) => {
        // 特殊处理中文排序
        if (a === 'zh-CN' && b === 'zh-TW') return -1;
        if (a === 'zh-TW' && b === 'zh-CN') return 1;
        return a.localeCompare(b);
    }).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = texts[key].lang; // 使用本地语言名称
        if (key === currentLang) option.selected = true;
        langSelect.appendChild(option);
    });

    // 填充时区 (全量)
    regionSelect.innerHTML = '';
    timezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz.v;
        option.textContent = `UTC${tz.v >= 0 ? '+' : ''}${tz.v}:00 (${tz.n})`;
        if (tz.v === currentRegion) option.selected = true;
        regionSelect.appendChild(option);
    });

    // 填充颜色
    dialStyleSelect.innerHTML = '';
    t.dialOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.v;
        option.textContent = opt.l;
        if (opt.v === currentDial) option.selected = true;
        dialStyleSelect.appendChild(option);
    });

    bgImageUrlInput.value = currentBg;
    document.documentElement.lang = currentLang;
    
    // 阿拉伯语特殊处理 (RTL)
    if (currentLang === 'ar') {
        document.documentElement.dir = 'rtl';
        document.body.style.textAlign = 'right';
    } else {
        document.documentElement.dir = 'ltr';
        document.body.style.textAlign = 'left';
    }
}

langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    applyLanguage();
});

regionSelect.addEventListener('change', (e) => currentRegionOffset = parseInt(e.target.value));

// 表盘颜色
dialStyleSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    watchFace.className = 'watch-face';
    
    if (value === '#000000') {
        watchFace.classList.add('theme-dark');
        watchFace.style.backgroundColor = '#000000';
        setHandsColor('#ffffff', '#ff4d6d');
    } else if (value === '#FFFFFF') {
        watchFace.classList.add('theme-light');
        watchFace.style.backgroundColor = '#FFFFFF';
        setHandsColor('#000000', '#333333');
    } else if (value === 'random') {
        watchFace.classList.add('theme-random');
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70 + Math.floor(Math.random() * 30);
        const lightness = 45 + Math.floor(Math.random() * 15);
        const contrastLight = lightness > 50 ? 20 : 80;
        const contrastColor = `hsl(${(hue + 180) % 360}, ${saturation}%, ${contrastLight}%)`;
        watchFace.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        watchFace.style.setProperty('--contrast-color', contrastColor);
        setHandsColor(contrastColor, '#ff4d6d');
    }
    createTicks();
});

function setHandsColor(mainColor, secColor) {
    hourHand.style.background = mainColor;
    minuteHand.style.background = mainColor;
    secondHand.style.background = secColor;
}

// 粘贴
pasteBtn.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        bgImageUrlInput.value = text;
        if (text && (text.endsWith('.jpg') || text.endsWith('.png') || text.endsWith('.jpeg'))) {
            bgImage.style.backgroundImage = `url(${text})`;
            bgImage.style.opacity = '1';
            alert(texts[currentLang].pasteSuccess);
        } else {
            alert(texts[currentLang].pasteInvalid);
        }
    } catch (err) {
        alert(texts[currentLang].pasteFail);
    }
});

// ✅ 修复秒针逻辑 (强制内联样式)
function updateClock() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (3600000 * currentRegionOffset));
    const hour = localTime.getHours() % 12;
    const minute = localTime.getMinutes();
    const second = localTime.getSeconds();
    
    const hourDeg = (hour * 30) + (minute * 0.5);
    const minuteDeg = (minute * 6) + (second * 0.1);
    const secondDeg = second * 6;

    // 强制设置，防止被CSS覆盖导致秒针跑到6点
    hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `translate(-50%, -100%) rotate(${secondDeg}deg)`;
}

// 初始化
createTicks();
setHandsColor('#ffffff', '#ff4d6d');
applyLanguage(); // 应用默认语言 (English)
setInterval(updateClock, 1000);
updateClock();