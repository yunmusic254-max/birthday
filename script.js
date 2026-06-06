const memories = [
    { text: "Sebab baby selalu tahu macam mana nak buat Yun tersenyum. ☀️", image: "photo_6134180195070578679_y.jpg" },
    { text: "Sebab baby ada hati yang paling baik dan penyayang dalam dunia ni. ✨", image: "photo_6134180195070578695_y.jpg" },
    { text: "Yun rasa sangat selamat, tenang dan gembira bila ada di sebelah baby. 🥰", image: "photo_6134180195070578693_y.jpg" },
    { text: "Setiap hari yang dilalui bersama baby adalah hari yang paling indah buat Yun. 🌹", image: "photo_6134180195070578692_y.jpg" },
    { text: "Terima kasih sebab sudi jadi sebahagian daripada cerita hidup Yun. ❤️", image: "photo_6134180195070578686_y.jpg" },
    { text: "Yun sentiasa hargai setiap saat, gelak tawa, dan memori yang kita kongsi bersama. ✨", image: "photo_6134180195070578685_y.jpg" },
    { text: "Walau apa pun yang terjadi, baby akan sentiasa ada tempat yang istimewa dalam hati Yun. 💖", image: "photo_6134180195070578684_y.jpg" },
    { text: "Semoga panjang umur, murah rezeki, dan impian baby semuanya tercapai. Happy Birthday, sayang! 🎂🎉", image: "photo_6134180195070578680_y.jpg" }
];

const luckyGifts = [
    "☕ Kupon Starbucks Belanja Spesial dari Yun!",
    "🫂 Kupon Free Hugs & Manja dari Yun Seminggu!",
    "👑 Kad Bertuah: Baby Boleh Minta Apa Sahaja Sekarang!",
    "📞 Denda Comel: Kena Call Yun Sekarang Juga! 😘"
];

let currentIndex = 0;
let hasSelectedCard = false;
const birthdayLetters = ["H", "A", "P", "P", "Y", " ", "B", "I", "R", "T", "H", "D", "A", "Y"];
let letterIndex = 0;
let particles = [];
let canvas, ctx;

window.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('fwCanvas');
    if(canvas) {
        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animateFireworks();
    }
});

function resizeCanvas() {
    if(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

class Particle {
    constructor(x, y, color, angle, speed, isGlitter = false, letter = '') {
        this.x = x;
        this.y = y;
        this.color = color;
        this.angle = angle;
        this.speed = speed;
        this.friction = isGlitter ? 0.96 : 0.95;
        this.gravity = isGlitter ? 0.08 : 0.12;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = isGlitter ? 0.015 : 0.02;
        this.isGlitter = isGlitter;
        this.letter = letter;
    }
    update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
    }
    draw() {
        if(!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        if (this.letter) {
            ctx.font = 'bold 55px Arial, sans-serif';
            ctx.fillStyle = '#ff4d6d';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#ff758f';
            ctx.fillText(this.letter, this.x, this.y);
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.isGlitter ? Math.random() * 2 + 1.5 : 4.5, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            if (this.isGlitter) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#fff';
            }
            ctx.fill();
        }
        ctx.restore();
    }
}

function animateFireworks() {
    if(!ctx || !canvas) return;
    ctx.fillStyle = 'rgba(11, 2, 12, 0.2)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        } else {
            particles[i].draw();
        }
    }
    requestAnimationFrame(animateFireworks);
}

function createHeartFirework(targetX, targetY) {
    const totalPoints = 65;
    const color = `hsl(${Math.random() * 30 + 340}, 100%, 65%)`; 
    
    for (let i = 0; i < totalPoints; i++) {
        const t = (i / totalPoints) * Math.PI * 2;
        const xOffset = 16 * Math.pow(Math.sin(t), 3);
        const yOffset = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        
        const angle = Math.atan2(yOffset, xOffset);
        const speed = Math.sqrt(xOffset * xOffset + yOffset * yOffset) * 0.35;
        
        particles.push(new Particle(targetX, targetY, color, angle, speed, false));
        particles.push(new Particle(targetX, targetY, '#ffffff', angle + (Math.random() - 0.5), speed * 0.7, true));
    }
}

function startMusic() {
    const music = document.getElementById('bg-music');
    if (music && music.paused) {
        music.play().catch(e => console.log("Menunggu sentuhan..."));
    }
}

function nextPage(event) {
    if (event) event.stopPropagation(); 
    startMusic(); 
    document.getElementById('intro-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('intro-screen').style.display = 'none';
        const main = document.getElementById('main-content');
        main.style.display = 'block';
        setTimeout(() => main.style.opacity = '1', 50);
    }, 1000);
}

function generateReason() {
    const textElement = document.getElementById('reason-text');
    const imgElement = document.getElementById('love-image');
    currentIndex++;
    if (currentIndex >= memories.length) {
        goToGameScreen();
        return;
    }
    textElement.innerText = memories[currentIndex].text;
    imgElement.style.opacity = '0';
    setTimeout(() => {
        imgElement.src = memories[currentIndex].image;
        imgElement.style.opacity = '1';
    }, 300);
}

function goToGameScreen() {
    document.getElementById('main-content').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('main-content').style.display = 'none';
        const gameZone = document.getElementById('game-screen');
        gameZone.style.display = 'block';
        setTimeout(() => gameZone.style.opacity = '1', 50);
        
        const shuffledGifts = luckyGifts.sort(() => Math.random() - 0.5);
        for(let i=0; i<4; i++) {
            document.getElementById(`gift-${i}`).innerText = shuffledGifts[i];
        }
    }, 1000);
}

function flipCard(cardElement, index) {
    if (hasSelectedCard) return;
    cardElement.classList.add('flipped');
    hasSelectedCard = true;
    
    const rect = cardElement.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;
    createHeartFirework(clickX, clickY);
    
    const chosenGift = document.getElementById(`gift-${index}`).innerText;
    document.getElementById('game-status').innerText = `Tahniah Baby! Sila screenshot kad ini dan hantar pada Yun untuk tebus: \n\n "${chosenGift}"`;
    
    setTimeout(() => {
        document.getElementById('go-fw-btn').style.display = 'inline-block';
    }, 2000);
}

function goToFireworksScreen() {
    // Sembunyikan kad game
    document.getElementById('game-screen').style.display = 'none';
    
    // Aktifkan skrin penuh untuk mendengar ketukan bunga api
    const fwScreen = document.getElementById('fireworks-screen');
    fwScreen.style.display = 'block';
    
    // Tukar tetapan canvas supaya boleh menerima klik terus pada skrin telefon
    if(canvas) {
        canvas.style.pointerEvents = 'auto';
        canvas.style.zIndex = '100';
    }

    // Ikat fungsi ketukan terus pada elemen skrin akhir secara dinamik
    fwScreen.addEventListener('click', launchLetterFirework);
    fwScreen.addEventListener('touchstart', launchLetterFirework);
}

function launchLetterFirework(event) {
    if (event) event.preventDefault();

    let clickX, clickY;
    if (event.changedTouches && event.changedTouches.length > 0) {
        clickX = event.changedTouches[0].clientX;
        clickY = event.changedTouches[0].clientY;
    } else if (event.touches && event.touches.length > 0) {
        clickX = event.touches[0].clientX;
        clickY = event.touches[0].clientY;
    } else {
        clickX = event.clientX;
        clickY = event.clientY;
    }

    if (!clickX || !clickY) {
        clickX = window.innerWidth / 2;
        clickY = window.innerHeight / 2;
    }

    if (letterIndex >= birthdayLetters.length) {
        document.getElementById('fw-hint').innerText = "Happy Birthday Sekali Lagi Sayang! I Love You So Much ❤️✨";
        createHeartFirework(clickX, clickY);
        return;
    }

    const currentLetter = birthdayLetters[letterIndex];
    letterIndex++;

    if (currentLetter === " ") {
        createHeartFirework(clickX, clickY);
    } else {
        // Keluarkan letupan huruf bersinar
        particles.push(new Particle(clickX, clickY, '#ff4d6d', 0, 0, false, currentLetter));
        
        // Taburkan glitter berkilauan di sekeliling huruf tersebut
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            particles.push(new Particle(clickX, clickY, '#ffd166', angle, speed, true));
        }
    }

    if (letterIndex < birthdayLetters.length) {
        document.getElementById('fw-hint').innerText = `Tap lagi, jom habiskan! (Huruf seterusnya...) ✨`;
    } else {
        document.getElementById('fw-hint').innerText = "Yayyy! Selesai! Selamat Hari Jadi Sayang! ❤️🎂 (Tap untuk letupan bonus!)";
    }
}

function createHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.fontSize = Math.random() * 15 + 15 + 'px';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 400);
