const openIdUrl = require('./config').openIdUrl

App({
  data: {
    amapKey: '0e2dedd5b2f58f482f29f950a25b34b3',//高德key  api：http://lbs.amap.com/api/wx/guide/get-data/regeo
    heweatherKey: 'f10b214698504bc488893244fa1e6083',//和风天气key  api：http://www.heweather.com/documents/api/s6/weather
  },
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    //console.log('App Show')
  },
  onHide: function () {
    //console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null
  },
  // lazy loading openid
  getUserOpenId: function (callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function (data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
})
