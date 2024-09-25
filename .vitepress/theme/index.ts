
// https://vitepress.dev/guide/custom-theme
// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from "vue";
import "./style.css";
import Layout from "./Layout.vue";
export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#Layout-slots
		});
	},
	enhanceApp({ app }) {
		// 注册自定义全局组件
		// app.component('MyGlobalComponent' /* ... */)
	}
} satisfies Theme