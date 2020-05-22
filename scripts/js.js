var getmain = document.getElementById("maincontainer");
var getPlussButtonAddProject = document.getElementsByClassName("createBox");    
getPlussButtonAddProject.onclick = function(){
        addItem("project", "Skoleprosjekt", "#FF6347");
    } 
    
    //type =project, category, tast or person
function setLocalStorage(type, object) {
    window.localStorage.setItem(type, JSON.stringify(object));
}

function getLocalStorage(type) {
    return JSON.parse(window.localStorage.getItem(type)) || [];
}

function addItem(typeToAdd, text, color){
    if (typeToAdd==="project"){
        setLocalStorage("project", {texToToShow: `${text}`, backgroundcolor: `${color}`});
        buildItems2();
    }
    if (typeToAdd==="category"){
        setLocalStorage("category", {texToToShow: `${text}`, backgroundcolor: `${color}`});   
    }
    if (typeToAdd==="task"){
        setLocalStorage("task", {texToToShow: `${text}`, backgroundcolor: `${color}`});
    }
    if (typeToAdd==="person"){
        setLocalStorage("person", {texToToShow: `${text}`, backgroundcolor: `${color}`});

    }
}
        
function buildItems() {
    let getArrayLocalStorage = getLocalStorage("project");
    let backgroundColor = getArrayLocalStorage.backgroundcolor;
    let text = getArrayLocalStorage.texToToShow;
    let counter = 0;
    getmain.innerHTML += `<div class=" card" style="--background:${backgroundColor}; --text:white;">
      <div class="multi-button">
        <button class="fa fa-comment"></button>
        <button class="fa fa-cog"></button>
        <button class="fa fa-trash"></button>
      </div>
      <div class="container"><a href="#" onclick="newPage('test_page')">${++counter}</a></div>
    </div>`;
}
