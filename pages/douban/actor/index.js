// pages/douban/actor/index.js

const {
  celebrity
} = require('../../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    image: '',
    name: '',
    name_en: '',
    born_place:'',
  },
  godetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/douban/subject/index?id=' + id
    })
  },
  fromData(data) {
    let list = data.map(item => {
      let obj = {}
      obj.roles = item.roles
      obj.img = item.subject.images.small
      obj.title = item.subject.title
      obj.id = item.subject.id
      return obj
    })
    console.log(list)
    return list
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id || '1054521'
    celebrity({
      id
    }).then(res => {
      let list = this.fromData(res.works)
      let {
        avatars,
        name,
        name_en,
        born_place,
      } = res
      this.setData({
        list,
        image: avatars.small,
        name,
        name_en,
        born_place,
      })
      wx.setNavigationBarTitle({
        title: name
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