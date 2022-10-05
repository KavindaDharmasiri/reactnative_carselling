const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')
const router = express.Router()

const connection = mysql.createConnection(db.database)

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
        var userTableQuery = "CREATE TABLE IF NOT EXISTS users (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), contact VARCHAR(255), password VARCHAR(255))"
        connection.query(userTableQuery, function (err, result) {

            if (result.warningCount === 0) {
                console.log("User table created!");
            }
        })
    }
})

router.get('/', (req, res) => {
    var query = "SELECT * FROM users";
    connection.query(query, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

router.post('/', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address
    const contact = req.body.contact
    const password = req.body.password

    var query = "INSERT INTO users (id, name,address,contact, password) VALUES (?, ?, ?,?,?)";

    connection.query(query, [id, name,address , contact, password], (err) => {
        if (err) {
            res.send({'message': 'duplicate entry'})
        } else {
            res.send({'message': 'user created!'})
        }
    })

})

router.put('/', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address
    const contact = req.body.contact
    const password = req.body.password

    var query = "UPDATE users SET username=?,address=?, contact=?, password=? WHERE id=?";

    connection.query(query, [name,address,contact, password, id], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({'message': 'user updated'})
        } else {
            res.send({'message': 'user not found'})
        }
    })
})

router.delete('/', (req, res) => {
    const id = req.body.id

    var query = "DELETE FROM users WHERE id=?";

    connection.query(query, [id], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({'message': 'user deleted'})
        } else {
            res.send({'message': 'user not found'})
        }
    })
})

router.get('/getOne', (req, res) => {
    const id = req.body.id

    var query = "SELECT * from users WHERE id=?";

    connection.query(query, [id], (err, row) => {
        if (err) console.log(err);

        res.send(row)
    })
})


module.exports = router
