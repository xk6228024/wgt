const app = getApp()

Page({
  data: {
    project: '接待室',
    requirement: '面积不小于80',
    images: [
      { url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片1' },
    ],
    result: ''
  },
  afterRead: function () {},
  // 删除图片
  imageDelete: function (event) {
    console.log(event.detail)
    let images = JSON.parse(JSON.stringify(this.data.images))
    images.splice(event.detail.index, 1)
    console.log(images)
    this.setData({
      images
    })
  },
  submit: function () {
    wx.navigateTo({
      url: '/pages/verifyingEnterprise/verifyingEnterprise'
    })
  },
  onShow: function () {}
})