const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')
const router = express.Router()
const upload = require('./uploadMiddleware');
const Resize = require('./Resize');
const path = require('path');
const connection = mysql.createConnection(db.database)

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
        var itemTableQuery = "CREATE TABLE IF NOT EXISTS vehicle (code VARCHAR(255) PRIMARY KEY, vehiclename VARCHAR(255), vehicleimg VARCHAR(255),price VARCHAR(255),uri VARCHAR(255))"
        connection.query(itemTableQuery, function (err, result) {

            if (result.warningCount === 0) {
                console.log("vehicle table created!");
            }
        })
    }
})

router.get('/', (req, res) => {
    console.log("ok")
    var query = "SELECT * FROM vehicle";
    connection.query(query, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

/*
router.post('/image', (req, res) => {
    console.log(req.body)
})
*/

var fileTemp='';

router.post('/image', upload.single('file'), async function (req, res) {
    const imagePath = path.join(__dirname, '../../carSelling/assests');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);

    fileTemp=filename;
    console.log(fileTemp)
    return res.status(200).json({ name: filename });

});

router.post('/imageUpdate', upload.single('file'), async function (req, res) {
    const imagePath = path.join(__dirname, '../../carSelling/assests');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    return res.status(200).json({ name: filename });

});

router.post('/', (req, res) => {
    const code = req.body.code
    const vehiclename = req.body.vehiclename
    const price = req.body.price
    const uri = req.body.vehicleimg

    var query = "INSERT INTO vehicle (code, vehiclename, vehicleimg,price,uri) VALUES (?, ?, ?, ?,?)";

    connection.query(query, [code, vehiclename, fileTemp , price , uri], (err) => {
        if (err) {
            res.send({'message': 'duplicate entry'})
        } else {
            res.send({'message': 'vehicle created!'})
        }
    })

})

router.put('/', (req, res) => {
    const code = req.body.code
    const vehiclename = req.body.vehiclename
    const vehicleimg = req.body.vehicleimg
    const price = req.body.price
    const uri = req.body.uri

    var query = "UPDATE vehicle SET vehiclename=?, vehicleimg=?, price=?, uri=? WHERE code=?";

    connection.query(query, [vehiclename, vehicleimg,price, uri , code], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({'message': 'vehilce updated'})
        } else {
            res.send({'message': 'vehicle not found'})
        }
    })
})

router.delete('/', (req, res) => {
    const code = req.body.code

    var query = "DELETE FROM vehicle WHERE code=?";

    connection.query(query, [code], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({'message': 'vehicle deleted'})
        } else {
            res.send({'message': 'vehicle not found'})
        }
    })
})

router.get('/getOne', (req, res) => {
    const code = req.body.code

    var query = "SELECT * from vehicle WHERE code=?";

    connection.query(query, [code], (err, row) => {
        if (err) console.log(err);

        res.send(row)
    })
})


module.exports = router
