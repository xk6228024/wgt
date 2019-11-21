// pages/vehicleFiles/vehicleFiles.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_search: app.globalData.picUrl + '/icon_search.png',

    lisArray: ['黑色', '蓝色', '农黄', '渐变绿', '绿色', '黄色', '黄绿色', '白色'],
    plateBgImage: {
      黑色: app.globalData.picUrl + '/icon_plateBlack.png',
      蓝色: app.globalData.picUrl + '/icon_plateBlue.png',
      农黄: app.globalData.picUrl + '/icon_plateDeepOrange.png',
      渐变绿: app.globalData.picUrl + '/icon_plateGradualGreen.png',
      绿色: app.globalData.picUrl + '/icon_plateGreen.png',
      黄色: app.globalData.picUrl + '/icon_plateOrange.png',
      黄绿色: app.globalData.picUrl + '/icon_plateOrangeGreen.png',
      白色: app.globalData.picUrl + '/icon_plateWhite.png',
    },
  },


  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    
  },

  cellTapEvent: function(e){
    let vehicleId = e.currentTarget.dataset.vehicleid;
    console.log(vehicleId);
    wx.navigateTo({
      url: '../vehicleDetailInfo/vehicleDetailInfo?vehicleId=' + vehicleId,
    })
  }
})