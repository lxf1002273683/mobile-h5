<template>
  <div id="home">
    <div class="main">
      <img alt="Vue logo" @click="asdsad" src="../../assets/logo.png">
      <span>22</span>
      <div class="asdasd" :class="classs"></div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '../../components/HelloWorld.vue'
import Http from '../../js/http.js'
import utils from '../../utils/utils.js'


export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      classs: ''
    }
  },
  created() {
    // this.$Toast.show('213',{
    //   timeout: 2000,
    //   showBg: true,
    //   // styles: {color: 'red'},
    //   callback: () => {
    //     console.log('toast 隐藏')
    //   }
    // })
  },
  methods: {
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
    asdsad() {
      this.classs = 'adsad'
    }
  }
}
</script>

<style lang="scss">
@import '../../css/common.scss';

#home{
  .main{
    span{
      @include font-dpr(20);
    }
    .asdasd{
      width: 0;
      height: 100px;
      background: #000000;
      transition: all 1s;
      position: relative;
      right: 0;
    }
    .adsad{
      width: 100px;
    }
  }
}

</style>
