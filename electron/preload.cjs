const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  loadBookmarks: () => ipcRenderer.invoke("load-bookmarks"),
  saveBookmarks: (bookmarks) =>
    ipcRenderer.invoke("save-bookmarks", bookmarks),
  openLink: (url) => ipcRenderer.invoke("open-link", url)
});
