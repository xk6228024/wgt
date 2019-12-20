const app = getApp()
var QQMapWX = require('../../component/qqmap-wx-jssdk1/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'R2ABZ-JMQE4-GDRUR-XIDJW-U7U5O-QOB7B' // 必填
});

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
    hiddenDialog: true,
    //企业ID
    id:'',
    //企业详情接口 
    url_detail: app.globalData.url + '/vmts-supervision/app/record/info',
    //企业详情数据
    sourceDetail: '',
    //勘验项目接口
    url_project: app.globalData.url + '/vmts-supervision/app/inquest/project',
    //勘验数据
    sourceProject: '',
    //确认提交
    url_confirm: app.globalData.url + '/vmts-supervision/app/inquest/status',
    icon_location: app.globalData.picUrl + '/icon_location.png',
    icon_navigation: app.globalData.picUrl + '/icon_navigation.png',
    icon_arrow_up_gray: app.globalData.picUrl + '/icon_arrow_up_gray.png',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
  },
  // 动态布局 点击事件
  itemSelect: function (e) {
    var id = e.currentTarget.dataset.id;
    let sourceProject = this.data.sourceProject;
    console.log("选择了第" + id);

    for (let i = 0; i < sourceProject.length; i++) {
      if (id == i) {
        let select = 'sourceProject[' + i + '].select'
        if (sourceProject[i].select) {
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

  // 跳转
  toJumpS: function (e) {

    let jumpway = e.currentTarget.dataset.jumpway
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    console.log("id==" + id+"     title==" +title);

    wx.navigateTo({
      url: jumpway + '?id=' + id+'&title=' + title,
    })
  },

  // 提交
  submit: function () {

    this.setData({
      hiddenDialog: false
    })

    // wx.showModal({
    //   title: '',
    //   content: '请完成勘验项目',
    //   showCancel: false,//是否显示取消按钮
    //   cancelColor: 'skyblue',//取消文字的颜色
    //   confirmText: "知道了",//默认是“确定”
    //   confirmColor: '#185BBD',//确定文字的颜色
    // })
  },
  toClose: function () {
    this.setData({
      hiddenDialog: true
    })
  },
  toConfirm: function (e) {
    console.log("===data===确认");
    this.confirmProject();
  },
  //导航
  navigationTestEvent(e) {
    var _this = this;
    //调用地址解析接口
    qqmapsdk.geocoder({
      //获取表单传入地址
      address: '深圳市 南山区 南头街道 创新大厦', //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function (res) { //成功后的回调
        console.log(res);
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        _this.toGps(latitude, longitude);
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

  //获取企业详情
  getDetail: function () {
    var that = this;

    that.setData({
      sourceData: {
        enterpriseRecordId: this.data.id,
      }
    })

    app.doPost(this.data.url_detail, this.data.sourceData).then(

      //请求成功code==200回调
      function (res) {
        that.setData({
          sourceDetail: res.data,
        })
      },
      //请求失败回调
      function (msg) {
        console.log('error:' + JSON.stringify(msg));
      }
    )
  },

    //获取勘验项目
    getProject: function () {
      var that = this;
  
      that.setData({
        sourceData: {
          inquestRecordId: "C5E60D8B23BE4525ABFABFE523E1B1B6",
          enterpriseRecordId: "033918D617CA41C3B92064C1A8193B9C",
          businessCategoryName: "一类汽车维修企业",
          cityCode: "440300"
        }
      })
  
      app.doPost(this.data.url_project, this.data.sourceData).then(
  
        //请求成功code==200回调
        function (res) {
          that.setData({
            sourceProject: res.data,
          })
        },
        //请求失败回调
        function (msg) {
          console.log('error:' + JSON.stringify(msg));
        }
      )
    },

  //确认提交
  confirmProject: function () {
    var that = this;

    that.setData({
      sourceData: {
        enterpriseRecordId: this.data.id,
      }
    })

    app.doPost(this.data.url_confirm, this.data.sourceData).then(

      //请求成功code==200回调
      function (res) {
        console.log('勘验提交成功');
        that.setData({
        })
      },
      //请求失败回调
      function (msg) {
        console.log('勘验提交失败 error:' + JSON.stringify(msg));
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getDetail();
    this.getProject();
    console.log("id==" + this.data.id);
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