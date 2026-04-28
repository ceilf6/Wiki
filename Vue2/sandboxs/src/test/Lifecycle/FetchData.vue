<template>
  <div>
    <h1 v-loading="isLoading">branches: {{ data.branches + offset }}</h1>
    <!-- <Loading v-if="isLoading" /> -->
  </div>
</template>

<script>
import getWiki from "@/api/test";
// import { Loading } from "@/components";
import fetchData from "@/mixins/fetchData";

export default {
  mixins: [fetchData({ branches: 0 })], // 配置默认值
  components: {
    // Loading,
  },
  data() {
    return {
      // branches: 0,
      offset: 10,
      // isLoading: true,
    };
  },
  // async created() {
  //   const res = await getWiki();
  //   console.log(res);
  //   // request 封装已经自动取了两层data
  //   this.branches = res.branches + this.offset; // 如果在 beforeCreated 阶段就取不到 this.

  //   // 同时 async 语法糖本质是 Promise 所以数据更新其实是异步回调，并不会等 created() 结束后再往下 beforeMount

  //   this.isLoading = false; // 异步完成后结束loading
  // },
  methods: {
    async fetchData() {
      return await getWiki(); // 需要为 mixins 提供 fetchData 方法
    },
  },
  created() {
    console.log(
      "=== this.data",
      this.data,
      "由于混入方法是异步的所以这里还未拿到",
    );
  },
  // beforeUpdate() {
  //   console.log("beforeUpdate - 数据已更新，DOM未更新");
  //   console.log("=== this.data", this.data);
  //   // 问题：每次数据变化都会触发，需要加条件判断
  //   if (this.data && this.data.branches !== undefined && this.branches === 0) {
  //     this.branches = this.data.branches + this.offset;
  //   }
  // },
  updated() {
    console.log("updated");
    console.log("=== this.data", this.data);
    // if (this.data?.branches) this.branches = this.data.branches + this.offset; // 注意混入方法中用的是 data 保存返回数据，而不是之前的 res
  },
};
</script>
