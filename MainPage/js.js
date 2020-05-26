// var er ment for å lagre variabler over lenger tid
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

var prosjektArray = [];
var categoryArray = [];
var mainTasksArray = [];
var taskArray = [];
var personArray = [];
setPage();
buildItems("category");
buildItems("mainTask");

getAddContainer.onclick = onclickAddCategory;
getAddPerson.onclick = onclickAddPerson;
getAddTask.onclick = onclickAddTask;
getAddMainTask.onclick = onclickaddMainTask;


function setPage() {
    let temp = document.getElementById("boxPath");
    temp.innerHTML = getLocalStorage(`currentPage`);
}

function onclickAddCategory() {
    let text = document.getElementById("textAdd").value;
    if (text === "") {
        alert("Please name your category in the textbox below the plus to continue");
    } else {
        categoryArray.push({
            textToShow: `${text}`,
            backgroundcolor: "#28cc6d"
        });
        setLocalStorage(`category`, categoryArray);
        buildItems("category");
    }

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

        //her kommer en comment

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
                        console.log(getMaintext);
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