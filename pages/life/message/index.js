const {
  writemessage,
  getmessage,
  userInfo
} = require("../../../utils/http.js");
const app = getApp()

const SIZE = 8

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    focus: false,
    show: false,
    list: [],
    currentPage: 1,
    pageSize: SIZE,
    count: '',
    total: '',
    userInfo: {},
  },
  // 获取用户权限
  onGotUserInfo(e) {
    let that = this
    let data = e.detail.userInfo
    let OPENID = app.globalData.openid
    if (data != null) {
      data.openid = OPENID
      userInfo(data).then(res => {
        that.setData({
          userInfo: data,
          show: true,
          focus: true
        })
      })
    }
  },
  bindTextAreaBlur: function(e) {
    let value = e.detail.value
    this.setData({
      value
    })
  },
  bindconfirm(e) {
    let that = this;
    let value = this.data.value
    let {
      avatarUrl,
      nickName,
      openid
    } = this.data.userInfo
    this.close()
    writemessage({
      avatarUrl,
      nickName,
      openid,
      value
    }).then(res => {
      if (res.code == 0){
        wx.showToast({
          icon:'success',
          title: res.data,
        })
        that.onPullDownRefresh()
      }else{
        wx.showToast({
          icon: 'none',
          title: res.data,
        })
      }
    })
  },
  write() {
    this.setData({
      focus: true,
      show: true
    })
  },
  close() {
    this.setData({
      focus: false,
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let {
      currentPage,
      pageSize
    } = this.data
    getmessage({
      currentPage,
      pageSize
    }).then(res => {
      if (res.code == 0) {
        that.setData({
          currentPage: res.data.page,
          pageSize: res.data.num,
          list: res.data.data,
          count: res.data.count,
          total: res.data.total
        })
      }
    })
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
    let that = this
    getmessage({
      currentPage: 1,
      pageSize: SIZE
    }).then(res => {
      if (res.code == 0) {
        that.setData({
          currentPage: res.data.page,
          pageSize: res.data.num,
          list: res.data.data,
          count: res.data.count,
          total: res.data.total
        })
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this
    let {
      list,
      currentPage,
      pageSize,
      total
    } = this.data
    if (currentPage === total) {
      wx.showToast({
        icon: "none",
        title: '别拉了，加载完啦！',
        mask: true
      })
      return
    }
    getmessage({
      currentPage: currentPage + 1,
      pageSize
    }).then(res => {
      if (res.code == 0) {
        that.setData({
          currentPage: res.data.page,
          pageSize: res.data.num,
          list: list.concat(res.data.data),
          count: res.data.count,
          total: res.data.total
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})