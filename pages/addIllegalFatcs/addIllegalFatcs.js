const app = getApp()

Page({
  data: {
    images: [
      { url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片1' },
    ],
    isDelete: false, // 是否可以删除
    currentIndex: '',
    illegalText: '',
    changeContent: ''
  },
  afterRead: function () {},
  // 删除图片
  imageDelete: function (event) {
    let images = JSON.parse(JSON.stringify(this.data.images))
    images.splice(event.detail.index, 1)
    this.setData({
      images
    })
  },
  addItem: function () {
    const illegalList = wx.getStorageSync('illegalList') || []
    illegalList.push({
      illegalText: this.data.illegalText,
      changeContent: this.data.changeContent
    })
    wx.setStorageSync('illegalList', illegalList)
    wx.navigateBack({
      delta: 1
    })
  },
  cancel () {
    wx.navigateBack({
      delta: 1
    })
  },
  deleteItem () {
    const illegalList = wx.getStorageSync('illegalList')
    if (this.data.currentIndex) {
      illegalList.splice(this.data.currentIndex, 1)
      wx.setStorageSync('illegalList', illegalList)
    }
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (option) {
    const illegalList = wx.getStorageSync('illegalList')
    if (option.index && option.custom && illegalList && illegalList.length) {
      this.setData({
        currentIndex: option.index,
        illegalText: illegalList[option.index].illegalText,
        changeContent: illegalList[option.index].changeContent
      })
    }
    this.setData({
      isDelete: !!option.custom
    })
  }
})