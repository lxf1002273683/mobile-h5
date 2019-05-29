//地址参数字典
const urlQuery = function () {
  var url = window.location.href
  var str = url.substring(url.lastIndexOf('?') + 1)
  var tmp = {}
  str.replace(/([^?&=]+)=([^?&]+)/g, function (res, $1, $2) {
    var name = decodeURIComponent($1)
    var val = decodeURIComponent($2)
    tmp[name] = val
  })
  return tmp
}

// 图片预加载 parmas
// {
//   imagePath: 'https://16bit.sunlands.com/p/static/image/answer-activity/', 服务器地址
//   images: [],     图片名称(icon.png) 
//   overtime: 200,  超时显示
//   callback: func, 每次加载成功回调 返回 成功数量，失败数量，是否加载完成
// }

const loaderImg = function (parmas) {
  let imagePath = parmas.imagePath
  let images = parmas.images
  let overtime = parmas.overtime || 2000
  let callback = parmas.callback
  const total = images.length
  let imgs = []
  let result = {
    successNum: 0,
    errorNum: 0,
    loadStatus: false
  }
  const load = function () {
    if(!result.loadStatus){
      result.successNum += 1
      result.loadStatus = (result.successNum + result.errorNum) === total ? true : false
      callback(result)
    }
  }
  const error = function () {
    if(!result.loadStatus){
      result.errorNum += 1
      result.loadStatus = (result.successNum + result.errorNum) === total ? true : false
      callback(result)
    }
  }
  for (let i = 0; i < total; i++) {
    imgs[i] = new Image()
    imgs[i].onload = load
    imgs[i].onerror = error
    imgs[i].src = imagePath + images[i]
  }
  setTimeout(function () {
    if(!result.loadStatus){
      result.loadStatus = true
      callback(result)
    }
  }, overtime)
}

// app jsBridge
const jsBridge = function (callback, next, catchDefault) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return callback(WVJBCallbacks)
  }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe)
    if(catchDefault){
      catchDefault()
    }else{
      next('catchDefault')
    }
  }, 0)
}


export default {
  urlQuery,
  loaderImg,
  jsBridge,
}