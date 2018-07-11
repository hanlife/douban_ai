//app.js

App({
  globalData: {
    userInfo: null,
    // rootUrl:"http://www.f2ehan.com",
    // rootUrl:'http://192.168.5.52:3000',
    rootUrl: 'http://localhost:3000',
    openid: '',
    session_key: '',
  },
  onLaunch: function() {
    let that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          const {
            getOpenid
          } = require("./utils/http.js");
          getOpenid({
            code: res.code
          }).then(res => {
            that.globalData.openid = res.openid
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

})

// {
//   "pagePath": "pages/index/index",
//   "text": "AI",
//   "iconPath": "./image/ai.png",
//   "selectedIconPath": "./image/ai-s.png"
// },