// FISHFINDER LIBRARY PORTED FROM OLD VERSION

const fs = require('fs');
const path = require('path');

function findWebfishing() {
    console.log("Starting the Webfishing installation search...");

    const libraryLocations = [
        path.join(process.env.ProgramFiles || 'C:\\Program Files', 'Steam', 'steamapps', 'libraryfolders.vdf'),
        path.join(process.env.ProgramFilesX86 || 'C:\\Program Files (x86)', 'Steam', 'steamapps', 'libraryfolders.vdf'),
        path.join(process.env.UserProfile || 'C:\\Users\\Default', 'Documents', 'My Games', 'Steam', 'libraryfolders.vdf'),
        path.join(process.env.ProgramData || 'C:\\ProgramData', 'Steam', 'libraryfolders.vdf'),

        path.join(process.env.HOME || '/home/user', '.steam', 'steam', 'steamapps', 'libraryfolders.vdf'),
        path.join(process.env.HOME || '/home/user', '.local', 'share', 'Steam', 'steamapps', 'libraryfolders.vdf')
    ];

    let steamLibraries = [];
    libraryLocations.forEach(location => {
        if (fs.existsSync(location)) {
            const fileContent = fs.readFileSync(location, 'utf8');
            const libraries = fileContent
                .split('\n')
                .filter(line => line.includes('"path"'))
                .map(line => line.split('"')[3]);
            steamLibraries = steamLibraries.concat(libraries);
            console.log(`Found libraries: ${libraries}`);
        }
    });

    for (let library of steamLibraries) {
        const commonPath = path.join(library, 'steamapps', 'common');
        if (fs.existsSync(commonPath)) {
            const directories = fs.readdirSync(commonPath);
            if (directories.includes('WEBFISHING')) {
                const installationPath = path.join(commonPath, 'WEBFISHING');
                console.log(`Webfishing found at: ${installationPath}`);
                return installationPath;
            }
        }
    }

    const instOverridePath = path.join(__dirname, 'data', 'installationOverride.json');
    if (fs.existsSync(instOverridePath)) {
        const overrideData = fs.readFileSync(instOverridePath, 'utf8');
        if (overrideData.trim() !== '') {
            const overrideJson = JSON.parse(overrideData);
            const installationOverride = overrideJson.installationPath;
            if (installationOverride && fs.existsSync(installationOverride)) {
                console.log(`Using installation override at: ${installationOverride}`);
                return installationOverride;
            }
        }
    }

    console.log("Webfishing installation not found.");
    return null;
}

module.exports = { findWebfishing };
