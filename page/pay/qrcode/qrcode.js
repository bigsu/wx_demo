// qrcode.js
var QR = require('../../../util/qrcode.js')

Page({

  data: {
    content: "",
    logo: '',
    alipay: '',
    wechat: ''
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    // FKX05639AEMUOSN0TE016F
    // f2f0JV5T664Amfb_JDHLXtMBTrL2_8PvU68O
    console.log(options)
    this.setData({
      content: 'https://heyfox.herokuapp.com/pay?ali=' + options['alipay'] + '&wx=' + options['wechat'],
      alipay: options['alipay'],
      wechat: options['wechat'],
      logo: options['logo']
    })
    console.log('-----------')
    console.log(this.data['content'])
    console.log(this.data['logo'])
    console.log('-======---')

    // 绘图
    const ctx = wx.createCanvasContext('mycanvas')
    QR.qrApi.draw(this.data.content, ctx, 300, 300)
    if (options['logo'] != '' & options['logo'] != null) {
      console.log("绘制logo")
      ctx.clearRect(129, 129, 42, 42)
      ctx.drawImage(options['logo'], 130, 130, 40, 40)
    }
    ctx.draw()
  },

  // 分享
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 右上角转发菜单
      console.log(res.target)
    }
    return {
      title: '合并收款码',
      path: 'pages/qrcode/qrcode?alipay=' + this.data.alipay + "&wechat=" + this.data.wechat,
      success: function (res) {
        // 转发成功
        console.log('转发成功')
        console.log('pages/qrcode/qrcode?alipay=' + this.data.alipay + "&wechat=" + this.data.wechat)
        wx.showToast({
          title: '转发成功',
        })
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败')
        wx.showToast({
          title: '转发失败',
        })
      }
    }
  },

  previewImg: function (e) {
    wx.showActionSheet({
      itemList: ['保存收款码'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          console.log('保存收款码')
          wx.canvasToTempFilePath({
            canvasId: 'mycanvas',
            success: function (res) {
              var tempFilePath = encodeURI(res.tempFilePath)
              console.log(res)
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function success(res) {
                  console.log('saved::' + res.savedFilePath);
                  wx.showToast({
                    title: '保存成功',
                  })
                }
              })
            },
            fail: function (res) {
              console.log(res);
              wx.showToast({
                title: '保存失败',
                icon: 'loading'
              }),
                setTimeout(function () {
                  wx.hideLoading()
                }, 2000)
            }
          });
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
})