const dbmgr = require("./DBManager")
const db = dbmgr.db

const readAllPerson = () => {
    console.log("oh")
    try {
        console.log(db);
        const query = `SELECT * FROM User`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all()
        console.log(rowList)
        return rowList
    } catch (err) {
        console.error(err)
        throw err
    }
}

const insertPerson = (name, password) => {
    try {
        const insertQuery = db.prepare(
            `INSERT INTO User (Name, Password) VALUES ('${name}' , ${password})`
        )

        const transaction = db.transaction(() => {
            const info = insertQuery.run()
            console.log(
                `Inserted ${info.changes} rows with last ID 
                 ${info.lastInsertRowid} into user`
            )
        })
        transaction()
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = {
    readAllPerson,
    insertPerson,
}
