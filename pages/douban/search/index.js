// pages/douban/search/index.js
const {
  top250
} = require('../../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    keyword: '',
    Type: 'q',
    array: ["名称", "类型"],
    index: 0,
  },
  bindKeyInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    let Type = e.detail.value === 0 ? 'q' : 'tag';
    this.setData({
      index: e.detail.value,
      Type
    })
  },
  clear() {
    this.setData({
      keyword: '',
    })
  },
  choseType() {

  },
  comfrim() {
    let {
      keyword,
      Type
    } = this.data
    if (keyword === '') {
      wx.showToast({
        title: '请输入关键字',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.redirectTo({
      url: '/pages/douban/lists/index?Type=' + Type + '&keyword=' + keyword,
    })
  },
  seacrh(e) {
    let keword = e.currentTarget.dataset.keword
    let Type = e.currentTarget.dataset.type
    wx.redirectTo({
      url: '/pages/douban/lists/index?Type=' + Type + '&keyword=' + keword,
    })
  },
  fromData(data) {
    let hot_list = data.map(v => {
      return v.title
    })
    let hot_type = data[0].genres
    this.setData({
      hot_list,
      hot_type
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    top250({
      start: 0,
      count: 10
    }).then(res => {
      this.fromData(res.subjects)
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

  }
})