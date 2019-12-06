const app = getApp()

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
    icon_location: app.globalData.picUrl + '/icon_location.png',
    icon_navigation: app.globalData.picUrl + '/icon_navigation.png',
    icon_arrow_up_gray: app.globalData.picUrl + '/icon_arrow_up_gray.png',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
  },
  // 动态布局 点击事件
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

  // 跳转
  toJumpS: function (e) {

    let jumpway = e.currentTarget.dataset.jumpway
    let name = e.currentTarget.dataset.name
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: jumpway + '?name=' + name + '&item=' + item,
    })

  },

  // 提交
  submit:function(){

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
  },

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