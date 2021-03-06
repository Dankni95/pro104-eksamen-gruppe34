// henting av html elementer
var getLeftContainer = document.getElementById("task_container");
var getAddContainer = document.getElementById("add_category");
var getAddPerson = document.getElementById("addPerson");
var getPersonList = document.getElementById("personList")
var getTaskarea = document.getElementById("listoftasks")
var getAddMainTask = document.getElementById("addMainTask")
var getAddTask = document.getElementById("addTask");
var getTextbox = document.getElementById("textbox");
var getDate = document.getElementById("date");
var getMainTitle = document.getElementById("taskArea");
var getTaskContainer = document.getElementById("taskContainer");
var getboxpath = document.getElementById(`boxPath`);
var getPlussMember = document.getElementById(`plussMember`);
var getPersonList = document.getElementById(`personList`);
//arrays som skal inn i localstorage
var prosjektArray = [];
var categoryArray = [];
var mainTasksArray = [];
var taskArray = [];
var personArray = [];
//setter riktig prosjekt på siden
setPage();
//starter oppbygging av siden
buildItems("category");
buildItems("mainTask");

//setter første kategori som default når man kommer inn fra en ny økt
if(categoryArray.length>0){
    for(var i=0; i<categoryArray.length; i++){
        if(categoryArray[i].project===boxPath.innerHTML){
            getMainTitle.innerHTML= categoryArray[i].textToShow;
        }
    }
    
}else{
    getMainTitle.innerHTML="";
}

//onclick funksjoner
getAddContainer.onclick = onclickAddCategory;
getAddPerson.onclick = onclickAddPerson;
getAddTask.onclick = onclickAddTask;
getAddMainTask.onclick = onclickaddMainTask;
getPlussMember.onclick = onclickAddMember;

//setter siden med localstorage fra forrige side. altså fra frontpage
function setPage() {
    let temp = document.getElementById("boxPath");
    temp.innerHTML = getLocalStorage(`currentPage`);
}

//klikke for å legge til kategori
function onclickAddCategory() {
    let text = document.getElementById("textAdd").value;
    let project = getLocalStorage(`currentPage`);
    if (text === "") {
        alert("Please name your category in the textbox below the plus to continue");
    } else {
        categoryArray.push({
            textToShow: `${text}`,
            backgroundcolor: "#28cc6d",
            project: `${project}`
        });
        setLocalStorage(`category`, categoryArray);
        buildItems("category");
    }

}
// klikke for å legge til nytt member
function onclickAddMember(){
    let getTextPerson = document.getElementById(`text-member`).value;
    let getCat = document.getElementById(`taskArea`)
    personArray.push({
        textToShow: `${getTextPerson}`,
        backgroundcolor: "#28cc6d",
        category: `${getCat}`
    });
    setLocalStorage(`person`, personArray);
    buildItems("person", `${getTextPerson}`);
}
//vet ikke
function onclickDoneButton(ev) {
    ev.originalTarget.parentElement.style.backgroundColor = "#00ff00";
    let val = ev.originalTarget.parentElement.firstChild;
    if (val.innerHTML.includes("[Done]")) return;
    if (val.innerHTML.includes("[WIP]"))
        val.innerHTML = val.innerHTML.substr("[WIP]".length);
    val.innerHTML = `[Done] ${val.innerHTML}`;
}

function onclickWIPButton(ev) {
    ev.originalTarget.parentElement.style.backgroundColor = "#ffff00";
    let val = ev.originalTarget.parentElement.firstChild;
    if (val.innerHTML.includes("[WIP]")) return;
    if (val.innerHTML.includes("[Done]"))
        val.innerHTML = val.innerHTML.substr("[Done]".length);
    val.innerHTML = `[WIP] ${val.innerHTML}`;
}


//legger til personer
function onclickAddPerson() {
    personArray.push({
        textToShow: "G",
        backgroundcolor: "#28cc6d",
        category: "CSS"
    });
    setLocalStorage(`person`, personArray);
    buildItems("person");
}

//adder tasks
function onclickAddTask(whoSentThis) {
    let getter = document.getElementById(`${whoSentThis}`);
    let text = getter.previousElementSibling.value;
    let date = getter.nextElementSibling.value;
    let category = document.getElementById("taskArea").innerHTML;
    let maintask = document.getElementById(`${whoSentThis}`).parentElement.parentElement.querySelector(`.overskrift`).id;
    taskArray.push({
        textToShow: `${text}`,
        backgroundcolor: "#28cc6d",
        date: `${date}`,
        WIP: "no",
        done: "no",
        category: `${category}`,
        maintask: `${maintask}`
    });
    setLocalStorage(`task`, taskArray);
    buildItems("task", `${whoSentThis}`);
}

//adder hovedkort
function onclickaddMainTask() {
    let category = document.getElementById("taskArea").innerHTML;
    console.log(category);
    let getText = document.getElementById("addMainTaskText").value;
    if (category === "") {
        alert("Please add or select a new category in the bottom right corner before you add a project")
    } else if (getText === "") {
        alert("Please add a description in the textbox below the add task button");
    } else {
        mainTasksArray.push({
            textToShow: `${getText}`,
            backgroundcolor: "beige",
            category: `${category}`
        })
        setLocalStorage(`mainTask`, mainTasksArray);
        buildItems("mainTask");
    }

}

//starter bygging av siden
function buildMainSite(categoryToBuild) {
    getMainTitle.innerHTML = `${categoryToBuild}`;
    buildItems("mainTask");
}

//drag and drop starter her. Begynner med å dra ting
document.addEventListener("dragstart", function(event){
    event.dataTransfer.setData("Text", event.target.id);
});

//deretter forhindrer den at man ikke kan slippe når man beveger over
document.addEventListener("dragover", function(event) {
  event.preventDefault();
});

//her er koden som kommer når man slipper den i søpplekassen
document.addEventListener("drop", function(event){
event.preventDefault();
    if(event.target.className === "fa fa-trash"){
        var data = event.dataTransfer.getData("text");
console.log(`${data}`);
categoryArray = getLocalStorage(`category`);
removeItem(data);
    }

});
//her er slettefunksjonen til søpplekassen og drag/drop
function removeItem(toBeRemoved) {
    for (let i in categoryArray) {
        if (toBeRemoved === categoryArray[i].textToShow) {
            categoryArray.splice(i, 1);
        }
    }
    setLocalStorage(`category`, categoryArray);
    buildItems(`category`);
}

//dette er hovedfunksjonen på siden. Den bygger alt
function buildItems(type, whoSentIt) {
        if (type == "category") {
        getLeftContainer.innerHTML = "";
        categoryArray = getLocalStorage(`category`);
        for (let i = 0; i < categoryArray.length; i++) {
            let backgroundColor = categoryArray[i].backgroundcolor;
            let text = categoryArray[i].textToShow;
            let project = getLocalStorage(`currentPage`);
            if(project===categoryArray[i].project){
        getLeftContainer.innerHTML += `<div class="card" style="--background:${backgroundColor}; --text:white; onclick="buildMainSite(${text})">
        <div class="multi-button">
        <button draggable="true" style="margin: 15px; color: #ffff; font-size: 15px; font-weight: bold; line" id="${text}" onclick="buildMainSite('${text}')">${text}</button>
        </div>
        <div class="container"></div>
        </div>`;
            }

        }
    
        buildItems("maintask")
    }
    if (type === "person") {
        getPersonList.innerHTML = ``;
        personArray = getLocalStorage(`person`);
        for (let i = 0; i < personArray.length; i++) {
            let backgroundPerson = personArray[i].backgroundcolor;
            let textPerson = personArray[i].textToShow;
            getPersonList.innerHTML += `<div id="${whoSentIt}" draggable="true" ondragstart="x_drag(event)" class="person" style="display: inline; float: left; height: 30px; width: 30px; background-color: white;">
                <img src="/images/user.jpg" alt="P" id="personId">
            </div>`;
        }
        getPersonList.innerHTML += `<div id="addPerson">
			<img src="../images/plus_icon.png" alt="Pluss" id="addPluss">
		</div>`;
    }

    if (type === "task") {
        const value = whoSentIt.split(/ +/).join("-");
        taskArray = getLocalStorage(`task`);
        let mainToAddTo = document.getElementById(value).parentElement.previousElementSibling.previousElementSibling;
        mainToAddTo.innerHTML = ``;
        for (let i = 0; i < taskArray.length; i++) {


            let checker = document.getElementById(value).parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.id;
            console.log(mainToAddTo);
            console.log(checker);

            let backgroundText = taskArray[i].backgroundcolor;
            let textTask = taskArray[i].textToShow;
            if (checker == taskArray[i].maintask) {

                mainToAddTo.innerHTML += `<div class="task" id="${textTask.split(/ +/).join("-")}" style="background-color: beige; position: relative; width: 250px"><p id="task-text">${textTask}</p><input type="button" id="${textTask.split(/ +/).join("-")}-done" onclick="onclickDoneButton(event)" value="done" style="display: inline;"><input type="button" id="${textTask.split(/ +/).join("-")}-WIP" value="WIP" onclick="onclickWIPButton(event)" style="display: inline;"></div>
            </div>`;
            }



        }

    }


    getAddPerson.onclick = onclickAddPerson;

    if (type === "mainTask") {
        getTaskContainer.innerHTML = ``;
        mainTasksArray = getLocalStorage(`mainTask`);
        let category = document.getElementById("taskArea").innerHTML;
        let counter = 0;
        for (let i = 0; i < mainTasksArray.length; i++) {
            if (category === mainTasksArray[i].category) {
                var getMaintext = mainTasksArray[i].textToShow;
                getTaskContainer.innerHTML += `<div id="taskContainer${counter}"><div id="${getMaintext}" style="float: left">
		<div class="taskTabs" id="taskTab${counter}">
            <div class="overskrift" id="${getMaintext}">${getMaintext}</div>
            <div class="plus" onclick="expandTask('taskTab${counter}')" id="test${counter}">
                <img src="../images/plus_icon.png" alt="Plus" class="plus_icon">
            </div>
            
            <div class="listoftasks" id="listoftasks${counter}">
            </div>
			<div class="miniChart" id="miniChart1"></div>
            <div id="addTasks" class="addTasks">
            <input type="text" id="textbox${counter}" value="to add tasks" style="display: inline;">
            <input type="button" id="addTask${counter}" onclick="onclickAddTask('addTask${counter}')" value="ADD" style="display: inline;">
            <input type="date" id="date${counter}" style="display: inline;">
            </div>
			<div class="dropPerson" id="dropPerson${counter}" ondrop="x_drop(event)" ondragover="x_allowDrop(event)"><p>Drop person here</p></div>
		</div>
	</div>
    </div>`;
                counter++;
                for (var j = 0; j < taskArray.length; j++) {
                    if (taskArray[j].maintask === getMaintext) {
                        console.log(getMaintext);
                        let insertPathId = document.getElementById(`${getMaintext}`).querySelectorAll(`.listoftasks`)[0].id;
                        let insertPath = document.getElementById(`${insertPathId}`);
                        let textTask = taskArray[j].textToShow;
                        insertPath.innerHTML += `<div class="task" id="${textTask.split(/ +/).join("-")}" style="background-color: beige; position: relative; width: 250px">${textTask}<input type="button" id="${textTask.split(/ +/).join("-")}-done" value="done" style="display: inline;"><input type="button" id="${textTask.split(/ +/).join("-")}-WIP" value="WIP" style="display: inline;"></div>
            </div>`;

                    }
                }
            }
        }

    }
}

//expander en task når man trykker på plussikonet, og minimerer når man trykker på det mens den er åpen
function expandTask(whoToExpand) {
    let getit = document.getElementById(`${whoToExpand}`);
    let getTasks = document.getElementById(`${whoToExpand}`).querySelectorAll(`.task`);
    let getAddTasks = document.getElementById(`${whoToExpand}`).querySelectorAll(`.addTasks`);
    if (getit.style.width === `450px`) {
        getit.style.width = `45px`;
        //hide tasks
        for (let i = 0; i < getTasks.length; i++) {
            getTasks[i].style.display = `none`;
        }
        for (let i = 0; i < getAddTasks.length; i++) {
            getAddTasks[i].style.display = `none`;
        }

    } else {
        getit.style.width = `450px`;
        //show tasks
        for (let i = 0; i < getTasks.length; i++) {
            getTasks[i].style.display = `inline`;
        }
        for (let i = 0; i < getAddTasks.length; i++) {
            getAddTasks[i].style.display = `inline`;
        }

    }
}
//localstorage funksjonen
function setLocalStorage(type, object) {
    window.localStorage.setItem(type, JSON.stringify(object));
}

function getLocalStorage(type) {
    return JSON.parse(window.localStorage.getItem(type)) || [];
}


const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

//morsomt med eventlisteners 
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}