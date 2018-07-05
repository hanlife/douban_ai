const app = getApp()
const rootUrl = app.globalData.rootUrl;


// 判断code----数据请求封装
function POST(url, params) {
  let promise = new Promise(function (resolve, reject) {
    wx.showLoading({
      title: '数据加载中...',
      mask:true
    })
    wx.request({
      url: rootUrl + url,
      data: params || {},
      method: 'POST',
      success: function (res) {
        resolve(res.data);
      },
      fail: function (error) {
        wx.showModal({
          title: '错误提示',
          content: '网络错误：' + error.errMsg,
          showCancel: false
        })
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  });
  return promise
}

module.exports = {
  // 正在热映
  in_theaters: function (data) {
    return POST('/douban/in_theaters', data);
  },
  top250: function (data) {
    return POST('/douban/top250', data);
  },
  search: function (data) {
    return POST('/douban/search', data);
  },
  subject: function (data) {
    return POST('/douban/subject', data);
  },
}