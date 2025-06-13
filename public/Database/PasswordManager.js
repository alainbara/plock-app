const dbmgr = require("./DBManager")
const db = dbmgr.db

const getPasswordsByUserId = (userId) => {
    try {
        const query = `SELECT * FROM Password WHERE user_id = ?`
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
        let iconBuffer = null;
        if (icon) {
            if (Buffer.isBuffer(icon)) {
                iconBuffer = icon;
            } else if (icon instanceof Uint8Array || icon instanceof ArrayBuffer) {
                iconBuffer = Buffer.from(icon);
            } else {
                // Si c'est un objet File/Blob venant du front, il faut le convertir AVANT d'arriver ici
                throw new Error("L'icône doit être un Buffer, Uint8Array, ArrayBuffer ou null");
            }
        }

    try {
        const query = `INSERT INTO Password (user_id, Website, Username, Password, Icon) VALUES (?, ?, ?, ?, ?)`
        const insertQuery = db.prepare(query)
        const transaction = db.transaction(() => {
            const info = insertQuery.run(userId, website, username, password, iconBuffer)
            console.log(`Inserted ${info.changes} rows with last ID ${info.lastInsertRowid}`)
        })
        transaction()
    } catch (err) {
        console.error(err)
        throw err
    }
}

const editPassword = (passwordId, userId, website, username, password, icon) => {
    let iconBuffer = null;
    if (icon) {
        if (Buffer.isBuffer(icon)) {
            iconBuffer = icon;
        } else if (icon instanceof Uint8Array || icon instanceof ArrayBuffer) {
            iconBuffer = Buffer.from(icon);
        } else {
            // Si c'est un objet File/Blob venant du front, il faut le convertir AVANT d'arriver ici
            throw new Error("L'icône doit être un Buffer, Uint8Array, ArrayBuffer ou null");
        }
    }

    try {
        const query = `UPDATE Password SET user_id = ?, Website = ?, Username = ?, Password = ?, Icon = ? WHERE id = ?`
        const updateQuery = db.prepare(query)
        const transaction = db.transaction(() => {
            const info = updateQuery.run(userId, website, username, password, iconBuffer, passwordId)
            console.log(`Updated ${info.changes} rows`)
        })
        transaction()
    } catch (err) {
        console.error(err)
        throw err
    }
}

const deletePassword = (passwordId) => {
    try {
        const query = `DELETE FROM Password WHERE id = ?`
        const deleteQuery = db.prepare(query)
        const transaction = db.transaction(() => {
            const info = deleteQuery.run(passwordId)
            console.log(`Deleted ${info.changes} rows`)
        })
        transaction()
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = {
    getPasswordsByUserId,
    insertPassword,
    editPassword,
    deletePassword
}