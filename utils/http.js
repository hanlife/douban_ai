const app = getApp()
const rootUrl = app.globalData.rootUrl;


// 判断code----数据请求封装
function POST(url, params) {
  let promise = new Promise(function(resolve, reject) {
    wx.showLoading({
      title: '拼命加载中...',
      mask: true
    })
    wx.request({
      url: rootUrl + url,
      data: params || {},
      method: 'POST',
      success: function(res) {
        resolve(res.data);
      },
      fail: function(error) {
        wx.showModal({
          title: '错误提示',
          content: '网络错误：' + error.errMsg,
          showCancel: false
        })
      },
      complete: function() {
        wx.hideLoading();
      }
    })
  });
  return promise
}

module.exports = {
  // 正在热映
  in_theaters: function(data) {
    return POST('/douban/in_theaters', data);
  },
  top250: function(data) {
    return POST('/douban/top250', data);
  },
  search: function(data) {
    return POST('/douban/search', data);
  },
  subject: function(data) {
    return POST('/douban/subject', data);
  },
  celebrity: function(data) {
    return POST('/douban/celebrity', data);
  },
  search: function(data) {
    return POST('/douban/search', data);
  },
  // 小程序统计
  summary: function(data) {
    return POST('/wx/summary', data);
  },
  day: function(data) {
    return POST('/wx/day', data);
  },
  week: function(data) {
    return POST('/wx/week', data);
  },
  month: function(data) {
    return POST('/wx/month', data);
  },
  userInfo: function(data) {
    return POST('/wx/userInfo', data);
  },
  getmessage: function (data) {
    return POST('/wx/getmessage', data);
  },
  writemessage: function (data) {
    return POST('/wx/writemessage', data);
  },
  getOpenid: function(data) {
    return POST('/wx/getOpenid', data);
  },
}