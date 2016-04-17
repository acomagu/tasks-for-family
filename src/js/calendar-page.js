import React from 'react';
import ReactDOM from 'react-dom';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import DB from './db.js';

export default class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    BigCalendar.setLocalizer(
      BigCalendar.momentLocalizer(Moment)
    );
    // BigCalendar.momentLocalizer(Moment);
    this.state = {
      events: []
    };
  }
  componentDidMount() {
    let db = new DB();
    db.getAllActiveWorks().then((allActiveWorks) => {
      return allActiveWorks.map((work) => ({
        title: work.work_contents,
        start: new Date(work.createDate),
        end: work.end_day ? new Date(work.end_day) : new Date()
      }));
    }).then(((events) => {
      console.log(events);
      this.setState({
        events
      });
    }).bind(this));
  }
  render() {
    let bigCalendarStyles = {
      height: '300px'
    };
    return (
      <div className="calendar-page">
        <BigCalendar events={this.state.events} startAccessor='start' endAccessor='end' style={bigCalendarStyles} />
      </div>
    );
  }
}

let documentReadyPromise = new Promise((resolve, reject) => {
  if(document.readyState == 'complete') resolve();
  document.addEventListener('DOMContentLoaded', () => {
    resolve();
  });
});

documentReadyPromise.then(() => {
  ReactDOM.render(
    (
      <CalendarPage />
    ),
    document.querySelector('.app')
  );
});
