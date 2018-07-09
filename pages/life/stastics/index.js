const {
  summary,
  day,
  week,
  month,
} = require('../../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2018-07-07",
    visit_total: '',
    day:{},
    week:{},
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let date = {
      begin_date: '20180708',
      end_date: '20180708'
    }
    summary(date).then(res => {
      that.setData({
        visit_total: res.list[0].visit_total
      })
    })
    day(date).then(res => {
      that.setData({
        day: res.list[0]
      })
    })
    week({
      begin_date: '20180702',
      end_date: '20180708'
    }).then(res => {
      that.setData({
        week: res.list[0]
      })
    })
    // month({
    //   begin_date: '20180701',
    //   end_date: '20180731'
    // }).then(res=>{
    //   console.log(res)
    // })
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