// import SparkMD5 from 'spark-md5'

export const isBoolean = obj => typeof obj === 'boolean'
export const isInteger = function(obj) {
  return (obj | 0) === obj
}
export const isNull = function(obj) {
  return obj === undefined || obj === null
}
export const isNoValue = function(obj) {
  return obj === undefined || obj === null || obj === ''
}
export const isEmptyObj = (obj) => {
  for (let obj1 in obj) {
    return false
  }
  return true
}



/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
export function isArray(val) {
  return toString.call(val) === '[object Array]'
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isObject(val) {
  return val !== null && typeof val === 'object'
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
export function isString(val) {
  return typeof val === 'string'
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
export function isNumber(val) {
  return typeof val === 'number'
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
export function isUndefined(val) {
  return typeof val === 'undefined'
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
export function isFunction(val) {
  return toString.call(val) === '[object Function]'
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/*
 * 将对象转为url参数字符串【主要用于delete请求，需处理请求】
 * @export
 * @param {*} obj
 * @returns string
 */
export function objToUrl(obj) {
  if (!obj) {
    return ''
  }
  const strArr = []
  Object.entries(obj).map(([key, value]) => {
    strArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    return value
  })
  return strArr.join('&')
}

// 校验手机格式
export function phoneFun(phones) {
  // return /^1[3|4|5|8][0-9]\d{4,8}$/.test(phones)
  let myreg = /^1[3|4|5|8][0-9]\d{4,8}$/
  if (!myreg.test(phones)) {
    return false
  }
  return true
}

/* 唯一标识码 */
const UDIDCODE = 'social_plan_v2_'

/**
 * @desc session存储
 * @export sessionSet
 * @param key key键
 * @param value 值
 */
export function sessionSet(key, value,nostringfy) {
  if (typeof value === 'object'&&(!nostringfy||nostringfy!=='nostringfy')) {
    value = JSON.stringify(value)
  }
  sessionStorage.setItem(UDIDCODE + key, value)
}

/**
 * @desc session获取
 * @export sessionGet
 * @param key key键
 */
export function sessionGet(key) {
  const value = sessionStorage.getItem(UDIDCODE + key) || ''
  try {
    const val = JSON.parse(value)
    if ('number' === typeof val) {
      return value
    }
    return val
  } catch (e) {
    return value
  }
}

/**
 * @desc session移除
 * @export sessionRemove
 * @param key key键
 */
export function sessionRemove(key) {
  sessionStorage.removeItem(UDIDCODE + key)
}

/**
 * @desc session清空
 * @export sessionClearAll
 */
export function sessionClearAll() {
  sessionStorage.clear()
}

// 格式化日期
export const getTime = (date, withSec) => {
  if (date === null) return
  date = new Date(date)
  if (date.toString() === 'Invalid Date') return
  let hour = date.getHours()
  let min = date.getMinutes()
  hour = hour > 9 ? hour : `0${hour}`
  min = min > 9 ? min : `0${min}`
  let result = `${hour}:${min}`
  if (withSec) {
    let sec = date.getSeconds()
    sec = sec > 9 ? sec : `0${sec}`
    result = `${hour}:${min}:${sec}`
  }
  return result
}
export const formatDate = (date, format) => {
  if (date === null) return
  date = new Date(date)
  if (date.toString() === 'Invalid Date') return
  let m = (date.getMonth() + 1).toString()
  let d = date.getDate().toString()
  m = m.length >= 2 ? m : '0' + m
  d = d.length >= 2 ? d : '0' + d
  if (!format) return date.getFullYear() + '-' + m + '-' + d
  if (format === 'Array') return [date.getFullYear(), m + '/' + d]
}
export const formatDateAndTime = (date, withSec) => {
  if (date === null) return
  date = new Date(date)
  if (date.toString() === 'Invalid Date') return
  const dateStr = formatDate(date)
  const timeStr = getTime(date, withSec)
  return `${dateStr} ${timeStr}`
}

// 合并多个数组，去重  
export function arrsconcat(arr1,arr2,arr3){  

  let arrs =  arr1.concat(arr2).concat(arr3)
  var temp = {};   //用于name判断重复
  var result = [];  //最后的新数组
  
  arrs.map(function (item) {
      if(!temp[item.userId]){
          result.push(item);
          temp[item.userId] = true;
      }
      return result; 
  });
} 



/**
 * @desc 函数防抖
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 */
export function debounce(func, wait) {
  let timeout = null
  wait = wait || 300
  return function() {
    let context = this
    let args = arguments
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
    // if (callNow) callback.apply(this, [callback, ms])
  }
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 */
export function throttle(func, wait) {
  let timeout = null
  return function() {
    let context = this
    let args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}




/* eslint-enable */

export function dataURLtoFile(dataurl, filename = 'file') {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {type: mime})
}


const getType = param => Object.prototype.toString.call(param)
const isDate = date => getType(date) === '[object Date]'

export function getDate(time, ms) {
  var date
  if (typeof time === 'string') {
    // date = new Date(time.replace(/-/g, '/'))
    date = new Date(time)
  } else if (isDate(time)) {
    date = time
  } else {
    date = new Date(time * (ms))
  }
  return date
}

//  format : y年m月d日 h:m:s
/**
 * @param {*} time 时间可以是毫秒，也可以是秒
 * @param {*} format 格式
 * @param {*} ms 是否毫秒
 */
export function formatLocalDate(time, format = 'Y年M月D日 h:m:s', ms = 1) {
  var date = getDate(time, ms)
  var args = {
    Y: date.getFullYear(),
    M: formatNumber(date.getMonth() + 1),
    D: formatNumber(date.getDate()),

    h: formatNumber(date.getHours()),
    m: formatNumber(date.getMinutes()),
    s: formatNumber(date.getSeconds())
  }

  return format.replace(/Y|M|D|h|m|s/g, match => args[match])
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 项目时间筛选
export function timeFilter(time) {
  let getTime = new Date(time)
  let text = ''
  if(getTime.getFullYear() === new Date().getFullYear()){
      text = formatLocalDate(time,'M月D日 h:m:s')
  }else{
      text = formatLocalDate(time,'Y年M月D日 h:m:s')
      console.log(formatLocalDate(time,'Y年M月D日 h:m:s'))
  }
  return text
}
// 数组数值 返回时间
export function arrFormatLocalDate(arr){
  return formatLocalDate(new Date(`${arr[0]}-${arr[1]}-${arr[2]} ${arr[3]}:${arr[4]}`))
}

// 数组数值 返回时间2
export function arrFormatLocalDate2(arr){
  return new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4])
}

// 数组数值 h：m
export function getHourM(arr){
  let time = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4])
  return formatNumber(time.getHours())+':'+ formatNumber(time.getMinutes())
}
//返回 英文 时间格式

export function FormatLocalDateEN(data){
  let time = new Date(data)
  let xq ={0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:"May",5:'Jun',6:'Jul',7:'Aug',8:'Sept',9:'Oct',10:'Nov',11:'Dec'}
  return `${formatNumber(time.getDate())} ${xq[time.getMonth()]} ${time.getFullYear()}`
}
    // 一键复制
export function textcode(text){
      var n = document.createElement("input");
      n.setAttribute("value", text)
        document.body.appendChild(n);
        n.select();
        document.execCommand("copy");
        document.body.removeChild(n);
  }

// 进入全屏
export function fullScreen() {
  const main = document.body

  if (main.requestFullscreen) {
    main.requestFullscreen()
  } else if (main.mozRequestFullScreen) {
    main.mozRequestFullScreen()
  } else if (main.webkitRequestFullScreen) {
    main.webkitRequestFullScreen()
  } else if (main.msRequestFullscreen) {
    main.msRequestFullscreen()
  }
}
export function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  console.log(reg)
  var r = window.location.href.match(reg);
  console.log(r)
  // if (r != null) return r[2];
  if (r != null){
      var reg2 = new RegExp("\\+","g");
      var r2 = r[2].replace(reg2, "%20");
      // return decodeURIComponent(r[2]);
      return decodeURIComponent(r2);
  }
  return "";
}
// 退出全屏
export function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

export function transformation(limit) {
  var size = "";
    if(limit < 0.1 * 1024){                            //小于0.1KB，则转化成B
        size = limit.toFixed(2) + "B"
    }else if(limit < 0.1 * 1024 * 1024){            //小于0.1MB，则转化成KB
        size = (limit/1024).toFixed(2) + "KB"
    }else if(limit < 0.1 * 1024 * 1024 * 1024){        //小于0.1GB，则转化成MB
        size = (limit/(1024 * 1024)).toFixed(2) + "MB"
    }else{                                            //其他转化成GB
        size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
    }

    var sizeStr = size + "";                        //转成字符串
    var index = sizeStr.indexOf(".");                    //获取小数点处的索引
    var dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
    if(dou === "00"){                                //判断后两位是否为00，如果是则删除00                
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return size;
}


export function deleteA(arr,id,nex){
  arr.forEach((item,index)=>{
    if(item[id]===nex){
      arr.splice(index,1)
    }
  })
  return arr
}
// 根据 某个值 获取数据
export function getIdData(key,data,gokey){
  let ss =null
  data.forEach(item=>{
    if(item[key]===gokey){
      ss = item
    }
  })
  return ss
}
export  function  treeFlat(Node) {
      let _arr = [];

      let point = Node;
      let a = true;
      while (a) {
        if (point.parent) {
          _arr.push(point);
          point = point.parent;
        } else {
          a = false;
          return _arr.reverse();
        }
      }
}

export function treeflat2(tree){
  let re_data = []
  go(tree)
  function go(arr){
    arr.forEach((item) => {
        go(item.children);
        // re_data =re_data.concat(item.user);
        item.user.forEach(item2 => {
          re_data.push(item2)
        })
    });
  }
  return re_data
}

export function downFg(url){
  let link = document.createElement("a");
  link.target="_blank"
  link.href = url; //对下载的文件命名
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


//动态加载、移除js、css文件
export  function loadjscssfile(filename, filetype){
    var fileref = null
  if (filetype==="js"){
      fileref=document.createElement('script')
      fileref.setAttribute("type","text/javascript")
      fileref.setAttribute("src",filename)
  } else if (filetype==="css"){
      fileref=document.createElement("link")
      fileref.setAttribute("rel","stylesheet")
      fileref.setAttribute("type","text/css")
      fileref.setAttribute("href",filename)
  }

  if (typeof fileref!="undefined"){
      document.getElementsByTagName("head")[0].appendChild(fileref)
  }
}
//移除js、css
export function removejscssfile(filename,filetype){
  var targetelement = (filetype === "js") ? "script" : (filetype === "css") ? "link" : "none"
  var targetattr = (filetype === "js") ? "src" : (filetype === "css") ? "href" : "none"
  var allsuspects = document.getElementsByTagName(targetelement)
  for (var i = allsuspects.length; i >= 0; i--){
      if (allsuspects[i] &&allsuspects[i].getAttribute(targetattr) !== null && allsuspects[i].getAttribute(targetattr).indexOf(filename) !== -1) {
　　　　　　  allsuspects[i].parentNode.removeChild(allsuspects[i])
　　　　 }
  }
}


export function convertBase64UrlToBlob(base64){
  var type =base64.split(",")[0].match(/:(.*?);/)[1];//提取base64头的type如 'image/png'     
  var bytes=window.atob(base64.split(',')[1]);//去掉url的头，并转换为byte (atob:编码 btoa:解码)

  //处理异常,将ascii码小于0的转换为大于0 
  var ab = new ArrayBuffer(bytes.length);//通用的、固定长度(bytes.length)的原始二进制数据缓冲区对象
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
  }
  return new Blob( [ab] , {type :type});
}

// 时间转为秒 00:01.234 变成 1.234秒
export function timeTransformation(time){
  if(typeof(time)==='string'){
    let t = time.split(':')
    let s = t[0]*60-0
    let m = t[1]-0
    return s+m
  }
}
// 添加超出滚动动画
export function addJQAn(dem,dem2,speed,iscycle){
  // dem2 ：外框  dem:滚动的标签
  let w = dem.width()
  let w2 = dem2.width()
  let t1 = w/speed*1000
  let t2 = (w+w2)/speed*1000
  var cycle= function(){
    dem.css('marginLeft',w2)
    dem.stop().animate({
      marginLeft:-w
    },t2,'linear',()=>{
      if(iscycle){
        cycle()
      }
    })  
  }
  dem.stop().animate({
    marginLeft:-w
  },t1,'linear',function(){
    cycle()
  })

}

export function durationConversio(duration){
    let text = "00:00"
    if(duration!==0){
        let a = (duration/60).toFixed(2)
        let n = a.toString().split('.')
        let s = formatNumber(n[0])
        let m = n.length === 2?formatNumber(n[1]):'00'
        text = s+":"+m
    }
    function formatNumber(j) {
        j = j.toString()
        return j[1] ? j : '0' + j
    }    
    return text
}

