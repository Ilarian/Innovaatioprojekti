var mysql = require('mysql');
var async = require('async');
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
    connection.query('SELECT task_id, name, description, ajattelu_value, fysiikka_value, sosiaalisuus_value, location.location_name, email, phone, link, date, task_when FROM task LEFT JOIN location ON task.location_id = location.location_id', function (err, rows, fields) {
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
        connection.query('INSERT INTO task (name, description, ajattelu_value, fysiikka_value, sosiaalisuus_value, email, phone, link, date, task_when, location_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [body.Nimi, body.Kuvaus, body.Ajattelu, body.Fyysisyys, body.Sosiaalisuus,
                body.Sähköposti, body.Puhelin, body.Linkki, body.Pvm, body.Milloin, locId], (err, rows, fields) =>{

                let kuvaArr = [];
                if(typeof body.Kuvat === "string"){
                    kuvaArr.push(body.Kuvat);
                }else{
                    kuvaArr = body.Kuvat;
                }

                let taskId = rows.insertId;
                if (kuvaArr != undefined && kuvaArr.length != 0) {
                    async.each(kuvaArr, (kuva, callback) => {
                        connection.query('INSERT INTO image (url, task_id) VALUES (?, ?)', ['images/annala/' + kuva, taskId], (err) => {
                            if (err) throw err;
                            callback();
                        })
                    });
                }

                if (err) throw err;
                connection.end();
            });
    });

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

// Returns all tasks that have date same or after today with first image they have and with location name
exports.getTask = function(callback) {
    //Needs to be changed when db has been established
    let connection = connectDb();
    connection.connect();

    // This function is async and must callback
    //Original
    //connection.query('SELECT t.*, l.location_name, i.url FROM task t LEFT JOIN image i ON (t.task_id = i.task_id) LEFT JOIN location l ON (t.location_id = l.location_id) GROUP BY t.task_id', function (err, rows, fields) {
    //Filter by date as to offer tasks to a certain date
    connection.query('SELECT t.*, l.location_name, i.url FROM task t LEFT JOIN image i ON (t.task_id = i.task_id) LEFT JOIN location l ON (t.location_id = l.location_id) WHERE DATE >= CURRENT_DATE() GROUP BY t.task_id', function (err, rows, fields) {
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
        connection.query('UPDATE task SET name = ?, description = ?, ajattelu_value = ?, fysiikka_value = ?, sosiaalisuus_value = ?, email = ?, phone = ?, link = ?, date = ?, task_when = ?, location_id = ? WHERE task_id = ? '
            , [body.Nimi, body.Kuvaus, body.Ajattelu, body.Fyysisyys, body.Sosiaalisuus,
                body.Sähköposti, body.Puhelin, body.Linkki, body.Pvm, body.Milloin, locId, body.Id], function(err, rows, fields){

                let kuvaArr = [];
                let taskId = body.Id;
                if(typeof body.Kuvat === "string"){
                    kuvaArr.push(body.Kuvat);
                }else{
                    kuvaArr = body.Kuvat;
                }


                //Check if Kuvat array is populated, then delete existing image rows and add new ones
                if(kuvaArr != undefined && kuvaArr.length != 0) {
                    connection.query('DELETE FROM image WHERE task_id = ?', [taskId], (err) => {
                        //Asynchronous foreach loop to add images
                        async.each(kuvaArr, (kuva, callback) => {
                            connection.query('INSERT INTO image (url, task_id) VALUES (?, ?)', ['images/annala/' + kuva, taskId], (err) => {
                                if (err) throw err;
                                callback();
                            })
                        });
                        connection.end();
                    })
                }
                if(err) throw err;
            });
    });


};