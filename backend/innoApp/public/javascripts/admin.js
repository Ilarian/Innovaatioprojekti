var xhr = new XMLHttpRequest();
//Make a get call to /db route
//TODO vaihda kutsun url
xhr.open("GET", "/db/test", true);
//Handles response
xhr.onload = function (e) {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            var tehtävälista = document.getElementById('tehtävälista');
            var responseText = JSON.parse(xhr.responseText);

            //Looppaa tietokannasta saadut rivit
            for(var i = 0; i < responseText.length; i++) {

                var ul = document.createElement("ul");
                var values = Object.values(responseText[i]);

                //Looppaa rivin arvot, jättäen id arvon pois ja lisää tiedot listaan
                for(var j = 1; j < values.length; j++){
                    var li = document.createElement("li");
                    //listText(j) lisää kuvauksen datan eteen
                    li.appendChild(document.createTextNode(listText(j) + values[j]));
                    ul.appendChild(li);
                }

                //Luodaan taskin loppuun poista-painike.
                let removeBtn = document.createElement("button");
                removeBtn.setAttribute("class", "remove");
                removeBtn.setAttribute("value", ""+ values[0]);
                removeBtn.innerHTML = "Poista";

                //Luodaan taskin loppuun muokkaa-painike.
                let modifyBtn = document.createElement("button");
                modifyBtn.setAttribute("class", "modify");
                modifyBtn.setAttribute("value", ""+values[0]);
                modifyBtn.innerHTML = "Muokkaa";

                ul.appendChild(removeBtn);
                ul.appendChild(modifyBtn);

                tehtävälista.appendChild(ul);
            }
            setClickListenerRemove();
            setClickListenerModify();


        } else {
            console.error(xhr.statusText);
        }
    }
};
xhr.onerror = function (e) {
    console.error(xhr.statusText);
};
xhr.send(null);


function listText(listNum){
    let text;

    switch(listNum){
        case 1:
            text = "Tehtävän nimi: ";
            break;
        case 2:
            text = "Tehtävän kuvaus: ";
            break;

        case 3:
            text = "Ajattelu: ";
            break;

        case 4:
            text = "Fyysisyys: ";
            break;

        case 5:
            text = "Sosiaalisuus: ";
            break;

        case 6:
            text = "Paikka: ";
            break;

        case 7:
            text = "Sähköposti: ";
            break;

        case 8:
            text = "Puh. nro: ";
            break;

        case 9:
            text = "Linkki: ";
            break;

        case 10:
            text = "Pvm: ";
            break;
    }

    return text;
}





function setClickListenerRemove() {
    let removeBtns = document.getElementsByClassName("remove");
    for(let i = 0; i < removeBtns.length; i++){
        removeBtns[i].addEventListener("click", () => {
            deleteRequest(removeBtns[i].value);
        })
    }
}

function setClickListenerModify() {
    let modifyBtns = document.getElementsByClassName("modify");
    for(let i = 0; i < modifyBtns.length; i++){
        modifyBtns[i].addEventListener("click", () => {
            modifyRequest(modifyBtns[i].value);
        })
    }
}

function modifyRequest(id){
    xhr.open("GET", "/db/getTask/"+id, true)
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200){
            let dbTasks = JSON.parse(xhr.responseText);
            document.getElementById("mId").defaultValue = dbTasks[0].task_id;
            document.getElementById("mNimi").defaultValue = dbTasks[0].name;
            document.getElementById("mKuvaus").defaultValue = dbTasks[0].description;
            document.getElementById("mFyysisyys").defaultValue = dbTasks[0].fysiikka_value;
            document.getElementById("mSosiaalisuus").defaultValue = dbTasks[0].sosiaalisuus_value;
            document.getElementById("mAjattelu").defaultValue = dbTasks[0].ajattelu_value;
            document.getElementById("mPaikka").defaultValue = dbTasks[0].location;
            document.getElementById("mSähköposti").defaultValue = dbTasks[0].email;
            document.getElementById("mPuhelin").defaultValue = dbTasks[0].phone;
            //TODO korjaa pvm formaatti
            document.getElementById("mPvm").defaultValue = dbTasks[0].date;
            document.getElementById("mLinkki").defaultValue = dbTasks[0].link;


        }else {
            console.error(xhr.statusText);
        }
    }
    xhr.send();
    modifyModal.style.display = "block"
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

    //päivittää sivun
    window.location.href = "/admin.html"
}

function addRequest() {
    modal.style.display = "block";
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



// Get the modal
let modal = document.getElementById("myModal")
let modifyModal = document.getElementById("modifyModal");


// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

span2.onclick = function() {
    modifyModal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modifyModal) {
        modifyModal.style.display = "none";
    }
}




//Avaa defaultina tehtävät
document.getElementById("defaultOpen").click();