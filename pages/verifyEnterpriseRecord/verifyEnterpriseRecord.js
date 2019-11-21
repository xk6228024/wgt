// pages/verifyEnterpriseRecord/verifyEnterpriseRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      {
        message: '专业修车100年',
        vehicleId: '1234567'
      }, {
        message: '专业修车200年',
        vehicleId: '7654321',
      }, {
        message: '专业修车300年',
        vehicleId: '7654321',
      }
    ],
  },
  //跳转勘验详情
  toDetail: function (e) {

    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../verifyingEnterprise/verifyingEnterprise?id=' + id,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})