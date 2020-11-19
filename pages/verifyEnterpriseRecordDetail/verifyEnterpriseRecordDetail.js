// pages/verifyEnterpriseRecordDetail/verifyEnterpriseRecordDetail.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_arrow_up_gray: app.globalData.picUrl + '/icon_arrow_up_gray.png',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',

    icon_checkSuccess: app.globalData.picUrl + '/icon_checkSuccess.png',
    icon_warn: app.globalData.picUrl + '/icon_warn.png',
    dataSource: [
      {
        open: false,
        title: '经营场地(2)',
        subtitle: '符合(2)',
        state: 0,
        itemArray: [
          {
            state: 0,
            title: '接待室面积'
          },
          {
            state: 0,
            title: '公示信息'
          }
        ]
      },
      {
        open: false,
        title: '设施设备(3)',
        subtitle: '符合(3)',
        state: 0,
        itemArray: [
          {
            state: 0,
            title: '万用表'
          },
          {
            state: 0,
            title: '气缸压力表'
          },
          {
            state: 0,
            title: '燃油压力表'
          }
        ]
      },
      {
        open: false,
        title: '维修技术人员(2)',
        subtitle: '待整改(1)',
        state: 1,
        itemArray: [
          {
            state: 0,
            title: '技术负责人'
          },
          {
            state: 1,
            title: '质量检验员'
          }
        ]
      },
      {
        open: false,
        title: '维修管理制度(2)',
        subtitle: '已整改(1)',
        state: 2,
        itemArray: [
          {
            state: 0,
            title: '质量管理制度'
          },
          {
            state: 2,
            title: '安全生产管理制度'
          }
        ]
      },
      {
        open: false,
        title: '环境保护措施(3)',
        subtitle: '符合(3)',
        state: 0,
        itemArray: [
          {
            state: 0,
            title: '有害物质存储区域应界定清楚'
          },
          {
            state: 0,
            title: '具有处理“四废”及采光、通风、吸尘、净化、消声的设施'
          },
          {
            state: 0,
            title: '生产厂房条件'
          }
        ]
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  cellTapEvent: function (e) {
    let index = e.currentTarget.dataset.index;

    this.data.dataSource[index].open = !this.data.dataSource[index].open;
    var that = this;
    this.setData({
      dataSource: that.data.dataSource
    })
  },

  itemTapEvent: function (e) {
    let state = e.currentTarget.dataset.state;
    wx.navigateTo({
      url: '../verifyEnterpriseRecordItemDetail/verifyEnterpriseRecordItemDetail?state='+ state
    })
  },


  
})