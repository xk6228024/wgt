
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showPopup: {
      type: Boolean,
      value: false,
    },
    sureBtnText: {
      type: String,
      value: '确定'
    },
    sureBtnColor: {
      type: String,
      value: '#0078D4'
    },
    cancelBtnText: {
      type: String,
      value: '取消'
    },
    showCancelBtn: {
      type: Boolean,
      value: true
    },
    title: {
      type: String,
      value: '提示'
    },
    concents: {
      type: String,
      value: '确定退出登录吗？'
    },
    showTitle: {
      type: Boolean,
      value: true,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击确定
    toSureBtn: function (e) {
      this.triggerEvent('toColse', 'sure')
    },
    // 点击取消
    toCancelBtn: function (e) {
      this.triggerEvent('toColse', 'cancel')
    }
  }
})
