const menuCloseButton = document.getElementById("menu-hide");
const sidebar = document.getElementById("side-bar");
const monthLeftButton = document.getElementById("nav-left");
const calendarContainer = document.getElementById("calendar-container");
const monthRightButton = document.getElementById("nav-right");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthPlace = document.getElementById("monthPlace");
const yearPlace = document.getElementById("yearPlace");
const taskButton = document.getElementById("taskButton");
const AssignmentAddArea = document.getElementById("AssignmentAddArea");
const popupMenu = document.getElementById("popup-menu");
const x = document.getElementById("x");
const now = new Date();
const daysContainer = document.getElementById("days");
let monthNum = now.getMonth();
let yearNum = now.getFullYear();
let selectedDate = null
monthPlace.textContent = months[monthNum] + " " + yearNum;
const assignments = [];

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
        if(selectedDate && day === selectedDate.getDate() && monthNum === selectedDate.getMonth() && yearNum === selectedDate.getFullYear()){
            dayBox.classList.add("selected");
        }
        dayBox.addEventListener("click",()=>{
            selectedDate = new Date(yearNum, monthNum, day);
            renderCalendar();
            renderTaskList();
        });

    }
}

menuCloseButton.addEventListener("click",()=> {
    sidebar.classList.toggle("hidden");
    calendarContainer.classList.toggle("bigger");
});

taskButton.addEventListener("click",()=>{
    popupMenu.classList.add("show");
})

x.addEventListener("click",()=>{
    popupMenu.classList.remove("show");
})

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

function addTask(taskText = null, save = true){
    const task = document.getElementById("AssignmentInput").value.trim();
    const ExpectedTime = Number(document.getElementById("ExpectedTime").value);
    const HoursPerDay = Number(document.getElementById("HoursPerDay").value);
    const DueMonth = Number(document.getElementById("DueMonth").value)-1;
    const DueDay = Number(document.getElementById("DueDay").value);
    const DueYear = Number(document.getElementById("DueYear").value);
    const dueDate = new Date(DueYear, DueMonth, DueDay);
    if (!selectedDate) {
        alert("Please select a start date on the calendar first.");
        return;
    }
    if (!task){
        alert("Please enter an assignment name.");
        return;
    }
    if (ExpectedTime <= 0 || HoursPerDay <= 0 || !ExpectedTime || !HoursPerDay){
        alert("Please enter a valid hour count.");
        return;
    }
    if (dueDate <= selectedDate){
        alert("Please enter a valid due date!");
        return;
    }
    const assignment = {
        id: crypto.randomUUID(),
        title: task,
        estimatedHours: ExpectedTime,
        hoursPerDay: HoursPerDay,
        startDate: new Date(selectedDate),
        dueDate: dueDate,
        completed: false
    };
    assignments.push(assignment);
    renderTaskList();
};

function renderTaskList(){
    if(!selectedDate){
        return;
    }
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    for (const assignment of assignments) {
    if (selectedDate <= assignment.dueDate && selectedDate >= assignment.startDate){
        const item = document.createElement("div");
        const circle = document.createElement("div");
        circle.classList.add("assignment-status");
        if (assignment.completed === false){
            circle.style.backgroundColor = "red";
        }
        else{
            circle.style.backgroundColor = "green";
        }
        item.classList.add("assignment-card");
        item.innerHTML = `
        <strong> ${assignment.title}:</strong>
        Expected Time: ${assignment.estimatedHours} hours
        Target: ${assignment.hoursPerDay} hr/day
        Due Date: ${assignment.dueDate.getMonth() + 1}/${assignment.dueDate.getDate()}/${assignment.dueDate.getFullYear()}`;
        item.style.display = "flex";
        item.style.flexDirection = "column";
        item.appendChild(circle);
        list.appendChild(item);
    }
    }
}

const addTaskButton = document.getElementById("addTask");

addTaskButton.addEventListener("click", () => {
    addTask();
    popupMenu.classList.remove("show");
});

function generateSchedule(assignment){
    let timePerDay = assignment.estimatedHours
    if (assignment.dueDate.getDate()){

    }
}

renderCalendar();
