// ✅ 多语言配置（全中文适配，删除default字样）
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
        random: 'Random Color',
        pasteBtn: 'Paste',
        pasteSuccess: 'Image loaded!',
        pasteFail: 'Failed to read clipboard. Check permissions.',
        pasteInvalid: 'Invalid link. Use .jpg/.png links.',
        // 英文时区选项
        timezones: [
            {value:8, label:'UTC+08:00 (Beijing)'},
            {value:0, label:'UTC+00:00 (London)'},
            {value:9, label:'UTC+09:00 (Tokyo)'},
            {value:-5, label:'UTC-05:00 (New York)'},
            {value:1, label:'UTC+01:00 (Paris)'},
            {value:3, label:'UTC+03:00 (Moscow)'},
            {value:10, label:'UTC+10:00 (Sydney)'},
            {value:-8, label:'UTC-08:00 (Los Angeles)'}
        ],
        // 英文表盘选项
        dialOptions: [
            {value:'#000000', label:'Black'},
            {value:'#FFFFFF', label:'White'},
            {value:'random', label:'Random Color'}
        ]
    },
    'zh-CN': {
        panelTitle: '表盘设置',
        lang: '语言设置',
        region: '时区设置',
        dial: '表盘颜色',
        bg: '背景图片',
        bgHint: '请前往SM.MS或ImgBB上传图片，复制链接后点击粘贴',
        about: '关于我们',
        aboutText: '一款极简风格的创意表盘，由中国大陆音乐周边品牌SpringCherry设计，依法享有全部知识产权。联系我们：springcherry@126.com',
        random: '随机颜色',
        pasteBtn: '粘贴',
        pasteSuccess: '图片已加载！',
        pasteFail: '读取剪贴板失败，请检查权限。',
        pasteInvalid: '链接格式错误，请使用.jpg/.png链接。',
        // 中文时区选项（城市名改为中文，删除default）
        timezones: [
            {value:8, label:'UTC+08:00 (北京)'},
            {value:0, label:'UTC+00:00 (伦敦)'},
            {value:9, label:'UTC+09:00 (东京)'},
            {value:-5, label:'UTC-05:00 (纽约)'},
            {value:1, label:'UTC+01:00 (巴黎)'},
            {value:3, label:'UTC+03:00 (莫斯科)'},
            {value:10, label:'UTC+10:00 (悉尼)'},
            {value:-8, label:'UTC-08:00 (洛杉矶)'}
        ],
        // 中文表盘选项（删除default字样）
        dialOptions: [
            {value:'#000000', label:'黑色'},
            {value:'#FFFFFF', label:'白色'},
            {value:'random', label:'随机颜色'}
        ]
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
        random: '隨機顏色',
        pasteBtn: '粘貼',
        pasteSuccess: '圖片已加載！',
        pasteFail: '讀取剪貼板失敗，請檢查權限。',
        pasteInvalid: '鏈接格式錯誤，請使用.jpg/.png鏈接。',
        // 繁体时区选项
        timezones: [
            {value:8, label:'UTC+08:00 (北京)'},
            {value:0, label:'UTC+00:00 (倫敦)'},
            {value:9, label:'UTC+09:00 (東京)'},
            {value:-5, label:'UTC-05:00 (紐約)'},
            {value:1, label:'UTC+01:00 (巴黎)'},
            {value:3, label:'UTC+03:00 (莫斯科)'},
            {value:10, label:'UTC+10:00 (悉尼)'},
            {value:-8, label:'UTC-08:00 (洛杉磯)'}
        ],
        // 繁体表盘选项
        dialOptions: [
            {value:'#000000', label:'黑色'},
            {value:'#FFFFFF', label:'白色'},
            {value:'random', label:'隨機顏色'}
        ]
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

// ✅ 动态生成12个刻度（层级z-index:1，低于表针）
function createTicks() {
    watchFace.querySelectorAll('.tick').forEach(tick => tick.remove());
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

// ✅ 语言切换（全元素同步，含时区、表盘选项、粘贴按钮）
langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    applyLanguage();
});

function applyLanguage() {
    const t = texts[currentLang];
    // 更新标题
    panelTitle.textContent = t.panelTitle;
    // 更新通用文本
    document.getElementById('labelLang').textContent = t.lang;
    document.getElementById('labelRegion').textContent = t.region;
    document.getElementById('labelDial').textContent = t.dial;
    document.getElementById('labelBg').textContent = t.bg;
    document.getElementById('bgHint').textContent = t.bgHint;
    document.getElementById('labelAbout').textContent = t.about;
    document.getElementById('aboutText').textContent = t.aboutText;
    pasteBtn.textContent = t.pasteBtn; // 更新粘贴按钮文字
    document.documentElement.lang = currentLang;

    // ✅ 动态更新时区选项（多语言适配）
    regionSelect.innerHTML = '';
    t.timezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz.value;
        option.textContent = tz.label;
        if (tz.value === currentRegionOffset) option.selected = true;
        regionSelect.appendChild(option);
    });

    // ✅ 动态更新表盘选项（删除default字样）
    dialStyleSelect.innerHTML = '';
    t.dialOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        if (opt.value === '#000000') option.selected = true;
        dialStyleSelect.appendChild(option);
    });
}

// 时区切换
regionSelect.addEventListener('change', (e) => {
    currentRegionOffset = parseInt(e.target.value);
});

// ✅ 表盘颜色+对比色表针（双色逻辑不变）
dialStyleSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    watchFace.className = 'watch-face';
    
    if (value === '#000000') {
        watchFace.classList.add('theme-dark');
        watchFace.style.backgroundColor = '#000000';
        hourHand.style.background = '#ffffff';
        minuteHand.style.background = '#ffffff';
        minuteHand.style.borderBottomColor = '#ffffff';
        secondHand.style.background = '#ff4d6d';
        secondHand.style.borderBottomColor = '#ff4d6d';
    } else if (value === '#FFFFFF') {
        watchFace.classList.add('theme-light');
        watchFace.style.backgroundColor = '#FFFFFF';
        hourHand.style.background = '#000000';
        minuteHand.style.background = '#000000';
        minuteHand.style.borderBottomColor = '#000000';
        secondHand.style.background = '#333333';
        secondHand.style.borderBottomColor = '#333333';
    } else if (value === 'random') {
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
    createTicks(); // 重新生成刻度，确保颜色同步
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
createTicks();
dialStyleSelect.dispatchEvent(new Event('change'));
setInterval(updateClock, 1000);
updateClock();