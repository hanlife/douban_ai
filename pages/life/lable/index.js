// pages/life/lable/index.js
let skills = [{
  id: 'Html5',
  value: 'Html5',
  bg_color: '#ffffff',
  belong: 'skill',
}, {
  id: 'CSS3',
  value: 'CSS3',
  bg_color: '#ffffff',
  belong: 'skill',
}, {
  id: 'Node.js',
  value: 'Node.js',
  bg_color: '#ffffff',
  belong: 'skill',
}, {
  id: 'Vue',
  value: 'Vue',
  bg_color: '#ffffff',
  belong: 'skill',
}, {
  id: 'React',
  value: 'React',
  bg_color: '#ffffff',
  belong: 'skill',
}, {
  id: 'jsmodel',
  value: 'JS模块化',
  bg_color: '#ffffff',
  belong: 'skill',
}, {
  id: 'github',
  value: 'Github',
  bg_color: '#ffffff',
  belong: 'skill',
}, {
  id: 'canvas',
  value: 'Canvas',
  bg_color: '#ffffff',
  belong: 'skill',
}, {
  id: 'performance',
  value: '性能',
  bg_color: '#ffffff',
  belong: 'skill',
}, {
  id: 'performance',
  value: '性能',
  bg_color: '#ffffff',
  belong: 'skill',
}, {
  id: 'oop',
  value: '面向对象编程',
  bg_color: '#ffffff',
  belong: 'skill',
}, {
  id: 'specification',
  value: '开发规范',
  bg_color: '#ffffff',
  belong: 'skill',
}];
let other = [{
    id: 'LOL',
    value: 'LOL',
    bg_color: '#ffffff',
    belong: 'games',
  },
  {
    id: 'music',
    value: '音乐',
    bg_color: '#ffffff',
    belong: 'music',
  },
  {
    id: 'movie',
    value: '电影',
    bg_color: '#ffffff',
    belong: 'movie',
  }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  computerColor() {
    function randomsort(a, b) {
      return Math.random() > .5 ? -1 : 1;
    };
    // 组合打乱
    let list_totle = skills.concat(other).sort(randomsort)
    let list = list_totle.map(v => {
      v.bg_color = this.getRandomColor()
      return v
    })
    this.setData({
      list
    })
  },

  getRandomColor() {
    return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.computerColor()
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