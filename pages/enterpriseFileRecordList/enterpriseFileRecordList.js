//备案企业列表页面
//获取应用实例
const app = getApp()
var netUtil = require('../../utils/NetUtil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      {
        message: '专业修车100年',
        vehicleId: '1234567'
      }, {
        message: '专业修车200年',
        vehicleId: '7654321',
      }, {
        message: '专业修车300年',
        vehicleId: '7654321',
      }
    ],
    listData: [],
    listData1: [{
      optionName: "蓝色",
      optionValue: "01"
    },
    {
      optionName: "黄色",
      optionValue: "02"
    }
    ],
    listData2: [{
      optionName: "绿色",
      optionValue: "03"
    },
    {
      optionName: "红色",
      optionValue: "04"
    }
    ],
    verify: true,
    //业户类别
    styleSelect: false,
    //所在区域
    areaSelect: false,
    //弹窗
    hiddenPopUp1: true,
    hiddenPopUp2: true,
    pageNum: 1,
    pageSize: 10,
    //列表数据源
    sourceList: '',
    url: app.globalData.url + '/vmts-supervision/app/record/findEntList',
    icon_search: app.globalData.picUrl + '/icon_search.png',
    icon_arrow_down_gray: app.globalData.picUrl + '/icon_arrow_down_gray.png',
    icon_arrow_up_blue: app.globalData.picUrl + '/icon_arrow_up_blue.png',
    icon_location: app.globalData.picUrl + '/icon_location.png',
  },
  //跳转勘验详情
  toDetail: function (e) {

    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../enterpriseFileRecordDetail/enterpriseFileRecordDetail?id=' + id,
    })

  },

  //业户类别
  style: function () {
    this.setData({
      areaSelect: false,
      styleSelect: !this.data.styleSelect,
      hiddenPopUp1: !this.data.hiddenPopUp1,
      hiddenPopUp2: true,
    })
  },
  //所在区域
  area: function () {
    this.setData({
      styleSelect: false,
      areaSelect: !this.data.areaSelect,
      hiddenPopUp2: !this.data.hiddenPopUp2,
      hiddenPopUp1: true,
    })
  },
  
  //刷选栏 点击选择11111
  chooseLi1: function (e) {
    console.log("选择了" + e.detail.optionName);
    this.setData({

    })
  },
  //刷选栏 取消11111
  toClose1: function () {
    this.setData({
      hiddenPopUp1: true,
      hiddenPopUp2: true,
      styleSelect: false,
      areaSelect: false,
    })
  },

  //刷选栏 点击选择22222
  chooseLi2: function (e) {
    console.log("选择了" + e.detail.optionName);
    this.setData({
      
    })
  },
  //刷选栏 取消22222
  toClose2: function () {
    this.setData({
      hiddenPopUp1: true,
      hiddenPopUp2: true,
      styleSelect: false,
      areaSelect: false,
    })
  },

  //获取列表信息
  getList: function () {
    var that = this;

    that.setData({
      sourceData: {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
      }
    })


    netUtil.doPost(this.data.url, this.data.sourceData).then(

      //请求成功code==200回调
      function (res) {

        if (that.data.pageNum == 1) {
          that.setData({
            sourceList: res.data.list,
          })
        } else if (that.data.pageNum != 1 && res.data.list.length != 0) {

          that.setData({
            sourceList: that.data.sourceList.concat(res.data.list)
          })

        }

      },
      //请求失败回调
      function (msg) {
        console.log('error:' + JSON.stringify(msg));
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    this.setData({
      pageNum: 1
    })
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 页数+1
    this.setData({
      pageNum: that.data.pageNum + 1
    })

    this.getList();
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})