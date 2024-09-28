import NotLogin from "../components/NotLogin/NotLogin.vue"
import { createApp, h, getCurrentScope } from "vue"
import type { ObjectDirective, App, } from "vue"
import vuetify from '../plugin/vuetify.ts'
// import 'vuetify/styles'
const isLogin: ObjectDirective = {
    mounted(_el: any, binding: { value?: { id: string; title: string; text: string; } | undefined; }) {
        if (binding.value) {
            const { value: { id, title, text } } = binding
            // 判断是否登录
            if (!localStorage.getItem('token')) {
                createApp(h(NotLogin, {
                    title,
                    text,
                }
                )).use(vuetify).mount(`#${id}`)
            }
        } else {
            throw new Error('isLogin指令必须传入一个对象')
        }
    }
}
export default isLogin