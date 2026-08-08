document.addEventListener('DOMContentLoaded', function () {
    // --- 多语言数据 ---
    const translations = {
        en: {
            dial: "Dial Style:",
            color: "Theme:",
            region: "Region:",
            vip: "VIP Custom Background:",
            vipTip: "Upload your image below. Then send a screenshot of this page to the merchant for final production."
        },
        zh: {
            dial: "表盘样式:",
            color: "主题颜色:",
            region: "选择地区:",
            vip: "VIP 自定义背景:",
            vipTip: "点击下方上传图片。然后将本页面截图发送给商家，用于最终生产。"
        }
    };
    
    let currentLang = 'zh';

    // --- DOM 元素 ---
    const watchContainer = document.getElementById('watchContainer');
    const dialNumbers = document.getElementById('dialNumbers');
    const dialStyleSelect = document.getElementById('dialStyle');
    const colorThemeSelect = document.getElementById('colorTheme');
    const langToggleBtn = document.getElementById('langToggle');
    const imageUpload = document.getElementById('imageUpload');
    const uploadedImage = document.getElementById('uploadedImage');
    const vipImageContainer = document.getElementById('vipImageContainer');

    // --- 初始化国家选择器 ---
    const countryInput = document.querySelector("#countrySelect");
    window.intlTelInput(countryInput, {
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
        separateDialCode: true,
        preferredCountries: ['cn', 'us', 'jp', 'gb'],
    });

    // --- 绘制表盘数字 ---
    function drawDial(style) {
        dialNumbers.innerHTML = '';
        const radius = 110; // 数字距离中心的半径
        const numbers = style === 'roman' 
            ? ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']
            : Array.from({length: 12}, (_, i) => i + 1);

        if (style === 'blank') return; // 无刻度不画

        numbers.forEach((num, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180); // 从12点开始
            const x = 140 + radius * Math.cos(angle); // 140是容器中心
            const y = 140 + radius * Math.sin(angle);

            const span = document.createElement('span');
            span.className = 'dial-number';
            span.textContent = num;
            span.style.left = `${x}px`;
            span.style.top = `${y}px`;
            dialNumbers.appendChild(span);
        });
    }

    // --- 设置指针时间（当前时间）---
    function setTime() {
        const now = new Date();
        const hour = now.getHours() % 12;
        const minute = now.getMinutes();
        
        const hourDeg = (hour * 30) + (minute * 0.5);
        const minuteDeg = minute * 6;

        document.querySelector('.hour-hand').style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
        document.querySelector('.minute-hand').style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    }

    // --- 切换语言 ---
    function toggleLanguage() {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        document.getElementById('labelDial').textContent = translations[currentLang].dial;
        document.getElementById('labelColor').textContent = translations[currentLang].color;
        document.getElementById('labelRegion').textContent = translations[currentLang].region;
        document.getElementById('labelVip').textContent = translations[currentLang].vip;
        document.getElementById('vipTip').textContent = translations[currentLang].vipTip;
        // 更新下拉框选中的文本（仅作示例，实际库可能需要单独API）
        document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    }

    // --- VIP图片上传处理 ---
    // 【低成本核心逻辑】：这里只是改变了前端的显示（Base64编码）。
    // 用户看到效果后，截图发给你。你拿着这张截图，去把图片下载下来，
    // 然后替换掉你给工厂的文件即可。无需数据库！
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedImage.src = event.target.result;
            vipImageContainer.classList.remove('hidden'); // 显示图片层
        };
        reader.readAsDataURL(file);
    });

    // --- 事件监听 ---
    dialStyleSelect.addEventListener('change', (e) => drawDial(e.target.value));
    colorThemeSelect.addEventListener('change', (e) => {
        watchContainer.className = 'watch-face ' + e.target.value + '-theme';
        drawDial(dialStyleSelect.value); // 重绘以确保颜色正确
    });
    langToggleBtn.addEventListener('click', toggleLanguage);

    // --- 初始化 ---
    drawDial('arabic');
    setTime();
    // 每秒更新一次时间
    setInterval(setTime, 1000);
});