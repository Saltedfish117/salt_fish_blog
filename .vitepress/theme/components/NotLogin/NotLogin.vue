<template>
	<div class="not-login">
		<div class="not-login__title">{{ title }}</div>
		<div class="not-login__text">{{ text }}</div>
		<div class="not-login__btn_container">
			<v-btn
				class="not-login__btn"
				text="登录/注册"
				color="primary"
				@click="goLogin"
			></v-btn>
		</div>
	</div>
	<v-dialog v-model="dialogVisible" width="350">
		<v-card width="350px">
			<v-card-title class="text-center">
				<v-tabs
					v-model="tab"
					align-tabs="center"
					color="deep-purple-accent-4"
				>
					<v-tab value="login" text="登录"></v-tab>
					<v-tab value="register" text="注册"></v-tab>
				</v-tabs>
			</v-card-title>
			<v-card-text>
				<v-tabs-window v-model="tab">
					<v-tabs-window-item value="login">
						<v-form>
							<v-row>
								<v-col cols="12">
									<v-text-field
										variant="underlined"
										label="手机号"
										color="primary"
										v-model="userModel.username"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										color="primary"
										variant="underlined"
										label="密码"
										v-model="userModel.password"
									></v-text-field>
								</v-col>
								<v-col cols="12" class="d-flex justify-center">
									<v-btn block color="primary">登录</v-btn>
								</v-col>
							</v-row>
						</v-form>
					</v-tabs-window-item>
					<v-tabs-window-item value="register">
						<v-form>
							<v-row>
								<v-col cols="12">
									<v-text-field
										variant="underlined"
										label="用户名"
										color="primary"
										v-model="userModel.username"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										variant="underlined"
										label="手机号"
										color="primary"
										v-model="userModel.username"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
										color="primary"
										variant="underlined"
										label="密码"
										v-model="userModel.password"
									></v-text-field>
								</v-col>
								<v-col cols="12" class="d-flex justify-center">
									<v-btn block color="primary">注册</v-btn>
								</v-col>
							</v-row>
						</v-form>
					</v-tabs-window-item>
				</v-tabs-window>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
<script setup lang="ts">
import { VBtn } from "vuetify/components";
import { reactive, ref } from "vue";
defineOptions({
	name: "NotLogin",
	components: {
		VBtn,
	},
});
defineProps({
	title: {
		type: String,
		default: "请先登录",
	},
	text: {
		type: String,
		default: "登录后即可查看更多内容",
	},
});
const dialogVisible = ref(false);
const tab = ref("login");
const userModel = reactive({
	username: "",
	password: "",
});
const goLogin = () => {
	dialogVisible.value = true;
};
// export default defineComponent({
// 	setup(props, ctx) {

// 		return {
// 			goLogin,
// 		};
// 	},
// 	render() {
// 		return h(
// 			"div",
// 			{
// 				class: "not-login",
// 			},
// 			{
// 				default: () => [
// 					h("div", { class: "not-login__title" }, this.title),
// 					h("div", { class: "not-login__text" }, this.text),
// 					h(
// 						"div",
// 						{ class: "not-login__btn_container" },
// 						h(this.$options.components.VBtn, {
// 							class: "not-login__btn",
// 							text: "登录/注册",
// 							color: "primary",
// 							onClick: this.goLogin,
// 						})
// 					),
// 				],
// 			}
// 		);
// 	},
// });
</script>
<style lang="sass" scoped>
@import './style.scss'
</style>
