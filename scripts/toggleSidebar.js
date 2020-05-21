function toggleSidebar(){
    document.getElementById("left_container").classList.toggle('active');
    document.getElementById("main_container").classList.toggle('active');
    document.getElementById("miniContainer").classList.toggle('active');
    document.getElementById("miniAdd").classList.toggle('active');

}

function expandTask(){
    document.getElementById("taskTab").classList.toggle('active');
    document.getElementById("miniChart1").classList.toggle('active');
    
   
}
