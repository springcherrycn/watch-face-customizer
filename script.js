const texts = {
    'en': {
        panelTitle: 'Watch Settings', lang: 'Language', region: 'Timezone', dial: 'Dial Color',
        bg: 'Background Image', bgHint: 'Upload to SM.MS/ImgBB, copy link and click Paste',
        about: 'About', aboutText: 'A minimalist creative watch face designed by SpringCherry, a music merchandise brand from Mainland China. SpringCherry legally reserves all intellectual property rights. Contact: springcherry@126.com',
        random: 'Random Color', pasteBtn: 'Paste', pasteSuccess: 'Image loaded!', pasteFail: 'Failed to read clipboard.', pasteInvalid: 'Invalid link.',
        dialOptions: [{v:'#000000',l:'Black'},{v:'#FFFFFF',l:'White'},{v:'random',l:'Random Color'}]
    },
    'zh-CN': {
        panelTitle: '表盘设置', lang: '语言', region: '时区', dial: '表盘颜色',
        bg: '背景图片', bgHint: '请前往SM.MS或ImgBB上传图片，复制链接后点击粘贴',
        about: '关于我们', aboutText: '一款极简风格的创意表盘，由中国大陆音乐周边品牌SpringCherry设计，依法享有全部知识产权。联系我们：springcherry@126.com',
        random: '随机颜色', pasteBtn: '粘贴', pasteSuccess: '图片已加载！', pasteFail: '读取剪贴板失败。', pasteInvalid: '链接格式错误。',
        dialOptions: [{v:'#000000',l:'黑色'},{v:'#FFFFFF',l:'白色'},{v:'random',l:'随机颜色'}]
    },
    'zh-TW': {
        panelTitle: '錶盤設置', lang: '語言', region: '時區', dial: '錶盤顏色',
        bg: '背景圖片', bgHint: '請前往SM.MS/ImgBB上傳圖片，複製鏈接後點擊粘貼',
        about: '關於我們', aboutText: '一款極簡風格的創意錶盤，由中國大陸音樂周邊品牌SpringCherry設計，依法享有全部知識產權。聯繫我們：springcherry@126.com',
        random: '隨機顏色', pasteBtn: '粘貼', pasteSuccess: '圖片已加載！', pasteFail: '讀取剪貼板失敗。', pasteInvalid: '鏈接格式錯誤。',
        dialOptions: [{v:'#000000',l:'黑色'},{v:'#FFFFFF',l:'白色'},{v:'random',l:'隨機顏色'}]
    }
};

// ✅ 全球时区列表 (UTC-12 到 UTC+14)
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
const panelTitle = document.getElementById('panelTitle');
const aboutText = document.getElementById('aboutText');

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

// ✅ 点击齿轮开关菜单 (唯一的开关方式)
openSettingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsPanel.classList.toggle('show');
});

// 点击页面其他地方关闭菜单
document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) && !openSettingsBtn.contains(e.target)) {
        settingsPanel.classList.remove('show');
    }
});

// 语言切换 (保持当前设置)
langSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected === 'en' || selected === 'zh-CN' || selected === 'zh-TW') {
        currentLang = selected;
        const t = texts[currentLang];
        const currentDial = dialStyleSelect.value;
        const currentBg = bgImageUrlInput.value;
        const currentRegion = regionSelect.value;

        panelTitle.textContent = t.panelTitle;
        document.getElementById('labelLang').textContent = t.lang;
        document.getElementById('labelRegion').textContent = t.region;
        document.getElementById('labelDial').textContent = t.dial;
        document.getElementById('labelBg').textContent = t.bg;
        document.getElementById('bgHint').textContent = t.bgHint;
        document.getElementById('labelAbout').textContent = t.about;
        aboutText.textContent = t.aboutText;
        pasteBtn.textContent = t.pasteBtn;
        openSettingsBtn.title = t.panelTitle;

        // 填充时区 (全量)
        regionSelect.innerHTML = '';
        timezones.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz.v;
            option.textContent = `UTC${tz.v >= 0 ? '+' : ''}${tz.v}:00 (${tz.n})`;
            if (tz.v === currentRegion) option.selected = true;
            regionSelect.appendChild(option);
        });

        // 填充颜色选项
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
    }
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
    minuteHand.style.borderBottomColor = mainColor;
    secondHand.style.background = secColor;
    secondHand.style.borderBottomColor = secColor;
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

// ✅ 修复秒针逻辑 (强制使用内联样式，防止被CSS覆盖)
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

    // 强制设置 transform，确保秒针不会跑到6点
    hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `translate(-50%, -100%) rotate(${secondDeg}deg)`;
}

// 初始化
createTicks();
setHandsColor('#ffffff', '#ff4d6d');
setInterval(updateClock, 1000);
updateClock();