document.addEventListener('DOMContentLoaded', function () {
    const texts = {
        zh: { lang: "English / 中文", dial: "表盘样式", region: "地区选择", bg: "背景更换", bgHint: "提示：请前往 SM.MS 或 ImgBB 上传图片，复制链接至此。", about: "关于我们", contact: "联系我们：springcherry@126.com", brand: "春天樱桃是银河律动旗下一个音乐周边文创品牌，我们的产品好听、好玩。" },
        en: { lang: "English / 中文", dial: "Dial Style", region: "Region", bg: "Background", bgHint: "Tip: Upload to SM.MS or ImgBB, paste the link here.", about: "About Us", contact: "Contact: springcherry@126.com", brand: "SpringCherry is a music merchandise brand under Galaxy Beats. Our products sound great and fun to play." }
    };
    let currentLang = 'zh';

    const watchFace = document.getElementById('watchFace');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsMenu = document.getElementById('settingsMenu');
    const dialStyleSelect = document.getElementById('dialStyle');
    const bgImageUrlInput = document.getElementById('bgImageUrl');
    const bgImageLayer = document.getElementById('bgImageLayer');
    const countryInput = document.getElementById('countrySelect');

    window.intlTelInput(countryInput, {
        utilsScript: "https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/intl-tel-input/18.1.1/js/utils.js",
        separateDialCode: true,
        preferredCountries: ['cn', 'us', 'jp', 'kr', 'gb'],
    });

    const colors = ['#000000', '#FFFFFF'];
    const colorNames = { zh: ['纯黑', '纯白'], en: ['Black', 'White'] };
    for (let i = 0; i < 20; i++) {
        const color = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
        colors.push(color);
        colorNames.zh.push(`随机色 ${i+1}`);
        colorNames.en.push(`Random ${i+1}`);
    }

    colors.forEach((color, index) => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = colorNames[currentLang][index];
        dialStyleSelect.appendChild(option);
    });

    function updateDialStyle(color) {
        watchFace.className = 'watch-face';
        
        if (color === '#000000') {
            watchFace.classList.add('theme-black');
        } else if (color === '#FFFFFF') {
            watchFace.classList.add('theme-white');
        } else {
            watchFace.classList.add('theme-contrast');
            const r = parseInt(color.slice(1,3), 16);
            const g = parseInt(color.slice(3,5), 16);
            const b = parseInt(color.slice(5,7), 16);
            const contrast = `rgb(${255-r}, ${255-g}, ${255-b})`;
            watchFace.style.setProperty('--contrast-color', contrast);
            watchFace.style.backgroundColor = color;
        }
    }
    dialStyleSelect.addEventListener('change', (e) => updateDialStyle(e.target.value));

    bgImageUrlInput.addEventListener('change', function() {
        const url = this.value.trim();
        if (url && (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg') || url.includes('s3.'))) {
            bgImageLayer.style.backgroundImage = `url(${url})`;
            bgImageLayer.classList.add('visible');
        } else {
            bgImageLayer.classList.remove('visible');
            alert(currentLang === 'zh' ? '请输入有效的图片链接（以.jpg或.png结尾）' : 'Please enter a valid image URL (.jpg/.png)');
        }
    });

    function updateClock() {
        const now = new Date();
        const hour = now.getHours() % 12;
        const minute = now.getMinutes();
        const second = now.getSeconds();
        
        const hourDeg = (hour * 30) + (minute * 0.5);
        const minuteDeg = (minute * 6) + (second * 0.1);
        const secondDeg = second * 6;

        document.getElementById('hourHand').style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
        document.getElementById('minuteHand').style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
        document.getElementById('secondHand').style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
    }

    settingsBtn.addEventListener('click', () => {
        settingsMenu.classList.toggle('show');
    });

    document.getElementById('langToggle').addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        document.getElementById('langToggle').querySelector('span').textContent = texts[currentLang].lang;
        document.getElementById('labelDial').textContent = texts[currentLang].dial;
        document.getElementById('labelRegion').textContent = texts[currentLang].region;
        document.getElementById('labelBg').textContent = texts[currentLang].bg;
        document.getElementById('bgHint').textContent = texts[currentLang].bgHint;
        document.querySelector('.about-us h4').textContent = texts[currentLang].about;
        document.getElementById('aboutText').textContent = texts[currentLang].brand;
        document.getElementById('contactText').textContent = texts[currentLang].contact;
        document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
        
        Array.from(dialStyleSelect.options).forEach((opt, idx) => {
            opt.textContent = colorNames[currentLang][idx];
        });
    });

    updateDialStyle('#000000');
    updateClock();
    setInterval(updateClock, 1000);
});