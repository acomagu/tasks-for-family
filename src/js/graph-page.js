import React from 'react';
import ReactDOM from 'react-dom';
import Highcharts from 'react-highcharts';
import DB from './db.js';

class RankingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let db = new DB();
    db.getAllUserPoints().then((obj) => {
      console.log(obj);
      this.setState({
        points: obj.map((v, i) => v['Score']),
        users: obj.map((v, i) => v['Name'])
      });
    });
  }
  render() {
    return (
      <div className="ranking-page">
        <Graph points={this.state.points} users={this.state.users} width={300} height={300} />
        <Posts />
      </div>
    );
  }
}

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let config = {
      "chart": {
        "zoomType": "xy", // ズームタイプ。 x: x軸のみ / y: y軸のみ / xy: xy軸,
        "width": this.props.width, // グラフの高さ。指定しないとデフォルト値400になる
        "height": this.props.height // グラフの高さ。指定しないとデフォルト値400になる
      },
      "title": {
        "text": "" // グラフのタイトル
      },
      "subtitle": {
        "text": "" // グラフのサブタイトル
      },
      "xAxis": [{
        "categories": this.props.users, // x軸の値を具体的に指定
        "crosshair": true, // 選択箇所の縦横を強調するか
        "labels": {
          "step": 1 // x軸のメモリ表示間隔。指定しないと自動判定される。
        }
      }],
      "yAxis": [ // 2つ以上の縦軸を用意する場合は複数の要素を定義する
      {
        "labels": {
          "format": "{value}" // 縦軸パラメータ表示フォーマット
        },
        "title": {
          "text": "" // 縦軸の名前
        }
      },
      {
        "labels": {
          "format": "{value}" // 縦軸パラメータ表示フォーマット
        },
        "title": {
          "text": "" // 縦軸の名前
        },
        "opposite": true, // 縦軸の表示が反対側になる
        "min": 20 // 本y軸の最小値
      }
      ],
      "tooltip": {
        "shared": true // 複数の値を同じtooltipに表示するか
      },
      "series": [
        {
          "name": "Points", // 連続値の名前
          "type": "column", // グラフタイプ
          "data": this.props.points, // データの配列
          "tooltip": {
            "valueSuffix": "" // tooltip内で表示する値のsuffix
          }
        }
      ]
    };
    return (<Highcharts config={config} />);
  }
}

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          content: 'プログラム書く',
          deadline: new Date(2016, 4, 17)
        },
        {
          content: '寝る',
          deadline: new Date(2016, 4, 18)
        }
      ]
    };
  }
  render() {
    let elements = Array(2).fill().map((v, i) =>
      <Post post={this.state.posts[i]} key={i} />
    );
    return (
      <div className="posts">
        {elements}
      </div>
    );
  }
}

class Post extends React.Component {
  render() {
    return (
      <div className="post">
        <div className="content">{this.props.post.content}</div>
        <div className="deadline">{this.props.post.deadline.getMonth()}/{this.props.post.deadline.getDate()}まで</div>
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
      <RankingPage />
    ),
    document.querySelector('.graph-app')
  );
});
