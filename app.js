//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listener

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);



//functions

function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    // create a todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create a list of items
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    //inserting the li as the child of div
    todoDiv.appendChild(newTodo);
    //Add todo to localStorage
    saveLocalTodos(todoInput.value);
    //check button
    const compeletedbutton = document.createElement("button");
    compeletedbutton.innerHTML = '<i class="fas fa-check"></i>';
    compeletedbutton.classList.add("complete-btn");
    todoDiv.appendChild(compeletedbutton);
    
    //delete todo button
    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    todoDiv.appendChild(trashbutton);

    // append to list todo-list the ul that we grabbed
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = "";
}


//delete functionality

function deleteCheck(e){
    //grab the item to be deleted
    const item = e.target;
    //Delete todo
    if(item.classList[0] === 'trash-btn'){
        //get the parent element 
        const todo = item.parentElement;
        //before removing adding a class inorder to show a transition
        //addede the animation using transform and rotate properties
        todo.classList.add("fall");
        removeLocalTodos(todo);
        //remove the parent element
        //what this does it wits for the transition to be finished and then run the function and remove the element.
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        
    }

    //checkMark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


function filterTodo(e){
    //grabbing the children of all parent elemets.
    const todos = todoList.childNodes;
    //console.log(todos);
    //console.log(e.target.value);
    todos.forEach(function(todo){
        console.log(todo);
        // // applying a switch case on the values of select droplist or filter list you can say.
        switch(e.target.value){
            case "all" :
                //show all the todos
                todo.style.display = "flex";
                break;
            case 'completed' :
                //show only those todo that have completed class in it
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break; 
            case 'uncompleted' :
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;       
        }
    });
}



function saveLocalTodos(todo){
    //check wether we have todos in our local storage or not
    //if we dont have any existind items then we will just craete an empty array
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }
    //if we have existing item we get the items in our todos and at last add the new items
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//get todos from existing local storage
function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }
    //if we have existing item we get the items in our todos and at last add the new items
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // create a todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create a list of items
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    //inserting the li as the child of div
    todoDiv.appendChild(newTodo);

    //check button
    const compeletedbutton = document.createElement("button");
    compeletedbutton.innerHTML = '<i class="fas fa-check"></i>';
    compeletedbutton.classList.add("complete-btn");
    todoDiv.appendChild(compeletedbutton);
    
    //delete todo button
    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    todoDiv.appendChild(trashbutton);

    // append to list todo-list the ul that we grabbed
    todoList.appendChild(todoDiv);

    });

}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }
    //if we have existing item we get the items in our todos and at last add the new items
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //remove the specific element from the local storage we will require the index
    // are actually getting the class of todo the div from todo itself
    // as we get the dic that contains list items and buttons from todo
    // we get the children of todo and as li is on the 0 index we get the first child
    // that is todo.children[0] and them we get the innerText from it. 
    const todoIndex = todo.children[0].innerText;
    // we removed it from the array using splice method
    todos.splice(todos.indexOf(todoIndex), 1);
    //but still we have to uypdate the array in the local storage
    localStorage.setItem('todos', JSON.stringify(todos));


}