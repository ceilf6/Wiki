<template>
    <div class="scroll-container" v-size-ob="handleSizeChange"> 
        <!-- /* 检测元素的尺寸变化 */ -->
        <div class="v-scroll">
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style>
.scroll-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* max-height: 500px; */
}
.v-scroll {
    /* 宽高分别等于父元素的高宽 - 交换宽高实现旋转效果 */
    width: calc(v-bind('fatherSize.h') * 1px);
    /* 宽度变成容器的高度 */
    height: calc(v-bind('fatherSize.w') * 1px);
    /* 高度变成容器的宽度 */
    position: relative;

    overflow-y: auto;
    /* 关键：需要 auto 或 scroll 才能触发滚动 */
    overflow-x: hidden;

    /* 隐藏滚动条但保留滚动功能 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transform-origin: 0 0;
    transform: rotate(-90deg) translateX(-100%);
    /* 旋转并平移到正确位置 */
}
.v-scroll::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
    width: 0;
    height: 0;
}
.content {
    height: calc(v-bind('fatherSize.w') * 1px);
    transform-origin: 0 0;
    transform: rotate(90deg) translateY(-100%); 
    /* // 100% 是未旋转前内容高度，抵消 rotate(90deg) 导致的位移，让内容回到容器的左上角位置 */
    /* 反向旋转内容使其恢复正常方向 */
    width: max-content;
    /* 允许内容横向扩展 */
    display: flex;
}
</style>

<script setup>
import { reactive } from 'vue';

const fatherSize = reactive({
    w: 0,
    h: 0,
})

const handleSizeChange = (entry) => {
    const { width, height } = entry.contentRect; // 是 DOMRectReadOnly 矩形只读对象
    console.log(`尺寸变化: 宽 ${width}, 高 ${height}`);
    fatherSize.h = height;
    fatherSize.w = width
};

const vSizeOb = {
    mounted(el, binding) {
        const observer = new ResizeObserver((entries) => {
            // ResizeObserver 是 原生浏览器提供的监听元素尺寸变化的 API
            for (const entry of entries) {
                binding.value(entry);
            }
        });
        observer.observe(el);
        el._observer = observer;
    },
    unmounted(el) {
        el._observer?.disconnect();
    }
};
</script>