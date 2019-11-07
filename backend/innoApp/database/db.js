var mysql = require('mysql');
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
    });
    connection.connect();

    // Needs to be changed to match the table in the desired db
    // This function is async and must callback
    connection.query('SELECT * FROM task', function (err, rows, fields) {
    if (err) throw err;
    // Sends the response back to client
    callback(rows);
    });

    connection.end()
};

exports.delete = function(id, callback) {
    var connection = mysql.createConnection({
        host: 'localhost', //Address of the database
        user: 'root', //User to login with
        password: 'juuri', //Password used to go with the user
        database: 'jobMatch' //Database name within the address
    });
    connection.connect();

    connection.query('DELETE FROM task WHERE task_id =' + id, function (err, rows, fields) {
        if (err) throw err;
        callback(id + " deleted");
    });

    connection.end()
};

exports.add = function(body){
    var connection = mysql.createConnection({
        host: 'localhost', //Address of the database
        user: 'root', //User to login with
        password: 'juuri', //Password used to go with the user
        database: 'jobMatch' //Database name within the address
    });
    connection.connect();

    connection.query('INSERT INTO task (name, description, ajattelu_value, fysiikka_value, sosiaalisuus_value) VALUES ( \''+body.Nimi+'\', \''+body.Kuvaus+'\', '+body.Ajattelu+', '+body.Fyysisyys+', '+body.Sosiaalisuus+')', function (err, rows, fields) {
        if (err) throw err;
    });

    connection.end()
}