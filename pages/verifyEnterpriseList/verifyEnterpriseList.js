// 现场勘验--列表页面
//获取应用实例  
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      message: '专业修车100年',
      vehicleId: '1234567'
    }, {
      message: '专业修车200年',
      vehicleId: '7654321',
    }, {
      message: '专业修车300年',
      vehicleId: '7654321',
    }],

    listData: [],
    listData1: [{
        regionName: "一类企业",
        optionValue: "01"
      },
      {
        regionName: "二类企业",
        optionValue: "02"
      },
      {
        regionName: "三类企业",
        optionValue: "02"
      }
    ],
    //装城市区域信息的数组
    listData2: [],
    listData3: [{
        regionName: "全部",
        optionValue: "01"
      },
      {
        regionName: "待勘验",
        optionValue: "02"
      },
      {
        regionName: "已勘验",
        optionValue: "02"
      }
    ],
    verify: true,
    //业户类别
    styleSelect: false,
    //所在区域
    areaSelect: false,
    //勘验状态
    stateSelect: false,
    //选择的日期
    dateSelect: '',
    //弹窗
    hiddenPopUp1: true,
    hiddenPopUp2: true,
    hiddenPopUp3: true,
    pageNum: 1,
    pageSize: 10,
    //搜索关键字
    searchKey: '',
    //列表数据源
    sourceList: '',
    //列表接口
    // url: app.globalData.url + '/vmts-supervision/app/record/findAuditEntList',
    //区域接口
    url_region: app.globalData.url + '/vmts-supervision/app/area/findCityRegion',
    icon_search: app.globalData.picUrl + '/icon_search.png',
    icon_nodata: app.globalData.picUrl + '/icon_nodata.png',
    icon_arrow_down_gray: app.globalData.picUrl + '/icon_arrow_down_gray.png',
    icon_arrow_up_blue: app.globalData.picUrl + '/icon_arrow_up_blue.png',
    icon_location: app.globalData.picUrl + '/icon_location.png',
  },

  // ——————————————————————————————点击事件——————————————————————————————————————
  //跳转勘验详情
  toDetail: function(e) {

    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../verifyingEnterprise/verifyingEnterprise?id=' + id,
    })

  },

  //跳转勘验记录
  record: function(e) {

    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../verifyEnterpriseRecord/verifyEnterpriseRecord?id=' + id,
    })

  },

  //跳转新增勘验
  toCreate: function(e) {

    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../verifyCreate/verifyCreate?id=' + id,
    })

  },


  //业户类别
  style: function() {
    this.setData({
      areaSelect: false,
      stateSelect: false,
      styleSelect: !this.data.styleSelect,
      hiddenPopUp1: !this.data.hiddenPopUp1,
      hiddenPopUp2: true,
      hiddenPopUp3: true,
    })
  },
  //所在区域
  area: function() {
    this.setData({
      styleSelect: false,
      stateSelect: false,
      areaSelect: !this.data.areaSelect,
      hiddenPopUp2: !this.data.hiddenPopUp2,
      hiddenPopUp1: true,
      hiddenPopUp3: true,
    })

    if (!this.data.hiddenPopUp2) {
      this.getListRegion();
    }
  },

  //时间选择器改变监听
  dateChange: function(e) {
    this.setData({
      dateSelect: e.detail.value
    })

    console.log("选择了" + this.data.dateSelect);
  },

  // ——————————————————————————————刷选栏事件——————————————————————————————————————

  //刷选栏 点击选择1  ————业户类别
  chooseLi1: function(e) {
    console.log("选择了" + e.detail.regionName);
    this.setData({

    })
  },
  //刷选栏 点击取消1  ————业户类别
  toClose1: function() {
    this.setData({
      hiddenPopUp1: true,
      hiddenPopUp2: true,
      hiddenPopUp3: true,
      styleSelect: false,
      areaSelect: false,
      stateSelect: false,
    })
  },

  //刷选栏 点击选择2  ————所在区域
  chooseLi2: function(e) {
    console.log("选择了" + e.detail.regionName);
    this.setData({

    })
  },
  //刷选栏 点击取消2  ————所在区域
  toClose2: function() {
    this.setData({
      hiddenPopUp1: true,
      hiddenPopUp2: true,
      hiddenPopUp3: true,
      styleSelect: false,
      areaSelect: false,
      stateSelect: false,
    })
  },

  //搜索输入关键字监听
  searchInput: function (e) {
    this.setData({
      searchKey: e.detail.value
    })
      // this.getList();
  },

  // ————————————————————————————接口数据————————————————————————————————
  //获取列表信息
  getList: function() {
    var that = this;

    that.setData({
      sourceData: {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        enterpriseName: this.data.searchKey,
      }
    })


    app.doPost(this.data.url, this.data.sourceData).then(

      //请求成功code==200回调
      function(res) {
        console.log('success:' + JSON.stringify(res.data));

        if (that.data.page == 1) {
          that.setData({
            sourceList: res.data,
          })
        } else if (that.data.page != 1 && res.data.length != 0) {

          that.setData({
            sourceList: that.data.sourceList.concat(res.data)
          })

        }

      },
      //请求失败回调
      function(msg) {
        // console.log('error:' + JSON.stringify(msg));
      }
    )
  },
  //获取城市区域信息
  getListRegion: function() {
    var that = this;

    that.setData({
      sourceData: {

      }
    })

    app.doPost(this.data.url_region, this.data.sourceData).then(

      //请求成功code==200回调
      function(res) {

        that.setData({
          listData2: res.datas,
        })

      },
      //请求失败回调
      function(msg) {
        console.log('error:' + JSON.stringify(msg));
      }
    )
  },

  // ————————————————————————————生命周期和上下拉刷新————————————————————————————————

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  // 上拉刷新
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
    console.log('onReachBottom')

    var that = this;
    // 页数+1
    this.setData({
      pageNum: that.data.pageNum + 1
    })

    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})