// pages/mine/mine.js
var netUtil = require('../../utils/NetUtil.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginOutUrl: app.globalData.url + '/app/vehicle/list',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
  },

  pageJumpEvent: function(e){
    let pageurl = e.currentTarget.dataset.pageurl
    wx.navigateTo({
      url: pageurl,
    })
  },

  loginOutEvent: function(e){
    
    let param = {
      token: 'token'
    };
    param.userName = 'name';
    netUtil.doPost(this.data.loginOutUrl, param).then(

      //请求成功code==200回调
      function (res) {
        console.log('success:' + JSON.stringify(res.data));

      },
      //请求失败回调
      function (msg) {
        console.log('error:' + JSON.stringify(msg));
      }
    )
  },

})