const dbmgr = require("./DBManager")
const db = dbmgr.db
const bcrypt = require("bcrypt")

const readAllPerson = () => {
    try {
        
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

const insertPerson = async (name, password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(`Inserting user: ${name}, password: ${password}`)
        const query = `INSERT INTO User (Name, Password) VALUES ('${name}' , '${hashedPassword}')`
        const insertQuery = db.prepare(
            `INSERT INTO User (Name, Password) VALUES ('${name}' , '${hashedPassword}')`
        )
        console.log(`Insert query: ${query}`)

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
    insertPerson
}
