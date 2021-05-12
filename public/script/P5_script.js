var win = document.querySelector(".pop");

var login = document.querySelector(".login");
var signup = document.querySelector(".signup");

var loginform = document.querySelector(".loginform");
var signupform = document.querySelector(".signupform");

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