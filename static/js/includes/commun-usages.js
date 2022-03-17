var $results, lunrEventsIndex, pagesIndex, searchPages, lunrIndex;
var  selectedEvents = [];
const eventsPages = baseURL + "/js/events/EventsIndex.json"
const searchIndexPages = baseURL + "/js/lunr/PagesIndex.json"

window['moment-range'].extendMoment(moment);

function initLunr() {
    // First retrieve the index file
    $.ajaxSetup({
        async: false
    });
    $.getJSON(searchIndexPages)
        .done(function(index) {
            searchPages = index;
            // console.log("index:", searchPages);
            // Set up lunrjs by declaring the fields we use
            // Also provide their boost level for the ranking
            // Feed lunr with each file and let lunr actually index them
            lunrIndex = lunr(function() {
                // ref is the result item identifier (I chose the page URL)
                this.ref("href");
                this.field("title");
                // this.field("news_desc");
                // this.field("news_title");
                this.field("content");
                // this.field("section_title_1");
                // this.field("section_contenido_1");
                // this.field("section_title_2");
                // this.field("section_contenido_2");
                // this.field("section_title_3");
                // this.field("section_contenido_3");
                // this.field("section_title_4");
                // this.field("section_contenido_4");
                // this.field("section_title_5");
                // this.field("section_contenido_5");
                // this.field("section_title_6");
                // this.field("section_contenido_6");
                // this.field("section_title_7");
                // this.field("section_contenido_7");
                // this.field("section_title_8");
                // this.field("section_contenido_8");
                // this.field("section_title_9");
                // this.field("section_contenido_9");
                // this.field("section_title_10");
                // this.field("section_contenido_10");
                // this.field("section_title_11");
                // this.field("section_contenido_11");
                // this.field("section_title_12");
                // this.field("section_contenido_12");
                // this.field("section_title_13");
                // this.field("section_contenido_13");
                // this.field("section_title_14");
                // this.field("section_contenido_14");
                // this.field("section_title_15");
                // this.field("section_contenido_15");
                // this.field("section_title_16");
                // this.field("section_contenido_16");

                searchPages.forEach(function (page) {
                    this.add(page)
                }, this)
            });
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error getting Hugo index file:", err);
        });
}
/**
         * Trigger a search in lunr and transform the result
         *
         * @param  {String} query
         * @return {Array}  results
         */
function search(query) {
    return lunrIndex.search(query).map(function(result) {
            return searchPages.filter(function(page) {
                return page.href === result.ref;
            })[0];
        });
}

function loadJsonEvents() {
    $.ajaxSetup({
        async: false
    });
  
    $.getJSON(eventsPages)
        .done(function(index) {
            pagesIndex = index;
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error getting Hugo index file:", err);
        });
  }

//   function searchEvents(selectedDay, jsonEvents) {
//     let selectedEvents = $(jsonEvents).filter(function (index, event) {
//       if(event.start === undefined && event.end === undefined) return false
//       let start = moment(event.start).format("YYYY-MM-DD");
//       let end = moment(event.end).format("YYYY-MM-DD");
//       let range = moment().range(start, end);
//       return range.contains(moment(selectedDay, 'YYYY-MM-DD'))
//     });
//     return selectedEvents;
//   }
function sortEvents(events) {
    events.sort(function(eventOne,eventTwo){
        if (moment(eventTwo.start, 'YYYY-MM-DD').isSame(moment(eventOne.start).format('YYYY-MM-DD'))) {
            return moment(eventOne.start, 'YYYY-MM-DD hh:mm:ss').diff(moment(eventTwo.start, 'YYYY-MM-DD hh:mm:ss'))
        }
        return moment(eventTwo.start).valueOf() + moment(eventOne.start).valueOf()
    });
    return events.slice(0, 4)
}
function getEventsBySelectedDay(selectedDay, jsonEvents, maxDaysForEvents) {
    let events = jsonEvents.filter(function (event, index) {
        if(event.start === undefined || event.end === undefined) return false
        let start = moment(event.start).format("YYYY-MM-DD");
        let end = moment(event.end).format("YYYY-MM-DD");
        let range = moment().range(start, end);
        return range.contains(moment(selectedDay, 'YYYY-MM-DD'))
    })
    if (events.length) {events.forEach(event => {
        if(selectedEvents.indexOf(event) === -1) selectedEvents.push(event)
    })}
    if(selectedEvents.length < 4) {
        if(maxDaysForEvents == 0) return (selectedEvents.length) ? selectedEvents = sortEvents(selectedEvents) : []
        maxDaysForEvents--
        getEventsBySelectedDay(moment(selectedDay).subtract(1, "days").format('YYYY-MM-DD'), jsonEvents, maxDaysForEvents)
    }else{
        selectedEvents = sortEvents(selectedEvents)
    }
}

function searchEvents(selectedDay, jsonEvents) {
    maxDaysForEvents = 31
    selectedEvents = []
    getEventsBySelectedDay(selectedDay, jsonEvents, maxDaysForEvents)
    return selectedEvents
}