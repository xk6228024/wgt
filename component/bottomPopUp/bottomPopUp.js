
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hiddenPopUp: {
      type: Boolean,
      value: true,
    },
    allData: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dataList: [{
        optionName: "小型车",
        optionValue: "01"
      },
      {
        optionName: "其他",
        optionValue: "99"
      }
    ],
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tochooseLi: function(e) {
      let itemData = e.currentTarget.dataset.itemdata
      this.triggerEvent('chooseLi', itemData)
      this.triggerEvent('closeTns')
    },
    toClose: function(e) {
      this.triggerEvent('closeTns')
    },
    // 计算scroll高度
    // computeHeight: function (e) {
    //   wx.getSystemInfo({
    //     success: res => {
    //       this.setData({ windowHeight: res.windowHeight }) // 在调试模式下，真机获取的高度比开发工具少48，这48为tabBar的高度
    //     },
    //   })
    // },
  }
})