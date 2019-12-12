
// pages/vehicleDetailInfo/vehicleDetailInfo.js
const app = getApp();
var netUtil = require('../../utils/NetUtil.js');
var currentPage = 1;
var vehicleId = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    vehicleInfo: {},
    totalRecord: '0',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
    vehicleFileListUrl: app.globalData.url + '/vmts-supervision/app/vehicle/fixlist',
    dataSource: [],
    // 车牌颜色,1:蓝色,2:黄色,3:农黄,4:绿色,5:黑色,6:白色,7:渐变绿,8:黄绿
    plateColor: {
      '5': '黑色',
      '1': '蓝色',
      '3': '农黄',
      '7': '渐变绿',
      '4': '绿色',
      '2': '黄色',
      '8': '黄绿',
      '6': '白色',
    },
    isLastPage: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vehicleInfoStr = options.vehicleInfoStr;
    let vehicleInfoObj = JSON.parse(vehicleInfoStr);
    vehicleId = vehicleInfoObj.vehicleId;
    this.setData({
      vehicleInfo: vehicleInfoObj,
    })
    this.getVehicleInfoData(false);
  },
  /**
    * 生命周期函数--监听页面显示
    */
  onShow: function () {

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
    if (this.data.isLastPage) {
      return;
    }
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
      vehicleId: vehicleId
    };
    netUtil.doPost(this.data.vehicleFileListUrl, param).then(
      //请求成功code==200回调
      function (res) {
        let isLastPage = res.data.list.length < 10 ? true : false;
        if (!_this.isLastPage) {
          currentPage++;
        };
        if (isNextPage) {
          _this.setData({
            dataSource: _this.data.dataSource.concat(res.data.list),
            totalRecord: res.data.total,
            isLastPage: isLastPage
          })
        } else {
          _this.setData({
            dataSource: res.data.list,
            totalRecord: res.data.total,
            isLastPage: isLastPage
          });
        }
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

  cellTapEvent: function (e) {
    let vehicleFixId = e.currentTarget.dataset.vehiclefixid;
    wx.navigateTo({
      url: '../vehicleRepairRecord/vehicleRepairRecord?vehicleFixId=' + vehicleFixId,
    })
  }
})