// 现场勘验--列表页面
//获取应用实例  
const app = getApp()
var timeFilter = require('../../utils/filterTime.js');
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
    //日期状态
    dateSelect: false,
    //勘验状态
    stateSelect: false,
    //选择的开始日期
    sTime:'',
    //选择的结束日期
    eTime:'',
    //弹窗
    hiddenPopUp1: true,
    hiddenPopUp2: true,
    hiddenPopUp3: true,
    pageNum: 1,
    pageSize: 10,
    //搜索-企业名称
    enterpriseName: '',
    //搜索-业户类别
    enterpriseBusinessCategory: '',
    //搜索-所选区域
    enterpriseArea: '',
    //搜索-勘验日期
    time: '',
    //列表数据源
    sourceList: '',
    //列表接口
    url: app.globalData.url + '/vmts-supervision/app/record/findEntInquestList',
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
    let templist = e.currentTarget.dataset.list
    let list = JSON.stringify(templist);
    console.log('list==' + list);

    wx.navigateTo({
      url: '../verifyingEnterprise/verifyingEnterprise?id=' + id + '&list=' + list,
    })

  },

  //跳转勘验记录
  record: function(e) {

    let id = e.currentTarget.dataset.id
    let templist = e.currentTarget.dataset.list
    let list = JSON.stringify(templist);
    console.log('list==' + list);

    wx.navigateTo({
      url: '../verifyEnterpriseRecord/verifyEnterpriseRecord?id=' + id + '&list=' + list,
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
      dateSelect: false,
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
      dateSelect: false,
      hiddenPopUp2: !this.data.hiddenPopUp2,
      hiddenPopUp1: true,
      hiddenPopUp3: true,
    })

    if (!this.data.hiddenPopUp2) {
      this.getListRegion();
    }
  },

  selectDateEvent: function() {
    this.setData({
      styleSelect: false,
      stateSelect: false,
      areaSelect: false,
      dateSelect: !this.data.dateSelect,
      hiddenPopUp2: true,
      hiddenPopUp1: true,
      hiddenPopUp3: !this.data.hiddenPopUp3,
    })
  },

  //开始时间选择器改变监听
  startDate: function(e) {
    this.setData({
      sTime: e.detail.value
    })

    console.log("选择了" + this.data.sTime);
  },
  //结束时间选择器改变监听
  endDate: function (e) {
    this.setData({
      eTime: e.detail.value
    })

    console.log("选择了" + this.data.eTime);
  },
  //日期选择确定
  toConfirm: function () {
    let temp_sTime = new Date(this.data.sTime).getTime();
    let temp_eTime = new Date(this.data.eTime).getTime();
    console.log("日期确认转时间戳 开始时间==" + temp_sTime + "...结束时间==" + temp_eTime);

    if (temp_sTime > temp_eTime){
      wx.showToast({
        title: "开始时间不能大于结束时间",
        icon: 'none',
        duration: 1500,
      });
      return;
    }else{
      this.setData({
        startTime: temp_sTime,
        endTime: temp_eTime,
        pageNum: 1
      })
      this.getList();
      this.toClosePop();
    }
  },

  // ——————————————————————————————刷选栏事件——————————————————————————————————————

  //刷选栏 点击选择1  ————业户类别
  chooseLi1: function(e) {
    console.log("选择了" + e.detail.regionName);
    this.setData({
      enterpriseBusinessCategory: e.detail.optionValue,
      pageNum: 1
    })
    this.getList();
  },
  

  //刷选栏 点击选择2  ————所在区域
  chooseLi2: function(e) {
    console.log("选择了" + e.detail.regionName);
    this.setData({
      enterpriseArea: e.detail.regionId,
      pageNum: 1
    })
    this.getList();
  },
 
  //关闭弹窗
  toClosePop: function () {
    this.setData({
      hiddenPopUp1: true,
      hiddenPopUp2: true,
      hiddenPopUp3: true,
      styleSelect: false,
      areaSelect: false,
      stateSelect: false,
      dateSelect: false,
    })
  },

  //搜索输入关键字监听
  searchInput: function(e) {
    this.setData({
      enterpriseName: e.detail.value,
      pageNum: 1
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
        //搜索-勘验开始时间
        startTime: this.data.startTime,
        //搜索-勘验结束时间
        endTime: this.data.endTime,
      }
    })


    app.doPost(this.data.url, this.data.sourceData).then(

      //请求成功code==200回调
      function(res) {
        console.log('success:' + JSON.stringify(res.data.list));
        //处理时间格式
        let list = res.data.list;
        for (let i = 0; i < list.length;i++){
          let time = list[i].inquestTime;
          list[i].inquestTime = timeFilter.filterTime(time, 'yyyy-mm-dd');
        }
        res.data.list = list;

        //
        if (that.data.pageNum == 1) {
          that.setData({
            sourceList: res.data.list,
          })
        } else if (that.data.pageNum != 1 && res.data.length != 0) {

          that.setData({
            sourceList: that.data.sourceList.concat(res.data.list)
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