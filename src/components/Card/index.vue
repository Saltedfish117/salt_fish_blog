<template>
	<article class="z-card">
		<slot></slot>
	</article>
</template>
<script setup lang="ts">
defineOptions({
	name: "ZCard",
});
</script>
<script setup></script>
<style lang="scss" scoped>
.z-card {
	padding: 20px;
	background: #ffffff;
	box-shadow: 1px 1px 3px 1px #4b83d8;
	border-radius: 8px;
}
</style>
