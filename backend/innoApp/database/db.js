var mysql = require('mysql');
var exports = module.exports = {};



function connectDb() {
    let connection = mysql.createConnection({
        host: 'localhost', //Address of the database
        user: 'root', //User to login with
        password: 'juuri', //Password used to go with the user
        database: 'jobMatch' //Database name within the address
    });
    return connection;
}


//Test function to test exportation of the db functions
//and the connection to the desired db.
exports.test = function(callback) {
    //Needs to be changed when db has been established
    let connection = connectDb();
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

exports.delete = function(id) {
    let connection = connectDb();
    connection.connect();

    connection.query('DELETE FROM task WHERE task_id =' + id, function (err, rows, fields) {
        if (err) throw err;
    });

    connection.end()
};

exports.add = function(body){
    let connection = connectDb();
    connection.connect();

    connection.query('INSERT INTO task (name, description, ajattelu_value, fysiikka_value, sosiaalisuus_value, location, email, phone, link, date) VALUES' +
        ' ( \''+body.Nimi+'\', \''+body.Kuvaus+'\', '+body.Ajattelu+', '+body.Fyysisyys+', '+body.Sosiaalisuus+', \''+body.Paikka+'\', \''+body.Sähköposti+'\', \''+body.Puhelin+'\', \''+body.Linkki +'\', \''+body.Pvm+'\' )', function (err, rows, fields) {
        if (err) throw err;
    });

    connection.end()
}

// Used to post suggestions into DB
exports.postSuggestion = function(name, desc, callback) {
    let connection = connectDb();

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
    let connection = connectDb();

    connection.connect();

    connection.query('SELECT * FROM suggestion', function (err, rows, fields) {
    if (err) throw err
    // Sends the response back to client
    callback(rows);
    })

    connection.end();
}

exports.getTask = function(id, callback){

    let connection = connectDb();
    connection.connect();

    connection.query('SELECT * FROM task WHERE task_id = '+id, function(err, rows, fields) {
        if(err) throw err;
        callback(rows);
    });
    connection.end();
};

exports.updateTask = (body) => {
    let connection = connectDb();
    connection.connect();

    connection.query('UPDATE task SET name = ?, description = ?, ajattelu_value = ?, fysiikka_value = ?, sosiaalisuus_value = ?, location = ?, email = ?, phone = ?, link = ?, date = ? WHERE task_id = ? '
        , [body.Nimi, body.Kuvaus, body.Ajattelu, body.Fyysisyys, body.Sosiaalisuus, body.Paikka,
            body.Sähköposti, body.Puhelin, body.Linkki, body.Pvm, body.Id], function(err, rows, fields){
            if(err) throw err;
        });
    connection.end();

};