let getLeftContainer = document.getElementById("task_container");
let getAddContainer = document.getElementById("add_category");
let getAddPerson = document.getElementById("addPerson");
let getPersonList = document.getElementById("personList")
let getTaskarea = document.getElementById("listoftasks")
let getAddMainTask = document.getElementById("addMainTask")
let getAddTask = document.getElementById("addTask");
let getTextbox = document.getElementById("textbox");
let getDate = document.getElementById("date");
let getMainTitle = document.getElementById("taskArea");
let getTaskContainer = document.getElementById("taskContainer");

let categoryArray = [];
let mainTasksArray = [];
let taskArray = [];
let personArray = [];
buildItems("category");
buildItems("mainTask");

getAddContainer.onclick = onclickAddCategory;
getAddPerson.onclick = onclickAddPerson;
getAddTask.onclick = onclickAddTask;
getAddMainTask.onclick = onclickaddMainTask;



function onclickAddCategory() {
    let text = document.getElementById("textAdd").value;
    categoryArray.push({
        textToShow: `${text}`,
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

function onclickaddMainTask() {
    let category = document.getElementById("taskArea").innerHTML;
    console.log(category);
    let getText = document.getElementById("addMainTaskText").value;
    if(category==="Project name"){
        alert("Please add or select a new category in the bottom right corner before you add a project")
    }else{
        mainTasksArray.push({
        textToShow: `${getText}`,
        backgroundcolor: "beige",
        category: `${category}`
    })
    setLocalStorage(`mainTask`, mainTasksArray);
    buildItems("mainTask");
    }

}

function buildMainSite(categoryToBuild) {
    getMainTitle.innerHTML = `${categoryToBuild}`;
    buildItems("mainTask");
}

let c = 0;

function x_allowDrop(ev) {
    ev.preventDefault();
}

function x_drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function x_drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    console.log(ev.target);
    ev.target.appendChild(document.getElementById(data));
    ev.target.ondragover = x_allowDrop;
    ev.target.ondrop = x_drop;
    document.getElementById(data).parentElement.ondragover = x_allowDrop;
    c++;
}

function buildItems(type, whoSentIt) {
    if (type == "category") {
        getLeftContainer.innerHTML = "";
        categoryArray = getLocalStorage(`category`);
        for (let i = 0; i < categoryArray.length; i++) {
            let backgroundColor = categoryArray[i].backgroundcolor;
            let text = categoryArray[i].textToShow;
            getLeftContainer.innerHTML += `<div class="card" style="--background:${backgroundColor}; --text:white; onclick="buildMainSite(${text})">
        <div class="multi-button">
        <button style="margin: 15px; color: #ffff; font-size: 15px; font-weight: bold; line" id="${text}btn" onclick="buildMainSite('${text}')">${text}</button>
        </div>
        <div class="container"></div>
        </div>`;
        }
        buildItems("maintask")
    }
    if (type === "person") {
        getPersonList.innerHTML = ``;
        personArray = getLocalStorage(`person`);
        for (let i = 0; i < personArray.length; i++) {
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
        for (let i = 0; i < taskArray.length; i++) {


            let checker = document.getElementById(`${whoSentIt}`).parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.id;
            console.log(mainToAddTo);
            console.log(checker);

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
			<div class="dropPerson" id="dropPerson1" ondrop="x_drop(event)" ondragover="x_allowDrop(event)"><p>Drop person here</p></div>
		</div>
	</div>
    </div>`;
                counter++;
                for (var j = 0; j < taskArray.length; j++) {
                    if (taskArray[j].maintask === getMaintext) {
                        let insertPathId = document.getElementById(`${getMaintext}`).querySelectorAll(`.listoftasks`)[0].id;
                        let insertPath = document.getElementById(`${insertPathId}`);
                        let textTask = taskArray[j].textToShow;
                        insertPath.innerHTML += `<div class="task" id="${textTask}" style="background-color: beige; position: relative; width: 250px">${textTask}<input type="button" id="${textTask}done" value="done" style="display: inline;"><input type="button" id="${textTask}WIP" value="WIP" style="display: inline;"></div>
            </div>`;

                    }
                }
            }
        }

    }
}

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

function setLocalStorage(type, object) {
    window.localStorage.setItem(type, JSON.stringify(object));
}

function getLocalStorage(type) {
    return JSON.parse(window.localStorage.getItem(type)) || [];
}