import os
import sys
import json

from webview import create_window, start


class FrontendFunctions:
    ...

class BackendFunctions:
    ...

if __name__ == "__main__":
    winFrontend = FrontendFunctions
    winBackend = BackendFunctions

    # make sure that the current working diretory is where the script/executable is located
    if getattr(sys, 'frozen', False):
        currentDir = os.path.dirname(sys.executable)
    else:
        currentDir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(currentDir)

    # Make sure required directories and files exist on start.
    folders = [
        "./data/wf/mods/",
        "./data/wf/saves/",
        "./data/wf/modpacks/",
        
        "./data/config/",
    ]

    for folder in folders:
        os.makedirs(folder, exist_ok=True)

    if not os.path.exists("./data/config/installationOverride.txt"):
        with open("./data/config/installationOverride.txt", "w") as file:
            file.write("")
    
    configData = {
        "windowScale": "normal"
    }

    if not os.path.exists("./data/config/config.json"):
        with open("./data/config/config.json", "w") as file:
            json.dump(
                {
                    "windowScale": "normal"
                }, 
                file,
                indent=4
            )

    # webview window
    with open("./data/config/config.json", "r") as file:
        config = json.load(file)

    windowSizes = {
        "small": [900, 600, 0.85],
        "normal": [1300, 900, 1],
        "big": [1500, 1000, 1.15],
    }

    winWidth, winHeight, uiScale = windowSizes[config["windowScale"]]
    print(winWidth, winHeight, uiScale)

    window = create_window(
        "Rod n' Mod",
        "app/main.html",
        width=winWidth,
        height=winHeight,
        frameless=True,
        easy_drag=True
    )

    for name in dir(winFrontend):
        func = getattr(winFrontend, name)
        if callable(func) and not name.startswith("_"):
            window.expose(func)
    
    window.expose(window.destroy)
    window.expose(window.minimize)

    #window.evaluate_js(f'document.body.style.zoom = "{uiScale}";')
    start(debug=True)