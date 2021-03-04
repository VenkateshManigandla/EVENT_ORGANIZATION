const express = require('express')
const mysql = require('mysql')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const path = require('path')
const eventRoutes = require('./routes/event')
const createRoutes = require('./routes/create_event')


app.use(express.json())


app.use( eventRoutes)
app.use( createRoutes)

app.get('/', (req,res) => {
    res.send("hello")
})

app.listen('3000', (req, res) => {
    console.log('Server is running on port: 3000')
})