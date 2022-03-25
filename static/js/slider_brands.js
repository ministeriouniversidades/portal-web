// Slider Marcas

var swiper = new Swiper("#sliderMarcas", {
  slidesPerView: 2.2,
  centeredSlides: true,
  spaceBetween: 15,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    992: {
      slidesPerView: 7,
      spaceBetween: 30,
    },
  },
});

// Buttons Flotantes
var mybutton = document.getElementById("bnt-social-networks-floating");
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

$(document).ready(function () {
  $("#expand").on("click", function () {
    $("#sc").css({ height: "100%" });
  });
});

// Buton Scroll to top
var btn = $("#button-top");
$(window).scroll(function () {
  if ($(window).scrollTop() > 100) {
    btn.addClass("show");
  } else {
    btn.removeClass("show");
  }
});
btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "300");
});
