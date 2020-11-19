//备案企业列表页面
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
        optionValue: "1"
      },
      {
        regionName: "二类企业",
        optionValue: "2"
      },
      {
        regionName: "三类企业",
        optionValue: "3"
      }
    ],
    //装城市区域信息的数组
    listData2: [],
    //勘验状态
    listData3: [{
        regionName: "全部",
        optionValue: ""
      },
      {
        regionName: "待勘验",
        optionValue: "0"
      },
      {
        regionName: "已勘验",
        optionValue: "1"
      }
    ],
    verify: true,
    //业户类别
    styleSelect: false,
    //所在区域
    areaSelect: false,
    //勘验状态
    stateSelect: false,
    //弹窗
    hiddenPopUp1: true,
    hiddenPopUp2: true,
    hiddenPopUp3: true,
    //搜索-企业名称
    enterpriseName: '',
    //搜索-业户类别
    enterpriseBusinessCategory: '',
    //搜索-所选区域
    enterpriseArea:'',
    //搜索-勘验状态
    enterpriseInquestStatus: '',
    //页数
    pageNum: 1,
    pageSize: 10,
    //列表数据源
    sourceList: [
      {
        enterpriseName: '马达加斯加汽车复用有限公司',
        enterpriseBusinessCategoryText: 'sasd',
        inquestStatusText: '已勘验',
        enterpriseProvinceText: '深圳',
        enterpriseCityText: '把那',
        enterpriseAreaText: 'asdasd',
        enterpriseAddress: 'asdasd',
        recordCoding: '421087199111111'
      },
      {
        enterpriseName: '马达加斯加汽车复用有限公司',
        enterpriseBusinessCategoryText: 'sasd',
        inquestStatusText: '已勘验',
        enterpriseProvinceText: '深圳',
        enterpriseCityText: '把那',
        enterpriseAreaText: 'asdasd',
        enterpriseAddress: 'asdasd',
        recordCoding: '421087199111111'
      }
    ],
    //列表接口
    url: app.globalData.url + '/vmts-supervision/app/record/findEntList',
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
      url: '../enterpriseFileRecordDetail/enterpriseFileRecordDetail?id=' + id,
    })

  },

  //业户类别
  style: function() {
    this.setData({
      styleSelect: !this.data.styleSelect,
      areaSelect: false,
      stateSelect: false,
      hiddenPopUp1: !this.data.hiddenPopUp1,
      hiddenPopUp2: true,
      hiddenPopUp3:true,
    })
  },
  //所在区域
  area: function() {
    this.setData({
      styleSelect: false,
      areaSelect: !this.data.areaSelect,
      stateSelect:false,
      hiddenPopUp2: !this.data.hiddenPopUp2,
      hiddenPopUp1: true,
      hiddenPopUp3: true,
    })

    if (!this.data.hiddenPopUp2) {
      this.getListRegion();
    }
  },
  //勘验状态
  state: function() {
    this.setData({
      styleSelect: false,
      areaSelect: false,
      stateSelect: !this.data.stateSelect,
      hiddenPopUp3: !this.data.hiddenPopUp3,
      hiddenPopUp1: true,
      hiddenPopUp2: true,
    })
  },


  // ——————————————————————————————刷选栏事件——————————————————————————————————————
  //刷选栏 点击选择1  ————业户类别
  chooseLi1: function (e) {
    console.log("选择了" + e.detail.regionName);
    this.setData({
      enterpriseBusinessCategory: e.detail.optionValue,
    })
    this.getList();
  },
  //刷选栏 点击取消1  ————业户类别
  toClose1: function () {
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
  chooseLi2: function (e) {
    console.log("选择了" + e.detail.regionName);
    this.setData({
      enterpriseArea: e.detail.regionId,
    })
    this.getList();
  },
  //刷选栏 点击取消2  ————所在区域
  toClose2: function () {
    this.setData({
      hiddenPopUp1: true,
      hiddenPopUp2: true,
      hiddenPopUp3: true,
      styleSelect: false,
      areaSelect: false,
      stateSelect: false,
    })
  },
  //刷选栏 点击选择3  ————勘验状态
  chooseLi3: function (e) {
    console.log("选择了" + e.detail.regionName);
    this.setData({
      enterpriseInquestStatus: e.detail.optionValue,
    })
    this.getList();
  },
  //刷选栏 点击取消3  ————勘验状态
  toClose3: function () {
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
      enterpriseName: e.detail.value
    })
    this.getList();
  },

  // ————————————————————————————接口数据————————————————————————————————
  //获取列表信息
  getList: function() {
    var that = this;

    that.setData({
      sourceData: {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        //搜索-企业名称
        enterpriseName: this.data.enterpriseName,
        //搜索-业户类别
        enterpriseBusinessCategory: this.data.enterpriseBusinessCategory,
        //搜索-所选区域
        enterpriseArea: this.data.enterpriseArea,
        //搜索-勘验状态
        enterpriseInquestStatus: this.data.enterpriseInquestStatus,
      }
    })


    app.doPost(this.data.url, this.data.sourceData).then(

      //请求成功code==200回调
      function(res) {

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
      function(msg) {
        console.log('error:' + JSON.stringify(msg));
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log('onPullDownRefresh')
    this.setData({
      pageNum: 1
    })
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
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


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})