document.addEventListener('DOMContentLoaded', function(){
  createUserAndGroup()
  loadGroups()
  loadFormData();
  displayTask()
})
function createUserAndGroup(){
  //CHECK IF GROUPS AND USERS EXIST ALREADY IN LOCAL STORAGE
  if(localStorage.getItem('groups') == null || localStorage.getItem('users') == null){
    var groups = [
      {name: 'Backlog'},
      {name: 'Pending'},
      {name: 'On Hold'},
      {name: 'In Progress'},
      {name: 'Completed'}
    ]
    var users = [
      {name: 'John Doe', email:'john@gmail.com'},
      {name: 'Freddy Kyle', email:'kyle@gmail.com'},
      {name: 'jeanny Bol', email:'jeanny@gmail.com'},
      {name: 'Francois Billy', email:'billy@gmail.com'},
      {name: 'Hurley steve', email:'steve@gmail.com'}
    ]
    localStorage.setItem('groups', JSON.stringify(groups))
    localStorage.setItem('users', JSON.stringify(users))
  }
}

function loadGroups(){
  var groups = JSON.parse(localStorage.getItem('groups'))
  if(groups.length > 0){
    var groupContainer = document.querySelector('.task__board-container')
    if(groupContainer !== 'undefined'){
      groups.map(function(group){
        groupContainer.innerHTML += `<div class="task__board-card">
          <div class="task__board-card-title">
            <h2 class="${group.name.toLowerCase().replace(' ', '-')}">${group.name} <button id="add-backlog" class="add-task">+</button></h2>
            <div class="tasks-card-container">
              <ul class="tasks-list">

              </ul>
            </div>
          </div>
        </div>`
      })


  }
}

function loadFormData(){
  //HTML ELEMENTS
  var groupsHTMLEl = document.getElementById('groups')
  var userHTMLEl = document.getElementById('users')

  //LOCAL STORAGE
  var groups = JSON.parse(localStorage.getItem('groups'))
  var users = JSON.parse(localStorage.getItem('users'))
  // for(var i = 0 ; i < groups.length; i++){
  //   groupsHTMLEl.innerHTML +=`<option value=${i}>${groups[i].name}</option>`
  // }
  groups.map(function(group, index){
    groupsHTMLEl.innerHTML += `<option value=${index}>${group.name}</option>`
  })

  users.map(function(user, index){
    userHTMLEl.innerHTML += `<option value=${index}>${user.name}</option>`
  })
}

document.getElementById('add-task-form').addEventListener('submit', createTask)

function createTask(e){
  e.preventDefault()
  var tasks = []
  var task = {
    name:document.getElementById('task-name').value,
    groupId:document.getElementById('groups').value,
    userId:document.getElementById('users').value
  }
  if(localStorage.getItem('tasks') != null){
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}


function displayTask(){
  var tasks = JSON.parse(localStorage.getItem('tasks'))
  var tasksList = document.querySelector('.tasks-list')
  var groups = JSON.parse(localStorage.getItem('groups'))
  console.log(groups);

  tasks.map(function(task){
    tasksList.innerHTML += `<li class="task-item" id="task-0" draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)">
    ${task.name}
    <span>${groups[parseInt(task.groupId)].name}</span>
      <span class="actions">
        <span class="edit"><img src="media/edit.png" alt=""></span>
        <span class="delete"><img src="media/remove.png" alt=""></span>
      </span>
    </li>`
  })
 }
}
