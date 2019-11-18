const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-');

  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate1 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 2
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [hour, minute].map(formatNumber).join(':');

  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const maxDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 2
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-');

  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}




const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}





//多张图片上传
var uploadimg = function (data) {
  var that = this,
    i = data.i ? data.i : 0,//当前上传的哪张图片
    success = data.success ? data.success : 0,//上传成功的个数
    fail = data.fail ? data.fail : 0;//上传失败的个数
  wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'file',//这里根据自己的实际情况改
    success: (resp) => {
      success++;//图片上传成功，图片上传成功的变量+1

      //console.log(resp);
      // console.log(i);
      //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1 
    },
    fail: (res) => {
      fail++;//图片上传失败，图片上传失败的变量+1
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: () => {
      //console.log(i);
      i++;//这个图片执行完上传后，开始上传下一张            
      if (i == data.path.length) {   //当图片传完时，停止调用          
        console.log('执行完毕');
        console.log('成功：' + success + " 失败：" + fail);
      } else {//若图片还没有传完，则继续调用函数                
        // console.log(i);
        data.i = i;
        data.success = success;
        data.fail = fail;
        that.uploadimg(data);
      }
    }
  });
}


var dtime = '_deadtime';
function put(k, v, t) {
  wx.setStorageSync(k, v)
  var seconds = parseInt(t);
  if (seconds > 0) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000 + seconds;
    wx.setStorageSync(k + dtime, timestamp + "")
  } else {
    wx.removeStorageSync(k + dtime)
  }
}

function get(k, def) {
  var deadtime = parseInt(wx.getStorageSync(k + dtime))
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      if (def) { return def; } else { return; }
    }
  }
  var res = wx.getStorageSync(k);
  if (res) {
    return res;
  } else {
    return def;
  }
}

function remove(k) {
  wx.removeStorageSync(k);
  wx.removeStorageSync(k + dtime);
}

function clear() {
  wx.clearStorageSync();
}


module.exports = {
  formatDate: formatDate,
  formatDate1: formatDate1,
  formatTime: formatTime,
  maxDate: maxDate,
  uploadimg: uploadimg,
  put: put,
  get: get,
  remove: remove,
  clear: clear,
}
