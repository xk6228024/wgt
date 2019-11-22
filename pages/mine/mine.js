// pages/mine/mine.js
var netUtil = require('../../utils/NetUtil.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginOutUrl: app.globalData.url + '/vmts-supervision/app/sysUser/loginOut',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
    icon_defaultHeader: app.globalData.picUrl + '/icon_defaultHeader.png',
    headerImgUrl: '',
    userName: '',
    roleName: '',
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userName: userInfo.name,
      headerImgUrl: userInfo.avatar,
      roleName: userInfo.roleExtEnterpriseOwnerIsview
    })
  },

  pageJumpEvent: function(e){
    let pageurl = e.currentTarget.dataset.pageurl
    wx.navigateTo({
      url: pageurl,
    })
  },

  // 退出登录
  loginOutEvent: function(e){
    
    netUtil.doPost(this.data.loginOutUrl, null).then(

      //请求成功code==200回调
      function (res) {
        console.log('success:' + JSON.stringify(res.data));
        wx.clearStorageSync();
        wx.showToast({
          title: '退出登录成功!',
          icon: 'none',
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../login/login',
          })
        }, 1000)
        return;
      },
      //请求失败回调
      function (msg) {
        console.log('error:' + JSON.stringify(msg));
      }
    )
  },

})