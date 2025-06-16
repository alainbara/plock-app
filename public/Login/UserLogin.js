const dbmgr = require("../Database/DBManager")
const db = dbmgr.db
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt")
//const jwt = require('jsonwebtoken');

const userConnection = async (name, password) => {
    try {
        const query = `SELECT * FROM User WHERE name = ?`
        const readQuery = db.prepare(query)
        const user = readQuery.get(name)
        
        if (!user) {
            throw new Error("User not found")
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password")
        }

        const username = user.name ;
        const token = uuidv4();

        console.log("User connected: ", user)
        const result = {
            id: user.id,
            name: username,
            token: token
        };

        //const new_token = jwt.sign(user, token, {
        //    expiresIn: '1h' // Token expires in 1 hour
        //});

        return ( result )
        //retourner un token

    } catch (err) {
        console.error(err)
        throw err
    }    
}

module.exports = {
    userConnection
}