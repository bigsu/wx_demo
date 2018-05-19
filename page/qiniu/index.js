const qiniuUploader = require("qiniuUploader.js");
//index.js

// 初始化七牛相关参数
function initQiniu() {
  //配置详解 https://github.com/gpake/qiniu-wxapp-sdk/blob/master/README.md
  var options = {
    region: 'ECN', // 华东区 根据存储区域填写
    //uptokenURL: 'UpTokenURL.com/uptoken',//// 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "0MLvWPnyy..."}
    //uptoken生成地址：http://pchou.qiniudn.com/qiniutool/uptoken.html deadline的时间设置长一些
    uptoken: getApp().data.qiniu_uptoken,
    domain: getApp().data.qiniu_domain
  };
  qiniuUploader.init(options);
}

//获取应用实例
var app = getApp()
Page({
  data: {
    imageObject: {}
  },
  didPressChooesImage: function () {
    var that = this;
    didPressChooesImage(that);
  },
  copy: function (e) {
    if (e.currentTarget.dataset.text.length > 0) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.text
      })

    }
  },

  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: [this.data.imageObject.imageURL]// 需要预览的图片http链接列表  
    })
  }
});

function didPressChooesImage(that) {
  initQiniu();
  // 微信 API 选文件
  wx.chooseImage({
    count: 1,
    success: function (res) {
      var filePath = res.tempFilePaths[0];
      // 交给七牛上传
      qiniuUploader.upload(filePath, (res) => {
        that.setData({
          'imageObject': res
        });
      }, (error) => {
        console.error('error: ' + JSON.stringify(error));
      });
    }
  }
    // , {
    //   region: 'ECN',
    //   domain: 'balxqjka.btk.clouddn.com',
    //   uptokenURL: 'myServer.cpm/api/uptoken'
    // }
  )

}