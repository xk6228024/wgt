// pages/personalData/personalData.js
const app = getApp();
var netUtil = require('../../utils/NetUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_defaultHeader: app.globalData.picUrl + '/icon_defaultHeader.png',
    personalDataurl: app.globalData.url + '/vmts-supervision/app/user/info',
    dataSource:{},
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
        _this.setData({
          dataSource: res.data,
        })
      },
      //请求失败回调
      function (msg) {

      }
    )
  }
})