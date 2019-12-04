//备案审核详情页面
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
    specializedOpen: false,
    detectionOpen: false,
    universalOpen: false,
    hiddenDialog: true,
    hiddenInputDialog: true,
    currentIndex: 1,
    index: '',
    inputContent: '',
    id: '',
    url: app.globalData.url + '/vmts-supervision/app/record/info',
    url_audit_submit: app.globalData.url + '/vmts-supervision/app/record/updateAuditStatus',
    icon_location: app.globalData.picUrl + '/icon_location.png',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
    icon_arrow_up_gray: app.globalData.picUrl + '/icon_arrow_up_gray.png',
  },
  // 切换
  changeCurrent: function(e) {
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
  specialized: function(e) {
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

    // this.setData({
    //   specializedOpen: !this.data.specializedOpen
    // })
  },
  // //检测设备
  // detection: function() {
  //   this.setData({
  //     detectionOpen: !this.data.detectionOpen
  //   })
  // },
  // //通用
  // universal: function() {
  //   this.setData({
  //     universalOpen: !this.data.universalOpen
  //   })
  // },

  // 跳转
  toJumpS: function(e) {

    let jumpway = e.currentTarget.dataset.jumpway
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: jumpway + '?name=' + name,
    })

  },
  //----------------通过审核-----------------
  pass: function() {
    this.setData({
      hiddenDialog: false
    })
  },
  //取消
  toClose: function() {
    this.setData({
      hiddenDialog: true
    })
  },
  //确认
  toConfirm: function(e) {
    console.log("===data===审核通过确认提交");

    var that = this;

    that.setData({
      sourceData: {
        // "auditFailureReasons": "热个紫砂杯真棒起码想起上人",
        auditStatus: 1,
        enterpriseRecordId: this.data.id,
      }
    })

    netUtil.doPost(this.data.url_audit_submit, this.data.sourceData).then(

      //请求成功code==200回调
      function(res) {
        wx.showToast({
          title: res.message,
          icon: 'success',
          duration: 800,
        });
      },
      //请求失败回调
      function(msg) {
        console.log('error:' + JSON.stringify(msg));
        wx.showToast({
          title: '提交失败:' + msg,
          icon: 'fail',
          duration: 800,
        });
      }
    )
  },

  //------------审核不通过--------------
  noPass: function() {
    this.setData({
      hiddenInputDialog: false
    })
  },
  //获取输入内容  PS:真机才有效！
  getInput: function(e) {
    console.log("getInput");

    this.setData({
      inputContent: e.detail
    })
  },
  //取消
  toInputClose: function() {
    this.setData({
      hiddenInputDialog: true
    })
  },
  //确认
  toInputConfirm: function() {
    console.log("审核不通过 确认提交" + this.data.inputContent);

    var that = this;

    that.setData({
      sourceData: {
        auditFailureReasons: this.data.inputContent,
        auditStatus: 2,
        enterpriseRecordId: this.data.id,
      }
    })

    netUtil.doPost(this.data.url_audit_submit, this.data.sourceData).then(

      //请求成功code==200回调
      function(res) {
        wx.showToast({
          title: res.message,
          icon: 'success',
          duration: 1500,
        });
      },
      //请求失败回调
      function(msg) {
        console.log('error:' + JSON.stringify(msg));
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 1500,
        });
      }
    )
  },

  //获取企业详情
  getDetail: function() {
    var that = this;

    that.setData({
      sourceData: {
        enterpriseRecordId: this.data.orderId,
      }
    })

    netUtil.doPost(this.data.url, this.data.sourceData).then(

      //请求成功code==200回调
      function(res) {

        that.setData({
          sourceList: res.data,
        })
      },
      //请求失败回调
      function(msg) {
        console.log('error:' + JSON.stringify(msg));
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let i = 0;
    let array = this.data.array;

    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      item.select = false;
      array[i] = item;
    }

    this.data.array = array;
    
    
    this.setData({
      id: options.id
    })
    this.getDetail();
    console.log("id==" + this.data.id);


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