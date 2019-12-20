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
        that.login(res.code)
      }
    })
  },

  //全局网络访问方法
  doPost(urlStr, postData) {
    console.log('url==:' + urlStr + '     doPost postData==:' + JSON.stringify(postData));
    return new Promise(function (resolve, reject) {

      //加载loading
      wx.showLoading({

      })

      wx.request({
        url: urlStr,
        method: 'POST',
        data: postData,
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync("token"),
        },
        complete() {
          wx.hideLoading()
          wx.stopPullDownRefresh()
        },
        success: function (res) {
          console.log('doPost success:' + JSON.stringify(res.data));

          // 成功
          if (res.data.status == 200) {
            resolve(res.data);
          }
          //失败 token 失效
          else if (res.data.status == 300) {
            console.log('fail');
            wx.showModal({
              title: '温馨提示',
              content: '登录已失效，即将重新登录',
              showCancel: false, //不显示取消按钮
              confirmText: '确定',
              confirmColor: '#0078D4',
              success: function () {
                wx.clearStorageSync();
                wx.navigateTo({
                  url: '../../pages/login/login',
                })
              }
            })
          }
          //失败 其他失败
          else {
            reject(res.data.message);
          }


        },
        fail: function (err) {
          console.log('doPost fail:' + JSON.stringify(err));
          reject(err);
        }
      })
    });
  },

  //全局变量
  globalData: {
    //用户信息对象123
    userInfo: {},
    token: '',
    picUrl: "http://supervision-32596.oss-cn-hangzhou.aliyuncs.com", // icon 图片 url
    staticUrl: "https://mobile.jinchehui.com", //静态资源页面 url
    url: 'http://192.168.1.101:8081', // 彪哥地址url
    // url:'https://hub.qcfxp.com/',//外网测试地址
  }
})