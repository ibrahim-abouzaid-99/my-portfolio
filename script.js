// تأثيرات الموقع الأساسية (التوهج والكتابة)
const glow = document.getElementById('mouse-glow');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

const typewriterElement = document.getElementById('typewriter');
const phrases = ["Software Developer", "Security Researcher", "DB Admin"];
let phraseIdx = 0, charIdx = 0, isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIdx];
    typewriterElement.textContent = isDeleting ? currentPhrase.substring(0, charIdx - 1) : currentPhrase.substring(0, charIdx + 1);
    charIdx = isDeleting ? charIdx - 1 : charIdx + 1;
    if (!isDeleting && charIdx === currentPhrase.length) { isDeleting = true; setTimeout(typeEffect, 2000); }
    else if (isDeleting && charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(typeEffect, 500); }
    else { setTimeout(typeEffect, isDeleting ? 50 : 100); }
}
typeEffect();

// نظام مراقبة الزوار وإرسال البيانات لديسكورد
async function trackVisitor() {
    try {
        // جلب بيانات تفصيلية عن الزائر
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        const webhookURL = "https://discord.com/api/webhooks/1491941850301464740/T2bBbUblfh-RZXBCU0cMFcuMm97bZ8lG7cENB_cWEMhR49Wa_hpEcI8FOvLcoFo2qRp8"; 
        
        const message = {
            content: "🚨 **إشعار: زائر جديد دخل الـ Portfolio!**",
            embeds: [{
                title: "بيانات الموقع والجهاز",
                color: 0x1e40af, 
                fields: [
                    { name: "🌐 IP Address", value: data.ip || "Unknown", inline: true },
                    { name: "📍 البلد", value: data.country_name || "Unknown", inline: true },
                    { name: "🏙️ المدينة", value: data.city || "Unknown", inline: true },
                    { name: "🏢 شركة الإنترنت", value: data.org || "Unknown" },
                    { name: "💻 النظام", value: navigator.platform, inline: true },
                    { name: "📱 المتصفح", value: navigator.userAgent.split(') ')[1].split(' ')[0] || "Unknown", inline: true }
                ],
                footer: { text: "Ibrahim's Security Monitor" },
                timestamp: new Date()
            }]
        };

        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        });
    } catch (error) {
        console.error("Tracking Error");
    }
}

// تشغيل المراقبة وظهور العناصر
trackVisitor();

function reveal() {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add("active");
    });
}
window.addEventListener("scroll", reveal);
reveal();