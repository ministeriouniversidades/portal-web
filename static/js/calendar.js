function initCalendarEvents(events) {
  if (events.length) {
    $("#homeEvents, #slider_eventCalendar").removeClass('d-none')
    $("#no_events").addClass('d-none')
    let row = document.createElement('div')
    let items = ''
    row.className = "row";
    events.forEach((event, index) => {
      let shortEventTime = moment(event.start).format("HH:mm")
      let startEventTime = moment(event.start).format('LL')
      let item = `<div class="col-sm-6 items">
                    <a class="card card_calendar ${event.event_type}" href="${baseURL}eventos?event_id=${moment(event.start).format('YYYY-MM-DD')}">
                      <div class="row g-0 w-100 d-flex h-158">
                        <div class="col-4 date_icon">
                        <div class="icon">
                            <i class="far fa-calendar-check"></i>
                          </div>
                          <div class="time">
                          ${shortEventTime}
                          </div>
                        </div>
                        <div class="col-8 info box_text">
                          <div class="card-body">
                            <p class="card-text">${startEventTime}</p>
                            <h5 class="card-title">${event.event_cat}</h5>
                            <p class="card-light">${event.event_desc_info}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>`
      items += item
    })
    row.innerHTML = items
    $("#homeEvents").html(row)
    }else {
    $("#homeEvents, #slider_eventCalendar").addClass('d-none')
    $("#no_events").removeClass('d-none')
    }
}

$(document).ready(function () {
  loadJsonEvents()

  new Calendar({
    id: "#color-calendar",
    theme: "glass",
    calendarSize: "small",
    customWeekdayValues: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
	startWeekday: 1,
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
    eventsData: pagesIndex,
    dateChanged: (date) => { 
      initCalendarEvents(searchEvents(moment(date), pagesIndex)) }
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
