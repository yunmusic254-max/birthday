// Add your own custom reasons or inside jokes here!
const reasons = [
    "Your smile completely lights up my entire day. ☀️",
    "You have the kindest heart of anyone I've ever met. ✨",
    "I love how safe and happy I feel when I'm next to you. 🥰",
    "You are incredibly smart, capable, and inspiring. 🧠❤️",
    "Even when things get messy, you make life feel like a beautiful adventure. 🌎",
    "The way you laugh is literally my favorite sound in the world. 🎶"
];

function nextPage() {
    const intro = document.getElementById('intro-screen');
    const main = document.getElementById('main-content');
    
    // Fade out first page
    intro.style.opacity = '0';
    
    setTimeout(() => {
        intro.style.display = 'none';
        main.style.display = 'block';
        // Fade in second page
        setTimeout(() => {
            main.style.opacity = '1';
        }, 50);
    }, 1000);
}

function generateReason() {
    const textElement = document.getElementById('reason-text');
    // Pick a random reason from the list
    const randomIndex = Math.floor(Math.random() * reasons.length);
    textElement.innerText = reasons[randomIndex];
}
