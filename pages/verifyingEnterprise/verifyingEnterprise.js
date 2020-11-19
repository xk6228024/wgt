const app = getApp()
var { map } = require('../../utils/util.js');

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
    //企业ID
    id:'',
    //列表传过来的list 字符串
    listStr:'',
    //列表传过来的list
    list:'',
    // 检查结果选择弹窗
    verifyingResultShow: false,
    // 检查结果选项
    verifyingResultList: [
      {
        name: '符合',
        color: '#52C41A',
        value: 1
      },
      {
        name: '不符合',
        color: '#F5222D',
        value: 0
      }
    ],
    //企业详情接口 
    url_detail: app.globalData.url + '/vmts-supervision/app/record/info',
    //企业详情数据
    sourceDetail: {
      enterpriseName: '测试企业名称',
      enterpriseBusinessCategoryStr: '一类',
      enterpriseProvinceText: '广东省',
      enterpriseCityText: '深圳市',
      enterpriseAreaText: '南山区',
      enterpriseDetailedAddress: '大新路98号',
    },
    //勘验项目接口
    url_project: app.globalData.url + '/dcvmts/bus-enterprise-inquest-project-tmpl/findEnterpriseInquestProjectTmplByType',
    //勘验数据
    sourceProject: '',
    activeNames: '',
    //确认提交
    url_confirm: app.globalData.url + '/vmts-supervision/app/inquest/status',
    icon_location: app.globalData.picUrl + '/icon_location.png',
    icon_navigation: app.globalData.picUrl + '/icon_navigation.png',
    icon_arrow_up_gray: app.globalData.picUrl + '/icon_arrow_up_gray.png',
    icon_arrow_next_gray: app.globalData.picUrl + '/icon_arrow_next_gray.png',
  },
  // 动态布局 点击事件
  itemSelect: function (e) {
    var id = e.currentTarget.dataset.id;
    let sourceProject = this.data.sourceProject;
    console.log("选择了第" + id);

    for (let i = 0; i < sourceProject.length; i++) {
      if (id == i) {
        let select = 'sourceProject[' + i + '].select'
        if (sourceProject[i].select) {
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
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    console.log("id==" + id+"     title==" +title);

    wx.navigateTo({
      url: jumpway + '?id=' + id+'&title=' + title,
    })
  },

  // 提交
  submit: function () {

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
    wx.navigateTo({
      url: '../changeNotice/changeNotice'
    })
    // this.confirmProject();
  },
  //导航
  navigationTestEvent(e) {
    map()
  },
  // 项目折叠展开
  onChange (event) {
    this.setData({
      activeNames: event.detail,
    })
  },
  // 检查结果选择弹窗打开
  openVerifyingResult () {
    this.setData({ verifyingResultShow: true })
  },
  // 检查结果选择弹窗关闭
  verifyingResultClose () {
    this.setData({ verifyingResultShow: false })
  },
  // 检查结果选择
  verifyingResultSelect (event) {
    console.log(event.detail)
  },
  //获取企业详情
  getDetail: function () {
    var that = this;

    that.setData({
      sourceData: {
        enterpriseRecordId: this.data.id,
      }
    })

    app.doPost(this.data.url_detail, this.data.sourceData).then(

      //请求成功code==200回调
      function (res) {
        that.setData({
          sourceDetail: res.data,
        })
      },
      //请求失败回调
      function (msg) {
        console.log('error:' + JSON.stringify(msg));
      }
    )
  },

    //获取勘验项目
    getProject: function () {
      // var that = this;
      // let list = JSON.parse(this.data.listStr);

      // that.setData({
      //   sourceData: {
      //     inquestRecordId: list.inquestRecordId,
      //     enterpriseRecordId: this.data.id,
      //     businessCategoryName: list.enterpriseBusinessCategoryText,
      //     cityCode: list.enterpriseCity
      //   }
      // })
  
      app.doPost(this.data.url_project, {
        enterpriseBusinessCategory: '04'
      }).then(
  
        //请求成功code==200回调
        res => {
          var data = res.data
          data.forEach(i => {
            i.subList = []
            // 环境保护措施
            i.enterpriseInquestProjectConditionTmplVoList.forEach(j => {
              j.enterpriseInquestProjectEnvironmentProdectTmplVoList.forEach(k => {
                k.subProjecName = k.inquestProjectEnvironmentProdectName
                k.subProjecCondition = k.inquestProjectEnvironmentProdectCondition
                k.subProjecConditionId = k.inquestProjectConditionId
                k.subProjectId = k.inquestProjectEnvironmentProdectId
                i.subList.push(k)
              })
              // 设施设备-检测设备
              j.enterpriseInquestProjectEquipmentDetectTmplVoList.forEach(k => {
                k.subProjecName = k.inquestProjectEquipmentDetectName
                k.subProjecCondition = k.inquestProjectEquipmentDetectQuantity
                k.subProjecConditionId = k.inquestProjectConditionId
                k.subProjectId = k.inquestProjectEquipmentDetectId
                i.subList.push(k)
              })
              // 设施设备-认证信息检查表
              j.enterpriseInquestProjectEquipmentMeasuringTmplVoList.forEach(k => {
                k.subProjecName = k.inquestProjectEquipmentMeasuringVerificationCertificate
                k.subProjecCondition = ''
                k.subProjecConditionId = k.inquestProjectConditionId
                k.subProjectId = k.inquestProjectEquipmentMeasuringId
                i.subList.push(k)
              })
              // 摩托车-设施设备备案条件符合性检查表
              j.enterpriseInquestProjectEquipmentMotorcycleTmplVoList.forEach(k => {
                k.subProjecName = k.inquestProjectEquipmentMotorcycleName
                k.subProjecCondition = k.inquestProjectEquipmentMotorcycleQuantity
                k.subProjecConditionId = k.inquestProjectConditionId
                k.subProjectId = k.inquestProjectEquipmentMotorcycleId
                i.subList.push(k)
              })
              // 设施设备-外协产品的外协合同及证书符合性检查表
              j.enterpriseInquestProjectEquipmentOutsourcedTmplVoList.forEach(k => {
                k.subProjecName = k.inquestProjectEquipmentOutsourcedName
                k.subProjecCondition = k.inquestProjectEquipmentOutsourcedCondition
                k.subProjecConditionId = k.inquestProjectConditionId
                k.subProjectId = k.inquestProjectEquipmentOutsourcedId
                i.subList.push(k)
              })
              // 设施设备-专用设备
              j.enterpriseInquestProjectEquipmentSpecialTmplVoList.forEach(k => {
                k.subProjecName = k.inquestProjectEquipmentSpecialName
                k.subProjecCondition = k.inquestProjectEquipmentSpecialQuantity
                k.subProjecConditionId = k.inquestProjectConditionId
                k.subProjectId = k.inquestProjectEquipmentSpecialId
                i.subList.push(k)
              })
              // 设施设备-仪表工具
              j.enterpriseInquestProjectEquipmentToolTmplVoList.forEach(k => {
                k.subProjecName = k.inquestProjectEquipmentToolName
                k.subProjecCondition = k.inquestProjectEquipmentToolQuantity
                k.subProjecConditionId = k.inquestProjectConditionId
                k.subProjectId = k.inquestProjectEquipmentToolId
                i.subList.push(k)
              })
              j.enterpriseInquestProjectEquipmentTrafficCertTmplVoList.map(k => i.subList.push(k))
              // 设施设备-通用设备
              j.enterpriseInquestProjectEquipmentUniversalTmplVoList.forEach(k => {
                k.subProjecName = k.inquestProjectEquipmentUniversalName
                k.subProjecCondition = k.inquestProjectEquipmentUniversalQuantity
                k.subProjecConditionId = k.inquestProjectConditionId
                k.subProjectId = k.inquestProjectEquipmentUniversalId
                i.subList.push(k)
              })
              // 维修管理制度
              j.enterpriseInquestProjectInstitutionTmplVoList.forEach(k => {
                k.subProjecName = k.inquestProjectInstitutionSubName
                k.subProjecCondition = k.inquestProjectInstitutionCondition
                k.subProjecConditionId = k.inquestProjectConditionId
                k.subProjectId = k.inquestProjectInstitutionId
                i.subList.push(k)
              })
              // 维修技术人员
              j.enterpriseInquestProjectTechnicalPersonTmplVoList.forEach(k => {
                k.subProjecName = k.inquestProjectTechnicalPersonPositionName
                if (k.inquestProjectTechnicalPersonPositionSubName) {
                  k.subProjecName = k.inquestProjectTechnicalPersonPositionSubName
                }
                k.subProjecCondition = k.inquestProjectTechnicalPersonPositionMarterial
                k.subProjecConditionId = k.inquestProjectConditionId
                k.subProjectId = k.inquestProjectTechnicalPersonId
                i.subList.push(k)
              })
              // 经营场地
              j.enterpriseInquestProjectWorkgroundTmplVoList.forEach(k => {
                k.subProjecName = k.inquestProjectWorkgroundName
                if (k.inquestProjectWorkgroundName === '公示信息') {
                  k.subProjecName = k.inquestProjectWorkgroundCondition
                }
                k.subProjecCondition = k.inquestProjectWorkgroundCondition
                k.subProjecConditionId = k.inquestProjectConditionId
                k.subProjectId = k.inquestProjectWorkgroundId
                i.subList.push(k)
              })
            })
          })
          console.log(data)
          this.setData({
            sourceProject: data,
          })
        },
        //请求失败回调
        function (msg) {
          console.log('error:' + JSON.stringify(msg));
        }
      )
    },

  //确认提交
  confirmProject: function () {
    var that = this;

    that.setData({
      sourceData: {
        enterpriseId: this.data.id,
      }
    })

    app.doPost(this.data.url_confirm, this.data.sourceData).then(

      //请求成功code==200回调
      function (res) {
        console.log('勘验提交成功');
        that.setData({
        })
      },
      //请求失败回调
      function (msg) {
        console.log('勘验提交失败 error:' + JSON.stringify(msg));
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    


    this.setData({
      id: options.id,
      listStr: options.list
    })
    console.log("id==" + this.data.id + '  listStr==' + this.data.listStr);
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
    // this.getDetail();
    this.getProject();
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