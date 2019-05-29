import ToastTemp from './toast.vue'
let toast

export default {
  install(Vue, options) {
    if (!toast) {
      const ToastPlugin = Vue.extend(ToastTemp);
      toast = new ToastPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild(toast.$el);
    }

    Vue.mixin({
      created() {
        this.$Toast = {
          show(text, params) {
            params = params || {}
            toast.showStatus = true
            toast.message = text || 'none'
            const time = params.timeout || 3000
            toast.styles = params.styles || {}
            toast.showBg = params.showBg ? 'show_bg' : ''
            toast.type = params.type ? params.type : ''
            setTimeout(() => {
              toast.showStatus = false
              if(params.callback){
                params.callback()
              }
            }, time)
          }
        }
      }
    })
  }
}
