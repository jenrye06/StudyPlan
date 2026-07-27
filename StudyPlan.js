const menuCloseButton = document.getElementById("menu-hide");
const sidebar = document.getElementById("side-bar");
const monthLeftButton = document.getElementById("nav-left");
const monthRightButton = document.getElementById("nav-right");

menuCloseButton.addEventListener("click",()=> {
    sidebar.classList.toggle("hidden");
});
