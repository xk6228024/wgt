
// pages/vehicleRepairRecord/vehicleRepairRecord.js
const app = getApp();
var netUtil = require('../../utils/NetUtil.js');
var timeFilter = require('../../utils/filterTime.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    vehicleFixId: '',
    icon_arrow_up_gray: app.globalData.picUrl + '/icon_arrow_up_gray.png',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
    vehicleRepairRecordUrl: app.globalData.url + '/vmts-supervision/app/vehicle/fixinfo',
    openRepairItem: false,
    openRepairInfo: false,
    openRepairParts: false,
    
    dataSource: {},
    repairItems:[
      {
        name:'补胎',
        time: '8h',
      },
      {
        name: '补胎',
        time: '8h',
      },
    ],

    repairItemsInfo:[
      {
        name:'轮胎',
        code: '007',
        num: '34',
      },
      {
        name: '轮胎',
        code: '007',
        num: '34',
      },
      {
        name: '轮胎',
        code: '007',
        num: '34',
      },
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      vehicleFixId: options.vehicleFixId,
    })
    console.log('2131232====' + this.data.vehicleFixId);
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.getVehicleRepairRecordData()
  },
  // 详情数据
  getVehicleRepairRecordData: function () {
    return;
    let _this = this;
    let params = {
      vehicleFixId: this.data.vehicleFixId
    };

    netUtil.doPost(this.data.vehicleRepairRecordUrl, params).then(
      //请求成功code==200回调
      function (res) {
        let time = res.data.vehicleFix.vehicleFixBalanceDate;
        res.data.vehicleFix.vehicleFixBalanceDate = timeFilter.filterTime(time, 'yyyy-mm-dd');

        _this.setData({
          dataSource: res.data,

        })
      },
      //请求失败回调
      function (msg) {
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 2000,
        });
      }
    )
  },

  formatTimeStamp: function (data) {
    return Date.parse(new Date(`${data}`)) || Date.parse(new Date(`${data.replace(/-/g, '/')}`));
  },

  openRepairInfo: function () {
    this.setData({
      openRepairInfo: !this.data.openRepairInfo
    })
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

  //全部选择
  select0: function () {
    this.setData({
      hiddenPopUp0: false
    })
  },
  toCloset: function () {
    this.setData({
      hiddenPopUp0: true
    })
  },
  chooseLi: function (e) {
    this.setData({
      value0: '(' + e.detail.optionName + ')',
      value1: '(' + e.detail.optionName + ')',
      value2: '(' + e.detail.optionName + ')',
      value3: '(' + e.detail.optionName + ')',
      value4: '(' + e.detail.optionName + ')',
      value5: '(' + e.detail.optionName + ')',
    })
  },
})