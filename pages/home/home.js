//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  //事件处理函数
  pageJumpEvent: function (e) {
    let pageurl = e.currentTarget.dataset.pageurl
    wx.navigateTo({
      url: pageurl,
    })
  }
})
