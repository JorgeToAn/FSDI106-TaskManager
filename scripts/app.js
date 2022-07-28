const GET_SERVER = "https://fsdiapi.azurewebsites.net/api/tasks";
const POST_SERVER = "https://fsdiapi.azurewebsites.net/api/tasks/";
const IMP_CLASS = "fa-solid";
const NONIMP_CLASS = "fa-regular";
let isImportant = false;
const HIDE_BRACKET = "fa-angles-left";
const SHOW_BRACKET = "fa-angles-right";
let isFormHidden = false;

function toggleImportant() {
  let icon = $("#icoImportant");
  if (!isImportant) {
    icon.removeClass(NONIMP_CLASS).addClass(IMP_CLASS);
    isImportant = true;
  } else {
    icon.removeClass(IMP_CLASS).addClass(NONIMP_CLASS);
    isImportant = false;
  }
}

function hideForm() {
  let icon = $("#btnHide");
  
  if (!isFormHidden){
    $(".form").fadeToggle(300);
    $(".sec-form").animate({ flexGrow: "0.001" }, "slow");
    icon.removeClass(HIDE_BRACKET).addClass(SHOW_BRACKET);
    isFormHidden = true;
  } else {
    $(".sec-form").animate({ flexGrow: "3" }, "slow");
    $(".form").fadeToggle(300);
    icon.removeClass(SHOW_BRACKET).addClass(HIDE_BRACKET);
    isFormHidden = false;
  }
}

function addTask(){
  let title = $("#txtTitle").val();
  let description = $("#txtDesc").val();
  let date = $("#dateDue").val();
  let location = $("#txtLocation").val();
  let color = $("#txtColor").val();
  let emoji = $("#selEmoji").val();
  let status = $("#selStatus").val();
  let notification = $("#cbxNotif").prop("checked");

  let newTask = new Task(isImportant, title, description, date, location, color, emoji, status, notification);
  if(newTask.isValid()){
    //send task to the server
    $.ajax({
      type: "POST",
      url: POST_SERVER,
      data: JSON.stringify(newTask),
      contentType: "application/json",
      success: function(response) {
        console.log("Server says", response);
        displayTask(newTask);
        clearForm();
      },
      error: function(errorDetails) {
        console.log("Error saving task", errorDetails);
      }
    });

  }
}

function createSyntax(task) {
  let syntax = `<div class="task-block" style="border: 2px solid ${task.color}">`;

  if(task.important){
    syntax += 
    `<div class="task-importance">
      <i class="${IMP_CLASS} fa-star"></i>
      <p>${task.emoji}</p>
    </div>`;
  } else {
    syntax += 
    `<div class="task-importance">
      <i class="${NONIMP_CLASS} fa-star"></i>
      <p>${task.emoji}</p>
    </div>`;
  }
  syntax += 
  `<div class="task-title">
    <h4>${task.title}</h4>
    <hr class="x-solid">
    <p>${task.description}</p>
  </div>
  <div class="task-info">
    <p><i class="fa-solid fa-clock"></i> ${task.date}</p>
    <p><i class="fa-solid fa-location-dot"></i> ${task.location}</p>
  </div>`;
  if(task.notification){
    syntax += 
    `<div class="task-status">
      <p>${task.status}</p>
      <p>Will notify</p>
    </div>`;
  } else {
    syntax += 
    `<div class="task-status">
      <p>${task.status}</p>
    </div>`;
  }
  syntax += 
  `<div class="task-remove">
    <i class="fa-solid fa-xmark"></i>
  </div>
  </div>`;

  return syntax;
}

function displayTask(task) {
  let syntax = createSyntax(task);

  $(document).on("click", "i.fa-xmark", function(){
    $(this).parent().parent().remove();
  });

  $("#pendingTasks").append(syntax);
}

function clearForm() {
  $(".group input").removeClass("is-invalid");

  $("#txtTitle").val("");
  $("#txtDesc").val("");
  $("#dateDue").val("");
  $("#txtLocation").val("");
  $("#selStatus").val("New");
}

function fetchTasks() {
  $.ajax({
    type: "GET",
    url: GET_SERVER,
    success: function(response) {
      let tasks = JSON.parse(response);
      for(let i=0; i<tasks.length; i++) {
        let task = tasks[i];
        if(task.name == "Jorge"){
          displayTask(task);
        }
      }

    },
    error: function(errorDetails) {
      console.log("Error fetching tasks", errorDetails);
    }
  })
}

function init() {
  //hook events
  $("#icoImportant").click(toggleImportant);
  $("#btnHide").click(hideForm);
  $("#btnAddTask").click(addTask);

  //load initial data
  fetchTasks();
}

window.onload = init;
