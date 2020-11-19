// pages/changeNotice/changeNotice.js
const app = getApp();
const { filterTime } = require('../../utils/filterTime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      name: '',
      gender: '',
      genderName: '',
      idCard: '',
      sign: '',
      sign2: '',
      endDate: '',
      businessType: ''
    },
    nowDate: new Date().getTime(),
    currentDateType: '', // 当前选择的时间项
    dateShow: false, // 日期选择
    genderShow: false, // 性别选择
    businessTypeShow: false, // 职业/业务类型选择
    selectChangeShow: false, // 选择立即整改项弹窗
    selectChangeList: [
      {
        id: 1,
        name: '整改项1'
      },
      {
        id: 2,
        name: '整改项2'
      }
    ], // 立即整改项列表
    selectChangeResult: [], // 立即整改项选择结果
    selectChangeResultName: [], // 立即整改项选择结果名称
    genderList: [
      {
        text: '男',
        value: 1
      },
      {
        text: '女',
        value: 2
      }
    ],
    businessTypeList: [ // 业务类型
      {
        text: '汽车维修',
        value: 1
      },
      {
        text: '摩托车维修',
        value: 2
      },
      {
        text: '其他机动车维修',
        value: 3
      }
    ],
    textAreaColor: 'color:#999', // 文本域placeholder颜色，解决重叠问题
    tabShow1: false,
    tabShow2: false,
    tabShow3: false,
    tabShow4: false,
    tabShow5: false,
    activeNames: [],
  },

  collapseChange (event) {
    const ary =  event.detail
    const obj = {}
    const nums = [1, 2, 3 ,4, 5]
    nums.forEach(num => {
      obj['tabShow' + num] = false
    })
    ary && ary.forEach(item => {
      obj['tabShow' + item] = true
    })
    obj.activeNames = ary
    this.setData(obj)
  },

  // 选择性别
  genderChange (event) {
    this.setData({
      'form.gender': event.detail.value.value,
      'form.genderName': event.detail.value.text,
      genderShow: false
    })
  },

  // 选择职业/业务类型
  businessTypeChange (event) {
    this.setData({
      'form.businessType': event.detail.value.value,
      businessTypeShow: false
    })
  },

  // 选择立即整改项
  selectChangeProjectHandle(event) {
    const result = []
    event.detail.forEach(item => {
      this.data.selectChangeList.forEach(o => {
        if (o.name === item) {
          result.push(o)
        }
      })
    })
    this.setData({
      selectChangeResult: result,
      selectChangeResultName: event.detail
    });
  },

  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  // 选择日期
  dateChange (event) {
    var obj = {}
    obj[event.target.dataset.date] = filterTime(event.detail, 'yyyy-mm-dd')
    this.setData(obj)
  },

  // 打开选择弹窗
  openSelect (event) {
    var obj = {}
    obj[event.target.dataset.name] = true
    obj.textAreaColor = 'color:transparent'
    if (event.target.dataset.date) {
      obj.currentDateType = event.target.dataset.date
    }
    this.setData(obj)
  },

  // 关闭选择弹窗
  closeSelect (event) {
    var obj = {}
    obj[event.target.dataset.name] = false
    obj.textAreaColor = 'color:#999'
    this.setData(obj)
  },

  // 输入框双向绑定
  modelInput (event) {
    var obj = {}
    obj[event.target.dataset.name] = event.detail
    this.setData(obj)
  },

  // 提交表单
  submit () {
    console.log(this.data.form)
  },

  // 签名
  signNameEvent (event) {
    wx.navigateTo({
      url: '../signName/signName?key=' + event.target.dataset.name
    })
  },

  // 违法事实跳转
  toIllegalFatcs () {
    wx.navigateTo({
      url: '../illegalFacts/illegalFacts'
    })
  },

  // 选择整改项弹窗
  selectChangeProject () {
    this.data.selectChangeShow = true
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
    this.setData({
      activeNames: ['1'],
      tabShow1: true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data)
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