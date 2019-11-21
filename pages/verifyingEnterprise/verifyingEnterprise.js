const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    premisesOpen:false,
    equipmentOpen:false,
    technicianOpen: false,
    managementOpen: false,
    environmentOpen: false,
    icon_location: app.globalData.picUrl + '/icon_location.png',
    icon_navigation: app.globalData.picUrl + '/icon_navigation.png',
    icon_arrow_up_gray: app.globalData.picUrl + '/icon_arrow_up_gray.png',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
  },
  // 经营场地
  premises:function(){
    this.setData({
      premisesOpen: !this.data.premisesOpen
    })
  },
  //设备
  equipment: function() {
    this.setData({
      equipmentOpen: !this.data.equipmentOpen
    })
  },
  //维修技术人员
  technician: function () {
    this.setData({
      technicianOpen: !this.data.technicianOpen
    })
  },
  //维修管理制度
  management: function () {
    this.setData({
      managementOpen: !this.data.managementOpen
    })
  },
  //环境保护措施
  environment: function () {
    this.setData({
      environmentOpen: !this.data.environmentOpen
    })
  },
  // 跳转
  toJumpS: function (e) {

    let jumpway = e.currentTarget.dataset.jumpway
    let name = e.currentTarget.dataset.name
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: jumpway + '?name=' + name + '&item=' + item,
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