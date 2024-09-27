import type { App } from 'vue';
import vuetify from './vuetify.ts';

export default {
    install(app: App) {
        app.use(vuetify)
    }
}