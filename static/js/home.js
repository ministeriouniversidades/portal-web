$(document).ready(function () {
  $("#search_icon").on("click", function () {
    $("#search_box").slideToggle("fast");
    $("#search_icon").toggleClass("active");
  });
  $("#language_button").on("click", function () {
    $("#language_box").slideToggle("fast");
    $("#language_button").toggleClass("active");
  });
});
