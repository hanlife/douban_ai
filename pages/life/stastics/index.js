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
    day: [],
    week: {},
  },
  bindDateChange: function (e) {
    let that = this,
      curDate = e.detail.value,
      strDate = curDate.replace(/-/g, ""),
      day_data = this.data.day;
    // 避免重复请求
    if (that.isInArry(day_data, strDate)) {
      day({
        begin_date: strDate,
        end_date: strDate
      }).then(res => {
        that.setData({
          day: day_data.concat(res.list),
          date: curDate
        })
      })
    }
  },
  isInArry(arr1, opt) {
    return JSON.stringify(arr1).indexOf(JSON.stringify(opt)) == -1
  },
  // 获取前一天日期
  getNowFormatDate() {
    var curDate = new Date();
    var date = new Date(curDate.getTime() - 24 * 60 * 60 * 1000);
    var seperator1 = "";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let preDate = that.getNowFormatDate();
    // 累计用户数
    summary({
      begin_date: preDate,
      end_date: preDate
    }).then(res => {
      that.setData({
        visit_total: res.list[0].visit_total
      })
    })
    // 某天数据
    day({
      begin_date: '20180707',
      end_date: '20180707'
    }).then(res => {
      day({
        begin_date: '20180708',
        end_date: '20180708'
      }).then(ress => {
        that.setData({
          day: res.list.concat(ress.list)
        })
      })
    })
    // 某周数据
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})