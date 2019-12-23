// pages/mine/mine.js
var netUtil = require('../../utils/NetUtil.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginOutUrl: app.globalData.url + '/vmts-supervision/app/sysUser/loginOut',
    icon_defaultHeader: app.globalData.picUrl + '/icon_defaultHeader.png',
    personalDataurl: app.globalData.url + '/vmts-supervision/app/user/info',
    dataSource: {},
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.getPersonalData()
  },
  // 登录事件
  getPersonalData: function () {
    let _this = this;
    netUtil.doPost(this.data.personalDataurl, null).then(

      //请求成功code==200回调
      function (res) {
        let roleName = '';
        for (let i = 0; i < res.data.roleList.length;i++){
          if(i == 0){
            roleName = res.data.roleList[0].roleName;
          }else{
            roleName = roleName + ',' + res.data.roleList[i].roleName;
          }
        }
        res.data.roleName = roleName;
        _this.setData({
          dataSource: res.data,
        })
      },
      //请求失败回调
      function (msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 2000,
        });
      }
    )
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
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 2000,
        });
      }
    )
  },

})