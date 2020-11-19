// pages/fileRecordAuditInfo/fileRecordAuditInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    imgUrls: [
      // 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      // 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      // 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    //列表数据源
    sourceList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let infoStr = options.info;
    let infoObj = JSON.parse(infoStr);
    console.log("options+++++++++++infoObj==", infoObj)
    wx.setNavigationBarTitle({
      title: 'infoObj.title'
    })

    this.setData({
      sourceList :infoObj.itemList,
      // name: infoObj.itemList[0].text,
      // imgUrls: infoObj.itemList[0].url,
    })
    // console.log("options+++++++++++sourceList==", JSON.stringify(this.data.sourceList))
  },

  //图片点击事件
  imgBigView: function (e) {
    var imgList = e.currentTarget.dataset.list; //获取data-src
    //图片预览
    wx.previewImage({
      current: imgList, // 当前显示图片的http链接
      urls: this.data.imgUrls // 需要预览的图片http链接列表
    })
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