function creatHTMLshowBoard() {
    return /*html*/ `
        <div class="board-right-side">
            <div class="board-section"
                 ondrop="moveTo('ToDo')" 
                 ondragover="allowDrop(event)">

                <h2>to do</h2>

                <div id="boardToDoContent"></div>

            </div>

            <div class="board-section"
                 ondrop="moveTo('InProgress')" 
                 ondragover="allowDrop(event)">

                <h2>in progress</h2>

                <div id="boardInProgressContent"></div>
            </div>

            <div class="board-section"
                 ondrop="moveTo('Testing')" 
                 ondragover="allowDrop(event)">

                <h2>testing</h2>

                <div id="boardTestingContent"></div>

            </div>

            <div class="board-section"
                 ondrop="moveTo('Done')" 
                 ondragover="allowDrop(event)">

                <h2>done</h2>

                <div id="boardToneContent"></div>

            </div>
        </div>`


}


function creatHTMLsmallCard(task, number) {
    return /*html*/ `
        <div class="board-notecard" 
             draggable="true"
             ondragstart="startDragging(${number})">

            <div class="board-notecard-date">
                ${task.date}</div>

            <h3 class="ft-bld">${task.title}</h3>

            <div class="board-notecard-description">${task.description}</div>

            <div class="board-notecard-bottom">
                <div>${task.category}</div>

                <div>${task.employees}</div>
            </div>

        </div>`
}


function creatHTMLshowBacklog() {
    return /*html*/ `
        <div id="backlogTable" class="backlog-right-side mrg-lft mrg-rgt">
            <div>
                <h2>Backlog</h2>
            </div>
            <div class="flex-center">
                <div class="backlog-header txt-center flex">
                    <div >Assigned to</div>
                    <div >Datum</div>
                    <div>Category</div>
                    <div >Status</div>
                    <div >Details</div>
                </div>
            </div>
        </div>`
}


function creatHTMLbacklogCard(task, number) {
    return /*html*/ `
    <div class="flex-center ">
        <!--backlog-card txt-center flex w-100 mrg-btm-->
        <div class="backlog-card flex mrg-btm">
            <div class="w-20">
                ${task.employees}
            </div>
            <div  class="w-10">
                ${task.category}
            </div>
            <div class="w-70">
                <h4>${task.title}</h4>
                <span>${task.description}</span>
                <div class="backlog-card-description-bottom">
                    <!-- <div>${task.urgency}</div>  -->
                    <div class="task-status"
                         onclick="openStatusChange(${number})">
                        Status: 
                            <div style="text-decoration: underline;">${task.show}

                                <div id="status${number}"
                                    class="dropdown-content d-none">
                                    <div onclick="changingStatus('ToDo', ${number})">ToDo</div>
                                    <div onclick="changingStatus('InProgress', ${number})">In Progress</div>
                                    <div onclick="changingStatus('Testing', ${number})">testing</div>
                                    <div onclick="changingStatus('Done', ${number})">done</div>
                                    
                                </div>
                            </div>
                    </div> 

                    <div>${task.date}</div> 
                </div>
            </div>
        </div>
    </div>`
}


function creatHTMLshowAddTask() {
    return /*html*/ `
    <div class="task-section">
        <div class="task-header ft-bld">
            Add Task
        </div>
    <div class="task-background">


        <form class="form-example" action="" onsubmit="addTask(); show(creatHTMLshowAddTask())">
            <!-- action="" method="get" -->

            <div class="form-example">
                <label for="taskTitle">Title: </label>
                <input class="task-input" type="text" id="taskTitle" placeholder="Title..." required>
            </div>

            <div class="form-example">
                <label for="taskDate">Due Date: </label>
                <input class="task-input" type="date" id="taskDate" required>
            </div>

            <div class="form-example">
                <label for="taskCategory">Category: </label>
                <input class="task-input" type="text" id="taskCategory" placeholder="Category..." required>
            </div>

            <div class="form-example">
                <label for="taskUrgency">Urgency: </label>
                <input class="task-input" type="number" min="1" max="3" size="3" id="taskUrgency" required>
            </div>

            <div class="form-example">
                <label for="taskDescription">Description: </label>
                <textarea class="task-input" type="text" id="taskDescription" rows="5" columns="4" placeholder="..." required>
            </div>

            <div class="form-example">
                <label for="taskEmployees">User: </label>
                <input class="task-input" type="text" id="taskEmployees" placeholder="add User..." required>
            </div>

            <div class="form-example">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
</div>`
}