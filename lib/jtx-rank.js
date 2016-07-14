function Rank(initRankInfos, maxRankNum, idName, compareFn) {
  this.rankList = initRankInfos;
  this.maxRankNum = maxRankNum;
  this.idName = idName;
  this.compareFn = compareFn;
  this.rankList.sort(compareFn);
  this.rankList = this.rankList.slice(0, maxRankNum);
}

Rank.prototype.getRankList = function getRankList() {
  return this.rankList;
};

Rank.prototype.clear = function clear() {
  this.rankList = [];
};

Rank.prototype.insert = function insert(rankInfo) {
  var len = this.rankList.length;
  for (var i = 0; i < len; i++) {
    var info = this.rankList[i];
    if (info[this.idName] === rankInfo[this.idName]) {
      if (this.compareFn(info, rankInfo) > 0) {
        this.rankList[i] = rankInfo;
        this.rankList.sort(this.compareFn);
      }
      return;
    }
  }

  if (len === this.maxRankNum) {
    if (this.compareFn(this.rankList[len - 1], rankInfo) > 0) {
      this.rankList[len - 1] = rankInfo;
      this.rankList.sort(this.compareFn);
    }
  } else {
    this.rankList.push(rankInfo);
    this.rankList.sort(this.compareFn);
  }
};

// 更新排行榜
Rank.prototype.update = function update(rankInfo) {
  var len = this.rankList.length;
  // 用户信息在排行榜
  for (var i = 0; i < len; i++) {
    var info = this.rankList[i];
    if (info[this.idName] === rankInfo[this.idName]) {
      this.rankList[i] = rankInfo;
      this.rankList.sort(this.compareFn);
      return;
    }
  }

  // 用户信息不再排行榜
  if (len === this.maxRankNum) {
    if (this.compareFn(this.rankList[len - 1], rankInfo) > 0) {
      this.rankList[len - 1] = rankInfo;
      this.rankList.sort(this.compareFn);
    }
  } else {
    this.rankList.push(rankInfo);
    this.rankList.sort(this.compareFn);
  }
};

var rankObjList = {};
exports.create = function create(name, initRankInfos, maxRankNum, idName, compareFn) {
  if (rankObjList[name]) {
    return rankObjList[name];
  }
  return (rankObjList[name] = new Rank(initRankInfos, maxRankNum, idName, compareFn));
};

exports.get = function get(name) {
  return rankObjList[name] ? rankObjList[name] : null;
};