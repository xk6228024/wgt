//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    icon_notice: app.globalData.picUrl + '/icon_notice.png',
    icon_verifyEnterprise: app.globalData.picUrl + '/icon_verifyEnterprise.png',
    icon_enterpriseFileRecord: app.globalData.picUrl + '/icon_enterpriseFileRecord.png',
    icon_fileRecordAudit: app.globalData.picUrl + '/icon_fileRecordAudit.png',
    icon_vehicleFiles: app.globalData.picUrl + '/icon_vehicleFiles.png',
    bannerUrls: [app.globalData.picUrl + '/icon_homeBanner.png'],
  },
  /**
    * 生命周期函数--监听页面显示
    */
  onShow: function () {
    // 未登录跳到登录页
    // let token = wx.getStorageSync('token');
    // if(!token){
    //   wx.navigateTo({
    //     url: '../login/login',
    //   })
    // } 
  },
  //事件处理函数
  pageJumpEvent: function (e) {
    let pageurl = e.currentTarget.dataset.pageurl
    if (pageurl === '../fileRecordAuditList/fileRecordAuditList'){
      wx.showModal({
        title: '',
        content: '该功能暂未开放!',
        showCancel: false,//是否显示取消按钮
        cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "知道了",//默认是“确定”
        confirmColor: '#185BBD',//确定文字的颜色
      })
      return;
    }
    wx.navigateTo({
      url: pageurl,
    })
  }

})
