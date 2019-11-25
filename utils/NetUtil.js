function doPost(urlStr, postData) {
  console.log('url==:' + urlStr+ '     doPost postData==:' + JSON.stringify(postData));
  return new Promise(function(resolve, reject) {
    
    //加载loading
    wx.showLoading({
      title: ''
    })

    wx.request({
      url: urlStr,
      method: 'POST',
      data: postData,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token"),
      },
      complete() {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      },
      success: function(res) {
        console.log('doPost success:' + JSON.stringify(res.data));

        // 成功
        if (res.data.status == 200) {
          resolve(res.data);
        }
        //失败 token 失效
        else if (res.data.status == 300) {
          console.log('fail');
          wx.showModal({
            title: '温馨提示',
            content: '登录已失效，即将重新登录',
            showCancel: false, //不显示取消按钮
            confirmText: '确定',
            confirmColor: '#0078D4',
            success: function() {
              wx.clearStorageSync();
              wx.navigateTo({
                url: '../../pages/login/login',
              })
            }
          })
        }
        //失败 其他失败
        else {
          reject(res.data.msg);
        }


      },
      fail: function(err) {
        console.log('doPost fail:' + JSON.stringify(err));
        reject(err);
      }
    })
  });
}

module.exports = {
  doPost: doPost
}