const { contextBridge, ipcRenderer } = require("electron")
const userDB = require("./Database/UserManager")
const login = require("./Login/UserLogin")

contextBridge.exposeInMainWorld("sqlite", {
    userDB,
    login,
})

