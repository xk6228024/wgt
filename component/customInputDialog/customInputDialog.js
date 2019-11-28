
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hiddenInputDialog: {
      type: Boolean,
      value: true,
    },
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

    inputContent:'',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    input: function(e) {
      this.triggerEvent('putaaa', e.detail.value)
    },
    toInputConfirm: function (e) {
      this.triggerEvent('confirm')
      this.triggerEvent('close')
    },
    toInputClose: function (e) {
      this.triggerEvent('close')
    },
    toblur:function(e){
      this.triggerEvent('bluraaa', e.detail.value)
    }
  }
})