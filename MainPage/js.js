var getMainContainer = document.getElementById("MainContainer");
var getLeftContainer = document.getElementById("task_container");
var getAddContainer = document.getElementById("add_category");
var getAddPerson = document.getElementById("addPerson");
var getPersonList = document.getElementById("personList");
var getTaskarea = document.getElementById("listoftasks");
var getAddMainTask = document.getElementById("addMainTask");
var getAddTask = document.getElementById("addTask");
var getTextbox = document.getElementById("textbox");
var getDate = document.getElementById("date");
var getMainTitle = document.getElementById("mainTitle");
var getTaskContainer = document.getElementById("taskContainer");

var getPaintBrush = document.getElementById("paint-brush");
var getColorRed = document.getElementById("red");
var getColorBlue = document.getElementById("blue");
var getColorGreen = document.getElementById("green");
var getColorGray = document.getElementById("gray");
var getColorYellow = document.getElementById("yellow");

var categoryArray = [];
var mainTasksArray = [];
var taskArray = [];
var personArray = [];






function onclickAddCategory() {

    var whattoget = document.getElementById("textAdd");
    var textToSwitch = whattoget.value;
    let text = document.getElementById("categoryText").value;

    categoryArray.push({
        textToShow: `${textToSwitch}`,
        backgroundcolor: "#28cc6d"
    });
    setLocalStorage(`category`, categoryArray);
    buildItems("category");
}

function onclickAddPerson() {
    personArray.push({
        textToShow: "G",
        backgroundcolor: "#28cc6d",
        category: "CSS"
    });
    setLocalStorage(`person`, personArray);
    buildItems("person");
}

function onclickAddTask(whoSentThis) {
    let getter = document.getElementById(`${whoSentThis}`);
    let text = getter.previousElementSibling.value;
    let date = getter.nextElementSibling.value;
    let category = document.getElementById("mainTitle").innerHTML;
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

function onclickaddMainTask() {
    let category = document.getElementById("mainTitle").innerHTML;
    let getText = document.getElementById("addMainTaskText").value;
    mainTasksArray.push({
        textToShow: `${getText}`,
        backgroundcolor: "beige",
        category: `${category}`
    })
    setLocalStorage(`mainTask`, mainTasksArray);
    buildItems("mainTask");
}

function buildMainSite(categoryToBuild) {
    getMainTitle.innerHTML = categoryToBuild;
    buildItems("mainTask");
}

getAddContainer.onclick = onclickAddCategory;
getAddPerson.onclick = onclickAddPerson;
getAddTask.onclick = onclickAddTask;
getAddMainTask.onclick = onclickaddMainTask;

function x_allowDrop(ev) {
    ev.preventDefault();
}

function x_drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function x_drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
/* */
function buildItems(type, whoSentIt) {
    if (type == "category") {
        getLeftContainer.innerHTML = "";
        categoryArray = getLocalStorage(`category`);
        for (var i = 0; i < categoryArray.length; i++) {
            let backgroundColor = categoryArray[i].backgroundcolor;
            let text = categoryArray[i].textToShow;
            getLeftContainer.innerHTML += `<div class="card" style="--background:${backgroundColor}; --text:white; onclick="">
        <div class="multi-button">
        <button id="trash" onclick="removeItem('${categoryArray[i].textToShow}')"></button>
        </div>
        
        </div>`;
        }
        buildItems("maintask", )
    }
    if (type === "person") {
        getPersonList.innerHTML = ``;
        personArray = getLocalStorage(`person`);
        for (var i = 0; i < personArray.length; i++) {
            let backgroundPerson = personArray[i].backgroundcolor;
            let textPerson = personArray[i].textToShow;
            getPersonList.innerHTML += `<div class="person">
			<img src="" alt="${textPerson}" id="personId" draggable="true" ondragstart="x_drag(event)">	
		</div>`;
        }
        getPersonList.innerHTML += `<div id="addPerson">
			<img src="../images/plus_icon.png" alt="Pluss" id="addPluss">
		</div>`;
    }

    if (type === "task") {
        taskArray = getLocalStorage(`task`);
        let mainToAddTo = document.getElementById(`${whoSentIt}`).parentElement.previousElementSibling.previousElementSibling;
        mainToAddTo.innerHTML = ``
        for (var i = 0; i < taskArray.length; i++) {


            let checker = document.getElementById(`${whoSentIt}`).parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.id;
            let backgroundText = taskArray[i].backgroundcolor;
            let textTask = taskArray[i].textToShow;
            if (checker == taskArray[i].maintask) {

                mainToAddTo.innerHTML += `<div class="task" id="${textTask}" style="background-color: beige; position: relative; width: 250px">${textTask}<input type="button" id="${textTask}done" value="done" style="display: inline;"><input type="button" id="${textTask}WIP" value="WIP" style="display: inline;"></div>
            </div>`
            }



        }

    }


    getAddPerson.onclick = onclickAddPerson;

    if (type === "mainTask") {
        getTaskContainer.innerHTML = ``;
        mainTasksArray = getLocalStorage(`mainTask`);
        let category = document.getElementById("mainTitle").innerHTML;
        let counter = 0;
        for (var i = 0; i < mainTasksArray.length; i++) {
            if (category === mainTasksArray[i].category) {
                let getMaintext = mainTasksArray[i].textToShow;
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
			<div class="dropPerson" id="dropPerson1" ondrop="x_drop(event)" ondragover="x_allowDrop(event)"><p>Drop person here</p></div>
		</div>
	</div>
    </div>`;
                counter++;
            }
        }
        buildItems(`task`);
    }
}

function expandTask(whoToExpand) {
    let getit = document.getElementById(`${whoToExpand}`);
    let getTasks = document.getElementById(`${whoToExpand}`).querySelectorAll(`.task`);
    let getAddTasks = document.getElementById(`${whoToExpand}`).querySelectorAll(`.addTasks`);
    if (getit.style.width === `450px`) {
        getit.style.width = `45px`;
        //hide tasks
        for (var i = 0; i < getTasks.length; i++) {
            getTasks[i].style.display = `none`;
        }
        for (var i = 0; i < getAddTasks.length; i++) {
            getAddTasks[i].style.display = `none`;
        }

    } else {
        getit.style.width = `450px`;
        //show tasks
        for (var i = 0; i < getTasks.length; i++) {
            getTasks[i].style.display = `inline`;
        }
        for (var i = 0; i < getAddTasks.length; i++) {
            getAddTasks[i].style.display = `inline`;
        }

    }
}

function setLocalStorage(type, object) {
    window.localStorage.setItem(type, JSON.stringify(object));
}

function getLocalStorage(type) {
    return JSON.parse(window.localStorage.getItem(type)) || [];

    }



function ColorChange() {
    var taskbox = document.getElementById("textbox");
    for (var i = 0; i < xxxxx.length; i++) {
        var rgbparameter1 = Math.floor(Math.random() * 255);
        var rgbparameter2 = Math.floor(Math.random() * 255);
        var rgbparameter3 = Math.floor(Math.random() * 255);
        var RandomColorGen = `rgb(${rgbparameter1},${rgbparameter2},${rgbparameter3})`;

        taskbox.style.backgroundColor = RandomColorGen;
    }
}
    getColorRed.onclick = function () {
        getMainContainer.style.backgroundColor = "#e74837";
        getMainContainer.style.backgroundImage = "";
    };
    getColorBlue.onclick = function () {
        getMainContainer.style.backgroundColor = "#2b8aca";
        getMainContainer.style.backgroundImage = "";
    };
    getColorGreen.onclick = function () {
        getMainContainer.style.backgroundColor = "#28cc6d";
        getMainContainer.style.backgroundImage = "";
    };
    getColorGray.onclick = function () {
        getMainContainer.style.backgroundColor = "#364c61";
        getMainContainer.style.backgroundImage = "";
    };
    getColorYellow.onclick = function () {
        getMainContainer.style.backgroundColor = "#e9bc0a";
        getMainContainer.style.backgroundImage = "";
    };
    
}


buildItems("category");

