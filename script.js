const areas = [
    document.getElementById('main-notepad'),
    document.getElementById('mini-notepad-1'),
    document.getElementById('mini-notepad-2'),
    document.getElementById('mini-notepad-3'),
    document.getElementById('mini-notepad-4')
];

let currentFocus = 0;
const swapSound = document.getElementById('swap-sound');
const bellSound = document.getElementById('bell-sound');
let debugMode = true;
const bellInterval = debugMode ? 30000 : 300000; // 30 seconds for debug, 5 minutes otherwise

// Preload audio
swapSound.load();
bellSound.load();

function playSound(sound) {
    const clone = sound.cloneNode();
    clone.play();
}

function setFocus(index) {
    areas[currentFocus].classList.remove('focus');
    currentFocus = index;
    areas[currentFocus].classList.add('focus');
    areas[currentFocus].focus();
    playSound(swapSound);
}

document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key >= '0' && e.key <= '4') {
        setFocus(parseInt(e.key));
    } else if (e.key === 's' && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        saveNotes();
    }
});

function saveNotes() {
    let notes = areas.map((area, index) => `## Area ${index}\n\n${area.innerText}`).join('\n\n');
    let blob = new Blob([notes], { type: 'text/markdown' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'notes.md';
    link.click();
}

setInterval(() => {
    playSound(bellSound);
}, bellInterval);

areas.forEach(area => {
    area.contentEditable = true;
});
