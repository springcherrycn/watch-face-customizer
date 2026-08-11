// ✅ 多语言配置（含Watch Settings标题、修正后的关于我们文案）
const texts = {
    'en': {
        panelTitle: 'Watch Settings',
        lang: 'Language Settings',
        region: 'Timezone',
        dial: 'Dial Color',
        bg: 'Background Image',
        bgHint: 'Upload to SM.MS/ImgBB, copy image link and click Paste',
        about: 'About',
        aboutText: 'A minimalist creative watch face designed by SpringCherry, a music merchandise brand from Mainland China. SpringCherry legally reserves all intellectual property rights. Contact: springcherry@126.com',
        random: '🎨 Random Color',
        pasteSuccess: 'Image loaded!',
        pasteFail: 'Failed to read clipboard. Check permissions.',
        pasteInvalid: 'Invalid link. Use .jpg/.png links.'
    },
    'zh-CN': {
        panelTitle: '表盘设置',
        lang: '语言设置',
        region: '时区设置',
        dial: '表盘颜色',
        bg: '背景图片',
        bgHint: '请前往SM.MS/ImgBB上传图片，复制链接后点击粘贴',
        about: '关于我们',
        aboutText: '一款极简风格的创意表盘，由中国大陆音乐周边品牌SpringCherry设计，依法享有全部知识产权。联系我们：springcherry@126.com',
        random: '🎨 随机颜色',
        pasteSuccess: '图片已加载！',
        pasteFail: '读取剪贴板失败，请检查权限。',
        pasteInvalid: '链接格式错误，请使用.jpg/.png链接。'
    },
    'zh-TW': {
        panelTitle: '錶盤設置',
        lang: '語言設置',
        region: '時區設置',
        dial: '錶盤顏色',
        bg: '背景圖片',
        bgHint: '請前往SM.MS/ImgBB上傳圖片，複製鏈接後點擊粘貼',
        about: '關於我們',
        aboutText: '一款極簡風格的創意錶盤，由中國大陸音樂周邊品牌SpringCherry設計，依法享有全部知識產權。聯繫我們：springcherry@126.com',
        random: '🎨 隨機顏色',
        pasteSuccess: '圖片已加載！',
        pasteFail: '讀取剪貼板失敗，請檢查權限。',
        pasteInvalid: '鏈接格式錯誤，請使用.jpg/.png鏈接。'
    }
};

let currentLang = 'en';
let currentRegionOffset = 8;

// DOM元素
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
const panelTitle = document.getElementById('panelTitle');

// 背景图层
const bgImageLayer = document.createElement('div');
bgImageLayer.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border-radius:50%;background-size:cover;background-position:center;opacity:0;transition:opacity 0.3s;z-index:1;';
watchFace.appendChild(bgImageLayer);

// ✅ 动态生成12个刻度（彻底解决刻度消失问题）
function createTicks() {
    // 先清空旧刻度
    watchFace.querySelectorAll('.tick').forEach(tick => tick.remove());
    // 生成12个刻度，每30度一个
    for (let i = 0; i < 12; i++) {
        const tick = document.createElement('div');
        tick.className = 'tick';
        tick.style.transform = `rotate(${i * 30}deg)`;
        watchFace.appendChild(tick);
    }
}

// 点击齿轮开关菜单
openSettingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('show');
});

// 语言切换（全菜单同步，含Watch Settings标题）
langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    applyLanguage();
});

function applyLanguage() {
    const t = texts[currentLang];
    // 切换Watch Settings标题
    panelTitle.textContent = t.panelTitle;
    // 切换其他文字
    document.getElementById('labelLang').textContent = t.lang;
    document.getElementById('labelRegion').textContent = t.region;
    document.getElementById('labelDial').textContent = t.dial;
    document.getElementById('labelBg').textContent = t.bg;
    document.getElementById('bgHint').textContent = t.bgHint;
    document.getElementById('labelAbout').textContent = t.about;
    document.getElementById('aboutText').textContent = t.aboutText;
    document.querySelector('#dialStyleSelect option[value="random"]').textContent = t.random;
    regionSelect.value = currentRegionOffset;
    document.documentElement.lang = currentLang;
}

// 时区切换
regionSelect.addEventListener('change', (e) => {
    currentRegionOffset = parseInt(e.target.value);
});

// ✅ 表盘颜色+对比色表针+双色要求
dialStyleSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    // 重置表盘class
    watchFace.className = 'watch-face';
    
    if (value === '#000000') {
        // 黑表盘→白时分针+樱桃色秒针（双色）
        watchFace.classList.add('theme-dark');
        watchFace.style.backgroundColor = '#000000';
        hourHand.style.background = '#ffffff';
        minuteHand.style.background = '#ffffff';
        minuteHand.style.borderBottomColor = '#ffffff'; // 分针三角装饰颜色
        secondHand.style.background = '#ff4d6d';
        secondHand.style.borderBottomColor = '#ff4d6d'; // 秒针尾部圆点颜色
    } else if (value === '#FFFFFF') {
        // 白表盘→黑时分针+深灰秒针（双色）
        watchFace.classList.add('theme-light');
        watchFace.style.backgroundColor = '#FFFFFF';
        hourHand.style.background = '#000000';
        minuteHand.style.background = '#000000';
        minuteHand.style.borderBottomColor = '#000000';
        secondHand.style.background = '#333333';
        secondHand.style.borderBottomColor = '#333333';
    } else if (value === 'random') {
        // 随机色→对比色时分针+樱桃色秒针（双色）
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
        minuteHand.style.borderBottomColor = contrastColor;
        secondHand.style.background = '#ff4d6d';
        secondHand.style.borderBottomColor = '#ff4d6d';
    }
    // 重新生成刻度（确保颜色同步）
    createTicks();
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

// 初始化
applyLanguage();
createTicks(); // 生成初始刻度
dialStyleSelect.dispatchEvent(new Event('change')); // 触发初始颜色逻辑
setInterval(updateClock, 1000);
updateClock();