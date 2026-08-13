const texts = {
    'en': {
        panelTitle: 'Watch Settings', lang: 'Language', region: 'Timezone', dial: 'Dial Color',
        bg: 'Background Image', bgHint: 'Upload to SM.MS/ImgBB, copy link and click Paste',
        about: 'About', aboutText: 'A minimalist creative watch face designed by SpringCherry, a music merchandise brand from Mainland China. SpringCherry legally reserves all intellectual property rights. Contact us: springcherry@126.com',
        random: 'Random Color', pasteBtn: 'Paste', pasteSuccess: 'Image loaded!', pasteFail: 'Failed to read clipboard.', pasteInvalid: 'Invalid link.',
        timezones: [{v:8,l:'UTC+08:00 (Beijing)'},{v:0,l:'UTC+00:00 (London)'},{v:9,l:'UTC+09:00 (Tokyo)'},{v:-5,l:'UTC-05:00 (New York)'},{v:1,l:'UTC+01:00 (Paris)'},{v:3,l:'UTC+03:00 (Moscow)'},{v:10,l:'UTC+10:00 (Sydney)'},{v:-8,l:'UTC-08:00 (Los Angeles)'}],
        dialOptions: [{v:'#000000',l:'Black'},{v:'#FFFFFF',l:'White'},{v:'random',l:'Random Color'}]
    },
    'zh-CN': {
        panelTitle: '表盘设置', lang: '语言', region: '时区', dial: '表盘颜色',
        bg: '背景图片', bgHint: '请前往SM.MS或ImgBB上传图片，复制链接后点击粘贴',
        about: '关于我们', aboutText: '一款极简风格的创意表盘，由中国大陆音乐周边品牌SpringCherry设计，依法享有全部知识产权。联系我们：springcherry@126.com',
        random: '随机颜色', pasteBtn: '粘贴', pasteSuccess: '图片已加载！', pasteFail: '读取剪贴板失败。', pasteInvalid: '链接格式错误。',
        timezones: [{v:8,l:'UTC+08:00 (北京)'},{v:0,l:'UTC+00:00 (伦敦)'},{v:9,l:'UTC+09:00 (东京)'},{v:-5,l:'UTC-05:00 (纽约)'},{v:1,l:'UTC+01:00 (巴黎)'},{v:3,l:'UTC+03:00 (莫斯科)'},{v:10,l:'UTC+10:00 (悉尼)'},{v:-8,l:'UTC-08:00 (洛杉矶)'}],
        dialOptions: [{v:'#000000',l:'黑色'},{v:'#FFFFFF',l:'白色'},{v:'random',l:'随机颜色'}]
    },
    'zh-TW': {
        panelTitle: '錶盤設置', lang: '語言', region: '時區', dial: '錶盤顏色',
        bg: '背景圖片', bgHint: '請前往SM.MS/ImgBB上傳圖片，複製鏈接後點擊粘貼',
        about: '關於我們', aboutText: '一款極簡風格的創意錶盤，由中國大陸音樂周邊品牌SpringCherry設計，依法享有全部知識產權。聯繫我們：springcherry@126.com',
        random: '隨機顏色', pasteBtn: '粘貼', pasteSuccess: '圖片已加載！', pasteFail: '讀取剪貼板失敗。', pasteInvalid: '鏈接格式錯誤。',
        timezones: [{v:8,l:'UTC+08:00 (北京)'},{v:0,l:'UTC+00:00 (倫敦)'},{v:9,l:'UTC+09:00 (東京)'},{v:-5,l:'UTC-05:00 (紐約)'},{v:1,l:'UTC+01:00 (巴黎)'},{v:3,l:'UTC+03:00 (莫斯科)'},{v:10,l:'UTC+10:00 (悉尼)'},{v:-8,l:'UTC-08:00 (洛杉磯)'}],
        dialOptions: [{v:'#000000',l:'黑色'},{v:'#FFFFFF',l:'白色'},{v:'random',l:'隨機顏色'}]
    }
};

let currentLang = 'en';
let currentRegionOffset = 8;

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

// 面板开关
openSettingsBtn.addEventListener('click', () => settingsPanel.classList.add('show'));
closeSettingsBtn.addEventListener('click', () => settingsPanel.classList.remove('show'));
saveBtn.addEventListener('click', () => settingsPanel.classList.remove('show'));

// 语言切换（核心修改：保存当前设置，只换文字）
langSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected === 'en' || selected === 'zh-CN' || selected === 'zh-TW') {
        currentLang = selected;
        const t = texts[currentLang];
        
        // 1. 保存当前UI状态（非常重要，防止被重置）
        const currentDial = dialStyleSelect.value;
        const currentBg = bgImageUrlInput.value;
        const currentRegion = regionSelect.value;

        // 2. 更新文字内容
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

        // 3. 重新填充下拉框（但保持之前选中的值）
        dialStyleSelect.innerHTML = '';
        t.dialOptions.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.v;
            option.textContent = opt.l;
            if (opt.v === currentDial) option.selected = true;
            dialStyleSelect.appendChild(option);
        });

        regionSelect.innerHTML = '';
        t.timezones.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz.v;
            option.textContent = tz.l;
            if (tz.v === currentRegion) option.selected = true;
            regionSelect.appendChild(option);
        });
        
        // 4. 恢复输入框的值
        bgImageUrlInput.value = currentBg;
        document.documentElement.lang = currentLang;
    }
});

// 时区
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

// 时钟
function updateClock() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (3600000 * currentRegionOffset));
    const hour = localTime.getHours() % 12;
    const minute = localTime.getMinutes();
    const second = localTime.getSeconds();
    hourHand.style.transform = `translate(-50%, -100%) rotate(${(hour * 30) + (minute * 0.5)}deg)`;
    minuteHand.style.transform = `translate(-50%, -100%) rotate(${(minute * 6) + (second * 0.1)}deg)`;
    secondHand.style.transform = `translate(-50%, -100%) rotate(${second * 6}deg)`;
}

// 初始化
createTicks();
setHandsColor('#ffffff', '#ff4d6d');
setInterval(updateClock, 1000);
updateClock();