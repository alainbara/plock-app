const dbmgr = require("./DBManager")
const db = dbmgr.db

const getPasswordsByUserId = (userId) => {
    try {
        const query = `SELECT * FROM Passwords WHERE UserId = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all(userId)
        console.log(rowList)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

const insertPassword = (userId, website, username, password, icon) => {
    try {
        const query = `INSERT INTO Passwords (UserId, Website, Username, Password, Icon) VALUES (?, ?, ?, ?, ?)`
        const insertQuery = db.prepare(query)
        const transaction = db.transaction(() => {
            const info = insertQuery.run(userId, website, username, password, icon)
            console.log(`Inserted ${info.changes} rows with last ID ${info.lastInsertRowid}`)
        })
        transaction()
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = {
    getPasswordsByUserId,
    insertPassword
}