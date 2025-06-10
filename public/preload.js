const { contextBridge, ipcRenderer } = require("electron")
const userDB = require("./Database/UserManager")
const login = require("./Login/UserLogin")

contextBridge.exposeInMainWorld("sqlite", {
    userDB: {
      readAllPerson: () => ipcRenderer.invoke("read-all-person"),
      insertPerson: (name, password) => ipcRenderer.invoke("insert-person", name, password),
      getPersonByName: (name) => ipcRenderer.invoke("get-person-by-name", name),
    },
    login: {
      userConnection: (name, password) => ipcRenderer.invoke("user-connection", name, password),
    },
})

 