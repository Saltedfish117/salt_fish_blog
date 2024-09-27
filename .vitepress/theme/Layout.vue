<!-- .vitepress/theme/Layout.vue -->
<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import {
	nextTick,
	provide,
	ref,
	onMounted,
	onUnmounted,
	defineAsyncComponent,
} from "vue";
import { useTheme } from "vuetify";
const theme = useTheme();
const Comment = defineAsyncComponent(
	() => import("./components/Comment/index.vue")
);
defineOptions({
	name: "Layout",
});
const { isDark } = useData();
const enableTransitions = () =>
	"startViewTransition" in document &&
	window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
	if (!enableTransitions()) {
		isDark.value = !isDark.value;
		return;
	}

	const clipPath = [
		`circle(0px at ${x}px ${y}px)`,
		`circle(${Math.hypot(
			Math.max(x, innerWidth - x),
			Math.max(y, innerHeight - y)
		)}px at ${x}px ${y}px)`,
	];

	await document.startViewTransition(async () => {
		isDark.value = !isDark.value;
		theme.global.name.value = theme.global.current.value.dark
			? "light"
			: "dark";
		await nextTick();
	}).ready;

	document.documentElement.animate(
		{ clipPath: isDark.value ? clipPath.reverse() : clipPath },
		{
			duration: 300,
			easing: "ease-in",
			pseudoElement: `::view-transition-${
				isDark.value ? "old" : "new"
			}(root)`,
		}
	);
});
</script>

<template>
	<DefaultTheme.Layout>
		<template #home-hero-image>
			<div class="cvs-container">
				<canvas id="cvs"></canvas>
				<div class="fish-img"></div>
			</div>
		</template>
		<template #doc-after>
			<Comment></Comment>
		</template>
	</DefaultTheme.Layout>
</template>
<style>
.cvs-container {
	position: relative;
	width: 250px;
	height: 250px;
	margin: 0 auto;
}
.fish-img {
	position: absolute;
	width: 249px;
	height: 249px;
	top: 0;
	right: 0;
	animation: fishEnter 5s 0s infinite;
	background-image: url("/png/fish.png");
	z-index: -1;
	/* background-position: 10px 20px; */
	background-repeat: no-repeat;
	transform-origin: center;
	/* background-position: 50px -100px; */
	transform: rotate(45deg);
	border-radius: 50%;
}
#cvs {
	width: 250px;
	height: 250px;
	border-radius: 50%;
	margin: 0 auto;
	animation: boxShadow 5s ease-in infinite;
}
/* @keyframes boxShadow {
	0% {
		box-shadow: 0 -0 5px 5px #4b83d8;
	}
	33% {
		box-shadow: 0 0 20px 10px #4b83d8;
	}
	66% {
		box-shadow: 0 0 10px 5px #4b83d8;
	}
	100% {
		box-shadow: 0 0 5px 5px #4b83d8;
	}
} */
@keyframes boxShadow {
	0% {
		box-shadow: 1px -1px 5px #4b83d8;
	}
	14.2% {
		box-shadow: -1px 1px 10px #4b83d8;
	}
	28.4% {
		box-shadow: 1px -1px 5px #4b83d8;
	}
	42.5% {
		box-shadow: -1px 1px 10px #4b83d8;
	}
	56.8% {
		box-shadow: 1px -1px 5px #4b83d8;
	}
	71% {
		box-shadow: -1px 1px 10px #4b83d8;
	}
	100% {
		box-shadow: 1px -1px 5px #4b83d8;
	}
}
@keyframes fishEnter {
	0% {
		background-position: 200px -20px;
		/* transform: rotate(180deg); */
		transform: rotate(45deg);
	}
	45% {
		background-position: 100px 20px;
		transform: rotate(35deg);
	}
	/* 80% {
		background-position: 80px 30px;
		transform: rotate(30deg);
	} */
	/* 80% {
		background-position: 50px 60px;
		transform: rotate(13deg);
	} */
	100% {
		background-position: 60px 120px;
		transform: rotate(13deg);
		/* background-position: 0px 20px; */
	}
}
::view-transition-old(root),
::view-transition-new(root) {
	animation: none;
	mix-blend-mode: normal;
}
::view-transition-old(root),
.dark::view-transition-new(root) {
	z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
	z-index: 9999;
}

.VPSwitchAppearance {
	width: 22px !important;
}
.image-bg {
	background-image: none !important;
}
.VPSwitchAppearance .check {
	transform: none !important;
}
</style>
