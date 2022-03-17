$(document).ready(function () {
  /* DESPLEGAR BUSCADOR */
  $("#search_icon").on("click", function () {
    $("#menu_desktop").find(".nav-item").find(".active").removeClass("active");
    var languageBoxIsVisible =
      document.getElementById("language_box").style.display;
    if (languageBoxIsVisible === "block") {
      $("#language_box").fadeOut(350);
    }
    if ($("#navbarHeaderMenu").css("display") === "block") {
      $("#navbarHeaderMenu").toggleClass("show");
    }
    $("#search_box").slideToggle("fast");
    $("#search_icon").toggleClass("active");
  });

  /* DESPLEGAR SELECTOR DE LENGUAJE */
  $("#language_button").on("click", function () {
    $("#menu_desktop").find(".nav-item").find(".active").removeClass("active");
    var searchBoxIsVisible =
      document.getElementById("search_box").style.display;
    if (searchBoxIsVisible === "block") {
      $("#search_box").fadeOut(350);
    }
    if ($("#navbarHeaderMenu").css("display") === "block") {
      $("#navbarHeaderMenu").toggleClass("show");
    }
    $("#language_box").slideToggle("fast");
    $("#language_button").toggleClass("active");
  });

  /* DESPLEGAR SUBMENU CON CLICK */
  $("#menu_desktop")
    .find(".nav-item")
    .on("click", function () {
      $("#language_box").fadeOut(150);
      $(".nav-item").not(this).find(".nav-link").removeClass("active");
      $(".nav-item").not(this).find(".submenu_content").removeClass("active");
      $(this).find(".submenu_content").toggleClass("active");
      $(this).find(".nav-link").toggleClass("active");
    });

  /* DESPLEGAR MENU MOBILE */
  $("#navbarHeaderMenu")
    .find(".list > .item > .link")
    .on("click", function () {
      $(this).parent().find(".submenu").slideToggle("fast");
      $(this).find("i").toggleClass("rotate");
    });
  $("#navbarHeaderMenuButton").on("click", function () {
    if ($("#search_box").css("display") === "block") {
      $("#search_box").fadeOut(350);
    }
    if ($("#language_box").css("display") === "block") {
      $("#language_box").fadeOut(350);
    }
    $("#navbarHeaderMenuButton")
      .find(".line:not(:first)")
      .toggleClass("burger_effect");
  });
});
