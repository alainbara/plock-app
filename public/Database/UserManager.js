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

const getPersonByName = (name) => {
    try {
        const query = `SELECT * FROM User WHERE Name = ?`
        const readQuery = db.prepare(query)
        const rowList = readQuery.all(name)
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
        const query = `INSERT INTO User (Name, Password) VALUES ('${name}' , '${hashedPassword}')`
        const insertQuery = db.prepare(
            `INSERT INTO User (Name, Password) VALUES ('${name}' , '${hashedPassword}')`
        )

        const transaction = db.transaction(() => {
            const info = insertQuery.run()
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
    getPersonByName
}
