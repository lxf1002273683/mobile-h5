import aes from './aes.js'
/**
 * 本地使用方法：
 * 操作效果自定义
 */
const localApi = {
  getCurrentEnv(that) {
    that.$Toast.show('web', {
      timeout: 1500
    })
  },
  decrypt (params) {
    return new Promise((resolve, reject) => {
      let decryptData = aes.decrypt(params)
      resolve(decryptData)
    })
  },
  encrypt (params) {
    return new Promise((resolve, reject) => {
      let encryptData = aes.encrypt(params)
      resolve(encryptData)
    })
  },
  JSBridgeGetUserInfo () {
    return {
      userId: 123012
    }
  },
  JSBridgePageTitle (titleValue) {
    document.getElementsByTagName('title')[0].innerHTML = titleValue
  },
  setAlertContent (title, content) {
  },
  closeWindow () {
    var Browser = navigator.appName;
    var indexB = Browser.indexOf('Explorer');
    if (indexB > 0) {
      var indexV = navigator.userAgent.indexOf('MSIE') + 5;
      var Version = navigator.userAgent.substring(indexV, indexV + 1);
    
      if (Version >= 7) {
          window.open('', '_self', '');
          window.close();
      }
      else if (Version == 6) {
          window.opener = null;
          window.close();
      }
      else {
          window.opener = '';
          window.close();
      }
    } else {
      window.location.href="about:blank";
      window.close();
    }
  }
}


/**
 * app 调用
 */
const sunlandApi = {
  getCurrentEnv(that) {
    that.$Toast.show('app', {
      timeout: 1500
    })
  },
  decrypt (params) {
    let callbackName = 'deEncryptSuccessIndex' + this.encryptIndex++
    return new Promise((resolve, reject) => {
      window[callbackName] = resolve;
      JSBridge.doAction('deEncrypt', JSON.stringify({
        succeedCallback: callbackName,
      }), params);
    })
  },
  encrypt (params) {
    let callbackName = 'encryptSuccessIndex' + this.encryptIndex++
    return new Promise((resolve, reject) => {
      window[callbackName] = resolve;
      JSBridge.doAction('encrypt', JSON.stringify({
        succeedCallback: callbackName,
      }), params);
    })
  },
  JSBridgeGetUserInfo () {
    return JSON.parse(JSBridge.getData())
  },
  JSBridgePageTitle (titleValue) {
    JSBridge.doAction('actionSetTitle', '{}', JSON.stringify({
      title: titleValue
    }))
  },
  setAlertContent (title, content) {
    JSBridge.doAction('setAlertContent',JSON.stringify({}), JSON.stringify({
      title,
      content
    }))
  },
  closeWindow () {
    JSBridge.doAction('closeWindow', '{}', '{}');
  }
}

/**
 *  当前支持方法
 *  getCurrentEnv       获取当前环境
 *  decrypt             数据解密
 *  encrypt             数据加密
 *  JSBridgeGetUserInfo 获取用户信息(localApi 可自定义用户数据)
 *  JSBridgePageTitle   设置title
 *  setAlertContent     关闭窗口提示
 *  closeWindow         退出webview方法
 *  
 *  ===== localApi ======
 *    实现效果需要自己实现
 *
 */
if (process.env.NODE_ENV === 'production') {
  var AppJsBridge = function () {
    return sunlandApi
  }
} else {
  var AppJsBridge = function () {
    if (typeof JSBridge === 'undefined') {
      return localApi
    } else {
      return sunlandApi
    }
  }
}


export {
  AppJsBridge
}