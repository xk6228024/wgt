// pages/notice/notice.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_search: app.globalData.picUrl + '/icon_search.png',
    dataSource: [
      {
        title: '道路运输车辆达标车型表（第15批）公示',
        content: '任务的名称内容摘要，太长省略太长省…',
        date: '2019-12-09',
      },
      {
        title: '道路运输车辆达标车型表（第15批）公示',
        content: '任务的名称内容摘要，太长省略太长省…',
        date: '2019-12-09',
      },
      {
        title: '道路运输车辆达标车型表（第15批）公示',
        content: '任务的名称内容摘要，太长省略太长省…',
        date: '2019-12-09',
      },
      {
        title: '道路运输车辆达标车型表（第15批）公示',
        content: '任务的名称内容摘要，太长省略太长省…',
        date: '2019-12-09',
      },
      ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  cellTapEvent: function (e) {
    
    wx.navigateTo({
      url: '../noticeDetail/noticeDetail'
    })
  }
  
})