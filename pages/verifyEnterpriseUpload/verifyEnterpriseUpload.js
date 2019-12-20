const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //输入框长度
    textLen: 0,
    //输入框内容
    textarea: '',
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
    //标题头
    title: '',
    //id
    id: '',
    //勘验模板接口 
    url_detail: app.globalData.url + '/vmts-supervision/app/inquest/project/content',
    //勘验模板数据
    sourceDetail:[],
    icon_uploadFile: app.globalData.picUrl + '/icon_uploadFile.png',
    icon_addimg: app.globalData.picUrl + '/icon_addimg.png',
    icon_delimg: app.globalData.picUrl + '/icon_delimg.png',
    icon_uploadfile: app.globalData.picUrl + '/icon_uploadfile.png',
    icon_nodata: app.globalData.picUrl + '/icon_nodata.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    wx.setNavigationBarTitle({
      title: options.title
    })

    this.setData({
      title: options.title,
      id: options.id,
    })

    console.log("id==" + this.data.id);

    this.getDetail();

  },
  //获取模板详情
  getDetail: function() {
    var that = this;

    that.setData({
      sourceData: {
        contentId: this.data.id,
      }
    })

    app.doPost(this.data.url_detail, this.data.sourceData).then(

      //请求成功code==200回调
      function (res) {
        let itemList = res.data.projectContentVos;
        for(let i = 0;i<itemList.length; i++){
          let item = itemList[i];
          if(item.inquestProjectTblType == '3' || item.inquestProjectTblType == '4'){
            if(item instanceof Array){
              //是数组不处理
            }else{
              //不是数组赋空数组
              item.inquestProjectContentValue = [];
            }
          }
        }

        that.setData({
          sourceDetail: itemList,
        })
      },
      //请求失败回调
      function (msg) {
        console.log('error:' + JSON.stringify(msg));
      }
    )
  },

  // 选择图片
  chooseImg: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.dex;
    let imageArray = this.data.sourceDetail[index].inquestProjectContentValue;
    if(typeof(imageArray) === 'string'){
      imageArray = [];
    }
    wx.chooseImage({
      count: 9 - imageArray.length, // 最多可以选择9张图片，默认9
      success: function(res) {
        var imgsrc = res.tempFilePaths;
        console.log("选择图片路径==" + imgsrc);

        imageArray = imageArray.concat(imgsrc)
        that.data.sourceDetail[index].inquestProjectContentValue = imageArray;

        that.setData({
          sourceDetail: that.data.sourceDetail
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
    let detalIndex = e.currentTarget.dataset.delnum;
    let index = e.currentTarget.dataset.idex;
    let imageArray = this.data.sourceDetail[index].inquestProjectContentValue;
    imageArray.splice(detalIndex, 1)
    this.data.sourceDetail[index].inquestProjectContentValue = imageArray;
    this.setData({
      sourceDetail: this.data.sourceDetail,
    })
    
  },

  //选择文件
  chooseFiles: function() {
    var that = this,
      chooseFile = this.data.chooseFile
    wx.chooseMessageFile({
      count: 10,
      type: 'file',
      success(res) {
        console.log("选择了==" + res.tempFiles);
        let i = 0;
        for (i = 0; i < res.tempFiles.length;i++){
          var filename = res.tempFiles[i].name;
          var filepath = res.tempFiles[i].path;
          console.log("选择文件名==" + filename + "选择文件路径==" + filepath);
          let file = {
            'filename': filename,
            'filepath': filepath,
          };
          chooseFile = chooseFile.concat(file);
          that.setData({
            chooseFile: chooseFile
          })
        }
      }
    })
  },
  // 文件删除
  toDetalFile: function(e) {
    let detalIndex = e.currentTarget.dataset.delnum
    this.data.chooseFile.splice(detalIndex, 1)
    if (this.data.chooseFile.length >= 0) {
      this.setData({
        chooseFile: this.data.chooseFile,
      })
    }
  },

  /* 函数描述：作为上传文件时递归上传的函数体体；
   * 参数描述： 
   * filePaths是文件路径数组
   * successUp是成功上传的个数
   * failUp是上传失败的个数
   * i是文件路径数组的指标
   * length是文件路径数组的长度
   */
  uploadImg: function(filePaths, successUp, failUp, i, length) {
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
        } else { //递归调用uploadImg函数
          if (that.data.isuploaderror) {
            console.log("图片上传失败，请重新选择上传");
            // app.toastShow(0, '图片上传失败，请重新选择上传', 2000, 1);
          } else {
            this.uploadImg(filePaths, successUp, failUp, i, length);
          }
        }
      }
    });
  },
  //输入监听
  bindTextAreaBlur: function(e) {
    let value = e.detail.value
    let textLen = value.length;
    this.setData({
      textLen: textLen,
      textarea: value
    });
    if (textLen > 100) {
      return;
    }

  },

  //提交
  submit: function(e) {

    var successUp = 0; //成功个数
    var failUp = 0; //失败个数
    var i = 0; //第几个
    var length = this.data.choosePhoto.length; //长度

    this.uploadImg(this.data.choosePhoto, successUp, failUp, i, length);

    var selectData = {};
    for(let i = 0;i<this.data.sourceDetail.length;i++){
      selectData[this.data.sourceDetail[i].inquestProjectTblId] = this.data.sourceDetail[i].inquestProjectContentValue;
    }
    let enterpriseInquestProjectContent = JSON.stringify(selectData);

    console.log('enterpriseInquestProjectContent:'+enterpriseInquestProjectContent);
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