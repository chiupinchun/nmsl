<template>
  <ul class="sidebar" :class="{ collapse }">
    <li><router-link to="/gacha">{{ collapse ? '' : '抽倒楣鬼' }}</router-link></li>
    <li><router-link to="/card">{{ collapse ? '' : '小卡片' }}</router-link></li>

    <span @click="collapse = !collapse" class="collapse">↔</span>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const collapse = ref(false);
</script>

<style lang="less" scoped>
.sidebar {
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: rgb(226, 226, 226);
  transition: 0.5s;

  &.collapse {
    width: 20%;
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