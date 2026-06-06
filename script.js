// ISI AYAT MANIS & NAMA FAIL GAMBAR ANDA DI SINI
const memories = [
    {
        text: "Sebab awak selalu tahu macam mana nak buat saya tersenyum. ☀️",
        image: "awek1.jpg" // Ganti dengan nama fail gambar yang anda upload (cth: awek1.jpg)
    },
    {
        text: "Sebab awak ada hati yang paling baik dan penyayang. ✨",
        image: "awek1.jpg" // Kalau ada gambar kedua, letak nama fail lain (cth: awek2.jpg)
    },
    {
        text: "Saya rasa sangat selamat, tenang dan gembira bila ada di sebelah awak. 🥰",
        image: "awek1.jpg"
    }
];

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
    
    // Pilih memori secara rawak
    const randomIndex = Math.floor(Math.random() * memories.length);
    
    // Tukar teks dan gambar dengan animasi smooth
    textElement.innerText = memories[randomIndex].text;
    imgElement.style.opacity = '0';
    
    setTimeout(() => {
        imgElement.src = memories[randomIndex].image;
        imgElement.style.opacity = '1';
    }, 300);
}

// Fungsi buat animasi hati gugur automatik di background
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
