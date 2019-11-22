
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hiddenDialog: {
      type: Boolean,
      value: true,
    },
    content:{
      type:String,
      value:'',
    }
  },

  /**
   * 组件的初始数据
   */
  // data: {
  //   dataList: [{
  //     optionName: "小型车",
  //     optionValue: "01"
  //   },
  //   {
  //     optionName: "其他",
  //     optionValue: "99"
  //   }
  //   ],
  // },
  /**
   * 组件的方法列表
   */
  methods: {
    toConfirm: function (e) {
      this.triggerEvent('confirm')
      this.triggerEvent('close')
    },
    toClose: function (e) {
      this.triggerEvent('close')
    },
  }
})