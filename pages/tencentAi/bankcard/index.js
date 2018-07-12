const ctx = wx.createCanvasContext('myCanvas')

Page({
  data: {
    text_x: 60, //x轴
    text_y: 257, //y轴
    imageUrl: '', // 生成的图片路径
    showst: false, //是否完成图片和文字的填入
    sytext: '', //文本
  },
  // chooseImageFun() { //选择图片
  //   var _this = this
  //   wx.chooseImage({
  //     success: function(res) {
  //       console.log(res)
  //       _this.setData({
  //         imageUrl: res.tempFilePaths[0]
  //       })
  //       ctx.drawImage(res.tempFilePaths[0], 0, 0, 343, 343)
  //       ctx.draw()
  //     }
  //   })
  // },
  InputFuns(e) { //文字
    this.setData({
      sytext: e.detail.value
    })
  },
  bindDraw() {
    ctx.setFontSize(12)
    ctx.fillStyle = "#5B5C57"
    ctx.rotate(-5 * Math.PI / 180)
    ctx.fillText(this.data.sytext, this.data.text_x, this.data.text_y)
    ctx.draw(true)
  },
  start(e) { // 手指开始接触移动
    return
    console.log(e)
    this.setData({
      text_x: e.touches[0].x,
      text_y: e.touches[0].y
    })
    ctx.clearRect(0, 0, 200, 310)
    ctx.draw()
    ctx.drawImage(this.data.imageUrl, 6, 0, 189, 310) //重新画上
    ctx.setFontSize(14) //重新画上字体大小
    ctx.fillText(this.data.sytext, this.data.text_x, this.data.text_y) //重新画上
    ctx.draw(true) //重新画上
  },
  move(e) { // 手指在移动
    return
    console.log(e)
    this.setData({
      text_x: e.touches[0].x,
      text_y: e.touches[0].y
    })
    ctx.clearRect(0, 0, 200, 310) //清除画布上的内容
    ctx.draw()
    ctx.drawImage(this.data.imageUrl, 6, 0, 189, 310) //重新画上
    ctx.setFontSize(14) //重新画上字体大小
    ctx.fillText(this.data.sytext, this.data.text_x, this.data.text_y) //重新画上
    ctx.draw(true) //重新画上
  },
  Okgenerate() { //生成图片方法
    var _this = this
    if (this.data.sytext === '') {
      return
    }
    wx.canvasToTempFilePath({ //生成图片
      x: 0,
      y: 0,
      width: 343,
      height: 343,
      quality: 1,
      canvasId: 'myCanvas',
      success: function(res) {
        wx.saveImageToPhotosAlbum({ //保存生成的图片到手机相册里
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              icon: "success",
              title: '保存成功',
            })
          }
        })
      }
    })
  },
  onReady() {
    ctx.drawImage('../img/bankcard.jpg', 0, 0, 343, 343)
    ctx.draw()
  },
  onShareAppMessage(){
    return {
      title: '装逼找我',
      path: '/pages/tencentAi/bankcard/index'
    }
  },
})