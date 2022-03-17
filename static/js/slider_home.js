$(document).ready(function () {
  var swiper = new Swiper("#slider_home", {
    loop: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const isSliderActive = true;
  $("#btn-stop").click(function () {
    if (isSliderActive) {
      swiper.autoplay.stop();
      isSliderActive = false;
    } else {
      mySwiper.autoplay.start();
      isSliderActive = true;
    }
  });

  // Slider box_cards_blue

  var swiper2 = new Swiper("#slider_cardsBlue", {
    spaceBetween: 15,
    slidesPerView: 1.4,
    centeredSlides: true,
    loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      400: {
        slidesPerView: 1.6,
      },
      500: {
        slidesPerView: 2.2,
      },
      768: {
        slidesPerView: 2.8,
      }
    },
  });

  // Slider Cards download

  var swiper2 = new Swiper("#slider_download_archive", {
    spaceBetween: 20,
    slidesPerView: 1.7,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Slider box_cards_small

  var swiper3 = new Swiper("#slider_cardsSmall", {
    spaceBetween: 15,
    slidesPerView: 2.2,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      550: {
        slidesPerView: 2.2,
      },
      768: {
        slidesPerView: 4.2,
      },
      991: {
        slidesPerView: 5,
      },
    },
  });

  // Slider slider_eventCalendar

  var swiper4 = new Swiper("#slider_eventCalendar", {
    spaceBetween: 15,
    slidesPerView: 1.3,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      550: {
        slidesPerView: 2.2,
      },
      768: {
        slidesPerView: 2.4,
      },
      991: {
        slidesPerView: 2.4,
      },
    },
  });

  var swiper5 = new Swiper("#slider_eventCalendarShedule", {
    spaceBetween: 15,
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      550: {
        slidesPerView: 2.2,
      },
      768: {
        slidesPerView: 2.4,
      },
      991: {
        slidesPerView: 2.4,
      },
    },
  });

  var swiper2 = new Swiper("#slider_campus", {
    spaceBetween: 15,
    slidesPerView: 1.4,
    centeredSlides: true,
    loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      400: {
        slidesPerView: 1.6,
      },
      500: {
        slidesPerView: 2.2,
      },
      768: {
        slidesPerView: 2.8,
      }
    },
  });

  $("#slider_home").on("scroll", function () {
    $(".swiper-slide").css({
      "background-position": $(this).scrollLeft() / 6 - 100 + "px 0",
    });
  });

  $("#btn_pause_slider_home").click(function () {
    $("#slider_ppal_home_boots").carousel("pause");
  });
});
