// UI Reveal / Hide - Copied from old version since it still works.
function openWindow(name) {
    if (name == null) { name = ".windowContent"; }
    document.querySelector(name).style.clipPath = 'circle(75% at center)';
    playSound("/assets/web/fishing/sounds/guitar_out.ogg");
}

function closeWindow(name, literally) {
    if (name == null) { name = ".windowContent"; }
    document.querySelector(name).style.clipPath = 'circle(0% at center)';
    playSound("/assets/web/fishing/sounds/guitar_in.ogg");
    if (literally) {
        setTimeout(() => window.close(), 3000);
    }
}