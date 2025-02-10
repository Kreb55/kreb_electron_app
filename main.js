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

    autoUpdater.checkForUpdatesAndNotify();

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit();
    });
});

autoUpdater.on('update-available', () => {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Güncelleme mevcut',
      message: 'Yeni bir güncelleme bulundu. Yükleniyor...',
    });
  });

autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'Güncelleme yüklendi',
        message: 'Uygulama güncellendi. Yeniden başlatılıyor...',
    }).then(() => {
        autoUpdater.quitAndInstall();
    });
});
