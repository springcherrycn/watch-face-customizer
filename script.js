// 多语言配置
const texts = {
    zh: {
        lang: "中文 / English",
        region: "时区设置",
        dial: "表盘颜色",
        bg: "背景图片",
        bgHint: "提示：请前往 SM.MS 或 ImgBB 上传图片，复制图片链接后点击粘贴。",
        about: "关于我们",
        aboutText: "一款极简风格的智能手表表盘设计。",
        contact: "联系邮箱：springcherry@example.com",
        random: "随机颜色",
        pasteSuccess: "图片已加载！",
        pasteFail: "读取剪贴板失败，请检查权限或手动粘贴。",
        pasteInvalid: "链接格式不正确，请确保是 .jpg 或 .png 结尾的图片链接。"
    },
    en: {
        lang: "中文 / English",
        region: "Timezone",
        dial: "Dial Color",
        bg: "Background Image",
        bgHint: "Tip: Upload to SM.MS or ImgBB, copy link and paste.",
        about: "About",
        aboutText: "A minimalist smartwatch face designed for customization.",
        contact: "Contact: springcherry@example.com",
        random: "🎨 Random Color",
        pasteSuccess: "Image loaded!",
        pasteFail: "Failed to read clipboard.",
        pasteInvalid: "Invalid link format."
    }
};

let currentLang = 'zh';
let currentRegionOffset = 8;

// DOM元素
const settingsPanel = document.getElementById('settingsPanel');
const openSettingsBtn = document.getElementById('openSettings');
const closeSettingsBtn = document.getElementById('closePanel');
const saveSettingsBtn = document.getElementById('saveSettings');
const langToggle = document.getElementById('langToggle');
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

// 面板开关
openSettingsBtn.addEventListener('click', () => settingsPanel.classList.add('show'));
closeSettingsBtn.addEventListener('click', () => settingsPanel.classList.remove('show'));
saveSettingsBtn.addEventListener('click', () => settingsPanel.classList.remove('show'));

// 语言切换
langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    applyLanguage();
    document.querySelector('#dialStyleSelect option[value="random"]').textContent = texts[currentLang].random;
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
    document.getElementById('contactText').textContent = t.contact;
    regionSelect.value = currentRegionOffset;
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