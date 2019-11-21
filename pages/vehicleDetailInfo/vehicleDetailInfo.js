// pages/vehicleDetailInfo/vehicleDetailInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vehicleId: '',
    lisArray: ['0', '1', '2', '3', '4', '2'],
    
    hasRecord: true,
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      vehicleId: options.vehicleId,
    })
    console.log('2131232===='+this.data.vehicleId);
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  cellTapEvent: function (e) {
    let repairid = e.currentTarget.dataset.repairid;
    console.log(repairid);
    wx.navigateTo({
      url: '../vehicleRepairRecord/vehicleRepairRecord?repairid=' + repairid,
    })
  }
})