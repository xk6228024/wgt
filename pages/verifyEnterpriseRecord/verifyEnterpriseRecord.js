// pages/verifyEnterpriseRecord/verifyEnterpriseRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSource: [
      {
        fileName: '深交责改第00378号(电子)',
        date: '2019-10-12',
        confirmNum: '25',
        rectificationNum: '3',
        name: '张三丰',
      },
      {
        fileName: '深交责改第00378号(电子)',
        date: '2019-10-12',
        confirmNum: '25',
        rectificationNum: '3',
        name: '张三',
      },
      {
        fileName: '深交责改第00378号(电子)',
        date: '2019-10-12',
        confirmNum: '25',
        rectificationNum: '3',
        name: '张三',
      },
      
    ],
  },
  //跳转勘验详情
  toDetail: function (e) {

    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../verifyingEnterprise/verifyingEnterprise?id=' + id,
    })

  },

  cellTapEvent: function (e) {
    // let vehicleInfo = e.currentTarget.dataset.vehicleinfo;
    // console.log(vehicleInfo);
    // let vehicleInfoStr = JSON.stringify(vehicleInfo);
    wx.navigateTo({
      url: '../verifyEnterpriseRecordDetail/verifyEnterpriseRecordDetail'
    })
  },

  lookChangeNitice: function () {
    wx.navigateTo({
      url: '../changeNotice/changeNotice'
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