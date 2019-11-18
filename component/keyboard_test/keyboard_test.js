
var app = getApp();
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    passwordInputHiddenProvince: {
      type: Boolean,
      value: true,
    },
    passwordInputHiddenNum: {
      type: Boolean,
      value: true,
    },
    todisableNo: {
      type: Boolean,
      value: false,
    },
    // 输入长度
    numLength: {
      type: Number,
      value: 8
    },
    // 是否含有省份 默认是的
    isProvince: {
      type: Boolean,
      value: true
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    icon_car_del: app.globalData.picUrl + '/icon_car_del.png',
    inputPassword:'', 
    // passwordInputHiddenProvince: true,//hidden是true 默认隐藏
    // passwordInputHiddenNum: true,//hidden是true 默认隐藏
    password: 123456,//设置的密码 这里写死 实际开发中后台专门设置一个表存储用户设置的密码
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  methods: {
    //关闭
    close(){
      this.setData({
        passwordInputHiddenProvince: true,
        passwordInputHiddenNum: true
      });
    },
    //清除
    clear() {
      this.data.inputPassword = "";
      this.triggerEvent('carNumevent', this.data.inputPassword);

      // this.triggerEvent('carNumevent', this.data.inputPassword);
      //   this.setData({
      //     inputPassword: "",
      //   });
      // var index = this.data.inputPassword.length;
      // if(index>=1){
      //   var inputPassword = this.data.inputPassword.substr(0, index - 1);
      //   this.setData({
      //     inputPassword: inputPassword
      //   });
      // }else{
      //   return
      // }
    },

    // keyIn(e) {
    //   var _this = this;
    //   if (this.data.passwordInputHiddenNum == false || this.data.passwordInputHiddenProvince == false) {
    //     this.setData({
    //       passwordInputHiddenProvince: true,
    //       passwordInputHiddenNum: true
    //     });
    //   } else {
    //     _this.passwordInputHiddenProvince();
    //   }
    // },
    // //字母切换
    // numSwitch(e) {
    //   this.setData({
    //     passwordInputHiddenProvince: true,
    //     passwordInputHiddenNum: false
    //   });
    //   if (this.data.inputPassword.length == 0 && this.data.passwordInputHiddenProvince) {
    //     this.setData({
    //       todisableNo: false
    //     })
    //   }
    // },
    // //省份切换
    // provinceSwitch (e) {
    //   // if (e.currentTarget.dataset.key&&e.currentTarget.dataset.key.length >= 1 && !this.data.passwordInputHiddenProvince) {
    //   //   this.setData({
    //   //     todisableNo: true
    //   //   })
    //   //   return
    //   // }
    //   // console.log(this.data.todisableNo, '555')
    //   if (!this.data.todisableNo) { // 不能切换
    //     return
    //   } else {
    //     this.setData({
    //       passwordInputHiddenProvince: false,
    //       passwordInputHiddenNum: true
    //     });
    //   }
    // },
    inputPassword(e) {
      //键盘输入的密码 赋值给inputPassword
      this.data.inputPassword = e.currentTarget.dataset.key;
      this.triggerEvent('carNumevent', this.data.inputPassword);


      // if (this.data.inputPassword.length >= this.data.numLength) {
      //   return
      // } else {
      //   this.data.inputPassword = this.data.inputPassword + e.currentTarget.dataset.key;
      // }
      // if (e.currentTarget.dataset.key.length>=1) {
      //   this.setData({
      //     passwordInputHiddenProvince: true,
      //     passwordInputHiddenNum: true,
      //   })
      // }
      // if (this.data.inputPassword.length.length >= 1 && !this.data.passwordInputHiddenProvince) {
      //   this.setData({
      //     todisableNo: true
      //   })
      // }
      // this.triggerEvent('carNumevent', this.data.inputPassword);
      // // 当输入密码正确时   
      // if (this.data.inputPassword.length == 6 && this.data.password == this.data.inputPassword) {
      //   this.passwordInputHiddenProvince();//关闭小键盘
      // }
      // // 当输入密码错误时  给个提示 并且把输入的密码清零
      // if (this.data.inputPassword.length == 6 && this.data.password != this.data.inputPassword) {
      // }
    },
    // passwordInputHiddenProvince(e) {
    //   var that = this;
    //   this.setData({
    //     passwordInputHiddenProvince: false,  // 打开关闭小键盘
    //     passwordInputHiddenNum: true
    //   });
    //   // this.setData({
    //   //   inputPassword: ''
    //   // })
    // },
    // //删除输入错误的密码
    // clear() {
    //   var index = this.data.inputPassword.length;
    //   // console.log(this.data.inputPassword)
    //   if (index > 0 ) {
    //     var inputPassword = this.data.inputPassword.substr(0, index - 1);
    //     this.setData({
    //       inputPassword: inputPassword
    //     });
    //     // console.log(this.data.passwordInputHiddenProvince)
    //     // console.log(this.data.isProvince, '123456')
    //     if (this.data.inputPassword.length == 0 && this.data.passwordInputHiddenProvince) {
    //       if (this.data.isProvince) {
    //         this.setData({
    //           passwordInputHiddenProvince: false,
    //           passwordInputHiddenNum: true
    //         })
    //       }
    //     }
    //     this.triggerEvent('carNumevent', this.data.inputPassword);
    //   } else {
    //     return;
    //   }
    // },
  }
})
