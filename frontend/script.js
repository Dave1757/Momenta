// Navbar Hide On Scroll Start
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.querySelector(".navbar").style.top = "0";
    } else {
        document.querySelector(".navbar").style.top = "-65px";
        document.querySelector(".dropdown-menu").click();
    }
    prevScrollpos = currentScrollPos;
}
// Navbar Hide On Scroll End

// User Accounts Button Start
const accountbutton = document.querySelector(".login-signup")
accountbutton.onclick = function () {
    window.location.href = "/login"
}
// User Accounts Button End

// Event Name Send On Button Click Start
let data;
function getId(clicked) {
    var idData = "";
    idData += "e" + clicked;
    var selectedEvent = document.getElementById("e" + clicked).innerHTML;
    window.location.href = "registration.html?event=" + selectedEvent;
}
// Event Name Send On Button Click End

// Registration Page Event Name Catch Start
// Get The Event Parameter From The URL
var urlParams = new URLSearchParams(window.location.search);
var selectedEvent = urlParams.get('event');
// Populate The Dropdown With The Selected Event
document.getElementById("inputEvent").innerHTML = "<option value='" + selectedEvent + "'>" + selectedEvent + "</option>";
// Select The Option By Default
document.getElementById("inputEvent").value = selectedEvent;
// Registration Page Event Name Catch End

// Scroll To View Section Start
function scrollToSection(sectionId) {
    let section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
// Scroll To View Section End