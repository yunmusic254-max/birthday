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
const birthdayLetters = ["H", "A", "P", "P", "Y", "❤️", "B", "I", "R", "T", "H", "D", "A", "Y"];
let letterIndex = 0;

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
    
    const chosenGift = document.getElementById(`gift-${index}`).innerText;
    document.getElementById('game-status').innerText = `Tahniah Baby! Sila screenshot kad ini dan hantar pada Yun untuk tebus: \n\n "${chosenGift}"`;
    
    setTimeout(() => {
        document.getElementById('go-fw-btn').style.display = 'inline-block';
    }, 1500);
}

function goToFireworksScreen() {
    document.getElementById('game-screen').style.display = 'none';
    const fwScreen = document.getElementById('fireworks-screen');
    fwScreen.style.display = 'block';

    // Sambung fungsi klik & touch terus ke skrin hitam baru
    fwScreen.addEventListener('click', triggerHTMLFirework);
    fwScreen.addEventListener('touchstart', triggerHTMLFirework);
}

function triggerHTMLFirework(e) {
    // Cari kedudukan koordinat x & y sentuhan
    let x = e.clientX || (e.touches && e.touches[0].clientX);
    let y = e.clientY || (e.touches && e.touches[0].clientY);
    
    if(!x || !y) {
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
    }

    const fwScreen = document.getElementById('fireworks-screen');

    // 1. Letupkan Huruf
    if (letterIndex < birthdayLetters.length) {
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('fw-letter');
        letterDiv.style.left = `${x}px`;
        letterDiv.style.top = `${y}px`;
        letterDiv.innerText = birthdayLetters[letterIndex];
        fwScreen.appendChild(letterDiv);
        
        letterIndex++;
        
        // Buang elemen selepas animasi tamat
        setTimeout(() => { letterDiv.remove(); }, 1000);
    }

    // 2. Letupkan 20 serpihan Sparkle di sekeliling ketukan
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        
        // Setkan arah letupan rawak (360 darjah) menggunakan CSS Variable
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const mx = Math.cos(angle) * distance;
        const my = Math.sin(angle) * distance;
        
        sparkle.style.setProperty('--mx', `${mx}px`);
        sparkle.style.setProperty('--my', `${my}px`);
        
        // Warna rawak warni untuk sparkle
        const colors = ['#ff4d6d', '#ff758f', '#ffd166', '#4a00e0', '#fff'];
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.boxShadow = `0 0 10px ${sparkle.style.backgroundColor}`;

        fwScreen.appendChild(sparkle);
        setTimeout(() => { sparkle.remove(); }, 800);
    }

    // 3. Kemas kini arahan teks di bahagian atas skrin
    const hintElement = document.getElementById('fw-hint');
    if (letterIndex < birthdayLetters.length) {
        hintElement.innerText = `Tap lagi, jom habiskan! (Huruf seterusnya...) ✨`;
    } else {
        hintElement.innerText = "Happy Birthday Sekali Lagi Sayang! I Love You So Much ❤️🎂 (Tap puas-puas!)";
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
