// 多语言配置（仅支持3种语言，无不支持提示）
const texts = {
    'en': {
        lang: 'Language',
        region: 'Timezone',
        dial: 'Dial Color',
        bg: 'Background Image',
        bgHint: 'Upload to SM.MS/ImgBB, copy image link and click Paste',
        about: 'About',
        aboutText: 'A minimalist creative watch face designed by SpringCherry, a music merchandise brand from Mainland China. SpringCherry reserves all intellectual property rights. Email: springcherry@126.com',
        random: '🎨 Random Color',
        pasteSuccess: 'Image loaded!',
        pasteFail: 'Failed to read clipboard. Check permissions.',
        pasteInvalid: 'Invalid link. Use .jpg/.png links.',
        saveBtn: 'Apply & Close'
    },
    'zh-CN': {
        lang: '语言',
        region: '时区设置',
        dial: '表盘颜色',
        bg: '背景图片',
        bgHint: '请前往SM.MS/ImgBB上传图片，复制链接后点击粘贴',
        about: '关于我们',
        aboutText: '一款极简风格的创意表盘，由中国大陆音乐周边品牌SpringCherry设计，并享有知识产权。邮箱：springcherry@126.com',
        random: '🎨 随机颜色',
        pasteSuccess: '图片已加载！',
        pasteFail: '读取剪贴板失败，请检查权限。',
        pasteInvalid: '链接格式错误，请使用.jpg/.png链接。',
        saveBtn: '应用并关闭'
    },
    'zh-TW': {
        lang: '語言',
        region: '時區設置',
        dial: '錶盤顏色',
        bg: '背景圖片',
        bgHint: '請前往SM.MS/ImgBB上傳圖片，複製鏈接後點擊粘貼',
        about: '關於我們',
        aboutText: '一款極簡風格的創意錶盤，由中國大陸音樂周邊品牌SpringCherry設計，並享有知識產權。郵箱：springcherry@126.com',
        random: '🎨 隨機顏色',
        pasteSuccess: '圖片已加載！',
        pasteFail: '讀取剪貼板失敗，請檢查權限。',
        pasteInvalid: '鏈接格式錯誤，請使用.jpg/.png鏈接。',
        saveBtn: '應用並關閉'
    }
};

// 默认语言改为English
let currentLang = 'en';
let currentRegionOffset = 8;

// DOM元素
const settingsPanel = document.getElementById('settingsPanel');
const openSettingsBtn = document.getElementById('openSettings');
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
bgImageLayer.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border-radius:50%;background-size:cover;background-position:center;opacity:0;transition:opacity 0.3s;z-index:1;';
watchFace.appendChild(bgImageLayer);

// 点击齿轮切换菜单显示/隐藏（无X按钮逻辑）
openSettingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('show');
});
saveBtn.addEventListener('click', () => {
    settingsPanel.classList.remove('show');
});

// 语言切换（仅3种语言，全菜单同步）
langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    applyLanguage();
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
    document.querySelector('#dialStyleSelect option[value="random"]').textContent = t.random;
    regionSelect.value = currentRegionOffset;
    document.documentElement.lang = currentLang;
}

// 时区切换
regionSelect.addEventListener('change', (e) => {
    currentRegionOffset = parseInt(e.target.value);
});

// 表盘颜色+对比色表针+对比色刻度（核心修改！）
dialStyleSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    // 重置表盘class
    watchFace.className = 'watch-face';
    
    if (value === '#000000') {
        // 黑色表盘→白针、白刻度
        watchFace.classList.add('theme-dark');
        watchFace.style.backgroundColor = '#000000';
        hourHand.style.background = '#ffffff';
        minuteHand.style.background = '#ffffff';
        secondHand.style.background = '#ff4d6d';
    } else if (value === '#FFFFFF') {
        // 白色表盘→黑针、黑刻度
        watchFace.classList.add('theme-light');
        watchFace.style.backgroundColor = '#FFFFFF';
        hourHand.style.background = '#000000';
        minuteHand.style.background = '#000000';
        secondHand.style.background = '#000000';
    } else if (value === 'random') {
        // 随机颜色→自动计算对比色
        watchFace.classList.add('theme-random');
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70 + Math.floor(Math.random() * 30);
        const lightness = 45 + Math.floor(Math.random() * 15);
        const contrastLight = lightness > 50 ? 20 : 80;
        const contrastColor = `hsl(${(hue + 180) % 360}, ${saturation}%, ${contrastLight}%)`;
        
        watchFace.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        watchFace.style.setProperty('--contrast-color', contrastColor);
        hourHand.style.background = contrastColor;
        minuteHand.style.background = contrastColor;
        secondHand.style.background = contrastColor;
    }
});

// 粘贴图片逻辑
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

// 初始化（默认英文、黑色表盘）
applyLanguage();
dialStyleSelect.dispatchEvent(new Event('change'));
setInterval(updateClock, 1000);
updateClock();