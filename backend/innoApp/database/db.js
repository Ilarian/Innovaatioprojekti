var mysql = require('mysql')
var exports = module.exports = {};

//Test function to test exportation of the db functions
//and the connection to the desired db.
exports.test = function() {
    //Needs to be changed
    var connection = mysql.createConnection({
    host: 'localhost', //Address of the database
    user: 'root', //User to login with
    password: 'juuri', //Password used to go with the user
    database: 'ennustaja' //Database name within the address
    })

    connection.connect()

    // Needs to be changed to match the table in the desired db
    connection.query('SELECT * FROM osat', function (err, rows, fields) {
    if (err) throw err

    // Log the test rows
    console.log('Osat rows: ', rows)
    })

    connection.end()
}