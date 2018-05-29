var app = getApp()
Page({
  data: {
    hasUserInfo: false
  },
  onShow:function(){
    // console.log(app.globalData.userInfo);
    //   console.log(app.globalData.hasLogin);

  },
  bindGetUserInfo: function (e) {
    var that = this
    app.globalData.userInfo = e.detail.userInfo,
      app.globalData.hasLogin = true

    that.setData({
      hasUserInfo: true,
      userInfo: e.detail.userInfo
    })
  },
  clear: function () {
    var that = this;
    app.globalData.userInfo = null,
      app.globalData.hasLogin = false

    that.setData({
      hasUserInfo: false,
      userInfo: {}
    })
    wx.clearStorage();

    wx.showToast({
      title: '清理完成',
      icon: 'success',
      duration: 2000
    })
  },
  getBarcode:function(){
    wx.previewImage({
      current: 'http://p8k57dlbo.bkt.clouddn.com/wx_barcode.png', // 当前显示图片的http链接
      urls: ['http://p8k57dlbo.bkt.clouddn.com/wx_barcode.png'] // 需要预览的图片http链接列表
    })
  },
  about: function (e) {
    wx.showModal({
      title: "关于作者",
      content: "本程序已在github开源(github.com/bigsu/wx_demo),如有问题请Issues或留言(workszj@126.com)",
      showCancel: false,
      confirmText: "确定"
    })
  }
})
