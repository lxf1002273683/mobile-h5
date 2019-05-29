<template>
	<div id="ToastPlugin" class="toast_black_bg" :class="showBg" v-if="showStatus" @click.stop="'return false'">
		<div class="toast blackBg_content" :style="styles" v-if="type != 'input'">{{message}}</div>
		<div class="toast blackBg_content" v-if="type == 'input'">
      <input v-model="message"/>
    </div>
	</div>
</template>

<script>
	export default {
		name: 'ToastPlugin',
		props: {
      message: {
        type: String,
        twoWay: true,
      },
      showStatus: Boolean,
      styles: {
        type: Object,
        default: function () {
          return {}
        }
      },
      type: {
        type: String,
        twoWay: true,
      },
      showBg: String,
    },
	}
</script>

<style lang="scss" scoped="scoped">
@import '../../css/utils.scss';
#ToastPlugin{
    &.toast_black_bg {
    z-index: 99999999;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    &.show_bg{
      background: rgba(0,0,0,0.5);
    }
    .blackBg_content{
      position: absolute;
      z-index: 9;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: torem(10) torem(20);
      background: rgba(0,0,0,0.8);
      border-radius: torem(6);
      color: #FFFFFF;
      input{
        width: torem(120);
        height: torem(50);
        background: #FFFFFF;
        @include font-dpr(20);
      }
    }
  }
}
</style>