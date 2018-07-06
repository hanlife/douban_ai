// pages/douban/subject/index.js

const {
  subject
} = require('../../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: '',
    title: "", //电影名
    directors: [],
    directors_name: '', //导演名字
    casts_name: '', //演员表
    average: '', //评分
    year: '', //年份
    collect_count: '', //看过
    wish_count: '', //想看
    ratings_count: '', //评价人数
    summary: '', //简介
    casts: [], //导演/演员
    genres: [], //标签
  },
  toActor:function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/douban/actor/index?id=' + id
    })
  },
  // 格式数据
  formData(data) {
    let {
      images,
      title,
      directors, //导演集合
      casts,
      rating,
      wish_count,
      year,
      collect_count,
      ratings_count,
      summary,
      genres,
    } = data
    let casts_name = casts.map(v => {
      return v.name
    }).join('/')
    let directors_name = directors.map(v => {
      return v.name
    }).join('/')
    this.setData({
      images: images.small,
      title,
      directors,
      directors_name: directors_name,
      casts_name: casts_name,
      average: rating.average,
      wish_count,
      casts,
      year,
      collect_count,
      ratings_count,
      summary,
      genres
    })
    wx.setNavigationBarTitle({
      title: title
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id || '1292052'
    subject({
      id
    }).then(res => {
      this.formData(res)
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