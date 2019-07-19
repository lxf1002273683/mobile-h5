<template>
  <div id="index">
    <div class="main">
      <div class="list" v-for="item in rollList" :key="item.id">
        <div>{{item.nickname}}</div>
        <div @click="closePage">{{item.addTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '../../components/HelloWorld.vue'
import Http from '../../js/http.js'
import utils from '../../utils/utils.js'
import { AppJsBridge } from '../../utils/sunlandsAppjsBridge.js'
import api from '../../js/api.js'


export default {
  name: 'index',
  components: {
    HelloWorld
  },
  data() {
    return {
      AppJsBridge: AppJsBridge(),
      rollList: [],
    }
  },
  created() {
    // 获取当前环境
    // this.AppJsBridge.getCurrentEnv(this)
    api.getRollList({
      page: 1,
      size: 220,
      orderBy: "-id",
    }).then((res) => {
      this.rollList = res.data
    })
    // 修改title
    // this.AppJsBridge.JSBridgePageTitle(1232)
    // 用户退出提示
    // this.AppJsBridge.setAlertContent('提示','退出')
    
    // let a =  new AppJsBridge.AppJsBridge()
    this.$Toast.show('213', {
      type: 'input',
      timeout: 20000,
    })
    // let a = new Date('2019-1-02')
    // console.log(this.getCalendarData(a.getFullYear(), a.getMonth()))
  },
  methods: {
    closePage() {
      this.AppJsBridge.closeWindow()
    },
    loaderImg() {
      utils.loaderImg({
        imagePath: 'https://16bit.sunlands.com/p/static/image/answer-activity/',
        images: [
          'rightIcon.png',
          'exerciseBg.png',
          'exerciseBook.png',
          'questionOptionError.png',
          'questionOptionSuccess.png',
          'courseItemBg01.png',
          'courseItemBg02.png',
          'courseItemBg03.png',
          'courseItemBg04.png',
          'circularIcon.png',
          'multiIcon1.png',
          'multiIcon3.png',
        ],
        callback: (res) => {
          console.log(res)
        }
      })
    },
    getCalendarData(year, month) {
      let date = new Date(year,month + 1,0)
      let getDayStr = {
        '0': '日',
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六',
        '日': [0, 6],
        '一': [1, 5],
        '二': [2, 4],
        '三': [3, 3],
        '四': [4, 2],
        '五': [5, 1],
        '六': [6, 0],
      }
      
      let dateArr = []
      for (let i = 1; i <= date.getDate(); i++) {
        dateArr.push({
          dayStr: getDayStr[new Date(year , month, i).getDay()],
          day: i
        })
      }
      let topNum = getDayStr[dateArr[0]['dayStr']][0]
      let bottomNum = getDayStr[dateArr[dateArr.length-1]['dayStr']][1]
      for (let j = 0; j < topNum; j++) {
        dateArr.unshift({
          dayStr: '',
          day: 0,
        })
      }
      for (let j = 0; j < bottomNum; j++) {
        dateArr.push({
          dayStr: '',
          day: 0,
        })
      }
      return dateArr
    }
  }
}
</script>

<style lang="scss">
@import '../../css/common.scss';

#index{
  .main{
    .list{
      display: flex;
      justify-content: space-between;
    }
  }
}

</style>
