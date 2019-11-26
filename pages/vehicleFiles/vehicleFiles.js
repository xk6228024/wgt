// pages/vehicleFiles/vehicleFiles.js
const app = getApp();
var netUtil = require('../../utils/NetUtil.js');
var currentPage = 1;
var searchKey = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_search: app.globalData.picUrl + '/icon_search.png',
    vehicleFileListUrl: app.globalData.url + '/vmts-supervision/app/vehicle/findVehicleRecordList',

    lisArray: ['黑色', '蓝色', '农黄', '渐变绿', '绿色', '黄色', '黄绿色', '白色'],
    plateBgImage: {
      黑色: app.globalData.picUrl + '/icon_plateBlack.png',
      '2': app.globalData.picUrl + '/icon_plateBlue.png',
      农黄: app.globalData.picUrl + '/icon_plateDeepOrange.png',
      渐变绿: app.globalData.picUrl + '/icon_plateGradualGreen.png',
      绿色: app.globalData.picUrl + '/icon_plateGreen.png',
      黄色: app.globalData.picUrl + '/icon_plateOrange.png',
      黄绿色: app.globalData.picUrl + '/icon_plateOrangeGreen.png',
      白色: app.globalData.picUrl + '/icon_plateWhite.png',
    },
    dataSource: [],
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
    if (this.data.dataSource.length == 0){
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
    this.getVehicleFileListData(true);
  },

  getVehicleFileListData: function(isNextPage){
    if(!isNextPage){
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
        if(isLastPage){
          currentPage++;
        };
        if (isNextPage) {
          _this.setData({
            sourceList: _this.data.dataSource.concat(res.data.list)
          })
        }else{
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

  searchInput: function(e){
    searchKey = e.detail.value;
  },

  cellTapEvent: function(e){
    let vehicleId = e.currentTarget.dataset.vehicleid;
    console.log(vehicleId);
    wx.navigateTo({
      url: '../vehicleDetailInfo/vehicleDetailInfo?vehicleId=' + vehicleId,
    })
  }

})