var win = document.querySelector(".pop");

var login = document.querySelector(".login");
var signup = document.querySelector(".signup");

var loginform = document.querySelector(".loginform");
var signupform = document.querySelector(".signupform");

var carousel1 = document.getElementsByName("slide1");
var carousel2 = document.getElementsByName("slide2");
var carousel3 = document.getElementsByName("slide3");

function prevslide(){
    if(carousel1[0].classList.contains("active")){
        carousel1[0].classList.remove("active");
        carousel3[0].classList.add("active");
    }
    else if(carousel2[0].classList.contains("active")){
        carousel2[0].classList.remove("active");
        carousel1[0].classList.add("active");
    }
    else if(carousel3[0].classList.contains("active")){
        carousel3[0].classList.remove("active");
        carousel2[0].classList.add("active");
    }
}

function nextslide(){
    if(carousel1[0].classList.contains("active")){
        carousel1[0].classList.remove("active");
        carousel2[0].classList.add("active");
    }
    else if(carousel2[0].classList.contains("active")){
        carousel2[0].classList.remove("active");
        carousel3[0].classList.add("active");
    }
    else if(carousel3[0].classList.contains("active")){
        carousel3[0].classList.remove("active");
        carousel1[0].classList.add("active");
    }
}

setInterval(nextslide, 5000);

function closewindow(){

    win.style.display = 'none';
    document.body.classList.remove("stop-scrol");

    if (loginform.style.display == "block") {
        loginform.style.display = "none";
    }
    else if (signupform.style.display == "block") {
        signupform.style.display = "none";
    }
}

function poplogin(){

    win.style.display = "block";
    loginform.style.display = "block";
    document.body.classList.add("stop-scrol");
}

function popsignup(){

    win.style.display = "block";
    signupform.style.display = "block";
    document.body.classList.add("stop-scrol");
}