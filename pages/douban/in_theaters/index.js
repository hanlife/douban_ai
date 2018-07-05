// pages/douban/in_theaters/index.js

const {
  in_theaters
} = require('../../../utils/http.js');

let IS_UP = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    start: 0,
    city: '深圳',
    count: 6,
    totle: 0,
  },
  fromData(data) {
    let list = data.subjects.map(item => {
      let obj = {}
      obj.img = item.images.small
      obj.title = item.title
      obj.average = item.rating.average
      obj.id = item.id
      return obj
    })
    return list
  },
  godetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/douban/subject/index?id=' + id
    })
  },
  Search() {
    wx.navigateTo({
      url: '/pages/douban/search/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      city,
      count,
      start,
    } = this.data
    in_theaters({
      city,
      count,
      start,
    }).then(res => {
      let list = this.fromData(res)
      this.setData({
        list,
        totle: res.total
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
    in_theaters({
      city: '深圳',
      count: 6,
      start: 0,
    }).then(res => {
      let list = this.fromData(res)
      this.setData({
        list,
        totle: res.total
      })
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
      city
    } = this.data
    if (!IS_UP && list.length < totle) {
      IS_UP = true;
      in_theaters({
        start: parseInt(count + start),
        count,
        city
      }).then(res => {
        let list = this.fromData(res)
        this.setData({
          list: this.data.list.concat(list),
          start: res.start,
          count: res.count,
        })
        IS_UP = false
      })
    }
  },
})