window.onload = function(){
    // tasks will be received from the database
    var buttona = document.getElementById("buttona");
    var buttonb = document.getElementById("buttonb");
    var tasks = [{name:"Kassa", description:"Hoida kassaa", image:"https://upload.wikimedia.org/wikipedia/commons/3/39/Fat_cat.jpg"},{name:"Varasto", description:"Hoida varastoa", image:"https://upload.wikimedia.org/wikipedia/commons/9/9a/HK_TST_HK_Museum_of_Art_-_Fat_horse.JPG"}];
    buttona.onclick = function() {
        // clear tasks
        while (tasklist.firstChild) {
            tasklist.removeChild(tasklist.firstChild);
        }
        // call function for each task
        tasks.forEach(addTask);
        // create new task element
        function addTask(item, index) {
            var tasklist = document.getElementById("tasklist");
            var task = document.createElement("div");
            var header = document.createElement("h3");
            var image = document.createElement("img");
            var description  = document.createElement("p");
            header.innerHTML = item.name;
            image.src = "https://upload.wikimedia.org/wikipedia/commons/3/39/Fat_cat.jpg";
            image.alt = "Pic of cat";
            image.style="width:400px;height:400px;";
            description.innerHTML = item.description;
            task.appendChild(header);
            task.appendChild(image);
            task.appendChild(description);
            tasklist.appendChild(task);
        }
    }

    buttonb.onclick = function() {
        // clear tasks
        while (tasklist.firstChild) {
            tasklist.removeChild(tasklist.firstChild);
        }
        // call function for each task
        tasks.forEach(addTask);
        // create new task element
        function addTask(item, index) {
            var tasklist = document.getElementById("tasklist");
            var task = document.createElement("div");
            var taskborder = document.createElement("div");
            taskborder.classList.add("task");
            var header = document.createElement("h3");
            var description  = document.createElement("p");
            var image = document.createElement("img");
            image.src = item.image;
            image.alt = item.image;
            image.style="width:400px;height:400px;";
            header.innerHTML = item.name;
            description.innerHTML = item.description;
            description.classList.add("collapsible");
            taskborder.onclick = function() {
                if (description.style.display === "block") {
                    description.style.display = "none";
                  } else {
                    description.style.display = "block";
                  }
            };
            task.appendChild(taskborder);
            taskborder.appendChild(image);
            taskborder.appendChild(header);
            taskborder.appendChild(description);
            tasklist.appendChild(task);
        }
    }
};