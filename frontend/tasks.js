window.onload = function(){
    // Iterator limiter for show more
    var j = 8;

    //"show more" button
    var morebutton = document.getElementById("more");
    var afirstsort = document.getElementById("afirst");
    var zfirstsort = document.getElementById("zfirst");
    var datesort = document.getElementById("date");
    var thinksort = document.getElementById("think");
    var physicalsort = document.getElementById("physical");
    var socialsort = document.getElementById("social");

    // tasks will be received from the database
    var tasks = [{name:"Kassa", description:"Hoida kassaa", image:"https://upload.wikimedia.org/wikipedia/commons/3/39/Fat_cat.jpg"},
                 {name:"Varasto", description:"Hoida varastoa", image:"https://upload.wikimedia.org/wikipedia/commons/9/9a/HK_TST_HK_Museum_of_Art_-_Fat_horse.JPG"},
                 {name:"Homma", description:"Hoida homma", image:"https://upload.wikimedia.org/wikipedia/commons/f/f2/Seal_of_Approval_of_more_Seals_%2837503982020%29.jpg"},
                 {name:"Pieni juttu", description:"Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", image:"https://upload.wikimedia.org/wikipedia/commons/a/a8/Birdleft.gif"},
                 {name:"Testi", description:"Testataan", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Altar_of_Santi_Bonifacio_e_Alessio_%28Rome%29.jpg/800px-Altar_of_Santi_Bonifacio_e_Alessio_%28Rome%29.jpg"},
                 {name:"Kauppa", description:"Kaupan hoito", image:"https://upload.wikimedia.org/wikipedia/commons/6/6b/Vrchotovy_Janovice_-_castle_-_main_gate.jpg"},
                 {name:"Järjestely", description:"Järjestelyä", image:"https://upload.wikimedia.org/wikipedia/commons/8/80/Vertical_granite_cliff_at_sunset.jpg"},
                 {name:"Kuvatesti", description:"Jos kuva puuttuu tai on hajalla", image:"http://ei.toimi.kuva"},
                 {name:"Lisähomma", description:"Lisää hommia", image:"https://upload.wikimedia.org/wikipedia/commons/b/b4/Praha_Spanish_Synagogue_Dome_01.jpg"}];

    afirstsort.onclick = afirstsortFunction
    
    function afirstsortFunction() {
        tasks.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        }); 
        // clear tasks
        while (tasklist.firstChild) {
            tasklist.removeChild(tasklist.firstChild);
        }
        // call function for each task
        tasks.forEach(addTask);
        j = 8;
        showTasks();
    }

    zfirstsort.onclick = function() {
        tasks.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x > y) {return -1;}
            if (x < y) {return 1;}
            return 0;
        }); 
        // clear tasks
        while (tasklist.firstChild) {
            tasklist.removeChild(tasklist.firstChild);
        }
        // call function for each task
        tasks.forEach(addTask);
        j = 8;
        showTasks();
    }
    
    // clear tasks
    /* while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }*/
    // call function for each task
    tasks.forEach(addTask);
    // create new task element
    function addTask(item, index) {
        // get DOM end to append
        var tasklist = document.getElementById("tasklist");

        // create necessary elements
        var task = document.createElement("div");
        var imagecontainer = document.createElement("div");
        var header = document.createElement("h3");
        var description  = document.createElement("p");
        var image = document.createElement("img");

        //task
        task.classList.add("task");

        //image container
        imagecontainer.classList.add("imagecontainer");

        // image
        image.src = item.image;
        image.alt = item.image;
        image.style="width:100%;height:100%";

        // task name
        header.innerHTML = item.name;

        // task description
        description.innerHTML = item.description;
        description.classList.add("collapsible");

        // "expand" function
        task.onclick = function() {
            if (description.style.display === "block") {
                task.style.flex = "0 0 400px";
                task.style.height = "400px";
                description.style.display = "none";
            } else {
                task.style.flex = "0 0 800px";
                task.style.height = "800px";
                description.style.display = "block";
                task.scrollIntoView();
            }
        };

        // append element parts
        imagecontainer.appendChild(image);
        task.appendChild(imagecontainer);
        task.appendChild(header);
        task.appendChild(description);

        // add to DOM
        tasklist.appendChild(task);
    }

    morebutton.onclick = showTasks;

    function showTasks() {
        for(i = 0; i<j;i++) {  
            if(typeof tasklist.childNodes[i] !== "undefined") {
                tasklist.childNodes[i].style.display = "block";
            }
        }
        j = j+8;
    }

    afirstsortFunction();
};