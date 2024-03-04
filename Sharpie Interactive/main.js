let sharpieGamer = document.getElementById("sharpie-gamer");
let sharpiePost = document.getElementById("sharpie-wild-scratch-post");

let about = document.getElementById("nav-about");
let projects = document.getElementById("nav-projects");
let contact = document.getElementById("nav-contact");

function enlargeImage() {
  sharpieGamer.style.transform = "scale(1.25) translatey(-25%)";
  sharpieGamer.style.transition = "transform 0.50s ease";
}

function resetImage() {
  sharpieGamer.style.transform = "scale(1)";
  sharpieGamer.style.transition = "transform 0.25s ease";
}

const navAlert = () => {
  let alertArray = [
    "Gotta still build this page, ya jabroni",
    "Page not ready, dude",
    "I'm gonna get to building that, promise",
    "Someday this will lead somewhere.... maybe",
    "It's not a real website yet, dingus",
  ];
  alert(alertArray[Math.floor(Math.random() * 5)]);
  console.log("it worked");
  console.log(Math.floor(Math.random() * 5));
};

sharpieGamer.addEventListener("mouseover", enlargeImage);
sharpieGamer.addEventListener("mouseout", resetImage);

// about.addEventListener("click", navAlert);
projects.addEventListener("click", navAlert);
contact.addEventListener("click", navAlert);
