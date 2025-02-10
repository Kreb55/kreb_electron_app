const { app, BrowserWindow, autoUpdater } = require('electron');
const isDev = require('electron-is-dev');

try {
    require('electron-reloader')(module);
} catch (_) {}

const feedURL = "https://github.com/Kreb55/kreb_electron_app/releases/latest/download";

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');

    if (!isDev) {
        autoUpdater.setFeedURL(feedURL);
        autoUpdater.checkForUpdates();

        autoUpdater.on('update-downloaded', () => {
            autoUpdater.quitAndInstall();
        });
    }

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit();
    });
});

autoUpdater.on("update-available", () => {
    console.log("Update available");
});

autoUpdater.on('update-downloaded', () => {
    console.log('Update downloaded. Ready to install');
    autoUpdater.quitAndInstall();
});
