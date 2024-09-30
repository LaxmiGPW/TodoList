const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let recycleBtn = document.querySelector('#recycleBtn')
let recycleBinUL = document.getElementById('recycleBin')
//======================================================


let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();

})
//======================================================
function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }  
}
//======================================================
function updateTodoList(){
    todoListUL.innerHTML = "";
    if(allTodos.length!==0){
    allTodos.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
    }
    else{
        // <li class="todo" style="height:58px;width:calc(100% - 24px);
        // background: transparent"></li>
        todoListUL.innerHTML=`

        <li class="todo" style="height:58px;width:calc(100% - 24px);
        background: linear-gradient(45deg, #1c1d20, #ffffff29);border-radius:15px;
        color: grey;display: flex;justify-content: center;">No work to Do!</li>
      `
    }
}
//======================================================
function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
    `
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex,todoIndex);
        //-------------------------------------
        addDeletedTodo(todoText,todo.completed)
        //-------------------------------------
        
    })
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLI;
}
//======================================================
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
}
//======================================================
function saveTodos(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("MyTodos", todosJson);
}
//======================================================
function getTodos(){
    const todos = localStorage.getItem("MyTodos") || "[]";
    return JSON.parse(todos);
}


// //-------------------Recycle---------------------------

recycleBtn.addEventListener('click',
    function(){
        recycleBinUL.classList.toggle('show')
        let toggle = recycleBinUL.classList.toggle('show')
        // console.log(hide)
        if(recycleBinUL.classList.toggle('show') === toggle){
            recycleBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>`
        }
        else{
            recycleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
            <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.5.5 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244z"/>
        </svg>
            `
        }
    }
)

let allDeletedTodos = getDeletedTodos();
updateDeletedList();

// //--------------------------------------------------------


function addDeletedTodo(todoText,checked){
        const todoDeletedObject = {
            text: todoText,
            completed: checked
        }
        allDeletedTodos.push(todoDeletedObject);
        // console.log(allDeletedTodos)
        updateDeletedList();
        saveDeletedTodos(); 
}

function updateDeletedList(){
    recycleBinUL.innerHTML = "<h2>Recycle Bin</h2>"
    // console.log(getDeletedTodos())
    if(allDeletedTodos.length!==0){
        allDeletedTodos.forEach((todoText,todoIndex)=>{
            let Deleteditem = createDeletedList(todoText,todoIndex)
            recycleBinUL.appendChild(Deleteditem)
        })
    }
    else{
        recycleBinUL.innerHTML=`
        <h2>Recycle Bin</h2>
        <li class="todo" style="height:58px;width:calc(100% - 24px);
        background: linear-gradient(45deg, #1c1d20, #ffffff29);border-radius:15px;
        color: grey;display: flex;justify-content: center;">Empty</li>        
        `
    }
}

// //---------------------------------------------------------

function createDeletedList(deleteText,deleteId){
    const deletedLi = document.createElement("li")
    deletedLi.className = 'todo'
    deletedLi.innerHTML = 
   ` <input type="checkbox" id="delete-${deleteId}">
    <label class="custom-checkbox" for="delete-${deleteId}">
        <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </label>
    <label for="delete-${deleteId}" class="todo-text">
        ${deleteText.text}
    </label>

    <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    </button>

    <button class="restore-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
    <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.5.5 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244z"/>
    </svg>   
    </button>
    `
    const DeleteButton = deletedLi.querySelector(".delete-button");
    DeleteButton.addEventListener("click", ()=>{
        deletePermanentItem(deleteId);
        //-------------------------------------
        createTodoItem(deleteText,deleteId)
        //-------------------------------------
        
    })

    const restoreButton = deletedLi.querySelector(".restore-button");
    restoreButton.addEventListener("click", ()=>{
       
        RestoreTodoItem(deleteText.text,deleteText.completed,deleteId);
        
    }) 

    const checkbox = deletedLi.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allDeletedTodos[deleteId].completed = checkbox.checked;
        saveDeletedTodos();
    })
    checkbox.checked = deleteText.completed;
    return deletedLi
}
//======================================================
function RestoreTodoItem(RestoreText,checked,RestoreId){
    const todoText = RestoreText
    const todoObject = {
        text: todoText,
        completed: checked
    }
    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
    deletePermanentItem(RestoreId)
}
//======================================================
function deletePermanentItem(todoIndex){
    allDeletedTodos = allDeletedTodos.filter((_, i)=> i !== todoIndex);
    saveDeletedTodos();
    updateDeletedList();
}

//======================================================
function saveDeletedTodos(){
    const deletedTodosJson = JSON.stringify(allDeletedTodos);
    localStorage.setItem("DeletedTodos", deletedTodosJson);
}
//======================================================
function getDeletedTodos(){
    const allDeletedTodos = localStorage.getItem("DeletedTodos") || "[]";
    return JSON.parse(allDeletedTodos);
}