var getmain = document.getElementById("maincontainer");
    var getPlussButtonAddProject = document.getElementById("addProject");
    
    //0=project, 1=categories, 2=task, 3=person
    getPlussButtonAddProject.onclick = function(){
        addItem("project", "Skoleprosjekt", "#FF6347");
    } 
    
    ////////////////////////////////////////////////////////////////////////////
    
    //type =project, category, tast or person
    function setLocalStorage(type, object) {
    window.localStorage.setItem(type, JSON.stringify(object));
}

function getLocalStorage(type) {
    return JSON.parse(window.localStorage.getItem(type)) || [];
}
    
    ////////////////////////////
    function addItem(typeToAdd, text, color, height, width){
        if(typeToAdd==="project"){
           setLocalStorage("project", {texToToShow: `${text}`, backgroundcolor: `${color}`});
            buildItems();
        }
        if(typeToAdd==="category"){
            setLocalStorage("category", {texToToShow: `${text}`, backgroundcolor: `${color}`});   
        }
        if(typeToAdd==="task"){
            setLocalStorage("task", {texToToShow: `${text}`, backgroundcolor: `${color}`});
        }
        if(typeToAdd==="person"){
            setLocalStorage("person", {texToToShow: `${text}`, backgroundcolor: `${color}`});

        }
    }
    //////////////////////////////////
    
        function buildItems(){
           // if(items=="project"){
                let getArrayLocalStorage = getLocalStorage(`project`);
                    let backgroundColor = getArrayLocalStorage.backgroundcolor;
                    let text = getArrayLocalStorage.texToToShow;
                    getmain.innerHTML += `<div class=" card" style="--background:${backgroundColor}; --text:white;">
      <div class="multi-button">
        <button class="fa fa-comment"></button>
        <button class="fa fa-cog"></button>
        <button class="fa fa-trash"></button>
      </div>
      <div class="container"><a href="#" onclick="newPage('test_page')">test</a></div>
    </div>`;
                }
