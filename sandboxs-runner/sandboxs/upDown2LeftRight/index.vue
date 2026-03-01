<!-- // 上下滚动变横向
// 思路1 - 监听鼠标滚动事件：但是需要考虑事件触发频率，而且还要考虑滚动距离

// 通过 CSS 实现不会像JS那样占用主线程过多资源
// 通过旋转使用改纵向的 滚动条 为横向

// https://gsap.com/ -->

<template>
    <scroll>
        <div class="image-item">
            <img src="./assets/Django.jpg"/>
        </div>
        <div class="image-item">
            <img src="./assets/Django.jpg"/>
        </div>
        <div class="image-item">
            <img src="./assets/Django.jpg"/>
        </div>
    </scroll>
    <div class="image-item">
        <img src="./assets/Django.jpg"/>
    </div>
    <div class="image-item">
        <img src="./assets/Django.jpg"/>
    </div>
    <div class="image-item">
        <img src="./assets/Django.jpg"/>
    </div>
</template>

<script setup>
import Scroll from './scroll.vue';
</script>

<style scoped>
.image-item {
    display: inline-block;
    margin-right: 20px;
    height: 100%;
}
.image-item img {
    /* 保持等比例缩放：图片按容器高度调整，同时不超过 500px */
    height: 100%;
    /* max-height: 500px; */
    width: auto;
    display: block;
    object-fit: contain;
}
</style>