var mysql = require('mysql');
var exports = module.exports = {};

//(NOTE: CREATING A CONNECTION FOR EVERY QUERY MIGHT NOT BE GREAT FOR PERFORMANCE. SHOULD LOOK FOR DIFFERENT APPROACHES AND FIND OUT WHAT IS BEST.)

function connectDb() {
    var connection = mysql.createConnection({
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
    connection.query('SELECT task_id, name, description, ajattelu_value, fysiikka_value, sosiaalisuus_value, location.location_name, email, phone, link, date FROM task LEFT JOIN location ON task.location_id = location.location_id', function (err, rows, fields) {
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

    connection.query('SELECT location_id FROM location WHERE ? = location_name', [body.Paikka], (err, rows, fields) =>{
        let locId = rows[0].location_id;
        connection.query('INSERT INTO task (name, description, ajattelu_value, fysiikka_value, sosiaalisuus_value, email, phone, link, date, location_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [body.Nimi, body.Kuvaus, body.Ajattelu, body.Fyysisyys, body.Sosiaalisuus,
                body.Sähköposti, body.Puhelin, body.Linkki, body.Pvm, locId], (err, rows, fields) =>{
                if (err) throw err;
                connection.end();
            });
    });



  /*  connection.query('INSERT INTO task (name, description, ajattelu_value, fysiikka_value, sosiaalisuus_value, location, email, phone, link, date) VALUES' +
        ' ( \''+body.Nimi+'\', \''+body.Kuvaus+'\', '+body.Ajattelu+', '+body.Fyysisyys+', '+body.Sosiaalisuus+', \''+body.Paikka+'\', \''+body.Sähköposti+'\', \''+body.Puhelin+'\', \''+body.Linkki +'\', \''+body.Pvm+'\' )', function (err, rows, fields) {
        if (err) throw err;
    }); */


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

// Returns all tasks with first image they have and with location name
exports.getTask = function(callback) {
    //Needs to be changed when db has been established
    let connection = connectDb();
    connection.connect();

    // This function is async and must callback
    connection.query('SELECT t.*, l.location_name, i.url FROM task t LEFT JOIN image i ON (t.task_id = i.task_id) LEFT JOIN location l ON (t.location_id = l.location_id) GROUP BY t.task_id', function (err, rows, fields) {
    if (err) throw err;
    // Sends the response back to client
    callback(rows);
    });

    connection.end()
};

exports.getLocation = function(callback) {
    //Needs to be changed when db has been established
    let connection = connectDb();
    connection.connect();

    // This function is async and must callback
    connection.query('SELECT * FROM location', function (err, rows, fields) {
    if (err) throw err;
    // Sends the response back to client
    callback(rows);
    });

    connection.end()
};

exports.getImage = function(taskid, callback) {
    //Needs to be changed when db has been established
    let connection = connectDb();
    connection.connect();

    // This function is async and must callback
    connection.query('SELECT url FROM image WHERE image.task_id = ?', [taskid], function (err, rows, fields) {
    if (err) throw err;
    // Sends the response back to client
    callback(rows);
    });

    connection.end()
};

exports.getVideo = function(taskid, callback) {
    //Needs to be changed when db has been established
    let connection = connectDb();
    connection.connect();

    // This function is async and must callback
    connection.query('SELECT url FROM video WHERE video.task_id = ?', [taskid], function (err, rows, fields) {
    if (err) throw err;
    // Sends the response back to client
    callback(rows);
    });

    connection.end()
};

exports.postResults = function(phys, think, soc, callback) {
    let connection = connectDb();

    connection.connect();

    //Question marks used to escape strings and prevent SQL injection from user input
    connection.query('INSERT INTO results (fysiikka_value, ajattelu_value, sosiaalisuus_value) VALUES (?, ?, ?)', [phys, think, soc], function (err, rows, fields) {
        if (err) throw err;
        callback("row '" + phys + "', '" + think + "', '" + soc + "' added");
    });

    connection.end()
};

exports.getTaskToModify = function(id, callback){

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

    connection.query('SELECT location_id FROM location WHERE ? = location_name', [body.Paikka], (err, rows, fields) =>{
        let locId = rows[0].location_id;
        connection.query('UPDATE task SET name = ?, description = ?, ajattelu_value = ?, fysiikka_value = ?, sosiaalisuus_value = ?, email = ?, phone = ?, link = ?, date = ?, location_id = ? WHERE task_id = ? '
            , [body.Nimi, body.Kuvaus, body.Ajattelu, body.Fyysisyys, body.Sosiaalisuus,
                body.Sähköposti, body.Puhelin, body.Linkki, body.Pvm, locId, body.Id], function(err, rows, fields){
                if(err) throw err;
                connection.end();
            });
    });


};