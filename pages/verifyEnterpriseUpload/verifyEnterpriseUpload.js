const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: '',
    name: '',
    // 上传图片的数组
    choosePhoto: [],
    // 上传文件的数组
    chooseFile: [],
    //成功个数
    successUp: '',
    //失败个数
    failUp: '',
    //总共个数
    length: '',
    //上传好的单张图片
    src: '',
    //上传好的图片数组
    piclist: [],
    icon_uploadFile: app.globalData.picUrl + '/icon_uploadFile.png',
    icon_addimg: app.globalData.picUrl + '/icon_addimg.png',
    icon_delimg: app.globalData.picUrl + '/icon_delimg.png',
    icon_uploadfile: app.globalData.picUrl + '/icon_uploadfile.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("options+++++++++++name==", options.name + "...item==" + options.item)
    wx.setNavigationBarTitle({
      title: options.name
    })

    this.setData({
      name: options.name,
      item: options.item
    })

  },
  // 选择图片
  chooseImg: function() {
    var that = this,
      choosePhoto = this.data.choosePhoto
    wx.chooseImage({
      count: 9 - choosePhoto.length, // 最多可以选择9张图片，默认9
      success: function(res) {
        var imgsrc = res.tempFilePaths;
        choosePhoto = choosePhoto.concat(imgsrc)
        // if (choosePhoto.length > 3) {
        //   wx.showModal({
        //     title: '',
        //     content: '最可只能上传3张图片',
        //     showCancel: false, //不显示取消按钮
        //     confirmText: '确定'
        //   })
        //   return
        // }
        that.setData({
          choosePhoto: choosePhoto
        })
      },
      fail: function() {
        //console.log("上传失败")
      },
      complete: function() {
        //console.log("上传成功")
      }
    })
  },
  // 图片删除
  toDetalImg: function(e) {
    let detalIndex = e.currentTarget.dataset.delnum
    this.data.choosePhoto.splice(detalIndex, 1)
    if (this.data.choosePhoto.length >= 0) {
      this.setData({
        choosePhoto: this.data.choosePhoto,
      })
    }
  },

  //选择文件
  chooseFiles: function() {
    var that = this,
      chooseFile = this.data.chooseFile
    wx.chooseMessageFile({
      count: 10,
      type: 'all',
      success(res) {
        var filename = res.tempFiles[0].name;
        var filepath = res.tempFiles[0].path;
        console.log("选择文件名==" + filename + "选择文件路径==" + filepath);
        let file = {
          'filename':filename,
          'filepath': filepath,
        };
        chooseFile = chooseFile.concat(file);
        that.setData({
          chooseFile: chooseFile
        })
      }
    })
  },

  /* 函数描述：作为上传文件时递归上传的函数体体；
   * 参数描述： 
   * filePaths是文件路径数组
   * successUp是成功上传的个数
   * failUp是上传失败的个数
   * i是文件路径数组的指标
   * length是文件路径数组的长度
   */
  uploadDIY: function(filePaths, successUp, failUp, i, length) {
    var that = this;
    console.log("图片上传中...")
    wx.uploadFile({
      url: app.globalData.url + '/vmts-supervision/app/attachment/upload',
      filePath: filePaths[i],
      name: 'file',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token"),
      },
      success: (res) => {
        successUp++;
        var data = JSON.parse(res.data);

        var srcArr = that.data.piclist;
        srcArr.push(data.data),
          that.setData({
            piclist: srcArr
          });
      },
      fail: (res) => {
        console.log("图片上传失败了" + JSON.stringify(res));

        that.setData({
          isuploaderror: 1
        });
        failUp++;
      },
      complete: () => {
        i++;
        if (i == length) {
          wx.hideToast();
          var txt = '总共' + successUp + '张上传成功,' + failUp + '张上传失败！';
          console.log(txt);
          // app.toastShow(0, txt, 2000, 1);
        } else { //递归调用uploadDIY函数
          if (that.data.isuploaderror) {
            console.log("图片上传失败，请重新选择上传");
            // app.toastShow(0, '图片上传失败，请重新选择上传', 2000, 1);
          } else {
            this.uploadDIY(filePaths, successUp, failUp, i, length);
          }
        }
      }
    });
  },

  //提交
  submit: function(e) {

    var successUp = 0; //成功个数
    var failUp = 0; //失败个数
    var i = 0; //第几个
    var length = this.data.choosePhoto.length; //长度

    this.uploadDIY(this.data.choosePhoto, successUp, failUp, i, length);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})