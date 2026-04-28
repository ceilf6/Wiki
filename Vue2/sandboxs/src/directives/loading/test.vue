<template>
  <div>
    <h1 v-loading="isLoading">branches: {{ branches }}</h1>
    <!-- <Loading v-if="isLoading" /> -->
  </div>
</template>

<script>
import getWiki from "@/api/test";
import "../../mock";
// import { Loading } from "@/components";
import loadingUrl from "@/assets/loading.svg";

function getLoadingImg(el) {
  return el.querySelector("img[data-role=loading]");
}

function createLoadingImg() {
  const img = document.createElement("img");
  img.dataset.role = "loading";
  img.src = loadingUrl;
  img.className = "loading";
  return img;
}

export default {
  directives: {
    loading: function (el, binding) {
      // 根据 binding.value 值决定 Loading 元素的创建和删除
      const curImg = getLoadingImg(el);
      if (binding.value) {
        if (!curImg) {
          const img = createLoadingImg();
          el.appendChild(img);
        }
      } else {
        curImg.remove();
      }
    },
  },
  components: {
    // Loading,
  },
  data() {
    return {
      branches: 0,
      offset: 10,
      isLoading: true,
    };
  },
  async created() {
    const res = await getWiki();
    console.log(res);
    // request 封装已经自动取了两层data
    this.branches = res.branches + this.offset; // 如果在 beforeCreated 阶段就取不到 this.

    // 同时 async 语法糖本质是 Promise 所以数据更新其实是异步回调，并不会等 created() 结束后再往下 beforeMount

    this.isLoading = false; // 异步完成后结束loading
  },
  updated() {
    console.log("updated");
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.loading {
  .self-center();
}
</style>
