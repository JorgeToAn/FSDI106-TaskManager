const IMP_CLASS = "fa-solid";
const NONIMP_CLASS = "fa-regular";
let isImportant = false;
const HIDE_BRACKET = "fa-angles-left";
const SHOW_BRACKET = "fa-angles-right";
let isFormHidden = false;

function toggleImportant() {
  let icon = $("#taskImportant");
  if (!isImportant) {
    icon.removeClass(NONIMP_CLASS);
    icon.addClass(IMP_CLASS);
    isImportant = true;
  } else {
    icon.removeClass(IMP_CLASS);
    icon.addClass(NONIMP_CLASS);
    isImportant = false;
  }
}

function hideForm() {
  let icon = $("#btnHide");
  
  if (!isFormHidden){
    $(".form").fadeToggle(300);
    $(".sec-form").animate({ flexGrow: "0.001" }, "slow");
    icon.removeClass(HIDE_BRACKET);
    icon.addClass(SHOW_BRACKET);
    isFormHidden = true;
  } else {
    $(".sec-form").animate({ flexGrow: "3" }, "slow");
    $(".form").fadeToggle(300);
    icon.removeClass(SHOW_BRACKET);
    icon.addClass(HIDE_BRACKET);
    isFormHidden = false;
  }
}

function init() {
  console.log("Starting init...");

  $("#taskImportant").click(toggleImportant);
  $("#btnHide").click(hideForm);
}

window.onload = init;
