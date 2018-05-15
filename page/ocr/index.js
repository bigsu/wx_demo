var upng = require('../../util/UPNG.js')


var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]

Page({
  data: {
    image: '',
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],
    baidu_token: ''
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
    var that = this;
    that.gettoken();
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: sourceType[2],
      sizeType: '原图',
      count: 1,
      success: function (res) {
        console.log(res)

        let ctx = wx.createCanvasContext('myCanvas', this);
        ctx.drawImage(res.tempFilePaths, 0, 0, 300, 100);
        ctx.draw(false, () => {
          wx.canvasGetImageData({
            canvasId: 'myCanvas',
            x: 0,
            y: 0,
            width: 300,
            height: 100,
            success(res) {
              // 要引入UPNG开源库
              let pngData = upng.encode([res.data.buffer], res.width, res.height);
              let base64 = wx.arrayBufferToBase64(pngData);
              that.ocr(base64);
              // 图片预览
              wx.previewImage({
                urls: ['data:image/png;base64,' + base64],
              })
            }
          })
        })

      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.image
    })
  },


  //获取识别信息
  ocr: function (image) {
    console.log("-----" + image)
    var that = this;
    var url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=' + this.baidu_token;
    let base64 = wx.arrayBufferToBase64(image);
    wx.request({
      header: 'application/x-www-form-urlencoded',
      url: url,
      data: { image: base64 },
      method: 'POST',
      success: function (res) {
        console.log(res);
      }
    })
  },
  gettoken: function () {
    var that = this

    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=7uckLXrTYj9aW08PiGYISad3&client_secret=QsSA8Q84Gq5lpuA1aMFrkId17wujEXO8',
      success: function (res) {
        console.log(res.data);
        that.setData({
          baidu_token: res.data.access_token
        })

      },

    })
  }

})
