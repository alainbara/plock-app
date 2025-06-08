const { contextBridge, ipcRenderer } = require("electron")
const userDB = require("./Database/UserManager")

contextBridge.exposeInMainWorld("sqlite", {
  userDB: {
    readAllPerson: () => ipcRenderer.invoke('read-all-person'),
    // ajoute d'autres méthodes ici
  }
})


