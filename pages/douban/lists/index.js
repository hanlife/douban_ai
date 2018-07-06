// pages/douban/lists/index.js
const {
  search
} = require('../../../utils/http.js');

let IS_UP = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    start: 0,
    Type: '',
    keyword: '',
    count: 6,
    totle: 0,
  },
  godetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/douban/subject/index?id=' + id
    })
  },
  fromData(data) {
    let list = data.map(item => {
      let obj = {}
      obj.img = item.images.small
      obj.title = item.title
      obj.average = item.rating.average
      obj.id = item.id
      obj.genres = item.genres
      return obj
    })
    return list
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    options.Type = 'q'
    options.keyword = "肖申克的救赎"
    let {
      Type,
      keyword
    } = options
    let {
      start,
      count
    } = this.data
    search({
      Type: Type,
      keyword: keyword,
      start,
      count
    }).then(res => {
      let list = this.fromData(res.subjects)
      this.setData({
        list,
        Type,
        keyword,
        totle: res.total
      })
      wx.setNavigationBarTitle({
        title: res.title
      })
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
    let {
      Type,
      keyword,
    } = this.data
    in_theaters({
      Type,
      keyword,
      count: 6,
      start: 0,
    }).then(res => {
      let list = this.fromData(res.subjects)
      this.setData({
        list,
        totle: res.total
      })
      // 
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let {
      list,
      start,
      count,
      totle,
      Type,
      keyword,
    } = this.data
    if (!IS_UP && list.length < totle) {
      IS_UP = true;
      search({
        Type,
        keyword,
        start: parseInt(count + start),
        count,
      }).then(res => {
        let list = this.fromData(res.subjects)
        this.setData({
          list: this.data.list.concat(list),
          start: res.start,
          count: res.count,
        })
        IS_UP = false
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})