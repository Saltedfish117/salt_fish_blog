import type { App } from 'vue'
export interface WindowPlus extends Window {
    app?: App;
}
