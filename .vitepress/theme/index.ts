
// https://vitepress.dev/guide/custom-theme
// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'vuetify/styles'

import { h } from "vue";

import "./style/style.css";
import "./style/custom.scss";
import "./style/toolCss.scss";
import Layout from "./Layout.vue";
import directive from './directive';
import plugin from './plugin';

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#Layout-slots
		});
	},
	enhanceApp({ app }) {
		// 注册自定义全局组件
		app.use(plugin)
		app.use(directive)
	}
} satisfies Theme