function enable() {
  console.log("Enabling");
  $("#enable").prop("disabled",true);
  $("#disable").prop("disabled",false);

}

function disable() {
  console.log("Disabling");
  $("#disable").prop("disabled",true);
  $("#enable").prop("disabled",false);


}

$(window).on("load", function() {

});

$(document).ready(function() {
  $("#enable").on("click", enable);
  $("#disable").on("click", disable);

});
