var mysql = require('mysql')
var exports = module.exports = {};

//Test function to test exportation of the db functions
//and the connection to the desired db.
exports.test = function(callback) {
    //Needs to be changed when db has been established
    var connection = mysql.createConnection({
    host: 'localhost', //Address of the database
    user: 'root', //User to login with
    password: 'juuri', //Password used to go with the user
    database: 'jobMatch' //Database name within the address
    })

    connection.connect()

    // Needs to be changed to match the table in the desired db
    // This function is async and must callback
    connection.query('SELECT * FROM task', function (err, rows, fields) {
    if (err) throw err
    // Sends the response back to client
    callback(rows);
    })

    connection.end()
}

// Used to post suggestions into DB
exports.postSuggestion = function(name, desc, callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'juuri',
        database: 'jobMatch'
    });

    connection.connect();

    //Question marks used to escape strings and prevent SQL injection from user input
    connection.query('INSERT INTO suggestion (name, description) VALUES (?, ?)', [name, desc], function (err, rows, fields) {
        if (err) throw err;
        callback("row '" + name + "', '" + desc + "' added");
    });

    connection.end()
};

// Gets suggestion from DB to show them in the admin panel (Note: Might be best to unify all get statements into one statement with a table variable)
exports.getSuggestion = function(callback) {
    //Needs to be changed when db has been established
    var connection = mysql.createConnection({
    host: 'localhost', //Address of the database
    user: 'root', //User to login with
    password: 'juuri', //Password used to go with the user
    database: 'jobMatch' //Database name within the address
    })

    connection.connect()

    connection.query('SELECT * FROM suggestion', function (err, rows, fields) {
    if (err) throw err
    // Sends the response back to client
    callback(rows);
    })

    connection.end()
}