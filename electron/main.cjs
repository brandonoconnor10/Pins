const { app, BrowserWindow, ipcMain, shell, Menu } = require("electron");
const path = require("path");
const fs = require("fs");

/* ---------- DATA ---------- */
const dataFile = path.join(app.getPath("userData"), "bookmarks.json");

function ensureFile() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
  }
}

/* ---------- WINDOW ---------- */
function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    title: "Pins",
    backgroundColor: "#0b0f1a",
    icon: path.join(__dirname, "assets", "icon.ico"),
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      sandbox: false
    }
  });

  Menu.setApplicationMenu(null);

  win.once("ready-to-show", () => {
    win.show();
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  }
}

/* ---------- APP LIFECYCLE ---------- */
app.whenReady().then(() => {
  ensureFile();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

/* ---------- IPC ---------- */
ipcMain.handle("load-bookmarks", () => {
  ensureFile();
  return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
});

ipcMain.handle("save-bookmarks", (_, bookmarks) => {
  fs.writeFileSync(dataFile, JSON.stringify(bookmarks, null, 2));
  return true;
});

ipcMain.handle("open-link", (_, url) => {
  shell.openExternal(url);
});
