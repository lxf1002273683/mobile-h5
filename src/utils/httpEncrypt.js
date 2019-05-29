import axios from 'axios'
import {AppJsBridge} from './sunlandsAppjsBridge.js'
import md5 from 'blueimp-md5'
var SEVER_PATH = process.env.VUE_APP_SEVER_PATH
let appJsBridge = AppJsBridge


async function encrypt_post_form (path, params) {
  let AppJsBridge = appJsBridge()
  let encryptData = await AppJsBridge.encrypt(JSON.stringify(params))
  let data = {
    data: encryptData.trim(),
    token: md5(encryptData.trim())
  }
  return new Promise((resolve, reject) => {
    axios({
      url: SEVER_PATH + path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'channel': 'activity',
        'source': ' h5',
      },
      params: data,
    }).then(function (response) {
      if (response.status === 200) {
        AppJsBridge.decrypt(response.data.resultMessage).then((resultMessage) => {
          let encryptData = ''
          try {
            encryptData = JSON.parse(resultMessage)
          } catch (error) {
            encryptData = ''
          }
          resolve({
            resultMessage: response.data.resultMessage,
            data: encryptData,
            rs: response.data.rs
          })
        })
      } else {
        reject(response.data)
      }
    }).catch(function (thrown) {
      reject(thrown)
    })
  })
}

export {
  encrypt_post_form,
}
