//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    alipay: "",
    wechat: "",
    logo: "",
    // 0：默认， 1：正确， 2：错误
    alipayRight: "0",
    wechatRight: "0",
    logoRight: "0"
  },

  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
    
  },

  // 立即合并
  bindSubmit: function() {
    
    // this.setData({
    //   alipay: "FKX05639AEMUOSN0TE016F",
    //   wechat: "f2f0JV5T664Amfb_JDHLXtMBTrL2_8PvU68O",
    //   logo: "../../utils/img/alipay.png",
    // })
    // wx.navigateTo({
    //   url: '../qrcode/qrcode?alipay=' + this.data.alipay + "&wechat=" + this.data.wechat + "&logo=" + this.data.logo,
    // })
    // return

    if (this.data.alipay != "" && this.data.wechat != "") {
      console.log(this.data.alipay)
      console.log(this.data.wechat)
      wx.navigateTo({
        url: '../qrcode/qrcode?alipay=' + this.data.alipay + "&wechat=" + this.data.wechat + "&logo=" + this.data.logo,
      })
    } else {
      wx.showToast({
        title: '请上传收款码',
        icon: 'loading'
      }),
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
    }
  },

  // 关于
  bindAbout: function() {
    console.log('关于')
    wx.navigateTo({
      url: '../about/about',
    })
  },

  // 使用手册
  bindGuide: function() {
    console.log('手册')
    wx.navigateTo({
      url: '../guide/guide',
    })
  },

  // logo
  bindLogo: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      success: function(res) {
        console.log(res.tempFilePaths[0])
          that.setData({
            logoRight: "1",
            logo: res.tempFilePaths[0]
          })
      },
      fail: function() {
        that.setData({
          logoRight: "0",
          logo: ""
        })
      }
    })
  },

  // 支付宝
  bindAlipay: function() {
    console.log('alipay')
    var that = this
    wx.scanCode({
      success: function(e) {
        console.log(e.result)
        if (0 <= e.result.indexOf('HTTPS://QR.ALIPAY.COM/')) {
          console.log(e.result.slice(22))
          that.setData({
            alipay: e.result.slice(22),
            alipayRight: "1",
          })
        } else {
          that.setData({
            alipay: "",
            alipayRight: "2",
          }),
          wx.showToast({
            title: '支付宝收款码错误',
            icon: 'loading'
          }),
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
        }
      },
      fail: function (e) {
        that.setData({
          alipay: "",
          alipayRight: "2",
        }),
        wx.showToast({
          title: '支付宝收款码错误',
          icon: 'loading'
        }),
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
    })
  },
  // 微信
  bindWechat: function() {
    console.log('wechat')
    var that = this
    wx.scanCode({
      success: function(e) {
        console.log(e.result)
        if (0 <= e.result.indexOf('wxp://')) {
          console.log(e.result.slice(6))
          that.setData({
            wechat: e.result.slice(6),
            wechatRight: "1",
          })
        } else {
          that.setData({
            wechat: "",
            wechatRight: "2",
          })
          wx.showToast({
            title: '微信收款码错误',
            icon: 'loading'
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
        }
      },
      fail: function(e) {
        that.setData({
          wechat: "",
          wechatRight: "2",
        })
        wx.showToast({
          title: '微信收款码错误',
          icon: 'loading'
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
    })
  },
  
})
