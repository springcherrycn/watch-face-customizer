// 多语言配置（仅完善中文/英文，其他语言选择后提示暂不支持）
const texts = {
    'zh-CN': {
        lang: '语言',
        region: '时区设置',
        dial: '表盘颜色',
        bg: '背景图片',
        bgHint: '请前往SM.MS或 ImgBB等网站上传图片，复制图片链接后点击粘贴',
        about: '关于我们',
        aboutText: '一款极简风格的智能手表表盘，由中国大陆音乐周边品牌SpringCherry设计。SpringCherry享有知识产权，侵权必究。邮箱：springcherry@126.com',
        random: '🎨 随机颜色',
        pasteSuccess: '图片已加载！',
        pasteFail: '读取剪贴板失败，请检查权限或手动粘贴。',
        pasteInvalid: '链接格式不正确，请确保是.jpg或.png结尾的图片链接。',
        saveBtn: '应用并关闭',
        unsupported: '该语言暂未支持，已为您保留当前语言。'
    },
    'en': {
        lang: 'Language',
        region: 'Timezone',
        dial: 'Dial Color',
        bg: 'Background Image',
        bgHint: 'Upload to SM.MS or ImgBB, copy the image link and click Paste.',
        about: 'About Us',
        aboutText: 'A minimalist smartwatch face designed by SpringCherry, a music merchandise brand from Mainland China. SpringCherry reserves all intellectual property rights. Infringement will be held liable. Email: springcherry@126.com',
        random: '🎨 Random Color',
        pasteSuccess: 'Image loaded!',
        pasteFail: 'Failed to read clipboard. Please check permissions.',
        pasteInvalid: 'Invalid link format. Please use .jpg or .png links.',
        saveBtn: 'Apply & Close',
        unsupported: 'This language is not supported yet. Your current language has been retained.'
    }
};

let currentLang = 'zh-CN';
let currentRegionOffset = 8;

// DOM元素
const settingsPanel = document.getElementById('settingsPanel');
const openSettingsBtn = document.getElementById('openSettings');
const closeSettingsBtn = document.getElementById('closePanel');
const saveBtn = document.getElementById('saveBtn');
const langSelect = document.getElementById('langSelect');
const regionSelect = document.getElementById('regionSelect');
const dialStyleSelect = document.getElementById('dialStyleSelect');
const bgImageUrlInput = document.getElementById('bgImageUrl');
const pasteBtn = document.getElementById('pasteBtn');
const watchFace = document.getElementById('watchFace');
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

// 背景图层
const bgImageLayer = document.createElement('div');
bgImageLayer.style.cssText = `
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    border-radius: 50%; background-size: cover; background-position: center;
    opacity: 0; transition: opacity 0.3s; z-index: 1;
`;
watchFace.appendChild(bgImageLayer);

// 面板开关（表盘完全不动）
openSettingsBtn.addEventListener('click', () => settingsPanel.classList.add('show'));
closeSettingsBtn.addEventListener('click', () => settingsPanel.classList.remove('show'));
saveBtn.addEventListener('click', () => settingsPanel.classList.remove('show'));

// 语言切换（20种语言仅支持中英，其他提示暂不支持）
langSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    if (selectedLang === 'zh-CN' || selectedLang === 'en') {
        currentLang = selectedLang;
        applyLanguage();
    } else {
        alert(texts[currentLang].unsupported);
        langSelect.value = currentLang; // 切回原语言
    }
});

function applyLanguage() {
    const t = texts[currentLang];
    document.getElementById('labelLang').textContent = t.lang;
    document.getElementById('labelRegion').textContent = t.region;
    document.getElementById('labelDial').textContent = t.dial;
    document.getElementById('labelBg').textContent = t.bg;
    document.getElementById('bgHint').textContent = t.bgHint;
    document.getElementById('labelAbout').textContent = t.about;
    document.getElementById('aboutText').textContent = t.aboutText;
    document.getElementById('saveBtn').textContent = t.saveBtn;
    // 更新随机颜色选项文案
    document.querySelector('#dialStyleSelect option[value="random"]').textContent = t.random;
    regionSelect.value = currentRegionOffset;
    document.documentElement.lang = currentLang;
}

// 时区切换
regionSelect.addEventListener('change', (e) => {
    currentRegionOffset = parseInt(e.target.value);
});

// 表盘颜色（随机逻辑）
dialStyleSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value === 'random') {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70 + Math.floor(Math.random() * 30);
        const lightness = 45 + Math.floor(Math.random() * 15);
        watchFace.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const contrastLight = lightness > 50 ? 20 : 80;
        hourHand.style.background = `hsl(${(hue + 180) % 360}, ${saturation}%, ${contrastLight}%)`;
        minuteHand.style.background = `hsl(${(hue + 180) % 360}, ${saturation}%, ${contrastLight}%)`;
        secondHand.style.background = `hsl(${hue}, ${saturation}%, ${contrastLight}%)`;
    } else {
        watchFace.style.backgroundColor = value;
        hourHand.style.background = '#fff';
        minuteHand.style.background = '#fff';
        secondHand.style.background = '#ff4d6d';
    }
});

// 粘贴图片
pasteBtn.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        bgImageUrlInput.value = text;
        if (text && (text.endsWith('.jpg') || text.endsWith('.png') || text.endsWith('.jpeg'))) {
            bgImageLayer.style.backgroundImage = `url(${text})`;
            bgImageLayer.style.opacity = '1';
            alert(texts[currentLang].pasteSuccess);
        } else {
            alert(texts[currentLang].pasteInvalid);
        }
    } catch (err) {
        alert(texts[currentLang].pasteFail);
    }
});

// 时钟逻辑（带时区）
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
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;
}

// 初始化
applyLanguage();
setInterval(updateClock, 1000);
updateClock();