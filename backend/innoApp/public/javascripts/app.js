//Test that sending the site to client can find JavaScript file
var testElement = document.getElementById('jstest');
testElement.innerHTML = "JS loaded successfully!";

//Test that client can use XMLHTTPRequest to connect with DB through server
var dbTestButton = document.getElementById('dbTestButton');
dbTestButton.onclick = function() {
    var xhr = new XMLHttpRequest();
    //Make a get call to /db route
    xhr.open("GET", "/db/test", true);
    //Handles response
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var dbresponse = document.getElementById('dbresponse');
                dbresponse.innerHTML = xhr.responseText;
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
    console.error(xhr.statusText);
    };
    xhr.send(null);
}