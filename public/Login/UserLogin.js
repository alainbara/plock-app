const dbmgr = require("../Database/DBManager")
const db = dbmgr.db

const userConnection = async (name, password) => {
    try {
        const query = `SELECT * FROM User WHERE Name = ?`
        const readQuery = db.prepare(query)
        const user = readQuery.get(name)
        
        if (!user) {
            throw new Error("User not found")
        }

        if (password !== user.password) {
            throw new Error("Invalid password")
        }

        /*const isPasswordValid = bcrypt.compareSync(password, user.Password);
        if (!isPasswordValid) {
            throw new Error("Invalid password")
        }*/

        const payload = { username: user.name };
        /*const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });*/

        console.log(`payload : ${payload}`)

        return payload
        //retourner un token

    } catch (err) {
        console.error(err)
        throw err
    }    
}

module.exports = {
    userConnection
}