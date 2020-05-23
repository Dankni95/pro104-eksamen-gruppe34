function toggleSidebar(){
    document.getElementById("left_container").classList.toggle('active');
    document.getElementById("main_container").classList.toggle('active');
    document.getElementById("miniContainer").classList.toggle('active');
    document.getElementById("miniAdd").classList.toggle('active');;
}

function expandTask(){
    document.getElementById("taskTab").classList.toggle('active');
    document.getElementById("miniChart1").classList.toggle('active'); 
    document.getElementById("dropPerson1").classList.toggle('active');
    document.getElementById("addtask").classList.toggle('active');
    document.getElementById("addTasks").classList.toggle('active');
    
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
ev.preventDefault();
var data = ev.dataTransfer.getData("text");
ev.target.appendChild(document.getElementById(data));
}
