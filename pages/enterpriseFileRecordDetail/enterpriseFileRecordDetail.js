const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    specializedOpen: false,
    detectionOpen: false,
    universalOpen: false,
    currentIndex:1,
    icon_location: app.globalData.picUrl + '/icon_location.png',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
    icon_arrow_up_gray: app.globalData.picUrl + '/icon_arrow_up_gray.png',
  },

  // 切换
  changeCurrent: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.indexs
    })
    if (this.data.currentIndex === '1') {
      this.setData({

      })
    } else if (this.data.currentIndex === '2') {
      this.setData({

      })
    } else if (this.data.currentIndex === '3') {
      this.setData({

      })
    } 
    // this.getStateData()
  },

  // 专用设备
  specialized: function () {
    this.setData({
      specializedOpen: !this.data.specializedOpen
    })
  },
  //检测设备
  detection: function () {
    this.setData({
      detectionOpen: !this.data.detectionOpen
    })
  },
  //通用
  universal: function () {
    this.setData({
      universalOpen: !this.data.universalOpen
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