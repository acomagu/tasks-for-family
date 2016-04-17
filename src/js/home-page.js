import React from 'react';
import ReactDOM from 'react-dom';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: []
    };
  }
  componentDidMount() {
    let db = new DB;
    db.getAllActiveWorks().then(((works) => {
      this.setState({
        works
      });
    }).bind(this));
  }
  render() {
    let elements = this.state.works.map((work, i) => (
      <div className="work" key={i}>
        <img src="samune.png" style="float: left; width: 15%; padding: 10px 0 0 5px;" />
        <p style="position: absolute; color: green; width: 50%; padding: 60px 0 0 90px;">{work.work_contents}</p>
        <p style="position: absolute; font-size: 10px; width: 100%; padding: 150px 0 0 120px;">○人中△人完了 -- 4/20投稿</p>
        <img src="hukidasi.png" style="width: 58%; padding: 25px 0 0 4px;" />
      </div>
    ));

    return (
      <div className="home-page">
        {elements}
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
      <HomePage />
    ),
    document.querySelector('.home-app')
  );
});
