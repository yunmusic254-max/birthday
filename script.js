// MASUKKAN SEMUA GAMBAR & AYAT ANDA DI SINI
const memories = [
    {
        text: "Sebab awak selalu tahu macam mana nak buat saya tersenyum. ☀️",
        image: "photo_6134180195070578679_y.jpg" // Gambar 1
    },
    {
        text: "Sebab awak ada hati yang paling baik dan penyayang. ✨",
        image: "MASUKKAN_NAMA_FAIL_GAMBAR_KEDUA_DI_SINI.jpg" // Gambar 2
    },
    {
        text: "Saya rasa sangat selamat, tenang dan gembira bila ada di sebelah awak. 🥰",
        image: "MASUKKAN_NAMA_FAIL_GAMBAR_KETIGA_DI_SINI.jpg" // Gambar 3
    },
    {
        text: "Gelak tawa awak adalah bunyi yang paling saya suka dengar dalam dunia ni. 🎶",
        image: "MASUKKAN_NAMA_FAIL_GAMBAR_KEEMPAT_DI_SINI.jpg" // Gambar 4
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
    const randomIndex = Math.floor(Math.random() * memories.length);
    
    textElement.innerText = memories[randomIndex].text;
    imgElement.style.opacity = '0';
    
    setTimeout(() => {
        imgElement.src = memories[randomIndex].image;
        imgElement.style.opacity = '1';
    }, 300);
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
