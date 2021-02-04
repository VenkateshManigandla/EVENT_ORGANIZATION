const mysql = require('mysql')
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'event'
})

connection.connect((err) => {
    if (!err) {
        console.log('DB Connected Succesfully!!!')
    } else
        console.log('DB Connection Failed', +err)
})

module.exports = connection;