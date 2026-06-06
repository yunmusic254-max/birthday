// SENARAI GAMBAR & AYAT MANIS (BABY & YUN EDITION)
const memories = [
    {
        text: "Sebab baby selalu tahu macam mana nak buat Yun tersenyum. ☀️",
        image: "photo_6134180195070578679_y.jpg"
    },
    {
        text: "Sebab baby ada hati yang paling baik dan penyayang dalam dunia ni. ✨",
        image: "photo_6134180195070578695_y.jpg"
    },
    {
        text: "Yun rasa sangat selamat, tenang dan gembira bila ada di sebelah baby. 🥰",
        image: "photo_6134180195070578693_y.jpg"
    },
    {
        text: "Setiap hari yang dilalui bersama baby adalah hari yang paling indah buat Yun. 🌹",
        image: "photo_6134180195070578692_y.jpg"
    },
    {
        text: "Terima kasih sebab sudi jadi sebahagian daripada cerita hidup Yun. ❤️",
        image: "photo_6134180195070578686_y.jpg"
    },
    {
        text: "Yun sentiasa hargai setiap saat, gelak tawa, dan memori yang kita kongsi bersama. ✨",
        image: "photo_6134180195070578685_y.jpg"
    },
    {
        text: "Walau apa pun yang terjadi, baby akan sentiasa ada tempat yang istimewa dalam hati Yun. 💖",
        image: "photo_6134180195070578684_y.jpg"
    },
    {
        text: "Semoga panjang umur, murah rezeki, dan impian baby semuanya tercapai. Happy Birthday, sayang! 🎂🎉",
        image: "photo_6134180195070578680_y.jpg"
    }
];

// --- JANGAN UBAH KOD DI BAWAH INI ---
function nextPage() {
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
    
    // Pilih memori secara rawak dari senarai di atas
    const randomIndex = Math.floor(Math.random() * memories.length);
    
    textElement.innerText = memories[randomIndex].text;
    imgElement.style.opacity = '0';
    
    setTimeout(() => {
        imgElement.src = memories[randomIndex].image;
        imgElement.style.opacity = '1';
    }, 300);
}

// Fungsi animasi hati gugur di background
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
