'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import AddTaskPage from './add-task-page.js';
import CalendarPage from './calendar-page.js';

class ListPage extends React.Component {}

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'CalendarPage'
    };
  }
  handleChangePage(pageName) {
    this.setState({
      currentPage: pageName
    });
  }
  render() {
    let pages = {
      'ListPage': (<ListPage onChangePage={this.handleChangePage.bind(this)} />),
      'AddTaskPage': (<AddTaskPage onChangePage={this.handleChangePage.bind(this)} />),
      'GraphPage': (<RankingPage onChangePage={this.handleChangePage.bind(this)} />),
      'CalendarPage': (<CalendarPage onChangePage={this.handleChangePage.bind(this)} />)
    };
    return (
      <div className="page-container">
        {pages[this.state.currentPage]}
        // <Footbar onClickButton={this.handleChangePage.bind(this)} active={this.state.currentPage} />
      </div>
    );
  }
}

// class Footbar extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className="footbar">
//         <ons-navigator></ons-navigator> 
//         <ons-tabbar>
//           <ons-tab label="ホーム" icon="fa-home" onClick={this.props.onClickButton('HomePage')} active={this.props.active == 'HomePage'}></ons-tab>
//           <ons-tab label="カレンダー" icon="fa-calendar" onClick={this.props.onClickButton('CalendarPage')} active={this.props.active == 'CalendarPage'}></ons-tab>
//           <ons-tab label="グラフ" icon="fa-bar-chart" onClick={this.props.onClickButton('GraphPage')} active={this.props.active == 'GraphPage'}></ons-tab>
//         </ons-tabbar>
//       </div>
//     );
//   }
// }

let documentReadyPromise = new Promise((resolve, reject) => {
  if(document.readyState == 'complete') resolve();
  document.addEventListener('DOMContentLoaded', () => {
    resolve();
  });
});

documentReadyPromise.then(() => {
  ReactDOM.render(
    (
      <PageContainer />
    ),
    document.querySelector('.app')
  );
});
