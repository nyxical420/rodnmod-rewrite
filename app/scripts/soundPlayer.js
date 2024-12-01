function playSound(url) {
    const audio = new Audio(`${url}`);
  
    audio.addEventListener('ended', () => {
        audio.remove();
    });
  
    audio.play().catch(err => console.error(`Error playing sound: ${err}`));
}

function attachSoundEvents(button, sounds) {
    button.addEventListener('mouseover', () => playSound(sounds.hover));
    button.addEventListener('mousedown', () => playSound(sounds.mouseDown));
    button.addEventListener('mouseup', () => playSound(sounds.mouseUp));
}

document.querySelectorAll('button').forEach(button => {
    attachSoundEvents(button, {
        hover: "assets/web/fishing/sounds/ui_swish.ogg",
        mouseDown: "assets/web/fishing/sounds/button_down.ogg",
        mouseUp: "assets/web/fishing/sounds/button_up.ogg"
    });
});