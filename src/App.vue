<script setup lang="ts">
import { h } from 'vue';
import Sidebar from '@/components/Sidebar.vue';

console.log(h('div', '雞雞'))

</script>

<template>
  <el-container>
    <el-aside width="200px">
      <Sidebar />
    </el-aside>
    <RouterView />
  </el-container>
</template>

<style lang="less">
body,
ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

.ms-5 {
  margin-left: 1.25rem;
}

.mx-5 {
  margin-left: 1.25rem;
  margin-right: 1.25rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}
</style>
