Page({
  data: {
    result: ''
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
