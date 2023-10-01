<script setup lang="ts">
import { h } from 'vue';
import Sidebar from '@/components/Sidebar.vue';

</script>

<template>
  <div style="display: flex;">
    <el-aside style="width: unset">
      <Sidebar />
    </el-aside>
    <main>
      <RouterView />
    </main>
  </div>
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

.mx-auto {
  margin-left: auto;
  margin-right: auto;
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


.tool-bar {
  display: flex;
  margin: 1rem 0;
}
</style>

<style lang="less" scoped>
main {
  width: 100%;
  overflow: hidden;
}
</style>