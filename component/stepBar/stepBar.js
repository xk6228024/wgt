// component/stepBar/stepBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 总步数
    allStepNum: {
      type: Number,
      value: 4,
    },
    activeStep: {
      type: Number,
      value: 1,
    },
    stepText: {
      type: Array,
      value: ['车主信息', '车牌信息', '运输证信息', '配置参数']
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

  }
})
