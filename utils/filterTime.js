
// 正则替换函数
function replaceReg (s, e, n, str) {
    var sReg = new RegExp(s + '+', 'i')
    var tReg = new RegExp(s, 'i')
    var mReg = new RegExp(s + '{1,' + n + '}', 'i')
    return str.replace(sReg, (tReg.test(str) && e.substr(e.length - str.match(mReg)[0].length)) || '')
}

/**
 * 时间戳或时区字符串格式转换
 * 
 * @param  {[Number]}||{[String]} 时间戳||时区字符串
 * @param  {[String]} 输入 'yyyy-mm-dd hh:ff:ss:ccc' 返回时间格式2018-08-01 20:11:33:654
 *
 * 符号可用任意字符代替
 */
function filterTime (str, time) {
    if (typeof time === 'string') {
        let temp = time
        time = str
        str = temp
    }
    if (!time) return ''
    if (/T/.test(time)) {
        time = formatTimeZone(time)
    }
    var date = new Date(time)
    str = replaceReg('y', date.getFullYear() + '', 4, str)
    str = replaceReg('m', date.getMonth() + 1 > 10 ? date.getMonth() + 1 + '' : '0' + (date.getMonth() + 1), 2, str)
    str = replaceReg('d', date.getDate() > 10 ? date.getDate() + '' : '0' + date.getDate(), 2, str)
    str = replaceReg('h', date.getHours() > 10 ? date.getHours() + '' : '0' + date.getHours(), 2, str)
    str = replaceReg('f', date.getMinutes() > 10 ? date.getMinutes() + '' : '0' + date.getMinutes(), 2, str)
    str = replaceReg('s', date.getSeconds() > 10 ? date.getSeconds() + '' : '0' + date.getSeconds(), 2, str)
    str = replaceReg('c', date.getMilliseconds() + '', 3, str)
    return str
}

// 格式化带时区格式的时间 例如2018-09-12T19:19:30.000+0000
function formatTimeZone (time) {
    var arr = time.split('T')
    var d = arr[0]
    var darr = d.split('-')

    var t = arr[1]
    var tarr = t.split('.000')
    var marr = tarr[0].split(':')

    var dateStr = `${parseInt(darr[0])}/${parseInt(darr[1])}/${parseInt(darr[2])} ${parseInt(marr[0])}:${parseInt(marr[1])}:${parseInt(marr[2])}`
    var date = new Date(dateStr)
    return date.setHours(date.getHours() + 8)
}

// 当日期格式为7/8位数字时添加横杠进行转换
function filterStrTime (str) {
    var reg = /^(\d{4})(\d{1,2})(\d{2})$/
    return (reg.test(str) && str.replace(reg, '$1-$2-$3')) || ''
}

// 获取指定月份的第一天和最后一天，不传则获取当月
function getSameMonth (time) {
    var date = time ? new Date(time) : new Date()
    return {
        firstDay: new Date(date.getFullYear(), date.getMonth(), 1) - 0,
        lastDay: new Date(date.getFullYear(), date.getMonth() + 1, 0) - 0
    }
}

// 获取指定年份的第一天和最后一天，不传则获取今年
function getSameYear (time) {
    var date = time ? new Date(time) : new Date()
    return {
        firstDay: new Date(date.getFullYear(), 0, 1) - 0,
        lastDay: new Date(date.getFullYear(), 12, 0) - 0
    }
}

// 获取指定日期的星期一和星期天, 不传则获取本周
function getSameWeek (time) {
    var date = time ? new Date(time) : new Date()
    return {
        firstDay: new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1, 0, 0, 0) - 0,
        lastDay: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 - date.getDay(), 0, 0, 0) - 0
    }
}


function str2Stamp(time) {
  var date = time.substr(0, 10)
  var hour = time.substr(11, 2) == '00' ? 0 : time.substr(11, 2).replace(/\b(0+)/gi, "");
  var minute = time.substr(14, 2) == '00' ? 0 : time.substr(14, 2).replace(/\b(0+)/gi, "");
  var second = time.substr(17, 2) == '00' ? 0 : time.substr(17, 2).replace(/\b(0+)/gi, "");
  var timestamp = parseInt(new Date(date).getTime() / 1000) + parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second) - 28800
  return new Date(timestamp * 1000);
}

export {
    filterTime,
    filterStrTime,
    getSameMonth,
    getSameYear,
    getSameWeek,
}
