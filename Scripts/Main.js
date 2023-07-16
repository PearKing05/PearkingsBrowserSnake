function gotoHome() {
  window.location.href = "index.html";
}

function gotoOptions() {
  window.location.href = "options.html";
}


//set the minimum width, and apply changes when page is too small
function checkWindowSize() {
  if (window.innerWidth >= 550) {
    document.getElementById("body").style.display = "block";
    document.getElementById("overlay").style.display = "none";
  } else {
    document.getElementById("body").style.display = "none";
    document.getElementById("overlay").style.display = "flex";
  }
}

//tell page to run 
window.addEventListener("resize", checkWindowSize);
window.addEventListener("load", checkWindowSize);


const pageURL = window.location.search;
const Options = new URLSearchParams(pageURL);

localStorage.setItem("speed", Options.get("speed"));
localStorage.setItem("framerate", Options.get("framerate"));
localStorage.setItem("size", Options.get("game-size"));