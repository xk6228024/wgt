// pages/login/login.js
const app = getApp();
var netUtil = require('../../utils/NetUtil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_loginLogo: app.globalData.picUrl + '/icon_loginLogo.png',
    titleBarHeight: getApp().globalData.titleBarHeight,
    statusBarHeight: getApp().globalData.statusBarHeight,
    accountNum: '',
    password: '',
    loginUrl: app.globalData.url + '/vmts-supervision/app/sysUser/login',
    phoneNum: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  getAccountNum: function (event) {
    console.log(event.detail.value)
    this.setData({
      accountNum: event.detail.value
    })
  },

  getPassword: function (event) {
    this.setData({
      password: event.detail.value
    })
  },

  // 登录事件
  loginEvent: function(){

    // if (0 == this.data.accountNum.length){
      
    //   wx.showToast({
    //     title: '请输入账号!',
    //     icon: 'none',
    //   })
    //   return;
    // }

    // if (0 == this.data.password.length) {
    //   wx.showToast({
    //     title: '请输入密码!',
    //     icon: 'none',
    //   })
    //   return;
    // }
    
    // 登录接口请求
    let param = {
      data: {
        userName: "szadmin",
        password: "123456", 
      }
    };
    netUtil.doPost(this.data.loginUrl, param).then(

      //请求成功code==200回调
      function (res) {
        app.globalData.userInfo = res;
        app.globalData.token = res.token;
        wx.setStorageSync("userInfo", res);
        wx.setStorageSync("token", res.token);
        wx.navigateBack();
      },
      //请求失败回调
      function (msg) {

      }
    )
  }
})