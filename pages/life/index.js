// pages/life/index.js
const {
  userInfo
} = require('../../utils/http.js');
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      id: 'wechat',
      img: './img/wechat.png',
      text: '微信号：life714613002',
      value: 'life714613002',
    }, {
      id: 'github',
      img: './img/github.png',
      text: 'github地址：https://github.com/hanlife',
      value: 'https://github.com/hanlife'
    }, {
      id: 'weibo',
      img: './img/weibo.png',
      text: '微博名：你是否我会觉得我不错',
      value: '你是否我会觉得我不错'
    }, {
      id: 'works',
      img: './img/production.png',
      text: '敬请期待...',
      value: ''
    }],
    show: false,
    showMessge: {}
  },
  
  toLable(e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },
  showTip(e) {
    let ID = e.currentTarget.dataset.id;
    if (ID === "works") {
      wx.showLoading({
        title: '敬请期待',
        duration: 1000
      })
      return
    }
    let showMessge = this.data.list.filter(v => {
      return ID === v.id
    })[0]
    this.setData({
      show: true,
      showMessge
    })
  },
  copy(e) {
    let that = this;
    let val = e.currentTarget.dataset.val;
    wx.setClipboardData({
      data: val,
      success: function(res) {
        that.setData({
          show: false,
          showMessge: {}
        })
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  hide() {
    this.setData({
      show: false,
      showMessge: {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '前端个人小程序，请多多指教！',
      path: '/pages/life/index'
    }
  }
})