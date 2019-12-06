//备案企业企业详情页面
//获取应用实例
const app = getApp()
var netUtil = require('../../utils/NetUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      message: '专用设备123',
      vehicleId: '1234567',
      // select: false,
      son: [{
        messageson: '专用设备的儿子1',
      }, {
        messageson: '专用设备的儿子2',
      }, {
        messageson: '专用设备的儿子3',
      }]
    }, {
      message: '检测设备456',
      vehicleId: '7654321',
      // select: false,
      son: [{
        messageson: '检测设备的儿子1',
      }, {
        messageson: '检测设备的儿子2',
      }, {
        messageson: '检测设备的儿子3',
      }]
    }, {
      message: '通用设备789',
      vehicleId: '7654321',
      // select: false,
      son: [{
        messageson: '通用设备的儿子1',
      }, {
        messageson: '通用设备的儿子2',
      }, {
        messageson: '通用设备的儿子3',
      }]
    }],
    currentIndex:1,
    url: app.globalData.url + '/vmts-supervision/app/record/info',
    icon_location: app.globalData.picUrl + '/icon_location.png',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
    icon_arrow_up_gray: app.globalData.picUrl + '/icon_arrow_up_gray.png',
  },

  // 设备选择
  itemSelect: function (e) {
    var id = e.currentTarget.dataset.id;
    let array = this.data.array;
    console.log("选择了第" + id);

    for (let i = 0; i < array.length; i++) {
      if (id == i) {
        let select = 'array[' + i + '].select'
        if (array[i].select) {
          console.log("select111==" + select);
          this.setData({
            [select]: false
          })
        } else {
          console.log("select222==" + select);
          this.setData({
            [select]: true
          })
        }
      }
    }

  },

  // 切换
  changeCurrent: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.indexs
    })
    if (this.data.currentIndex === '1') {
      this.setData({

      })
    } else if (this.data.currentIndex === '2') {
      this.setData({

      })
    } else if (this.data.currentIndex === '3') {
      this.setData({

      })
    } 
    // this.getStateData()
  },

  // 专用设备
  specialized: function () {
    this.setData({
      specializedOpen: !this.data.specializedOpen
    })
  },
  //检测设备
  detection: function () {
    this.setData({
      detectionOpen: !this.data.detectionOpen
    })
  },
  //通用
  universal: function () {
    this.setData({
      universalOpen: !this.data.universalOpen
    })
  },
  // 跳转
  toJumpS: function (e) {

    let jumpway = e.currentTarget.dataset.jumpway
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: jumpway + '?name=' + name,
    })

  },

  //获取企业详情
  getDetail: function () {
    var that = this;

    that.setData({
      sourceData: {
        enterpriseRecordId: this.data.orderId,
      }
    })

    netUtil.doPost(this.data.url, this.data.sourceData).then(

      //请求成功code==200回调
      function (res) {

        that.setData({
          sourceList: res.data,
        })
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
    this.setData({
      orderId: options.id
    })
    this.getDetail();
    console.log("id==" + this.data.orderId);
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})