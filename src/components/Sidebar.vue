<template>
  <div :style="{ width: collapse ? '30px' : '150px', transition: '0.5s' }"></div>
  <ul class="sidebar" :class="{ collapse }">
    <li><router-link to="/lesson">{{ collapse ? '' : '課程編輯' }}</router-link></li>
    <li><router-link to="/announce">{{ collapse ? '' : '網站公告' }}</router-link></li>

    <span @click="collapse = !collapse" class="collapse">↔</span>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const collapse = ref(false);
</script>

<style lang="less" scoped>
.sidebar {
  position: fixed;
  z-index: 100;
  top: 0;
  height: 100vh;
  width: 150px;
  background-color: rgb(226, 226, 226);
  transition: 0.25s;

  &.collapse {
    width: 30px;
  }

  li {

    &:hover {
      background-color: rgb(237, 237, 237);
    }

    a {
      display: block;
      padding: 1rem;
    }
  }

  .collapse {
    position: absolute;
    right: 5px;
    bottom: 50vh;
    cursor: pointer;
  }
}
</style>