let tasks = [];

let users = [];

let activeUser = [];
let activePage = [];

/**
 * runs the function downloadFromServer and loads user
 */
async function init() {
    await downloadFromServer();
    users = backend.getItem('users');
}


/**
 * Inits the Board and Renders the Tasks and Templates
 */
async function firstrender() {
    await init();
    await loadTasks();
    loadUserLocal();
    if (activeUser[0]){
        
        showActivePage(activePage[0]);
        closeLogin();
    } 
    else{
        show(creatHTMLshowBoard());
        fillBoard();
    }
}


/**
 * checks the login and runs the function closeLogin if the input is correct
 */

function evaluationLogin(User, Pw) {
    eliminatFormLoop();
    let loginName = document.getElementById('lname').value;
    if (User) loginName = User;
    let loginPw = document.getElementById('lpw').value;
    if (Pw) loginPw = Pw;
    let login = false;

    for (let number = 0; number < users.length; number++) {
        const user = users[number];
        if (loginName == user.username) {
            if (loginPw == user.pw) {
                activeUser = loginName;
                saveUserLocal();
                saveActivePageLocal(1);
                closeLogin();
                login = true;
    }}}
    if (login == false) {alert("Bitte richtiges Passwort eingeben");}
}


function saveUserLocal() {
    let activeUserAsText = JSON.stringify(activeUser);
    localStorage.setItem('User', activeUserAsText);
}

function saveActivePageLocal(pageNumber) {
    activePage = [pageNumber];
    let activePageAsText = JSON.stringify(activePage);
    localStorage.setItem('Page', activePageAsText);
}


function loadUserLocal() {
    let activeUserAsText = localStorage.getItem('User');
    let activePageAsText = localStorage.getItem('Page');
    if (activeUserAsText && activePageAsText) {
        activeUser = JSON.parse(activeUserAsText);
        activePage = JSON.parse(activePageAsText);
    }
}

/**
 * Switch Pages over Navigation
 * @param {var} pageNumber 
 */
function showActivePage(pageNumber){
    if (pageNumber == 1){
        show(creatHTMLshowBoard()); 
        fillBoard();}
    else if (pageNumber == 2){
        show(creatHTMLshowBacklog()); 
        fillBacklog();}
    else if (pageNumber == 3)
        show(creatHTMLshowAddTask(activeUser)); 
    else if (pageNumber == 4){
        show(creatHTMLshowArchive()); 
        fillArchive();}
    else if (pageNumber == 5){
        show(creatHTMLshowTrash()); 
        fillTrash();}
    else if (pageNumber == 6)
        show(creatHTMLshowHelp());    
    else if (pageNumber == 7)
        show(creatHTMLshowAbout());    
    else if (pageNumber == 8)
        show(creatHTMLshowPrivacy());    
    switchNavButton(`${pageNumber}`);
}


/**
 * eliminates the Loop on submit button
 */
function eliminatFormLoop() {
    var form = document.getElementById("sectionForm");

    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);
}


/**
 * deactivates LoginScreen and shows the Board
 */
async function closeLogin() {
    document.getElementById('loginScreen').classList.add('d-none');
    document.getElementById('rightSideComplete').classList.remove('d-none');
    document.getElementById('leftSideComplete').classList.remove('d-none');
    document.getElementById('show-menu').classList.remove('d-none');
}


/**
 * open the loginScreen and removes the input
 */
function logout() {
    activeUser = [];
    saveUserLocal();
    document.getElementById('loginScreen').classList.remove('d-none');
    document.getElementById('rightSideComplete').classList.add('d-none');
    document.getElementById('leftSideComplete').classList.add('d-none');
    document.getElementById('lname').value = '';
    document.getElementById('lpw').value = '';
    document.getElementById('show-menu').classList.add('d-none');
}


/**
 * load the tasks from backend-JSON into the task-JSON
 */
async function loadTasks() {
    tasks = backend.getItem('tasks');
}


/**
 * Show / Rendering the complete Right Section
 * @param {var} section matching template
 */
function show(section) {
    document.getElementById('rightSideComplete').innerHTML = section;

}


/**
 * Shows the Navigation Button of Current Page
 * @param {var} number number of the position in the nav-bar
 */
function switchNavButton(number) {
    for (let sectionNumber = 1; sectionNumber < 10; sectionNumber++) {
        document.getElementById(`section${sectionNumber}`).classList.remove('active');
    }
    document.getElementById(`section${number}`).classList.add('active');
}


/**
 * Adding new Tasks and push to JSON
 */
function addTask() {
    let newTaskASJSON = creatTaskJSON();
    console.log(newTaskASJSON);
    tasks.push(newTaskASJSON);
    saveTasks();
    addTaskSuccess();
    setTimeout(() => {
        
        show(creatHTMLshowAddTask())
    }, 2000);

}

function addTaskSuccess() {
    document.getElementById('task-succes').innerHTML += 
        htmlAddSuccess();
}

/**
 * Pushes all Values from created Tasks into JSON
 * @returns all relevant data for the JSON. The individual Arrays in JSON
 */
function creatTaskJSON() {
    let title = document.getElementById('taskTitle').value;
    let date = document.getElementById('taskDate').value;
    let category = document.getElementById('taskCategory').value;
    let urgency = document.getElementById('taskUrgency').value;
    let description = document.getElementById('taskDescription').value;
    let employees = document.getElementById('taskEmployees').value;
    let show = "ToDo";

    return { urgency, date, title, description, category, employees, show };
}


/**
 * Save the Tasks to backend
 */
function saveTasks() {
    backend.setItem('tasks', tasks);
}


/**
 * Places Data von the Board to the correct Sections
 */
function fillBoard() {
    for (let number = tasks.length - 1; number > -1; number--) {
        let task = tasks[number];
        if (tasks[number].show == "ToDo") {
            fillBoardSingleTask(task, number, 'boardToDoContent');
        }
        if (tasks[number].show == "InProgress") {
            fillBoardSingleTask(task, number, 'boardInProgressContent');
        }
        if (tasks[number].show == "Testing") {
            fillBoardSingleTask(task, number, 'boardTestingContent');
        }
        if (tasks[number].show == "Done") {
            fillBoardSingleTask(task, number, 'boardDoneContent');
        }
    }
}


/**
 * 
 * @param {*} task 
 * @param {*} number 
 * @param {*} idContent 
 */
function fillBoardSingleTask(task, number, idContent) {
    document.getElementById(idContent).innerHTML +=
        creatHTMLsmallCard(task, number);
    document.getElementById(`taskUrgency${number}`).classList.add(`task-urgency-color-${task.urgency}`);
}


/**
 * Shows Tasks in Backlog as new created like a Historyboard
 */
function fillBacklog() {
    for (let number = tasks.length - 1; number > -1; number--) {
        const task = tasks[number];
        document.getElementById('backlogTable').innerHTML +=
            creatHTMLbacklogCard(task, number);
        document.getElementById(`taskUrgency${number}`).classList.add(`task-urgency-color-${task.urgency}`);
    }
}


/**
 * Shows Tasks in Archive
 */
function fillArchive() {
    for (let number = tasks.length - 1; number > -1; number--) {
        const task = tasks[number];
        if (task.show == "Archive") {
            document.getElementById('backlogTable').innerHTML +=
                creatHTMLArchiveCard(task, number);
            document.getElementById(`taskUrgency${number}`).classList.add(`task-urgency-color-${task.urgency}`);
        }
    }
}


/**
 * Shows Tasks in Trash
 */
function fillTrash() {
    for (let number = tasks.length - 1; number > -1; number--) {
        const task = tasks[number];
        if (task.show == "Trash") {
            document.getElementById('backlogTable').innerHTML +=
                creatHTMLTrashCard(task, number);
            document.getElementById(`taskUrgency${number}`).classList.add(`task-urgency-color-${task.urgency}`);
        }
    }
}


/**
 * 
 * @param {*} number 
 */
function cardToBoard(number) {
    tasks[number].show = 'ToDo';
    saveTasks();
}


/**
 * 
 * @param {*} number 
 */
function cardToArchive(number) {
    tasks[number].show = 'Archive';
    saveTasks();
}


/**
 * 
 * @param {*} number 
 */
function cardToTrash(number) {
    // spliceTask = tasks.splice(number, 1);
    tasks[number].show = 'Trash';
    saveTasks();
}


/**
 * delete task for all time
 * @param {*} number position in the tasks-JSON
 */
function finalyDelete(number) {
    tasks.splice(number, 1);
}


// ----- Drag and Drop -----

let currentDraggedElement;


/**
 * 
 * @param {*} id 
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * 
 * @param {*} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * 
 * @param {*} showArea 
 */
function moveTo(showArea) {
    tasks[currentDraggedElement]['show'] = showArea;
    saveTasks();
    show(creatHTMLshowBoard());
    fillBoard();
}


// -------Section Trash-------

/**
 * 
 */
function changeTrashPicture() {
    document.getElementById('trash-button').src = 'img/trash-or.png';
}


// ----- backlog changing status -----
let activeChangingStatusBar;

function openStatusChange(number) {
    document.getElementById(`status${number}`).classList.remove('dropdown-height-0');
    document.getElementById(`overlay`).classList.remove('d-none');
    document.getElementById(`body`).classList.add('no-scroll');
    activeChangingStatusBar = `status${number}`;

}

function closeStatusChange() {
    document.getElementById(activeChangingStatusBar).classList.add('dropdown-height-0');
    document.getElementById(`overlay`).classList.add('d-none');
    document.getElementById(`body`).classList.remove('no-scroll');
}

function changingStatus(status, number) {
    tasks[number].show = status;
    saveTasks();
    closeStatusChange();
    show(creatHTMLshowBoard());
    fillBoard();
    // fillBacklog();
}

/*
!!!!!
This code is created to display element's behavior. I'm not a JS expert so don't use it
!!!!!
*/

/**
 * Responsive Menu
 */

function showMenu() {
    let menu_activated = document.getElementById('show-menu');
    if (!menu_activated.classList.contains('menu_activated')) {
        menu_activated.classList.add('menu_activated');
    } else {
        document.getElementById('show-menu').classList.remove('menu_activated');
    }
}