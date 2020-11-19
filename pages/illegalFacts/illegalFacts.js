// pages/IllegalFacts/IllegalFacts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    illegalList: []
  },

  // 添加违法事实
  addItem () {
    wx.navigateTo({
      url: '../addIllegalFatcs/addIllegalFatcs'
    })
  },

  // 查看自定义违法事实内容
  getCustomItem (event) {
    wx.navigateTo({
      url: '../addIllegalFatcs/addIllegalFatcs?index=' + event.target.dataset.index + '&custom=1'
    })
  },

  // 查看违法事实内容
  getItem (event) {
    wx.navigateTo({
      url: '../addIllegalFatcs/addIllegalFatcs?index=' + event.target.dataset.index
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
    const illegalList = wx.getStorageSync('illegalList') || []
    this.setData({
      illegalList
    })
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