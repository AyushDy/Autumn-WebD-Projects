const addButton =  document.querySelector('button');
const form = document.querySelector('form');
const taskAddField =  document.querySelector('input');
const taskList = document.querySelector('ul');
let disabled = false;
let taskData = [];
let lastTask = ''

window.onload = renderTasks;

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(disabled) {
        activeOperationWarning();
        return;
    }
    let text = taskAddField.value;
    if(!text) return;
    taskList.appendChild(createTask(text));
    taskAddField.value=''
    updateTasks();
})

taskAddField.addEventListener('blur',()=>{
    if(taskAddField.value) return;
    taskAddField.style.width = '0%'
    taskAddField.style.padding = '0'
})

addButton.addEventListener('click',()=>{
    taskAddField.style.width = '100%'
    taskAddField.focus();
    taskAddField.style.padding = '20px';
})


function createTask(text){
    if(!text) return;
    const task = document.createElement('li');
    const taskName = document.createElement('p');
    taskName.innerText = text;
    task.appendChild(taskName);
    task.appendChild(createButtons());
    return task;
}

function createButtons(){
    const buttonDiv =  document.createElement('div');
    const editButton  = document.createElement('button');
    const dltButton = document.createElement('button');

    const editImg =  document.createElement('img');
    const dltImg = document.createElement('img');
    editImg.src = './assets/edit.svg'
    dltImg.src= './assets/trash.svg'

    editButton.addEventListener('click',handleEdit);
    dltButton.addEventListener('click',handleDelete);

    editButton.appendChild(editImg);
    dltButton.appendChild(dltImg);
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(dltButton);
    return buttonDiv;
}

function createEditStateButtons(){
    const buttonDiv =  document.createElement('div');
    const cancelButton  = document.createElement('button');
    const saveButton = document.createElement('button');

    cancelButton.innerText = 'CANCEL';
    saveButton.innerText = 'SAVE';

    cancelButton.addEventListener('click',handleCancel);
    saveButton.addEventListener('click',handleSave);

    buttonDiv.appendChild(cancelButton);
    buttonDiv.appendChild(saveButton);
    return buttonDiv;
}

function handleDelete(event){
    if(disabled) {
        activeOperationWarning();
        return;
    }

    const task = event.target.closest('li');
    const index = taskData.findIndex(task => task === task.textContent);
    if (index !== -1) {
        taskData.splice(index, 1); 
    }
    taskList.removeChild(task);
    updateTasks();
}

function handleEdit(event){
    if(disabled) {
        activeOperationWarning();
        return;
    }
    disabled = true;
    const task = event.target.closest('li');
    const p =task.querySelector('p');
    const text = p.innerText;
    lastTask = text;

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = text;

    const buttons = task.querySelector('div');
    task.replaceChild(createEditStateButtons(),buttons);
    task.replaceChild(inputField,p);
    updateTasks();
}

function handleCancel(event){
    const task = event.target.closest('li');
    const inputField = task.querySelector('input');
    const buttons = task.querySelector('div');

    const p = document.createElement('p');
    p.innerText = lastTask;
    task.replaceChild(p,inputField);
    task.replaceChild(createButtons(),buttons);
    disabled =false
}

function handleSave(event){
    const task = event.target.closest('li');
    const taskName = document.createElement('p');

    const taskInput = task.querySelector('input');
    if(!taskInput.value) return;
    taskName.innerText = taskInput.value;
    const buttons = task.querySelector('div');
    task.replaceChild(taskName,taskInput);
    task.replaceChild(createButtons(),buttons);
    disabled =false;
    updateTasks();
}

function activeOperationWarning(){
    alert('Please finish the active operation first!');
}

function renderTasks(){
    taskData = localStorage.getItem('ToDoListData').split(',') || [];
    console.log(taskData);
    taskData.forEach(task => {
        taskList.appendChild(createTask(task));
    });
}


function updateTasks(){
    taskData = []
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach(task=>{
        taskData.push(task.textContent);
    })
    localStorage.setItem('ToDoListData',taskData);
}
