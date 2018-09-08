import drawQrcode from '../../util/qrcode.js'

Page({
  data: {
    result: '',
    inputValue:''
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  getcode: function (e) {
   drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      typeNumber: 10,
      text: e.target.dataset.code,
      callback(e) {
        console.log('e: ', e)
      }
    })   
  },


  onHide: function () {
    var that = this
    that.setData({
      result: ''
    })
  },
  scanCode: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
        that.setData({
          result: res.result
        })
      },
      fail: function (res) {
      }
    })
  },
  copy: function (e) {
    if (e.currentTarget.dataset.text.length > 0) {
      var that = this
      that.setData({
        result: ''
      })
      wx.setClipboardData({
        data: e.currentTarget.dataset.text
      })

    }
  }
})
