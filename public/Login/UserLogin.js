const dbmgr = require("../Database/DBManager")
const db = dbmgr.db
const { v4: uuidv4 } = require('uuid');
//const jwt = require('jsonwebtoken');

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

        const username = user.name ;
        const token = uuidv4();

        //const new_token = jwt.sign(user, token, {
        //    expiresIn: '1h' // Token expires in 1 hour
        //});

        return ( username, token )
        //retourner un token

    } catch (err) {
        console.error(err)
        throw err
    }    
}

module.exports = {
    userConnection
}