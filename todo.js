let input = document.querySelector(".input");
let sumbit= document.querySelector(".add");
let taskDiv= document.querySelector(".tasks");

let arrayOfTasks = []

if(window.localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
    counter()
}
getLocalData()
sumbit.onclick = function(){
    if(input.value !== ""){
        addTAskArry(input.value);
    }
    input.value = "";
    counter()
}
taskDiv.addEventListener("click",(e)=>{
    if(e.target.classList.contains("del-all")){
        window.localStorage.removeItem("tasks");
        taskDiv.innerHTML="";
        arrayOfTasks =[]
        counter()
        com()
    }
    if(e.target.classList.contains("del")){
        delAlleTaskWidth(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
        if (document.querySelectorAll(".task").length == 1) {
            document.querySelector(".del-all").remove();
         }
         counter()
         com()
    }
    if(e.target.classList.contains("task")){
        e.target.classList.toggle("done");
        toggleCompleted(e.target.getAttribute("data-id"));
    }
})
function addTAskArry(inputText){
    const task = {
        id: Date.now(),
        title: inputText,
        completed: false,
    }
    arrayOfTasks.push(task);
    addElementToPageFrom(arrayOfTasks)
    addToLocalStorageFrom(arrayOfTasks)
}

function addElementToPageFrom(arrayOfTasks){
    taskDiv.innerHTML = "";
    arrayOfTasks.forEach(task => {
        let div = document.createElement("div");
        div.className = "task";
        if(task.completed){
            div.className = "task done"
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("حذف"));
        div.appendChild(span)
        taskDiv.appendChild(div)
    });
    if(document.querySelectorAll(".task").length >= 2){
        delAll()
    }
    
}

function addToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}
function getLocalData(){
    data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementToPageFrom(tasks)
    }
}
function delAlleTaskWidth(taskId){
    arrayOfTasks = arrayOfTasks.filter((task)=> task.id != taskId)
    addToLocalStorageFrom(arrayOfTasks)
}
function toggleCompleted(taskId){
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if(arrayOfTasks[i].id == taskId){
        arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true ):(arrayOfTasks[i].completed = false);
        }
    }
    addToLocalStorageFrom(arrayOfTasks);
    com()
}
function delAll(){
    let delAll = document.createElement("span");
    delAll.className = "del-all";
    delAll.appendChild(document.createTextNode("حذف الكل"));
    taskDiv.appendChild(delAll);
    
 }

function counter(){
    if (document.querySelectorAll(".task").length >= 1) {
    document.querySelector(".tsk-counter span").innerHTML = arrayOfTasks.length;
    }else{
    document.querySelector(".tsk-counter span").innerHTML = "0";
    }
}
function com(){
    document.querySelector(".complet-tsk span").innerHTML = document.querySelectorAll(".done").length;
    if(document.querySelectorAll(".done").length === 0){
        document.querySelector(".complet-tsk span").innerHTML = "0"
    }

}

























