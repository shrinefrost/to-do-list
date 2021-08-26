//selectors
const inputText = document.querySelector('.input-text');
const button = document.querySelector('.button');
const todoList = document.querySelector('.todolist');
//event listener
document.addEventListener('DOMcontentloaded', getTodos());
button.addEventListener('click', addlist);
todoList.addEventListener('click', deleteCheck);

//function add list
function addlist(event) {

    event.preventDefault();

    //creating div section
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('toDo');

    //creating list
    const newTodo = document.createElement('li');
    newTodo.classList.add('todoItem');
    newTodo.innerText = inputText.value;
    todoDiv.appendChild(newTodo);
    savelocalStorage(inputText.value);
    

    //check sign
    const checkbutton = document.createElement('button');
    checkbutton.innerHTML = '<i class ="fas fa-check"></i>';
    checkbutton.classList.add('completecheckbtn');
    todoDiv.appendChild(checkbutton); 
    
    //trash sign
    const trashbutton = document.createElement('button');
    trashbutton.classList.add('completetrashbtn');
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashbutton);

    //append div in to do list
    todoList.appendChild(todoDiv);

    // to make input box empty
    inputText.value = '';
}


//function deleate check
function deleteCheck(event) {
    const temp = event.target;
    if (temp.classList[0] === 'completetrashbtn'){
        const todo = temp.parentElement;
        todo.classList.add('fall');
        removestorage(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
        
    }

    //checkitem

     if(temp.classList[0] === 'completecheckbtn'){
        const todo = temp.parentElement;
        todo.classList.toggle('completed');
    }
    
}
//function for local storage

function savelocalStorage(todo) {
    let todos;
    
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
     else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//function to load data in the screen from the local storage
 
function getTodos() {
    console.log('hello');
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) 
    {
        //creating div section
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('toDo');

        //creating list
        const newTodo = document.createElement('li');
        newTodo.classList.add('todoItem');
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);
        
        //check sign
        const checkbutton = document.createElement('button');
        checkbutton.innerHTML = '<i class ="fas fa-check"></i>';
        checkbutton.classList.add('completecheckbtn');
        todoDiv.appendChild(checkbutton); 
        
        //trash sign
        const trashbutton = document.createElement('button');
        trashbutton.classList.add('completetrashbtn');
        trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashbutton);

        //append div in to do list
        todoList.appendChild(todoDiv);
    });
}

//to remove items from local storage
function removestorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todosIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todosIndex), 1); 
    localStorage.setItem('todos', JSON.stringify(todos));
}