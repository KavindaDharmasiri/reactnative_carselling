const express = require('express')
const multer = require('multer');
const upload = multer({dest: 'uploads/'}).single("demo_image");

const user = require('./routes/user')
const vehicle = require('./routes/vehicle')

const app = express()
const port = 4000
var cors = require('cors');
app.use(cors());

app.use(express.json())


app.use('/users', user)
app.use('/vehicle', vehicle)

app.listen(port, () => {
    console.log(`app starting on ${port}`);
})
