<template>
  <div class="container">
    <!-- <button class="plus" @click="num++">+</button> -->
    <!-- 不推荐直接操控数据，而是应该用仓库暴露的操控方法 -->
    <button class="plus" @click="increment">+</button>

    <div class="num">{{ num }}</div>
    <button class="reduce" @click="decrement">-</button>
    <div class="doubleNum">{{ doubleNum }}</div>

    <button class="asyncIncrement" @click="asyncIncrement">异步增加</button>
    <button class="asyncDecrement" @click="asyncDecrement">异步减少</button>

    <button class="reset" @click="store.$reset">重置</button>
    <!-- 仓库实例属性 $reset 实现重置仓库状态 -->

    <input type="text" v-model="newNum" />
    <button class="bind" @click="handleBind">绑定</button>
  </div>
</template>

<script setup>
import { useCounterStore } from "../../store/useCounterStore.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const store = useCounterStore();

// 解构数据
const { num, doubleNum } = storeToRefs(store);
// 如果不用 storeToRefs 仓库中的数据 "breaks reactivity" 不是响应式的

// 解构方法
const { increment, decrement, asyncIncrement, asyncDecrement } = store;

const newNum = ref(""); // 用于和输入框做双向绑定

function handleBind() {
  store.$patch({
    // 仓库实例属性 $patch 可以用于变更仓库状态
    num: ~~newNum.value,
    // ~~ 用于快速转为32位整数
  });
  newNum.value = "";
}
</script>

<style scoped></style>
