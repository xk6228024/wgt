const app = getApp();   //获取应用实例
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
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
    profile: function () {
      var pages = getCurrentPages(); //获取加载的页面
      var currentPage = pages[pages.length - 1]; //获取当前页面的对象
      var url = currentPage.route;//当前页面ur
      if (url.indexOf("/profile/profile") >= 0){
        return;
      }else{
        wx.redirectTo({
          url: '../profile/profile',
        })
      }
    },
    addfile: function () {
      wx.navigateTo({
        url: '../carOwnersInfo/carOwnersInfo',
      })
    },
    mine: function () {
      var pages_mine = getCurrentPages(); //获取加载的页面
      var currentPage_mine = pages_mine[pages_mine.length - 1]; //获取当前页面的对象
      var url_mine = currentPage_mine.route;//当前页面ur
      if (url_mine.indexOf("/my/my") >= 0) {
        return;
      } else {
        wx.redirectTo({
          url: '../my/my',
        })
      }
    },
  }
})