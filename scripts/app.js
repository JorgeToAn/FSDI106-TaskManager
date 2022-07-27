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
  console.log("Task button pressed!");
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
    displayTask(newTask);
    clearForm();
  }
}

function displayTask(task) {
  console.log("Displaying", task);
  let syntax = 
  `<div class="task-block">
    <div class="task-title">
      <h4>${task.title}</h4>
      <hr class="x-solid">
      <p>${task.description}</p>
    </div>
    <div class="task-info">
      <p><i class="fa-solid fa-clock"></i> ${task.date}</p>
      <p><i class="fa-solid fa-location-dot"></i> ${task.location}</p>
    </div>
    <div class="task-status">
      <p>${task.status}</p>
    </div>
    <div class="task-remove">
      <i class="fa-solid fa-xmark"></i>
    </div>
  </div>`;

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

function init() {
  console.log("Starting init...");

  $("#icoImportant").click(toggleImportant);
  $("#btnHide").click(hideForm);
  $("#btnAddTask").click(addTask);
}

window.onload = init;
