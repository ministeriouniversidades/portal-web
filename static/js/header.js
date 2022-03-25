$(document).ready(function () {
  /* DESPLEGAR BUSCADOR */
  $("#search_icon").on("click", function () {
    $("#menu_desktop").find(".nav-item").find(".active").removeClass("active");
    var languageBoxIsVisible =
      document.getElementById("language_box").style.display;
    if (languageBoxIsVisible === "block") {
      $("#language_box").fadeOut(350);
    }
    $("#language_button").removeClass("active");
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
    $("#search_icon").removeClass("active");
  });
  $('section').on('mouseup', function() {
      $('#language_box').hide();
  });
  
  /* DESPLEGAR SUBMENU CON CLICK */
  $("#menu_desktop")
    .find(".nav-item")
    .on("click", function () {
      $("#language_box").fadeOut(150);
      $("#search_box").fadeOut(150);
      $("#search_icon").removeClass("active");
      $("#language_button").removeClass("active");
      $(".nav-item").not(this).find(".nav-link").removeClass("active");
      $(".nav-item").not(this).find(".submenu_content").removeClass("active");
      $(this).find(".submenu_content").toggleClass("active");
      $(this).find(".nav-link").toggleClass("active");
    });
    $('section').on('mouseup', function() {
      if ($('.nav-link').hasClass('active')) { 
        console.log("active");
        $('.nav-link').removeClass("active");
      }
      if ($('.submenu_content').hasClass('active')) { 
        console.log("CerroMenu");
        $('.submenu_content').removeClass("active");
      }
    });

    document.onkeydown = function(evt) {
      evt = evt || window.event;
        if (evt.keyCode == 27) {
          $("#language_box").hide();
          $("#search_box").hide();
          if ($('.submenu_content').hasClass('active')) {
            $('.submenu_content').removeClass("active");
            $('.nav-link').removeClass("active");
          }
          if ($('#language_button').hasClass('active')) {
            $('#language_button').removeClass("active");
          }
          if ($('#search_icon').hasClass('active')) {
            $('#search_icon').removeClass("active");
          }
        }
    };

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
