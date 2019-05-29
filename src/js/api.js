import http from './http.js'

const getRollList= function (params) {
  return http.encrypt_post_form('sunland/app/ko/user/raffle/roll/list', params)
}


export default {
  getRollList,
}