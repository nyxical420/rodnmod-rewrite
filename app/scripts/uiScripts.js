// UI Reveal / Hide - Copied from old version since it still works.
let sceneChanging = false;

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
        setTimeout(() => $, 3000);
    }
}

function changeScene(name) {
    const currentTab = document.querySelector('.tab.active');
    
    if (currentTab && currentTab.id === name) {
        return;
    }
    
    if (!sceneChanging) {
        const tabs = document.querySelectorAll('.tab');
        closeWindow(".tabs", false);
        
        sleep(1200).then(() => {
            tabs.forEach(tab => {
                tab.classList.remove('active');
            });

            document.getElementById(name).classList.add('active');
            openWindow(".tabs");
            sceneChanging = false;
        })
    }
}

// Sleep Function - basically does what it has to do
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}