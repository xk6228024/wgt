//index.js
//获取应用实例
const app = getApp();
var QQMapWX = require('../../component/qqmap-wx-jssdk1/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'R2ABZ-JMQE4-GDRUR-XIDJW-U7U5O-QOB7B' // 必填
});
Page({
  data: {
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
    let token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '../login/login',
      })
    } 
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
  },

  navigationTestEvent(e) {
    var _this = this;
    //调用地址解析接口
    qqmapsdk.geocoder({
      //获取表单传入地址
      address: '深圳市 南山区 南头街道 创新大厦', //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function (res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        _this.toGps(latitude,longitude);
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  toGps: function (lat, log) {
    let that = this
    wx.openLocation({
      latitude: Number(lat),
      longitude: Number(log),
      name: '创新大厦',
      address: '深圳市 南山区 南头街道 创新大厦',
      scale: 16
    })
  },
})
