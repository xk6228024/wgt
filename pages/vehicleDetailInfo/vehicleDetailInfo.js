// pages/vehicleDetailInfo/vehicleDetailInfo.js
const app = getApp();
var netUtil = require('../../utils/NetUtil.js');
var currentPage = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vehicleId: '',
    lisArray: ['0', '1', '2', '3', '4', '2'],
    
    hasRecord: true,
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
    vehicleFileListUrl: app.globalData.url + '/vmts-supervision/app/vehicle/findVehicleRecordList',

    dataSource: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      vehicleId: options.vehicleId,
    })
    console.log('2131232===='+this.data.vehicleId);
  },


  /**
    * 生命周期函数--监听页面显示
    */
  onShow: function () {
    this.getVehicleInfoData(false);
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getVehicleInfoData(false);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getVehicleInfoData(true);
  },

  getVehicleInfoData: function (isNextPage) {
    if (!isNextPage) {
      currentPage = 1;
    }
    let _this = this;
    let param = {
      pageNum: currentPage,
      pageSize: '10',
    };
    netUtil.doPost(this.data.vehicleFileListUrl, param).then(

      //请求成功code==200回调
      function (res) {
        let isLastPage = false;
        if (isLastPage) {
          currentPage++;
        };
        if (isNextPage) {
          _this.setData({
            sourceList: _this.data.dataSource.concat(res.data.list)
          })
        } else {
          _this.setData({
            dataSource: res.data.list,
          });
        }
      },
      //请求失败回调
      function (msg) {

      }
    )
  },

  
  cellTapEvent: function (e) {
    let repairid = e.currentTarget.dataset.repairid;
    console.log(repairid);
    wx.navigateTo({
      url: '../vehicleRepairRecord/vehicleRepairRecord?repairid=' + repairid,
    })
  }
})