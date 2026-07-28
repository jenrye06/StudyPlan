const menuCloseButton = document.getElementById("menu-hide");
const sidebar = document.getElementById("side-bar");
const monthLeftButton = document.getElementById("nav-left");
const calendarContainer = document.getElementById("calendar-container");
const monthRightButton = document.getElementById("nav-right");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthPlace = document.getElementById("monthPlace");
const yearPlace = document.getElementById("yearPlace");
const now = new Date();
const daysContainer = document.getElementById("days");
let monthNum = now.getMonth();
let yearNum = now.getFullYear();
monthPlace.textContent = months[monthNum] + " " + yearNum;

function renderCalendar(){
    daysContainer.innerHTML = "";
    const firstDay = new Date(yearNum, monthNum, 1);
    const lastDay = new Date(yearNum, monthNum + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    for(let i = 0; i < startingDay; i++){
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("emptyDay");
        daysContainer.appendChild(emptyDay);
    }

    for(let day = 1; day <= daysInMonth; day++){
        const dayBox = document.createElement("div");
        dayBox.classList.add("day");
        dayBox.textContent = day;
        daysContainer.appendChild(dayBox);
        if(day === now.getDate() && monthNum === now.getMonth() && yearNum === now.getFullYear()){
            dayBox.classList.add("today");
        }
    }
}


menuCloseButton.addEventListener("click",()=> {
    sidebar.classList.toggle("hidden");
    calendarContainer.classList.toggle("bigger");
});

monthRightButton.addEventListener("click",()=>{
    if(monthNum < 11){
        monthNum += 1;
    }else{
        monthNum = 0;
        yearNum +=1;
        yearPlace.textContent = yearNum;
    }
    monthPlace.textContent = months[monthNum] + " " + yearNum;
    renderCalendar();
});
monthLeftButton.addEventListener("click", ()=>{
    if(monthNum > 0){
        monthNum -= 1;
    }else{
        monthNum = 11;
        yearNum -= 1;
        yearPlace.textContent = yearNum;
    }
    monthPlace.textContent = months[monthNum] + " " + yearNum;
    renderCalendar();
} )
renderCalendar();