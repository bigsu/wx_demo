var app = getApp()
Page({
  data: {
    hasUserInfo: false
  },
  bindGetUserInfo: function (e) {
    var that = this
    app.globalData.userInfo = e.detail.userInfo,
    app.globalData.hasLogin = true

    that.setData({
      hasUserInfo: true,
      userInfo: e.detail.userInfo
    })  
  }
})
