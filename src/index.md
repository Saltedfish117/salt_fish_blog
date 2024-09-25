---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: "Salt_Fish"
    text: "Salt_Fish`s BLOG"
    tagline: "Welcome to my blog!-必须在奋斗中求生存，求发展。 ——矛盾。-学习是我们当下能走的最好的路。-不要一直待在原地。"
    # image:
    #     light: public/png/fish.png
    #     dark: public/png/fish.png
    actions:
        - theme: brand
          text: Interesting，look look？
          link: /pages/JavaScript/JavaScript重点总结
        - theme: alt
          text: 好好好，我也弄个博客
          link: /pages/从零开始搭建博客网站/初识vitePress
features:
    - title: 基础知识
      details: HTML，CSS，JavaScript
    - title: 前端框架
      details: Vue2，Vue3，React
    - title: 打包工具
      details: webpack，vite
    - title: 进阶知识
      details: 计算机图形，web可视化，ThreeJS
---

<script lang="ts" setup>
import { nextTick, provide, ref, onMounted, onUnmounted } from "vue";
import ZCard from './components/Card/index.vue'
// const slot = useSlots()
const cvs = ref<HTMLCanvasElement>();
const ctx2d = ref<CanvasRenderingContext2D>();
let speedStep = 0.02;
const taglineTextList = ref<string[]>()
const taglineText = ref<string[]>([]);
const taglineDom = ref();
let time = ref<ReturnType<typeof setTimeout>>();
let index = 0;
function strBlink(index: number) {
	taglineText.value = [];
	let count = 100;
  let textList =taglineTextList.value[index].split("").map((str)=>{
    return `<span
					:style="{
						opacity: 1,
						animation: strBlink 0.1s ease-in  both,
					}"
				
					:key="str"
					>${ str }</span
				>`
  })
  taglineDom.value.innerHTML = ``;
	textList.forEach((str) => {
		setTimeout(() => {
      taglineDom.value.innerHTML = taglineDom.value.innerHTML += str
			// taglineText.value.push(str);
		}, (count += 100));
	});
}
function wave(
	waveList: {
		A: number;
		speed: number;
		w: number;
		h: number;
		color: string | CanvasGradient | CanvasPattern;
	}[]
) {
	if (!cvs.value || !ctx2d.value) return;
	let width = (cvs.value.width = cvs.value.offsetWidth);
	let height = (cvs.value.height = cvs.value.offsetHeight);
	for (let index = 0; index < waveList.length; index++) {
		let { A, speed, w, h, color } = waveList[index];
		ctx2d.value.beginPath();
		ctx2d.value.lineWidth = 1;
		ctx2d.value.strokeStyle = color; //设置线条颜色
		ctx2d.value.fillStyle = color; //填充渐变色
		for (let x = 0; x <= width; x++) {
			// 正弦曲线公式：y=Asin（ωx+φ）+h
			let y = A * Math.sin((1 / w) * x + speed) + height * (1 - h);
			ctx2d.value.lineTo(x, y);
		}
		ctx2d.value.lineTo(width, height);
		ctx2d.value.lineTo(0, height);
		ctx2d.value.fill();
		ctx2d.value.closePath();
	}
}
function draw() {
	let speed = 0;
	let speed2 = 0;
	if (!cvs.value || !ctx2d.value) return;
	(function cb() {
		speed += speedStep;
		speed2 += (speedStep - 0.002);
		let width = (cvs.value.width = cvs.value.offsetWidth);
		let height = (cvs.value.height = cvs.value.offsetHeight);
		ctx2d.value.clearRect(0, 0, width, height);
		ctx2d.value.moveTo(0, (height * height) / 2);
		wave([
			{
				A: 20,
				speed,
				w: 80,
				h: 0.3,
				color: "#4b83d8",
			},
			{
				A: 20,
				speed: speed2,
				w: 90,
				h: 0.27,
				color: "#2e619f",
			},
		]);
		requestAnimationFrame(cb);
	})();
}
let timeOut = undefined
function mouserEnter(){
if(speedStep >= 0.08)return
if(speedStep >= 0.05)return speedStep += 0.01
speedStep = 0.05 

if(timeOut)clearTimeout(timeOut)
 timeOut =  setTimeout(()=>{
    speedStep = 0.02;
  },1000 * 3)
}
function mouseLeave(){
  speedStep = 0.02
}
function logoInit() {
	cvs.value = document.getElementById("cvs") as HTMLCanvasElement;
	ctx2d.value = cvs.value.getContext("2d") as CanvasRenderingContext2D;
	cvs.value.addEventListener('click',mouserEnter)
// cvs.value.addEventListener('mouseleave',mouseLeave)
	draw();
}
onUnmounted(()=>{
  cvs.value.removeEventListener('click',mouserEnter)
  // cvs.value.removeEventListener('mouseleave',mouseLeave)
})
onMounted(() => {
	// console.log(slot)
	logoInit();
	taglineDom.value = 	document.querySelector('.tagline')
	taglineTextList.value =  taglineDom.value.innerText.split('-');
    strBlink(index);
    index += 1
  	time.value = setInterval(() => {
		strBlink(index);
		if (index === taglineTextList.value.length - 1) {
			index = 0;
		} else index += 1;
	}, 500 * taglineTextList.value[index].length);
});
</script>
<style>
.tagline{
  min-height:50px
}
@keyframes strBlink {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

</style>
