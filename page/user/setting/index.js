// page/user/setting/index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    app: app,
    amap_key: '',//高德key
    heweather_key: '',//和风天气key
    qiniu_domain: '',//七牛图片外链域名
    qiniu_uptoken: ''//七牛上传凭证
  },
  //表单提交 保存数据
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    console.log(formData)

    wx.setStorageSync('amap_key', formData.amap_key)
    wx.setStorageSync('heweather_key', formData.heweather_key)
    wx.setStorageSync('qiniu_domain', formData.qiniu_domain)
    wx.setStorageSync('qiniu_uptoken', formData.qiniu_uptoken)

    wx.showToast({
      title: '保存成功',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      amap_key: wx.getStorageSync('amap_key'),
      heweather_key: wx.getStorageSync('heweather_key'),
      qiniu_domain: wx.getStorageSync('qiniu_domain'),
      qiniu_uptoken: wx.getStorageSync('qiniu_uptoken')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})