//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    icon_verifyEnterprise: app.globalData.picUrl + '/icon_verifyEnterprise.png',
    icon_enterpriseFileRecord: app.globalData.picUrl + '/icon_enterpriseFileRecord.png',
    icon_fileRecordAudit: app.globalData.picUrl + '/icon_fileRecordAudit.png',
    icon_vehicleFiles: app.globalData.picUrl + '/icon_vehicleFiles.png',
    bannerUrls: [app.globalData.picUrl + '/icon_homeBanner.png'],
  },
  //事件处理函数
  pageJumpEvent: function (e) {
    let pageurl = e.currentTarget.dataset.pageurl
    wx.navigateTo({
      url: pageurl,
    })
  }
})
