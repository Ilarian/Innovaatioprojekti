window.onload = function(){
    // Const so the amount shown can be changed easily
    const shown = 12;
    // Iterator limiter for show more
    var j = shown;

    var xhr = new XMLHttpRequest();

    // Get the modal
    var modal = document.getElementById("modal");
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
    var suggestConfirmation = this.document.getElementById("suggestion_confirmation");

    //"Suggest" button
    var suggestbutton = document.getElementById("suggest");

    //"show more" button
    var morebutton = document.getElementById("more");

    // Sort buttons
    // TODO: Make buttons reverse on another click?
    var afirstsort = document.getElementById("afirst");
    var zfirstsort = document.getElementById("zfirst");
    var datelsort = document.getElementById("dateLatest");
    var dateesort = document.getElementById("dateEarliest");
    var thinksort = document.getElementById("think");
    var physicalsort = document.getElementById("physical");
    var socialsort = document.getElementById("social");

    //Empty array to initialization
    var tasks = [];

    function getTask() {
        xhr.open("GET", "db/task", true)
        xhr.onload = () =>{
            if(xhr.readyState === 4){
                if(xhr.status === 200) {
                    console.log(xhr.responseText);
                    tasks = JSON.parse(xhr.response);
                    //Show first tasks
                    afirstsortFunction();
                } else {
                    console.error(xhr.statusText);
                }
            }
        }
        xhr.send();
    }

    getTask();

    afirstsort.onclick = afirstsortFunction
    
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
        tasks.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        }); 
        recreateTaskList();
    }

    zfirstsort.onclick = function() {
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
    }

    datelsort.onclick = function() {
        // sorting
        tasks.sort(function(a, b){
            //https://stackoverflow.com/questions/10123953/how-to-sort-an-array-by-a-date-property
            return new Date(b.date) - new Date(a.date);
        });
        // recreate
        recreateTaskList();
    }

    dateesort.onclick = function() {
        // sorting
        tasks.sort(function(a, b){
            //https://stackoverflow.com/questions/10123953/how-to-sort-an-array-by-a-date-property
            return new Date(a.date) - new Date(b.date);
        });
        // recreate
        recreateTaskList();
    }

    thinksort.onclick = function() {
        // sorting
        tasks.sort(function(a, b){
            return b.ajattelu_value-a.ajattelu_value;
        });
        // recreate
        recreateTaskList();
    }

    physicalsort.onclick = function() {
        // sorting
        tasks.sort(function(a, b){
            return b.fysiikka_value-a.fysiikka_value;
        });
        // recreate
        recreateTaskList();
    }

    socialsort.onclick = function() {
        // sorting
        tasks.sort(function(a, b){
            return b.sosiaalisuus_value-a.sosiaalisuus_value;
        });
        // recreate
        recreateTaskList();
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

        //image container
        imagecontainer.classList.add("imagecontainer");

        // image
        image.src = item.url;
        image.alt = item.url;
        image.style="width:100%;height:100%";

        // task name
        header.innerHTML = item.name;

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
            dateText.innerHTML = item.date;
            phoneText.innerHTML = item.phone;
            emailText.innerHTML = item.email;
            linkText.innerHTML = item.link;
            linkText.href = item.link;
            locationText.innerHTML = item.location;

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
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
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