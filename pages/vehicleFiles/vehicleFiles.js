
// pages/vehicleFiles/vehicleFiles.js
const app = getApp();
var netUtil = require('../../utils/NetUtil.js');
var searchKey = '';
var currentPage = 1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    icon_search: app.globalData.picUrl + '/icon_search.png',
    vehicleFileListUrl: app.globalData.url + '/vmts-supervision/app/vehicle/list',
    // 车牌颜色,1:蓝色,2:黄色,3:农黄,4:绿色,5:黑色,6:白色,7:渐变绿,8:黄绿
    plateBgImage: {
      '5': app.globalData.picUrl + '/icon_plateBlack.png',
      '1': app.globalData.picUrl + '/icon_plateBlue.png',
      '3': app.globalData.picUrl + '/icon_plateDeepOrange.png',
      '7': app.globalData.picUrl + '/icon_plateGradualGreen.png',
      '4': app.globalData.picUrl + '/icon_plateGreen.png',
      '2': app.globalData.picUrl + '/icon_plateOrange.png',
      '8': app.globalData.picUrl + '/icon_plateOrangeGreen.png',
      '6': app.globalData.picUrl + '/icon_plateWhite.png',
    },
   

    dataSource: [],
    isLastPage: false,
  },
  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {

  },
  /**
    * 生命周期函数--监听页面显示
    */
  onShow: function () {
    if (this.data.dataSource.length == 0) {
      this.getVehicleFileListData(false);
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getVehicleFileListData(false);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.setData({
    //   isLastPage: this.isLastPage
    // });
    if (this.data.isLastPage) {
      return;
    }
    this.getVehicleFileListData(true);
  },
  getVehicleFileListData: function (isNextPage) {
    if (!isNextPage) {
      currentPage = 1;
    }
    let _this = this;
    let param = {
      pageNum: currentPage,
      pageSize: '10',
      searchKey: searchKey,
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
            isLastPage: isLastPage
          })
        } else {
          _this.setData({
            dataSource: res.data.list,
            isLastPage: isLastPage
          });
        }
      },
      //请求失败回调
      function (msg) {
      }
    )
  },
  searchInput: function (e) {
    searchKey = e.detail.value;
    this.getVehicleFileListData(false);
  },
  searchEvent: function () {
    this.getVehicleFileListData(false);
  },
  cellTapEvent: function (e) {
    let vehicleInfo = e.currentTarget.dataset.vehicleinfo;
    console.log(vehicleInfo);
    let vehicleInfoStr = JSON.stringify(vehicleInfo);
    wx.navigateTo({
      url: '../vehicleDetailInfo/vehicleDetailInfo?vehicleInfoStr=' + vehicleInfoStr,
    })
  }
})