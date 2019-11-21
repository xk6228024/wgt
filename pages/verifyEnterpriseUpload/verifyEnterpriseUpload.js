const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: '',
    name: '',
    // 上传图片的数组
    choosePhoto: [],
    icon_uploadFile: app.globalData.picUrl + '/icon_uploadFile.png',
    icon_addimg: app.globalData.picUrl + '/icon_addimg.png',
    icon_delimg: app.globalData.picUrl + '/icon_delimg.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("options+++++++++++name==", options.name + "...item==" + options.item)
    wx.setNavigationBarTitle({
      title: options.name
    })

    this.setData({
      name: options.name,
      item: options.item
    })

  },
  // 选择图片
  chooseImg: function () {
    var that = this,
      choosePhoto = this.data.choosePhoto
    wx.chooseImage({
      count: 3 - choosePhoto.length, // 最多可以选择9张图片，默认9
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        choosePhoto = choosePhoto.concat(imgsrc)
        if (choosePhoto.length > 3) {
          wx.showModal({
            title: '',
            content: '最可只能上传3张图片',
            showCancel: false, //不显示取消按钮
            confirmText: '确定'
          })
          return
        }
        that.setData({
          choosePhoto: choosePhoto
        })
      },
      fail: function () {
        //console.log("上传失败")
      },
      complete: function () {
        //console.log("上传成功")
      }
    })
  },
  // 图片删除
  toDetalImg: function (e) {
    let detalIndex = e.currentTarget.dataset.delnum
    this.data.choosePhoto.splice(detalIndex, 1)
    if (this.data.choosePhoto.length >= 0) {
      this.setData({
        choosePhoto: this.data.choosePhoto
      })
    }
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})