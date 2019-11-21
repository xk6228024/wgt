// pages/vehicleRepairRecord/vehicleRepairRecord.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repairid: '',
    icon_arrow_up_gray: app.globalData.picUrl + '/icon_arrow_up_gray.png',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
    openRepairItem: false,
    openRepairParts: false,
    repairItemArray: [
      {
        name: '2we',
        value: '213123',
      },
      {
        name: '2we',
        value: '213123',
      }
    ],
    repairParts: [
      {
        name: '2we',
        value: '213123',
      }, 
      {
        name: '2we',
        value: '213123',
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      repairid: options.repairid,
    })
    console.log('2131232====' + this.data.repairid);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  openRepairItem: function () {
    this.setData({
      openRepairItem: !this.data.openRepairItem
    })
  },

  openRepairParts: function () {
    this.setData({
      openRepairParts: !this.data.openRepairParts
    })
  },
})