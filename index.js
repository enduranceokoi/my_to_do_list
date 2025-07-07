window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  // Reverse the saved list so newer tasks appear on top
  saved.reverse().forEach(task => renderTask(task.text, task.completed));
  updateProgress();
};



function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(e) {
  if (e) e.preventDefault();
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text) {
    renderTask(text);
    input.value = "";
    saveTasks();
    updateProgress(); // <- add this
  }
}

function updateProgress() {
  const allTasks = document.querySelectorAll("#taskList li");
  const completedTasks = document.querySelectorAll("#taskList li.completed");
  
  const total = allTasks.length;
  const completed = completedTasks.length;
  
  // Update progress number
  document.getElementById("numbers").textContent = `${completed} / ${total}`;

  // Update progress bar width
  const progress = document.getElementById("progress");
  const percent = total === 0 ? 0 : (completed / total) * 100;
  progress.style.width = `${percent}%`;
}




function renderTask(text, completed = false) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
    updateProgress();
  };

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  const editBtn = document.createElement("button");
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square fa-2x"></i>`;
  editBtn.className = "action-btn edit";
  editBtn.onclick = () => editTask(span);

  const delBtn = document.createElement("button");
  delBtn.innerHTML = `<i class="fa-solid fa-trash fa-2x"></i>`;
  delBtn.className = "action-btn delete";
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
    updateProgress();
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  if (completed) li.classList.add("completed");

  // 🔼 Add new tasks at the top
  const taskList = document.getElementById("taskList");
  taskList.insertBefore(li, taskList.firstChild);
};


function editTask(span) {
  const newText = prompt("Edit your task:", span.textContent);
  if (newText !== null) {
    span.textContent = newText.trim();
    saveTasks();
    updateProgress();
  }
}


document.addEventListener('keydown', (event)=>{
    // console.log(event)
    // if(event.which === 32 ){
    //     addTask();
    // }

    // if(event.which === 37 ){
    //     addTask();
    // }
    // if(event.which === 39 ){
    //     addTask();
    // }
  
    if(event.which === 13 ){
        addTask();
    }
})
// cometo45@#