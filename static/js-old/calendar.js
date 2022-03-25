$(document).ready(function () {
  new Calendar({
    id: "#color-calendar",
    theme: "glass",
    calendarSize: "small",
    customWeekdayValues: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
    customMonthValues: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    eventsData: [
      {
        id: 1,
        name: "Event 1",
        start: "2022-01-17T06:00:00",
        end: "2022-01-18T20:30:00",
      },
      {
        id: 2,
        name: "Event 2",
        start: "2022-01-27T10:00:00",
        end: "2022-01-30T11:30:00",
      },
    ],
  });

  $(".item_clickeable").on("click", function () {
    var box_blue = $(this).hasClass("box_blue");
    var box_green = $(this).hasClass("box_green");
    var box_purple = $(this).hasClass("box_purple");
    var href = $(this).attr("href");
    $(".card_calendar").not(".item_clickeable").removeClass("active");
    if (box_blue) {
      $(href).not(".item_clickeable").addClass("active");
    }
    if (box_green) {
      $(href).not(".item_clickeable").addClass("active");
    }
    if (box_purple) {
      $(href).not(".item_clickeable").addClass("active");
    }
  });
});
