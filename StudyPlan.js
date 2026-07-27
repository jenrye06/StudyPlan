const menuCloseButton = document.getElementById("menu-hide");
const sidebar = document.getElementById("side-bar");
const monthLeftButton = document.getElementById("nav-left");
const monthRightButton = document.getElementById("nav-right");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthPlace = document.getElementById("monthPlace");
const yearPlace = document.getElementById("yearPlace");
const now = new Date();
let monthNum = now.getMonth();
let yearNum = now.getFullYear();
monthPlace.textContent = months[monthNum];
yearPlace.textContent = yearNum;


menuCloseButton.addEventListener("click",()=> {
    sidebar.classList.toggle("hidden");
});

monthRightButton.addEventListener("click",()=>{
    if(monthNum < 11){
        monthNum += 1;
    }else{
        monthNum = 0;
        yearNum +=1;
        yearPlace.textContent = yearNum;
    }
    monthPlace.textContent = months[monthNum];
});
monthLeftButton.addEventListener("click", ()=>{
    if(monthNum > 0){
        monthNum -= 1;
    }else{
        monthNum = 11;
        yearNum -= 1;
        yearPlace.textContent = yearNum;
    }
    monthPlace.textContent = months[monthNum];
} )
