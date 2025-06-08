const { contextBridge, ipcRenderer } = require("electron")
const userDB = require("./Database/UserManager")

contextBridge.exposeInMainWorld("sqlite", {
  userDB,
})

