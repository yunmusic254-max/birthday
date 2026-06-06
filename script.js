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

// Fungsi panggil lagu untuk start play
function startMusic() {
    const music = document.getElementById('bg-music');
    if (music && music.paused) {
        music.play().catch(e => console.log("Menunggu sentuhan pertama..."));
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
