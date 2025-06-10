const path = require("path")
const { ipcMain } = require('electron');
const userManager = require('./Database/UserManager');
const userLogin = require('./Login/UserLogin');
const { app, BrowserWindow } = require("electron")
const url = require("url")

function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		width: 1280,
		height: 720,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: false,
			contextIsolation: true,
			sandbox: false,
		},
	})

	// Set minimum window size
	win.setMinimumSize(700, 650)

	// and load the index.html of the app.
	// win.loadFile("index.html");
	const appURL = app.isPackaged
		? url.format({
				pathname: path.join(__dirname, "index.html"),
				protocol: "file:",
				slashes: true,
		  })
		: "http://localhost:3000"
	win.loadURL(appURL)

	// Open the DevTools.
	if (!app.isPackaged) {
		win.webContents.openDevTools()
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})

ipcMain.handle('read-all-person', () => {
  return userManager.readAllPerson();
});

ipcMain.handle('insert-person', (event, name, password) => {
  userManager.insertPerson(name, password);
  return { success: true };
});

ipcMain.handle('get-person-by-name', (event, name) => {
  try {
	const person = userManager.getPersonByName(name);
	return { success: true, person };
  } catch (error) {
	return { success: false, error: error.message };
  }
});

ipcMain.handle('user-connection', async (event, name, password) => {
  try {
	const token = await userLogin.userConnection(name, password);
	return { success: true, token };
  } catch (error) {
	return { success: false, error: error.message };
  }
});