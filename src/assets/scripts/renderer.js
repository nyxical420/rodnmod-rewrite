const { remote } = require('electron');

document.getElementById('draggable-area').addEventListener('mousedown', (event) => {
    remote.getCurrentWindow().setBounds({
        x: event.clientX,
        y: event.clientY,
        width: window.innerWidth,
        height: window.innerHeight
    });
    remote.getCurrentWindow().setIgnoreMouseEvents(true);
});

document.getElementById('draggable-area').addEventListener('mouseup', () => {
    remote.getCurrentWindow().setIgnoreMouseEvents(false);
});