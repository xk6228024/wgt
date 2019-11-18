const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navbarData: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 默认值  默认显示左上角
    navbarData: {
      showCapsule: 1, // 显示左上角 返回
      bgc: '#FFFFFF',
      backColor: 0 // 是否显示黑色 1黑色 0白色
    },
  },
  attached: function () {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    init () {
      
    },
    toBack () {
      wx.navigateBack()
    }
  }
})
