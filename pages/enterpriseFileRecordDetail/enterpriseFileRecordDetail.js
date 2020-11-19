//备案企业企业详情页面
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_navigation: app.globalData.picUrl + '/icon_navigation.png',
    picList: [{},{}],
    activeNames: '',
    activeNames2: '',
    array: [
      {
      message: '专用设备',
      // select: false,
      son: [{
        messageson: '专用设备的儿子1',
      }, {
        messageson: '专用设备的儿子2',
      }, {
        messageson: '专用设备的儿子3',
      }]
    }, {
      message: '检测设备',
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
      message: '通用设备',
      vehicleId: '7654321',
      // select: false,
      son: [{
        messageson: '通用设备的儿子1',
      }, {
        messageson: '通用设备的儿子2',
      }, {
        messageson: '通用设备的儿子3',
      }]
    }
    ],
    materialType: {
      '1': '营业执照复印件',
      '2': '经营场地、停车场面积、土地使用权及产权证明等相关材料aaaa',
      '3': '技术人员汇总表，以及各相关人员的学历、技术职称或职业资格证明等相关材料',
      '4': '维修管理制度等相关材料',
      '5': '环境保护措施等相关材料',
      '6': '与其作业内容相适应的专用维修车间和设备、设施等相关材料',
      '7': '突发事件应急预案',
      '8': '安全管理人员汇总表',
      '9': '安全管理人员汇总表',
      '10': '安全操作规程材料',
      '11': '连锁经营协议书副本',
      '12': '连锁经营的作业标准和管理手册',
      '13': '连锁经营服务网点符合机动车维修经营相应条件承诺书',
    },
    currentIndex: 1,
    url: app.globalData.url + '/vmts-supervision/app/record/info',
    icon_location: app.globalData.picUrl + '/icon_location.png',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
    icon_arrow_up_gray: app.globalData.picUrl + '/icon_arrow_up_gray.png',
    basEnterpriseMaterialsList: [
      {
        name: '小米',
        value: '1111111111111'
      },
      {
        name: '小米',
        value: '1111111111111'
      }
    ],
    itemList: [
      {
        type: 1,
        limit: 1,
        url: [],
        show: true,
        text: '营业执照（副本）扫描件（最多1张）'
      },
      {
        type: 2,
        limit: 10,
        url: [],
        show: true,
        text: '法人代表身份证扫描件'
      },
      {
        type: 3,
        limit: 10,
        url: [],
        show: true,
        text: '经营场地、停车场面积、土地使用权及产权证明等相关材料'
      },
      {
        type: 4,
        limit: 10,
        url: [],
        show: true,
        text: '现场铺面正面照（含招牌）'
      },
      {
        type: 5,
        limit: 10,
        url: [],
        show: true,
        text: '现场铺面内部照'
      },
      {
        type: 6,
        limit: 10,
        url: [],
        show: true,
        text: '技术人员汇总表，以及各相关人员的学历、技术职称或职业资格证明等相关材料'
      },
      {
        type: 7,
        limit: 10,
        url: [],
        show: true,
        text: '维修设备设施汇总表，维修检测设备及计量设备检定合格证明等相关材料'
      },
      {
        type: 8,
        limit: 10,
        url: [],
        show: true,
        text: '组织管理制度'
      },
      {
        type: 9,
        limit: 10,
        url: [],
        show: true,
        text: '质量管理制度'
      },
      {
        type: 10,
        limit: 10,
        url: [],
        show: true,
        text: '经营管理制度'
      },
      {
        type: 11,
        limit: 10,
        url: [],
        show: true,
        text: '安全环保制度'
      },
      {
        type: 12,
        limit: 10,
        url: [],
        show: true,
        text: '管理制度'
      },
      {
        type: 13,
        limit: 10,
        url: [],
        show: true,
        text: '其他专项要求'
      },
      {
        type: 14,
        limit: 10,
        url: [],
        show: true,
        text: '价格管理'
      },
      {
        type: 15,
        limit: 10,
        url: [],
        show: true,
        text: '安全生产要求'
      },
      {
        type: 16,
        limit: 10,
        url: [],
        show: true,
        text: '环境影响报告表'
      },
      {
        type: 17,
        limit: 10,
        url: [],
        show: true,
        text: '环境影响登记表'
      },
      {
        type: 18,
        limit: 10,
        url: [],
        show: true,
        text: '外协漆房合同'
      },
      {
        type: 19,
        limit: 10,
        url: [],
        show: true,
        text: '固体废物、废油回收点'
      },
      {
        type: 20,
        limit: 10,
        url: [],
        show: true,
        text: '固体废物承诺书'
      },
      {
        type: 21,
        limit: 10,
        url: [],
        show: true,
        text: '废油回收承诺书'
      },
      {
        type: 22,
        limit: 10,
        url: [],
        show: true,
        text: '与其作业内容相适应的专用维修车间和设备、设施等相关材料'
      },
      {
        type: 23,
        limit: 10,
        url: [],
        show: true,
        text: '突发事件应急预案'
      },
      {
        type: 24,
        limit: 10,
        url: [],
        show: true,
        text: '安全管理人员汇总表'
      },
      {
        type: 25,
        limit: 10,
        url: [],
        show: true,
        text: '安全操作规程材料'
      },
      {
        type: 26,
        limit: 10,
        url: [],
        show: true,
        text: '连锁经营协议书副本'
      },
      {
        type: 27,
        limit: 10,
        url: [],
        show: true,
        text: '连锁经营的作业标准和管理手册'
      },
      {
        type: 28,
        limit: 10,
        url: [],
        show: true,
        text: '连锁经营服务网点符合机动车维修经营相应条件承诺书'
      },
      {
        type: 29,
        limit: 10,
        url: [],
        show: true,
        text: '消防设施照片'
      },
      {
        type: 30,
        limit: 10,
        url: [],
        show: true,
        text: '员工汇总表'
      },
      {
        type: 31,
        limit: 10,
        url: [],
        show: true,
        text: '员工身份证'
      },
      {
        type: 32,
        limit: 10,
        url: [],
        show: true,
        text: '相关学历证明技术职称或职业资格证明'
      },
      {
        type: 33,
        limit: 10,
        url: [],
        show: true,
        text: '设施设备汇总表'
      },
      {
        type: 34,
        limit: 10,
        url: [],
        show: true,
        text: '维修检测设备及计量设备检定合格证明等相关材料'
      },
      {
        type: 35,
        limit: 30,
        url: [],
        show: true,
        text: '维修工时费价格单'
      },
      {
        type: 36,
        limit: 30,
        url: [],
        show: true,
        text: '门店项目价格表'
      }
    ],

    materialsList:[
      {
        title: '企业信息',
        itemType:[1,2,3,4,5],
        itemList: []
      },
      {
        title: '员工信息',
        itemType: [6, 30, 31, 32],
        itemList: []
      },
      {
        title: '设施设备信息',
        itemType: [7, 34],
        itemList: []
      },
      {
        title: '维修管理制度',
        itemType: [8, 9, 10, 11, 12,13,14,15,35,36],
        itemList: []
      },
      {
        title: '环境保护措施',
        itemType: [16, 17, 18, 19, 20,21],
        itemList: []
      },
      {
        title: '危险货物运输车辆经营材料',
        itemType: [22, 23, 24, 25],
        itemList: []
      },
      {
        title: '连锁维修经营材料',
        itemType: [26, 27, 28],
        itemList: []
      },
      {
        title: '其他',
        itemType: [29],
        itemList: []
      },
    ],
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  onChange2(event) {
    this.setData({
      activeNames2: event.detail,
    });
  },
  // 设备选择
  itemSelect: function(e) {
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

  // 跳转
  toJumpS: function(e) {

    let jumpway = e.currentTarget.dataset.jumpway
    let info = e.currentTarget.dataset.info
    let infoStr = JSON.stringify(info);
    wx.navigateTo({
      url: jumpway + '?info=' + infoStr,
    })

  },

  //获取企业详情
  getDetail: function() {
    var that = this;

    that.setData({
      sourceData: {
        enterpriseRecordId: this.data.orderId,
      }
    })

    app.doPost(this.data.url, this.data.sourceData).then(

      //请求成功code==200回调
      function(res) {

        //重新组织一下数据------------备案资料
        let tempSourceList = [];
        for (let i = 0; i < that.data.itemList.length; i++){
          let item = that.data.itemList[i];
          for (let j = 0; j < res.data.basEnterpriseMaterials.length; j++){
            let tempItem = res.data.basEnterpriseMaterials[j];
            if (item.type == tempItem.materialType){
              item.url.push(tempItem.materialUrl);
            }
          }
          if (item.url.length){
            tempSourceList.push(item);
          }
        }

        
        let mainArray = [];
        let _materialsList = that.data.materialsList;
        for (let j = 0; j < _materialsList.length;j++){
          let _tempItem = _materialsList[j];
          for (let i = 0; i < tempSourceList.length; i++) {
            let _item = tempSourceList[i];
            if (_tempItem.itemType.indexOf(_item.type)>-1){
              _tempItem.itemList.push(_item);
            }
          }
          if (_tempItem.itemList.length>0){
            mainArray.push(_tempItem);
          }
        }
        

  
      //重新组织一下数据------------设备
        for (let i=0;i < res.data.busEntrecordSpecialEquipments.length;i++) {
          let item = res.data.busEntrecordSpecialEquipments[i];
          res.data.busEntrecordSpecialEquipments[i].itemName = item.specialEquipmentName;
        }

        for (let i = 0; i < res.data.busEntrecordDetectEquipments.length; i++) {
          let item = res.data.busEntrecordDetectEquipments[i];
          res.data.busEntrecordDetectEquipments[i].itemName = item.detectEquipmentName;
        }

        for (let i = 0; i < res.data.busEntrecordUniversalEquipments.length; i++) {
          let item = res.data.busEntrecordUniversalEquipments[i];
          res.data.busEntrecordUniversalEquipments[i].itemName = item.universalEquipmentName;
        }

        for (let i = 0; i < res.data.busEntrecordThreeclassEquipments.length; i++) {
          let item = res.data.busEntrecordThreeclassEquipments[i];
          res.data.busEntrecordThreeclassEquipments[i].itemName = item.universalEquipmentName;
        }

        for (let i = 0; i < res.data.busEntrecordMotorEquipments.length; i++) {
          let item = res.data.busEntrecordMotorEquipments[i];
          res.data.busEntrecordMotorEquipments[i].itemName = item.detectEquipmentName;
        }
        let dataArray = [
          {
            message: '专用设备',
            son: res.data.busEntrecordSpecialEquipments
          },
          {
            message: '检测设备',
            son: res.data.busEntrecordDetectEquipments
          },
          {
            message: '通用设备',
            son: res.data.busEntrecordUniversalEquipments
          },
          {
            message: '三类设备',
            son: res.data.busEntrecordThreeclassEquipments
          },
          {
            message: '摩托车设备',
            son: res.data.busEntrecordMotorEquipments
          },
        ];

        that.setData({
          sourceList: res.data, 
          array: dataArray,
          basEnterpriseMaterialsList: mainArray,
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
    this.setData({
      orderId: options.id
    })
    this.getDetail();
    console.log("id==" + this.data.orderId);
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