window.onload = function(){
    // Const so the amount shown can be changed easily
    const shown = 12;
    // Iterator limiter for show more
    var j = shown;

    var xhr = new XMLHttpRequest();

    // Get the modal
    var modal = document.getElementById("modal");
    var modalContent = document.getElementById("modal-content");
    var modalHeader = document.getElementById("modal-header");
    var modalImageContainer = document.getElementById("modal-image-container");
    var descriptionText = document.getElementById("modal-description-value");
    var dateText = document.getElementById("modal-date-value");
    var phoneText = document.getElementById("modal-phone-value");
    var emailText = document.getElementById("modal-email-value");
    var linkText = document.getElementById("modal-link-value");
    var locationText = document.getElementById("modal-location-value");

    //Suggest fields
    var suggestName = document.getElementById("taskname");
    var suggestDesc = document.getElementById("desc");
    var suggestConfirmation = document.getElementById("suggestion_confirmation");

    //"Suggest" button
    var suggestbutton = document.getElementById("suggest");

    //"show more" button
    var morebutton = document.getElementById("more");

    // "filter" button
    var filterButton = document.getElementById("filter");

    // Sort dropdown menu
    var sortDropdown = document.getElementById("sortDropdown");

    // Filter elements
    var locationFilter = document.getElementById("locationFilter");
    var filterButton = document.getElementById("filter");

    var colorArray = ["#b5ecff"];

    function recreateTaskList() {
        // clear tasks
        while (tasklist.firstChild) {
            tasklist.removeChild(tasklist.firstChild);
        }
        // call function for each task
        tasks.forEach(addTask);
        j = shown;
        showTasks();
    }

    function afirstsortFunction() {
        // sorting
        tasks.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (y > x) {return -1;}
            if (y < x) {return 1;}
            return 0;
        });
        // recreate
        recreateTaskList();
    }

    //Empty array to initialization
    var locations = [];

    function getLocations() {
        xhr.open("GET", "db/location", true)
        xhr.onload = () =>{
            if(xhr.readyState === 4){
                if(xhr.status === 200) {
                    console.log(xhr.responseText);
                    locations = JSON.parse(xhr.response);
                    locations.forEach(addLocation);
                    //Call getTask here since xhr seems to only work for one db call at a time
                    getTask();
                } else {
                    console.error(xhr.statusText);
                }
            }
        }
        xhr.send();
    }

    getLocations();

    function addLocation(item, index) {
        var locationOption = document.createElement("option");
        locationOption.value = item.location_name;
        locationOption.innerHTML = item.location_name;

        locationFilter.appendChild(locationOption);
    };

    //Filter tasks
    filterButton.onclick = function() {
        /*var filters = [];
        var filteredTasks = [];
        var options = locationMultiselect && locationMultiselect.options;
        var opt;
        
        //Check filters
        for (var i=0; i<options.length; i++) {
            opt = options[i];
        
            if (opt.selected) {
                filters.push(opt.value || opt.text);
            }
        }

        if (filters.length!==0) {
            for (var i=0; i<dbTasks.length; i++) {
                task = dbTasks[i];
                if (filters.includes(task.location_name)) {
                    filteredTasks.push(task);
                }
            }
        } else {
            filteredTasks = dbTasks;
        }

        tasks = filteredTasks;*/
        var chosenLocation = locationFilter.value;
        if (chosenLocation==="kaikki") {
            tasks = dbTasks;
        } else {
            var filteredTasks = [];
            for (var i=0; i<dbTasks.length; i++) {
                task = dbTasks[i];
                if (task.location_name===chosenLocation) {
                    filteredTasks.push(task);
                }
            }
            tasks = filteredTasks;
        }
        recreateTaskList();
    }

    //Store tasks from db in a local variable
    var dbTasks = [];
    //Local tasks variable so filtering can be done easily while keeping the db tasks separate
    var tasks = []

    function getTask() {
        xhr.open("GET", "db/task", true)
        xhr.onload = () =>{
            if(xhr.readyState === 4){
                if(xhr.status === 200) {
                    console.log(xhr.responseText);
                    dbTasks = JSON.parse(xhr.response);
                    tasks = dbTasks;
                    //Show first tasks
                    afirstsortFunction();
                } else {
                    console.error(xhr.statusText);
                }
            }
        }
        xhr.send();
    }

    sortDropdown.onchange = function() {
        switch (sortDropdown.value) {
            case "afirst":
                afirstsortFunction()
                break;
            case "zfirst":
                // sorting
                tasks.sort(function(a, b){
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    if (x > y) {return -1;}
                    if (x < y) {return 1;}
                    return 0;
                });
                // recreate
                recreateTaskList();
                break;
            case "dateLatest":
                // sorting
                tasks.sort(function(a, b){
                    //https://stackoverflow.com/questions/10123953/how-to-sort-an-array-by-a-date-property
                    return new Date(b.date) - new Date(a.date);
                });
                // recreate
                recreateTaskList();
                break;
            case "dateEarliest":
                // sorting
                tasks.sort(function(a, b){
                    //https://stackoverflow.com/questions/10123953/how-to-sort-an-array-by-a-date-property
                    return new Date(a.date) - new Date(b.date);
                });
                // recreate
                recreateTaskList();
                break;
            case "think":
                // sorting
                tasks.sort(function(a, b){
                    return b.ajattelu_value-a.ajattelu_value;
                });
                // recreate
                recreateTaskList();
                break;
            case "physical":
                // sorting
                tasks.sort(function(a, b){
                    return b.fysiikka_value-a.fysiikka_value;
                });
                // recreate
                recreateTaskList();
                break;
            case "social":
                // sorting
                tasks.sort(function(a, b){
                    return b.sosiaalisuus_value-a.sosiaalisuus_value;
                });
                // recreate
                recreateTaskList();
                break;
            default:
                console.error("Chosen value has no sort!");
        }
    }

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
        var colorIndex = colorArray[index%colorArray.length];
        task.style="background-color: "+colorIndex+";";

        //image container
        imagecontainer.classList.add("imagecontainer");

        // image
        image.src = item.url;
        image.alt = item.url;
        image.style="width:100%;height:100%";

        // task name
        header.innerHTML = item.name;
        header.classList.add("task-header");

        // task description
        description.innerHTML = item.description;
        description.classList.add("collapsible");

        task.onclick = function() {
            //Modal
            modal.style.display = "block";
            modalHeader.innerHTML = header.innerHTML;
            //Clear images and videos from modal
            while (modalImageContainer.firstChild) {
                modalImageContainer.removeChild(modalImageContainer.firstChild);
            }
            descriptionText.innerHTML = item.description;
            dateText.innerHTML = item.task_when;
            phoneText.innerHTML = item.phone;
            emailText.innerHTML = item.email;
            linkText.innerHTML = item.link;
            linkText.href = item.link;
            locationText.innerHTML = item.location_name;

            xhr.open("GET", "db/image/"+item.task_id, true)
            xhr.onload = () =>{
                if(xhr.readyState === 4){
                    if(xhr.status === 200) {
                        console.log(xhr.responseText);
                        images = JSON.parse(xhr.response);
                        // call function for each task
                        images.forEach(addImage);
                        xhr.open("GET", "db/video/"+item.task_id, true)
                        xhr.onload = () =>{
                            if(xhr.readyState === 4){
                                if(xhr.status === 200) {
                                    console.log(xhr.responseText);
                                    videos = JSON.parse(xhr.response);
                                    // call function for each task
                                    videos.forEach(addVideo);
                                    showSlides(slideIndex);
                                } else {
                                    console.error(xhr.statusText);
                                }
                            }
                        }
                        xhr.send();
                    } else {
                        console.error(xhr.statusText);
                    }
                }
            }
            xhr.send();

            function addImage(item, index) {
                var modalImage = document.createElement("img");
                modalImage.src = item.url;
                modalImage.alt = item.url;
                modalImage.classList.add("modal-image");
                modalImage.classList.add("slides");
                modalImageContainer.appendChild(modalImage);
            }

            function addVideo(item, index) {
                var modalVideo = document.createElement("iframe");
                modalVideo.src = "https://www.youtube.com/embed/"+item.url;
                modalVideo.frameborder="0";
                modalVideo.allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                modalVideo.allowFullscreen = true;
                modalVideo.classList.add("modal-video");
                modalVideo.classList.add("slides");
                modalImageContainer.appendChild(modalVideo);
            }

            //Alternate expand version
            /*if (description.style.display === "block") {
	            description.style.display = "none";
	            task.style.flex = "0 0 250px";
	            task.style.height = "200px";
	        } else {
	            description.style.display = "block";
	            task.style.flex = "0 0 500px";
                task.style.height = "400px";
			    //Can be used to bring element into view
			    //Note: Doesn't work very well though, is obnoxious and janky
			    //task.scrollIntoView();
			}*/
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
                morebutton.disabled = false;
            } else {
                //Hide it? Disable it?
                //morebutton.style.visibility = "hidden";
                //morebutton.style.display = "none";
                morebutton.disabled = true;
            }
        }
        j = j+shown;
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        // Empty modal as this closes videos playing when modal closes
        while (modalImageContainer.firstChild) {
            modalImageContainer.removeChild(modalImageContainer.firstChild);
        }
    } 
    
    // Make modal closable by clicking outside the content box
    // https://stackoverflow.com/questions/37573608/how-to-make-modal-close-on-click-outside
    modal.addEventListener('click', rootClick);
    modalContent.addEventListener('click', modalClick);

    function rootClick() {
        modal.style.display = "none";
        // Empty modal as this closes videos playing when modal closes
        while (modalImageContainer.firstChild) {
            modalImageContainer.removeChild(modalImageContainer.firstChild);
        }
    }
      
    function modalClick(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    }

    //Slideshow 
    var slideIndex = 1;
    var prev = document.getElementsByClassName("prev")[0];
    var next = document.getElementsByClassName("next")[0];
    prev.onclick = function() {
        plusSlides(-1);
    }

    next.onclick = function() {
        plusSlides(1);
    }

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("slides");
        //Check for empty arrays
        if (slides.length!==0) {
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndex-1].style.display = "block";
        }
    }

    function submitSuggestion() {
        // Check that fields are filled
        if (suggestName.value!==""&&suggestDesc.value!=="") {
            xhr.open("POST", "db/suggestion/"+suggestName.value+"&"+suggestDesc.value, true)
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
            //Clear suggestion form so it is harder to spam
            suggestName.value = "";
            suggestDesc.value = "";
            //Send notification to user so they get confirmation of their actions
            suggestConfirmation.innerHTML = "Ehdotus lähetetty!"
        } else {
            //Clear on empty
            suggestConfirmation.innerHTML = "";
        }
    }

    suggestbutton.onclick = submitSuggestion;
};