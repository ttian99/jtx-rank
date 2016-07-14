# jtx-rank
jtx-rank is used for server to record the rank info

## How to use
```js
// 1.创建排行榜
/***
 * rankName: 排行榜名称
 * ranksInfo: 排行信息
 * maxRankNum: 排行榜最大记录个数
 * func: 排行榜的排序方法
 * */ 
var rank = require('jtx-rank');
var worldRanksInfos = [
  { id: 'user1', score: 1000 },
  { id: 'user2', score: 1001 },
  { id: 'user3', score: 999  }
];
var maxRankNum = 10;
var worldRank = rank.create('worldRank', worldRankInfos, maxRankNum, function(a, b) {
  return a.score > b.score;
});

// 2.获取排行榜
var currRank = worldRank.getRankList();

// 3.更新排行榜insert
worldRank.insert({ id: 'user3', score: 1002 });
// 4.更新排行榜update
worldRank.update({ id: 'user6', score: 1107 });

// 5.清空排行榜
worldRank.clear();

// 6.获取对应name的排行榜
var world = rank.get('worldRank');
```

## Installation
```sh
npm install --save ltc-rank
```

## Tests
```sh
npm install
npm test
```