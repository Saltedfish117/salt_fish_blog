import type { App } from 'vue';
import isLogin from './isLogin';
export default {
    install(app: App) {
        app.directive('isLogin', isLogin)
    }
}