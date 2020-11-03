const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Robin Comics',
    name: 'Robin Comics',
    icon: `${__dirname}/assets/icon.png`,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.setMenu(null);
  win.loadFile('./dist/index.html')
  //uncomment the following line and devtools will open on startup:
  // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
