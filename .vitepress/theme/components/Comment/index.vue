<template>
	<v-card title="留言板" class="mt-10">
		<v-card-text>
			<v-form action="">
				<v-card
					v-isLogin="{
						id: 'comment-user',
						text: '登录即可留言',
						title: '登录后才能留言哦',
					}"
					id="comment-user"
					title="您的留言"
					hover
				>
					<v-card-text>
						<v-row>
							<v-col cols="12">
								<Transition name="scroll-x-transition">
									<p v-show="!expandComment">您还没留言</p>
								</Transition>
								<v-expand-transition>
									<VTextarea
										v-show="expandComment"
										rows="3"
										label="留下您的留言"
										placeholder="请输入您的留言"
									></VTextarea>
								</v-expand-transition>
							</v-col>
						</v-row>
					</v-card-text>
					<v-card-actions class="d-flex flex-end"
						><Transition name="scroll-x-transition">
							<v-btn v-show="expandComment" @click="handleComment"
								>取消</v-btn
							> </Transition
						><v-btn
							@click="
								expandComment ? subComment() : handleComment()
							"
						>
							<Transition name="scroll-x-transition"
								><span v-show="!expandComment">
									写留言
								</span></Transition
							>
							<Transition name="scroll-x-transition"
								><span v-show="expandComment">
									留言
								</span></Transition
							>
						</v-btn></v-card-actions
					>
				</v-card>
			</v-form>
			<v-card
				v-for="commentItem in commentList"
				:key="commentItem.title"
				class="mb-10 mt-10"
				hover
				v-bind="commentItem"
			>
				<!-- <v-divider color="info"></v-divider> -->
				<v-card-text>
					<v-card class="comment-item">
						<v-card-text title="Salt Fish" subtitle="2023-01-01">
							我觉得你说的对
						</v-card-text>
						<v-card-actions>
							<article class="flex-1 pa-20">
								<v-form>
									<v-expand-transition>
										<v-row v-show="expandReply">
											<v-textarea
												rows="3"
												label="回复"
												placeholder="请输入您的回复"
											></v-textarea>
										</v-row>
									</v-expand-transition>
									<v-row class="d-flex flex-end">
										<Transition name="scroll-x-transition">
											<v-btn
												v-show="expandReply"
												@click="handleReply"
												>取消</v-btn
											>
										</Transition>
										<v-btn
											@click="
												expandReply
													? subReply()
													: handleReply()
											"
										>
											回复
										</v-btn>
									</v-row>
								</v-form>
							</article>
						</v-card-actions>
					</v-card>
				</v-card-text>
			</v-card>
			<p class="empty-text">🙁暂无留言</p>
		</v-card-text>
	</v-card>
	<v-dialog max-width="375" v-model="confirmVisible">
		<v-card max-width="375" title="确认提交？">
			<template v-slot:actions>
				<v-btn
					text="取消"
					@click="cancel = !(confirmVisible = false)"
				></v-btn>
				<v-btn
					text="确认"
					@click="confirm = !(confirmVisible = false)"
				></v-btn>
			</template>
		</v-card>
	</v-dialog>
</template>
<script setup lang="ts">
import { ref, watch, onWatcherCleanup } from "vue";
defineOptions({
	name: "Comment",
});
const commentList = ref([
	{
		title: "Salt Fish",
		subtitle: "2023-01-01",
		text: "好好看的留言板啊",
	},
]);
const expandReply = ref(false);
const confirmVisible = ref(false);
const handleReply = () => {
	expandReply.value = !expandReply.value;
};
const confirm = ref(false);
const cancel = ref(false);
const isConfirm = () => {
	return new Promise((resolve, reject) => {
		const cleanup = () => {
			// 清理标识
			confirmVisible.value = false;
			confirm.value = false;
			cancel.value = false;
		};
		watch(
			() => confirmVisible.value,
			() => {
				if (confirm.value) resolve(true);
				else if (cancel.value) reject(false);
				else reject(false);
				onWatcherCleanup(cleanup);
			},
			{
				once: true,
			}
		);
	});
};
const expandComment = ref(false);
const handleComment = () => {
	expandComment.value = !expandComment.value;
};
const subReply = async () => {
	try {
		confirmVisible.value = true;
		await isConfirm();
		console.log("提交成功");
	} catch (error) {
		console.log("点击了取消");
	}
};
const subComment = async () => {
	try {
		confirmVisible.value = true;
		await isConfirm();
		console.log("提交成功");
	} catch (error) {
		console.log("点击了取消");
	}
};
</script>

<style lang="scss" scoped>
.comment-container {
	margin-top: 20px;
	border-radius: 8px;
	padding: 20px;
	border: 1px solid var(--vp-c-divider);
}
.comment-item {
	background-color: #f5f5f5;
}
.comment-input {
	width: 100%;
	height: 40px;
	padding: 0 10px;
	border: 1px solid var(--vp-c-divider);

	border-radius: 8px;
}

.comment-button {
	border: 1px solid var(--vp-c-divider);
	border-radius: 4px;
	&:hover {
		border-color: var(--vp-c-brand-1);
	}
}
</style>
