window.onload = function(){
    // Iterator limiter for show more
    const shown = 12;
    var j = shown;

    // Get the modal
    var modal = document.getElementById("modal");
    var modalHeader = document.getElementById("modal-header");
    var modalImg = document.getElementById("modal-image");
    var modalVideo = document.getElementById("modal-video");
    var descriptionText = document.getElementById("modal-description-value");
    var dateText = document.getElementById("modal-date-value");
    var phoneText = document.getElementById("modal-phone-value");
    var emailText = document.getElementById("modal-email-value");
    var linkText = document.getElementById("modal-link-value");
    var locationText = document.getElementById("modal-location-value");

    //"show more" button
    var morebutton = document.getElementById("more");

    // tasks will be received from the database
    var tasks = [{name:"Kassa", description:"Hoida kassaa", date:new Date('December 17, 2019 03:24:00'), think:3, physical:1, social:5, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/3/39/Fat_cat.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Varasto", description:"Hoida varastoa", date:new Date('December 17, 2019 03:24:00'), think:2, physical:5, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/9/9a/HK_TST_HK_Museum_of_Art_-_Fat_horse.JPG", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Homma", description:"Hoida homma", date:new Date('December 17, 2019 03:24:00'), think:1, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/f/f2/Seal_of_Approval_of_more_Seals_%2837503982020%29.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Pieni juttu", description:"Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", date:new Date('December 17, 1995 03:24:00'), think:3, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/a/a8/Birdleft.gif", location:"Annalan huvila", video:"https://www.youtube.com/embed/R_FQU4KzN7A"},
                 {name:"Testi", description:"Testataan", date:new Date('December 17, 1995 03:24:00'), think:1, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Altar_of_Santi_Bonifacio_e_Alessio_%28Rome%29.jpg/800px-Altar_of_Santi_Bonifacio_e_Alessio_%28Rome%29.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Kauppa", description:"Kaupan hoito", date:new Date('December 17, 1995 03:24:00'), think:3, physical:1, social:5, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/6/6b/Vrchotovy_Janovice_-_castle_-_main_gate.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Järjestely", description:"Järjestelyä", date:new Date('December 17, 1995 03:24:00'), think:5, physical:3, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/8/80/Vertical_granite_cliff_at_sunset.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Kuvatesti", description:"Jos kuva puuttuu tai on hajalla", date:new Date('December 17, 1995 03:24:00'), think:3, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"http://ei.toimi.kuva", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Lisähomma 1", description:"Lisää hommia", date:new Date('December 17, 1995 03:24:00'), think:1, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/b/b4/Praha_Spanish_Synagogue_Dome_01.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Lisähomma 2", description:"Lisää hommia", date:new Date('December 17, 1995 03:24:00'), think:1, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/f/fd/A_beautiful_sunrise_is_pictured.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Lisähomma 3", description:"Lisää hommia", date:new Date('December 17, 1995 03:24:00'), think:1, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/8/87/Acitrezza_Cyclops_Faraglioni_Sicily_Italy_-_Creative_Commons_by_gnuckx_-_panoramio_%2883%29.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Lisähomma 4", description:"Lisää hommia", date:new Date('December 17, 1995 03:24:00'), think:1, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/0/0e/Acitrezza_Cyclops_Faraglioni_Sicily_Italy_-_Creative_Commons_by_gnuckx_-_panoramio_%28122%29.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Lisähomma 5", description:"Lisää hommia", date:new Date('December 17, 1995 03:24:00'), think:1, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/8/82/Acitrezza_Cyclops_Faraglioni_Sicily_Italy_-_Creative_Commons_by_gnuckx_-_panoramio_%2894%29.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Lisähomma 6", description:"Lisää hommia", date:new Date('December 17, 1995 03:24:00'), think:1, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/0/0b/Al._Jerozolimskie_%288892282041%29.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Lisähomma 7", description:"Lisää hommia", date:new Date('December 17, 1995 03:24:00'), think:1, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/3/3d/Basin-Olinda%2C_Dandenong_Ranges.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Lisähomma 8", description:"Lisää hommia", date:new Date('December 17, 1995 03:24:00'), think:1, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/5/53/Atlantic_nightfall_-_Flickr_-_Stiller_Beobachter.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Lisähomma 9", description:"Lisää hommia", date:new Date('December 17, 1995 03:24:00'), think:1, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/7/71/Au%C5%A1ta_prie_Neries.JPG", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Lisähommake", description:"Lisää hommia", date:new Date('December 17, 1995 03:24:00'), think:1, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/f/ff/Dawn_at_Mahia_Beach.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"},
                 {name:"Lisähommake", description:"Lisää hommia", date:new Date('December 17, 1995 03:24:00'), think:1, physical:1, social:1, contactphone:"+3580123456", contactemail:"test@email.com", link:"https://www.google.fi/", image:"https://upload.wikimedia.org/wikipedia/commons/f/f7/Dawn_in_Llanos%2C_Colombia.jpg", location:"Annalan huvila", video:"https://www.youtube.com/embed/FiARsQSlzDc"}];

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

    function resultsortFunction() {
        tasks.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        }); 
        recreateTaskList();
    }

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

        task.onclick = function() {
            //Modal
            modal.style.display = "block";
            modalHeader.innerHTML = header.innerHTML;
            modalImg.src = image.src;
            modalImg.alt = image.src;
            modalVideo.src = item.video;
            descriptionText.innerHTML = item.description;
            dateText.innerHTML = item.date;
            phoneText.innerHTML = item.contactphone;
            emailText.innerHTML = item.contactemail;
            linkText.innerHTML = item.link;
            linkText.href = item.link;
            locationText.innerHTML = item.location;

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
    showSlides(slideIndex);

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

    //Show results
    resultsortFunction();
};