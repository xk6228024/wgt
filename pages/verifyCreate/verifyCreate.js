// 现场勘验--列表页面
//获取应用实例  
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    pageSize: 10,
    //搜索-企业名称
    enterpriseName: '',
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
  toDetail: function (e) {

    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../verifyingEnterprise/verifyingEnterprise?id=' + id,
    })

  },

  // ——————————————————————————————刷选栏事件——————————————————————————————————————

  //搜索输入关键字监听
  searchInput: function (e) {
    this.setData({
      enterpriseName: e.detail.value
    })
    
    if (this.data.enterpriseName !=''){
      this.getList();
    }
  },

  // ————————————————————————————接口数据————————————————————————————————
  //获取列表信息
  getList: function () {
    var that = this;

    that.setData({
      sourceData: {
        //搜索-企业名称
        enterpriseName: this.data.enterpriseName,
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
      }
    })


    app.doPost(this.data.url, this.data.sourceData).then(

      //请求成功code==200回调
      function (res) {
        console.log('success:' + JSON.stringify(res.data));

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
      function (msg) {
        // console.log('error:' + JSON.stringify(msg));
      }
    )
  },


  // ————————————————————————————生命周期和上下拉刷新————————————————————————————————

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // this.getList();
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
  onShareAppMessage: function () {

  }
})