document.addEventListener('DOMContentLoaded', function () {
    const texts = {
        zh: {
            lang: "English / 中文", dial: "表盘样式", region: "地区选择", regionPlaceholder: "选择地区",
            bg: "背景更换", bgHint: "请自行前往 SM.MS或ImgBB 上传图片，复制图片链接后点击粘贴",
            pasteSuccess: "图片链接已粘贴并加载！", pasteInvalid: "剪贴板内容不是有效的图片链接哦~",
            pasteFail: "无法读取剪贴板，请检查浏览器权限或手动粘贴。",
            about: "关于我们", aboutText: "春天樱桃是银河律动旗下一个音乐周边文创品牌，我们的产品好听、好玩。",
            contact: "联系我们：springcherry@126.com",
            dialOptions: ['纯黑', '纯白', '樱桃色']
        },
        en: {
            lang: "English / 中文", dial: "Dial Style", region: "Region", regionPlaceholder: "Select Region",
            bg: "Background", bgHint: "Upload to SM.MS or ImgBB, copy the image link and click Paste.",
            pasteSuccess: "Image link pasted and loaded!", pasteInvalid: "Clipboard does not contain a valid image link.",
            pasteFail: "Unable to read clipboard. Please check permissions or paste manually.",
            about: "About Us", aboutText: "SpringCherry is a music merchandise brand under Galaxy Beats. Our products sound great and fun to play.",
            contact: "Contact: springcherry@126.com",
            dialOptions: ['Black', 'White', 'Cherry Red']
        }
    };
    let currentLang = 'zh';

    const watchFace = document.getElementById('watchFace');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsMenu = document.getElementById('settingsMenu');
    const dialStyleSelect = document.getElementById('dialStyle');
    const bgImageUrlInput = document.getElementById('bgImageUrl');
    const bgImageLayer = document.getElementById('bgImageLayer');
    const countryInput = document.getElementById('countrySelect');
    const pasteBtn = document.getElementById('pasteBtn');

    // 颜色：黑、白、樱桃色 + 20个随机色
    const baseColors = ['#000000', '#FFFFFF', '#FF4D6D'];
    const randomColors = [];
    for (let i = 0; i < 20; i++) {
        randomColors.push(`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,'0')}`);
    }
    const allColors = [...baseColors, ...randomColors];

    function renderDialOptions() {
        dialStyleSelect.innerHTML = '';
        allColors.forEach((color, index) => {
            const option = document.createElement('option');
            option.value = color;
            if (index < 3) option.textContent = texts[currentLang].dialOptions[index];
            else option.textContent = currentLang === 'zh' ? `随机色 ${index-2}` : `Random ${index-2}`;
            dialStyleSelect.appendChild(option);
        });
    }

    function updateDialStyle(color) {
        watchFace.className = 'watch-face';
        if (color === '#000000') {
            watchFace.style.backgroundColor = '#000000';
        } else if (color === '#FFFFFF') {
            watchFace.style.backgroundColor = '#FFFFFF';
            watchFace.querySelectorAll('.hand').forEach(h => h.style.background = '#000');
        } else if (color === '#FF4D6D') {
            watchFace.style.backgroundColor = '#FF4D6D';
            watchFace.querySelectorAll('.hand').forEach(h => h.style.background = '#FFF');
        } else {
            watchFace.style.backgroundColor = color;
            const r = parseInt(color.slice(1,3),16), g = parseInt(color.slice(3,5),16), b = parseInt(color.slice(5,7),16);
            const contrast = `rgb(${255-r},${255-g},${255-b})`;
            watchFace.querySelectorAll('.hand').forEach(h => h.style.background = contrast);
        }
    }
    dialStyleSelect.addEventListener('change', e => updateDialStyle(e.target.value));

    // 粘贴按钮
    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            bgImageUrlInput.value = text;
            if (text && (text.endsWith('.jpg')||text.endsWith('.png')||text.endsWith('.jpeg'))) {
                bgImageLayer.style.backgroundImage = `url(${text})`;
                bgImageLayer.classList.add('visible');
                alert(texts[currentLang].pasteSuccess);
            } else {
                alert(texts[currentLang].pasteInvalid);
            }
        } catch(err) {
            alert(texts[currentLang].pasteFail);
        }
    });

    // 时钟
    function updateClock() {
        const now = new Date();
        const hour = now.getHours()%12, minute = now.getMinutes(), second = now.getSeconds();
        const hourDeg = (hour*30)+(minute*0.5);
        const minuteDeg = (minute*6)+(second*0.1);
        const secondDeg = second*6;
        document.getElementById('hourHand').style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
        document.getElementById('minuteHand').style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
        document.getElementById('secondHand').style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
    }

    // 语言切换
    document.getElementById('langToggle').addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        document.getElementById('langToggle').querySelector('span').textContent = texts[currentLang].lang;
        document.getElementById('labelDial').textContent = texts[currentLang].dial;
        document.getElementById('labelRegion').textContent = texts[currentLang].region;
        document.getElementById('labelBg').textContent = texts[currentLang].bg;
        document.getElementById('bgHint').textContent = texts[currentLang].bgHint;
        document.getElementById('labelAbout').textContent = texts[currentLang].about;
        document.getElementById('aboutText').textContent = texts[currentLang].aboutText;
        document.getElementById('contactText').textContent = texts[currentLang].contact;
        countryInput.placeholder = texts[currentLang].regionPlaceholder;
        renderDialOptions();
        document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    });

    settingsBtn.addEventListener('click', () => settingsMenu.classList.toggle('show'));

    // 初始化
    renderDialOptions();
    updateDialStyle('#000000');
    updateClock();
    setInterval(updateClock, 1000);
});