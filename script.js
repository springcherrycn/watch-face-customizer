// ===== 配置数据 =====
const texts = {
    en: {
        settingsTitle: "Watch Settings",
        langLabel: "Language",
        regionLabel: "Timezone",
        dialLabel: "Dial Color",
        bgLabel: "Background Image URL",
        aboutLabel: "About Us",
        pasteBtn: "Paste",
        pasteSuccess: "Image loaded successfully!",
        pasteInvalid: "Please paste a valid image URL (jpg/png/jpeg).",
        pasteFail: "Failed to read clipboard. Please check permissions."
    },
    'zh-CN': {
        settingsTitle: "表盘设置",
        langLabel: "语言",
        regionLabel: "时区",
        dialLabel: "表盘颜色",
        bgLabel: "背景图片链接",
        aboutLabel: "关于我们",
        pasteBtn: "粘贴",
        pasteSuccess: "图片加载成功！",
        pasteInvalid: "请粘贴有效的图片链接 (jpg/png/jpeg)。",
        pasteFail: "读取剪贴板失败，请检查权限。"
    },
    'zh-TW': {
        settingsTitle: "錶盤設置",
        langLabel: "語言",
        regionLabel: "時區",
        dialLabel: "錶盤顏色",
        bgLabel: "背景圖片鏈接",
        aboutLabel: "關於我們",
        pasteBtn: "粘貼",
        pasteSuccess: "圖片加載成功！",
        pasteInvalid: "請粘貼有效的圖片鏈接 (jpg/png/jpeg)。",
        pasteFail: "讀取剪貼板失敗，請檢查權限。"
    }
};

const timezones = [
    { v: -8, l: { en: "Beijing", 'zh-CN': "北京", 'zh-TW': "北京" } },
    { v: 0, l: { en: "London", 'zh-CN': "伦敦", 'zh-TW': "倫敦" } },
    { v: -5, l: { en: "New York", 'zh-CN': "纽约", 'zh-TW': "紐約" } },
    { v: 9, l: { en: "Tokyo", 'zh-CN': "东京", 'zh-TW': "東京" } }
];

// ===== 状态变量 =====
let currentLang = 'en';
let currentRegionOffset = -8;
let currentDial = '#000000';
let currentBg = '';

// ===== DOM 元素 =====
const watchFace = document.getElementById('watchFace');
const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');
const logo = document.getElementById('logo');
const controlPanel = document.getElementById('controlPanel');
const gearIcon = document.getElementById('gearIcon');
const settingsTitle = document.getElementById('settingsTitle');
const langSelect = document.getElementById('langSelect');
const regionSelect = document.getElementById('regionSelect');
const dialStyleSelect = document.getElementById('dialStyleSelect');
const bgImageUrl = document.getElementById('bgImageUrl');
const pasteBtn = document.getElementById('pasteBtn');
const langLabel = document.getElementById('langLabel');
const regionLabel = document.getElementById('regionLabel');
const dialLabel = document.getElementById('dialLabel');
const bgLabel = document.getElementById('bgLabel');
const aboutLabel = document.getElementById('aboutLabel');

// ===== 核心功能函数 =====

// 切换面板显示/隐藏
function togglePanel() {
    const content = controlPanel.querySelector('.panel-content');
    // 简单的显示隐藏逻辑，点击齿轮切换
    if (content.style.display === 'none') {
        content.style.display = 'block';
        gearIcon.textContent = '⚙️';
    } else {
        content.style.display = 'none';
        gearIcon.textContent = '▼';
    }
}

// 应用语言
function applyLanguage() {
    const t = texts[currentLang];
    settingsTitle.textContent = t.settingsTitle;
    langLabel.textContent = t.langLabel;
    regionLabel.textContent = t.regionLabel;
    dialLabel.textContent = t.dialLabel;
    bgLabel.textContent = t.bgLabel;
    aboutLabel.textContent = t.aboutLabel;
    pasteBtn.textContent = t.pasteBtn;
    
    // 更新下拉框选项文本
    regionSelect.innerHTML = '';
    timezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz.v;
        option.textContent = tz.l[currentLang];
        if (tz.v === currentRegionOffset) option.selected = true;
        regionSelect.appendChild(option);
    });
    
    // 更新表盘颜色下拉框
    dialStyleSelect.innerHTML = `
        <option value="#000000">${t.black}</option>
        <option value="#FFFFFF">${t.white}</option>
        <option value="random">${t.random}</option>
    `;
    
    // 更新Logo文字
    logo.textContent = "SpringCherry™"; // Logo保持英文
    
    // 定义颜色选项的翻译
    const colorTranslations = {
        en: { black: "Black", white: "White", random: "Random" },
        'zh-CN': { black: "黑色", white: "白色", random: "随机颜色" },
        'zh-TW': { black: "黑色", white: "白色", random: "隨機顏色" }
    };
    
    // 设置当前选中的颜色文本
    const currentOption = dialStyleSelect.querySelector(`option[value="${currentDial}"]`);
    if (currentOption) {
        currentOption.textContent = colorTranslations[currentLang][currentDial === '#000000' ? 'black' : currentDial === '#FFFFFF' ? 'white' : 'random'];
    }
    
    // 设置背景图片
    if (currentBg) {
        document.body.style.backgroundImage = `url(${currentBg})`;
        document.body.style.backgroundSize = 'cover';
    } else {
        document.body.style.backgroundImage = 'none';
    }
}

// 创建刻度
function createTicks() {
    watchFace.innerHTML = ''; // 清空现有刻度
    for (let i = 0; i < 12; i++) {
        const tick = document.createElement('div');
        tick.className = 'tick';
        // 根据当前主题设置刻度颜色
        if (currentDial === '#FFFFFF') {
            tick.style.backgroundColor = '#000';
        } else {
            tick.style.backgroundColor = '#fff';
        }
        watchFace.appendChild(tick);
    }
}

// 设置表针颜色
function setHandsColor(mainColor, secColor) {
    hourHand.style.backgroundColor = mainColor;
    minuteHand.style.backgroundColor = mainColor;
    secondHand.style.backgroundColor = secColor;
}

// 切换语言
function changeLanguage() {
    const newLang = langSelect.value;
    // 只有当语言真正改变时才更新
    if (newLang !== currentLang) {
        currentLang = newLang;
        applyLanguage();
        // 注意：这里不重置其他设置，如请求中所说
    }
}

// 切换时区
function changeRegion() {
    currentRegionOffset = parseInt(regionSelect.value);
}

// 切换表盘颜色
function changeDial() {
    currentDial = dialStyleSelect.value;
    applyLanguage(); // 这会更新颜色选项文本，但也会重置背景，需要修复
    
    // 重新应用表盘样式
    if (currentDial === '#000000') {
        watchFace.style.backgroundColor = '#000';
        setHandsColor('#fff', '#ff4d6d');
    } else if (currentDial === '#FFFFFF') {
        watchFace.style.backgroundColor = '#fff';
        setHandsColor('#000', '#333');
    } else if (currentDial === 'random') {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70 + Math.floor(Math.random() * 30);
        const lightness = 45 + Math.floor(Math.random() * 15);
        const contrastLight = lightness > 50 ? 20 : 80;
        const contrastColor = `hsl(${(hue + 180) % 360}, ${saturation}%, ${contrastLight}%)`;
        
        watchFace.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        setHandsColor(contrastColor, '#ff4d6d');
    }
    
    // 重新创建刻度以确保颜色匹配
    createTicks();
}

// 从剪贴板粘贴
async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        bgImageUrl.value = text;
        if (text && (text.endsWith('.jpg') || text.endsWith('.png') || text.endsWith('.jpeg'))) {
            document.body.style.backgroundImage = `url(${text})`;
            document.body.style.backgroundSize = 'cover';
            alert(texts[currentLang].pasteSuccess);
        } else {
            alert(texts[currentLang].pasteInvalid);
        }
    } catch (err) {
        alert(texts[currentLang].pasteFail);
    }
}

// 时钟逻辑
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
    
    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    // 设置下拉框初始值
    langSelect.value = currentLang;
    regionSelect.value = currentRegionOffset;
    dialStyleSelect.value = currentDial;
    
    applyLanguage();
    createTicks();
    setHandsColor('#fff', '#ff4d6d');
    setInterval(updateClock, 1000);
    updateClock();
});