// pages/vehicleRepairRecord/vehicleRepairRecord.js
const app = getApp();
var netUtil = require('../../utils/NetUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repairid: '',
    icon_arrow_up_gray: app.globalData.picUrl + '/icon_arrow_up_gray.png',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
    vehicleRepairRecordUrl: app.globalData.url + '/vmts-supervision/app/vehicle/findVehicleRecordList',
    openRepairItem: false,
    openRepairParts: false,
    repairItemArray: [
      {
        name: '2we',
        value: '213123',
      },
      {
        name: '2we',
        value: '213123',
      }
    ],
    repairParts: [
      {
        name: '2we',
        value: '213123',
      }, 
      {
        name: '2we',
        value: '213123',
      }
    ],
    dataSource: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      repairid: options.repairid,
    })
    console.log('2131232====' + this.data.repairid);
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.getVehicleRepairRecordData()
  },
  // 登录事件
  getVehicleRepairRecordData: function () {
    let _this = this;
    let params = {

    };
    netUtil.doPost(this.data.vehicleRepairRecordUrl, params).then(

      //请求成功code==200回调
      function (res) {
        _this.setData({
          dataSource: res.data,
        })
      },
      //请求失败回调
      function (msg) {

      }
    )
  },

  openRepairItem: function () {
    this.setData({
      openRepairItem: !this.data.openRepairItem
    })
  },

  openRepairParts: function () {
    this.setData({
      openRepairParts: !this.data.openRepairParts
    })
  },
})