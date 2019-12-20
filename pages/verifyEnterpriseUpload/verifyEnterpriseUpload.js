const app = getApp()

var selectData = [];
var selectDataIndex = 0;//用于统计上传文件
var uploadFileIndex = 0;
var uploadFileCount = 0;
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
    //锁
    lock: false,
    //勘验模板接口 
    url_detail: app.globalData.url + '/vmts-supervision/app/inquest/project/content',
    //勘验模板数据
    sourceDetail: [],
    //勘验内容保存接口
    url_commit: app.globalData.url + '/vmts-supervision/app/inquest/project/content/add',
    //勘验内容要上传的数据
    enterpriseInquestProjectContent:'',
    //详情数据
    sourceObj:'',
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
      function(res) {
        let itemList = res.data.projectContentVos;
        for (let i = 0; i < itemList.length; i++) {
          let item = itemList[i];
          if (item.inquestProjectTblType == '3' || item.inquestProjectTblType == '4') {
            if (item.inquestProjectContentValue.indexOf("[") != -1 || item.inquestProjectContentValue.indexOf("{") != -1) {
              let obj = JSON.parse(item.inquestProjectContentValue);
              item.inquestProjectContentValue = obj;
            }
            if (item.inquestProjectContentValue instanceof Array) {
              //是数组不处理
            } else {
              //不是数组赋空数组
              item.inquestProjectContentValue = [];
            }
          }
          itemList[i] = item;
        }

        that.setData({
          sourceDetail: itemList,
          sourceObj :res.data,
        })
      },
      //请求失败回调
      function(msg) {
        console.log('error:' + JSON.stringify(msg));
      }
    )
  },

  //确认上传勘验内容接口
  uploadContent: function () {

    //组装数据
    var selectObj = {};
    for (let i = 0; i < selectData.length; i++) {
      selectObj[selectData[i].inquestProjectTblId] = selectData[i].inquestProjectContentValue;
    }
    let enterpriseInquestProjectContent = JSON.stringify(selectObj);

    console.log('enterpriseInquestProjectContent:============' + enterpriseInquestProjectContent);

    this.setData({
      sourceData: {
        inquestProjectContentId :this.data.id,
        inquestProjectId: this.data.sourceObj.inquestProjectId,
        enterpriseRecordId: this.data.sourceObj.enterpriseRecordId,
        inquestProjectCode: this.data.sourceObj.inquestProjectCode,
        cityCode: this.data.sourceObj.cityCode,
        inquestProjectContent: enterpriseInquestProjectContent,
      }
    })

    app.doPost(this.data.url_commit, this.data.sourceData).then(

      //请求成功code==200回调
      function (res) {
        wx.hideLoading();
        console.log('提交成功！！！');

      },
      //请求失败回调
      function (msg) {
        wx.hideLoading();
        console.log('error:' + JSON.stringify(msg));
      }
    )
  },

  // 选择图片
  chooseImg: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.dex;
    let imageArray = this.data.sourceDetail[index].inquestProjectContentValue;
    
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
  chooseFiles: function(e) {
    var that = this;
    let index = e.currentTarget.dataset.dex;
    let fileArray = this.data.sourceDetail[index].inquestProjectContentValue;

    wx.chooseMessageFile({
      count: 10,
      type: 'file',
      success(res) {
        console.log("选择了==" + res.tempFiles);
        let i = 0;
        for (i = 0; i < res.tempFiles.length; i++) {
          var filename = res.tempFiles[i].name;
          var filepath = res.tempFiles[i].path;
          console.log("选择文件名==" + filename + "选择文件路径==" + filepath);
          let file = {
            'filename': filename,
            'filepath': filepath,
          };
          fileArray = fileArray.concat(file);
        }
        that.data.sourceDetail[index].inquestProjectContentValue = fileArray;
        that.setData({
          sourceDetail: that.data.sourceDetail
        });
      }
    })
  },
  // 文件删除
  toDetalFile: function(e) {

    let detalIndex = e.currentTarget.dataset.delnum;
    let index = e.currentTarget.dataset.idex;
    let fileArray = this.data.sourceDetail[index].inquestProjectContentValue;
    fileArray.splice(detalIndex, 1)
    this.data.sourceDetail[index].inquestProjectContentValue = fileArray;
    this.setData({
      sourceDetail: this.data.sourceDetail,
    })
  },

  /* 函数描述：作为上传文件时递归上传的函数体体；
   * 参数描述： 
   * filePaths是文件路径数组
   * successUp是成功上传的个数
   * failUp是上传失败的个数
   * i是文件路径数组的指标
   * length是文件路径数组的长度
   * type是文件路类型 3:图片 4:文件
   */
  uploadFiles: function(filePaths, successUp, failUp, i, length, index,type) {

    var that = this;
    var index = index;
    if(type == '3'){
      console.log("图片上传中..." + filePaths[i])  
    }else{
      console.log("文件上传中..." + filePaths[i])
    }

    if (!(filePaths[i].indexOf("//tmp") != -1)){
      var srcArr = selectData[index].fielUrl;
      srcArr.push(filePaths[i]);
      selectData[index].fielUrl = srcArr;
      i++;
      if (i == length) {
        selectDataIndex++;
        uploadFileIndex++;
        that.uploadEvent(uploadFileCount);
      } else { //递归调用uploadFiles函数
         this.uploadFiles(filePaths, successUp, failUp, i, length, index, type);
      }
    }else{
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

          var srcArr = selectData[index].fielUrl;
          srcArr.push(data.data);
          selectData[index].fielUrl = srcArr;


        },
        fail: (res) => {
          if (type == '3') {
            console.log("图片上传失败了" + JSON.stringify(res));
          } else {
            console.log("文件上传失败了" + JSON.stringify(res));
          }
          selectData[index].fielUrl = 0;
          that.data.isuploaderror = 1;
          failUp++;
        },
        complete: () => {
          i++;
          if (i == length) {
            // wx.hideToast();
            if (type == '3') {
              selectData[index].inquestProjectContentValue = selectData[index].fielUrl;
              var txt = '总共' + successUp + '张上传成功,' + failUp + '张上传失败！';
              console.log(txt);
            } else {
              let filePathArray = selectData[index].inquestProjectContentValue;
              for (let k = 0; k < filePathArray.length; k++) {
                filePathArray[k].filepath = selectData[index].fielUrl[k];
              }
              selectData[index].inquestProjectContentValue = filePathArray;
              var txt = '总共' + successUp + '个文件上传成功,' + failUp + '个文件上传失败！';
              console.log(txt);
            }
            selectDataIndex++;
            uploadFileIndex++;
            that.uploadEvent(uploadFileCount);
          } else { //递归调用uploadFiles函数
            if (that.data.isuploaderror) {
              if (type == '3') {
                console.log("图片上传失败，请重新选择上传");
              } else {
                console.log("文件上传失败，请重新选择上传");
              }
              // app.toastShow(0, '图片上传失败，请重新选择上传', 2000, 1);


            } else {
              this.uploadFiles(filePaths, successUp, failUp, i, length, index, type);
            }
          }
        }
      });
    }
  },
  //输入监听
  bindTextAreaBlur: function(e) {
    let value = e.detail.value
    let textLen = value.length;
    if (textLen > 100) {
      return;
    }
    let index = e.currentTarget.dataset.dex;
    console.log('bindTextAreaBlur index:============' + index);
    this.data.sourceDetail[index].inquestProjectContentValue = value;
    this.setData({
      sourceDetail: this.data.sourceDetail
    })
  },


  uploadEvent: function (uploadFileCount) {
    if (uploadFileCount == uploadFileIndex) {
      //上传结束
      this.uploadContent();
      return;
    }
    let sourceList = this.data.sourceDetail;
    for(let index = selectDataIndex; index < selectData.length; index++){
      //上传到第几个文件
      selectDataIndex = index;
      let item = sourceList[index];
      let selectItem = selectData[index];
      if ((item.inquestProjectTblType == '3' || item.inquestProjectTblType == '4') && item.inquestProjectContentValue.length > 0){
        //上传未上传的文件图片 
        let successUp = 0; //成功个数
        let failUp = 0; //失败个数
        let i = 0; //第几个
        if (item.inquestProjectTblType == '3') {
         
          let length = item.inquestProjectContentValue.length; //长度
          this.uploadFiles(item.inquestProjectContentValue, successUp, failUp, i, length, index, item.inquestProjectTblType);
        }else{
          
          let fileArray = [];
          for (let j = 0; j < item.inquestProjectContentValue.length; j++){
            let file = item.inquestProjectContentValue[j];
            fileArray.push(file.filepath);
          }
          let length = fileArray.length; //长度
          this.uploadFiles(fileArray, successUp, failUp, i, length, index, item.inquestProjectTblType);
        }
        
        break;
      }
    }
  },
  //提交
  submit: function(e) {
    wx.showLoading({
      title: '',
    });
    selectData = this.data.sourceDetail;
    selectDataIndex = 0;
    uploadFileIndex = 0;
    uploadFileCount = 0;
    //组装图片或文件上传
    for (let index = 0; index < selectData.length; index++) {
      let item = selectData[index];
      if ((item.inquestProjectTblType == '3' || item.inquestProjectTblType == '4') && item.inquestProjectContentValue.length > 0)       {
        selectData[index].fielUrl = [];
        uploadFileCount = uploadFileCount+1;
      }
    }
    this.uploadEvent(uploadFileCount);

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