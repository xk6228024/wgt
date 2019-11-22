//app.js
App({
  onLaunch: function () {
    const vm = this // 获取高度
    wx.getSystemInfo({
      success: function (res) {
        let totalTopHeight = 68
        if (res.model.indexOf('iPhone X') !== -1) {
          totalTopHeight = 88
        } else if (res.model.indexOf('iPhone') !== -1) {
          totalTopHeight = 64
        }
        vm.globalData.statusBarHeight = res.statusBarHeight
        vm.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight
      },
      failure() {
        vm.globalData.statusBarHeight = 0
        vm.globalData.titleBarHeight = 0
      }
    })
    
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected && res.networkType === 'none') {
        wx.reLaunch({
          url: '../noNetwork/noNetwork',
        })
      }
    })
    // this.getUserInfo();

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs123123123123123', logs)

  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     }
  //   })
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
    // })
  },

  getUserInfo: function () {
    var that = this;
    wx.login({
      success: function (res) {
        //请求后台获得token
        // that.login(res.code)
      }
    })
  },

  globalData: {
    //用户信息对象
    userInfo: {},
    token: '',
    picUrl: "http://supervision-32596.oss-cn-hangzhou.aliyuncs.com", // icon 图片 url
    staticUrl: "https://mobile.jinchehui.com", //静态资源页面 url
    url: 'http://192.168.1.80:8081', // 彪哥地址url
  }
})