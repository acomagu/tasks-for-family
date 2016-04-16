'use strict';

import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class ListPage extends React.Component {}

class AddTaskPage extends React.Component {}

class RankingPage extends React.Component {}

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'ListPage'
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
      'RankingPage': (<RankingPage onChangePage={this.handleChangePage.bind(this)} />)
    };
    return pages[this.state.currentPage];
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
      <PageContainer />
    ),
    document.querySelector('.app')
  );
});
