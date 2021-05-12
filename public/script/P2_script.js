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

setInterval(nextslide, 3000);