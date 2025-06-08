const { contextBridge, ipcRenderer } = require("electron")
const userDB = require("./Database/UserManager")

contextBridge.exposeInMainWorld("sqlite", {
  userDB,
  /*userDB: {
    readAllPerson: () => ipcRenderer.invoke('read-all-person'),
    // ajoute d'autres méthodes ici
    insertPerson: (name, password) => ipcRenderer.invoke('insert-person', name, password)
  }*/
})

