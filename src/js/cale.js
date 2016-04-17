// This is a JavaScript file
import DB from './db.js';

$(document).ready(function() {
  var userEvents = [];
  let db = new DB();
  db.getAllActiveWorks().then((userworks) => {
    for(var i = 0; i < userworks.length; i++){
      userEvents.push({
        title: userworks[i].work_contents,
        start: userworks[i].createDate,
        end: userworks[i].end_day
      });
    }
    console.log(userworks, userEvents);
    return userEvents;
  }).then((userEvents) => {
    $('#calendar').fullCalendar({
      theme: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month, agendaWeek, agendaDay'
      },
      defaultDate: '2016-01-12',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: userEvents,
    });
  });
});
