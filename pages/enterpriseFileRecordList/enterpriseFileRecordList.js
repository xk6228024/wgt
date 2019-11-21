//获取应用实例
const app = getApp()

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
    verify: true,
    icon_search: app.globalData.picUrl + '/icon_search.png',
    icon_arrow_down_gray: app.globalData.picUrl + '/icon_arrow_down_gray.png',
    icon_arrow_up_blue: app.globalData.picUrl + '/icon_arrow_up_blue.png',
    icon_location: app.globalData.picUrl + '/icon_location.png',
  },
  //跳转勘验详情
  toDetail: function (e) {

    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../enterpriseFileRecordDetail/enterpriseFileRecordDetail?id=' + id,
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