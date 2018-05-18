var amapFile = require('amap-wx.js');

Page({
  data: {
    address: {},
    today: {},
    forecast: {},
    tomorrow: {},
    aftertomorrow: {},
    now: {},
    today_icon: '',
    tomorrow_icon: '',
    aftertomorrow: '',
    imageUrl: 'image/bg.jpg'
  },
  onShow: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: getApp().data.amapKey });
    //获取高德定位信息
    myAmapFun.getRegeo({
      success: function (data) {
        that.setData({ address: data[0] });
        that.getWeatherInfo(data[0].longitude + ',' + data[0].latitude);
      }
    })
    //获取今日天气
    // myAmapFun.getWeather({
    //   success: function (data) {
    //     that.setData({ today: data });
    //   }
    // })
    //获取未来天气
    // myAmapFun.getWeather({
    //   type: 'forecast',
    //   success: function (data) {
    //     that.setData({ forecast: data.forecast.casts });
    //   }
    // })


  },
  // 下拉刷新回调接口
  onPullDownRefresh: function () {
    var that = this;
    that.onShow();//重新加载
    wx.stopPullDownRefresh();//刷新完后收回下拉
  },
  //获取和风天气接口信息
  getWeatherInfo: function (location) {
    var that = this;
    //需要在微信公众号的设置-开发设置中配置服务器域名
    var url = 'https://free-api.heweather.com/s6/weather?key=' + getApp().data.heweatherKey + '&location=' + location;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      success: function (res) {
        var daily_forecast_today = res.data.HeWeather6[0].daily_forecast[0];//今天预报
        var daily_forecast_tomorrow = res.data.HeWeather6[0].daily_forecast[1];//明天天预报
        var daily_forecast_afterTomor = res.data.HeWeather6[0].daily_forecast[2];//后天预报
        var basic = res.data.HeWeather6[0].basic;
        var update = '更新于' + res.data.HeWeather6[0].update.loc;//更新时间
        that.setData({
          now: res.data.HeWeather6[0].now,
          update: update,
          basic: basic,
          today: daily_forecast_today,
          tomorrow: daily_forecast_tomorrow,
          aftertomorrow: daily_forecast_afterTomor,
          today_icon: 'image/weather/' + daily_forecast_today.cond_code_d + '.png', //在和风天气中下载天气的icon图标，根据cond_code_d显示相应的图标
          tomorrow_icon: 'image/weather/' + daily_forecast_tomorrow.cond_code_d + '.png',
          aftertomorrow_icon: 'image/weather/' + daily_forecast_afterTomor.cond_code_d + '.png'
        });
      }
    })


    //隐藏更新时间
    setTimeout(function () {
      that.setData({
        'update': ''
      });
    }, 3000);
  },

})
