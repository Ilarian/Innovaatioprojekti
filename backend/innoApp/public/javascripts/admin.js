var xhr = new XMLHttpRequest();
//Make a get call to /db route
//TODO vaihda kutsun url
xhr.open("GET", "/db/test", true);
//Handles response
xhr.onload = function (e) {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var dbresponse = document.getElementById('tehtävälista');
            var responseText = JSON.parse(xhr.responseText);

            //Looppaa tietokannasta saadut rivit
            for(var i = 0; i < responseText.length; i++) {

                var ul = document.createElement("ul");
                var values = Object.values(responseText[i]);

                //Looppaa rivin arvot, jättäen id arvon pois ja lisää tiedot listaan
                for(var j = 1; j < values.length; j++){
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(values[j]));
                    ul.appendChild(li);
                }
                dbresponse.appendChild(ul);

                //Luodaan taskin loppuun poista-painike.
                let removeBtn = document.createElement("button");
                removeBtn.setAttribute("class", "remove");
                removeBtn.setAttribute("value", ""+ values[0]);
                removeBtn.innerHTML = "Poista tämä tehtävä";

                dbresponse.appendChild(removeBtn);
            }
            setClickListenerRemove();


        } else {
            console.error(xhr.statusText);
        }
    }
};
xhr.onerror = function (e) {
    console.error(xhr.statusText);
};
xhr.send(null);



function setClickListenerRemove() {
    let removeBtns = document.getElementsByClassName("remove");
    for(let i = 0; i < removeBtns.length; i++){
        removeBtns[i].addEventListener("click", () => {
            deleteRequest(removeBtns[i].value);
        })
    }
}

function deleteRequest(id){
    console.log(id);
    xhr.open("DELETE", "db/delete/"+id, true)
    xhr.onload = () =>{
        if(xhr.readyState === 4){
            if(xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.error(xhr.statusText);
            }
        }
    }
    xhr.send();
}


function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


