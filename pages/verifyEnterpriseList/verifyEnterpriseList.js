//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      message: '专业修车100年',
      vehicleId: '1234567'
    }, {
      message: '专业修车200年',
      vehicleId: '7654321',
    }, {
      message: '专业修车300年',
      vehicleId: '7654321',
    }],

    listData: [],
    listData1: [{
        optionName: "蓝色",
        optionValue: "01"
      },
      {
        optionName: "黄色",
        optionValue: "02"
      }
    ],
    listData2: [{
        optionName: "绿色",
        optionValue: "03"
      },
      {
        optionName: "红色",
        optionValue: "04"
      }
    ],
    listData3: [{
        optionName: "黑色",
        optionValue: "05"
      },
      {
        optionName: "白色",
        optionValue: "06"
      }
    ],
    verify:true,
    //业户类别
    styleSelect: false,
    //所在区域
    areaSelect: false,
    //勘验状态
    stateSelect: false,
    //弹窗
    hiddenPopUp1: true,
    hiddenPopUp2: true,
    hiddenPopUp3: true,
    icon_search: app.globalData.picUrl + '/icon_search.png',
    icon_arrow_down_gray: app.globalData.picUrl + '/icon_arrow_down_gray.png',
    icon_arrow_up_blue: app.globalData.picUrl + '/icon_arrow_up_blue.png',
    icon_location: app.globalData.picUrl + '/icon_location.png',
  },
  //跳转勘验详情
  toDetail: function(e) {

    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../verifyingEnterprise/verifyingEnterprise?id=' + id,
    })

  },

  //跳转勘验记录
  record: function(e) {

    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../verifyEnterpriseRecord/verifyEnterpriseRecord?id=' + id,
    })

  },

  //业户类别
  style: function() {
    this.setData({
      areaSelect: false,
      stateSelect: false,
      styleSelect: !this.data.styleSelect,
      hiddenPopUp1: !this.data.hiddenPopUp1,
      hiddenPopUp2: true,
      hiddenPopUp3: true,
    })
  },
  //所在区域
  area: function() {
    this.setData({
      styleSelect: false,
      stateSelect: false,
      areaSelect: !this.data.areaSelect,
      hiddenPopUp2: !this.data.hiddenPopUp2,
      hiddenPopUp1: true,
      hiddenPopUp3: true,
    })
  },
  //勘验状态
  state: function() {
    this.setData({
      styleSelect: false,
      areaSelect: false,
      stateSelect: !this.data.stateSelect,
      hiddenPopUp3: !this.data.hiddenPopUp3,
      hiddenPopUp1: true,
      hiddenPopUp2: true,
    })
  },
  //刷选栏 点击选择11111
  chooseLi1: function(e) {
    console.log("选择了" + e.detail.optionName);
    this.setData({

    })
  },
  //刷选栏 取消11111
  toClose1: function() {
    this.setData({
      hiddenPopUp1: true,
      hiddenPopUp2: true,
      hiddenPopUp3: true,
      styleSelect: false,
      areaSelect: false,
      stateSelect: false,
    })
  },

  //刷选栏 点击选择22222
  chooseLi2: function (e) {
    console.log("选择了" + e.detail.optionName);
    this.setData({

    })
  },
  //刷选栏 取消22222
  toClose2: function () {
    this.setData({
      hiddenPopUp1: true,
      hiddenPopUp2: true,
      hiddenPopUp3: true,
      styleSelect: false,
      areaSelect: false,
      stateSelect: false,
    })
  },
  //刷选栏 点击选择33333
  chooseLi3: function (e) {
    console.log("选择了" + e.detail.optionName);
    this.setData({

    })
  },
  //刷选栏 取消33333
  toClose3: function () {
    this.setData({
      hiddenPopUp1: true,
      hiddenPopUp2: true,
      hiddenPopUp3: true,
      styleSelect: false,
      areaSelect: false,
      stateSelect: false,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})