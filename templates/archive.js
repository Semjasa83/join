function creatHTMLshowArchive() {
    return /*html*/ `
        <div id="backlogTable" class="backlog-right-side mrg-lft mrg-rgt">
            <div>
                <h2>Archive</h2>
            </div>
            <div class="flex-center">
                <div class="backlog-header flex">
                    <div class="backlog-header-align"><h4>Assigned to</h4></div>
                    <div class="backlog-header-align"><h4>Category</h4></div>
                    <div class="backlog-header-align"><h4>Details</h4></div>
                </div>
            </div>
        </div>`
}


function creatHTMLArchiveCard(task, number) {
    return /*html*/ `
<div class="backlog-card backlog-border">
    <div class="backlog-card-items">
        <div>${task.employees}</div>
        <div>${task.date}</div>
    </div>
    <div class="backlog-card-items">${task.category}</div>
    <div class="backlog-card-items">
        <div>${task.title}</div>
        <div>${task.description}</div>
    </div>

    <div id="taskUrgency${number}"
         class="task-urgency">
    </div>

    <div class="big-card-buttons">
        <div class="big-card-menu-button">
            <img src="img/add-file-32.png" 
                 alt="remove to board"
                 title="remove to board"
                 style="width:1.5rem; height: 1.5rem"
                 onclick="  cardToBoard(${number}); 
                            show(creatHTMLshowArchive()); 
                            fillArchive()">
        </div>

        <div class="big-card-menu-button">
            <img src="img/trashGray.png" 
                 alt="delete"
                 title="delete"
                 style="width:1.5rem; height: 1.5rem"
                 onclick="  cardToTrash(${number});
                            show(creatHTMLshowArchive()); 
                            fillArchive()">
        </div>
    </div>
</div>    
`
}