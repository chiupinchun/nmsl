<template>
  <section>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="col in cols"></li>
    </ul>
    <div class="tool-bar">
      <div class="mx-auto" />
      <el-button @click="emit('submit', data)">搜尋</el-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

interface Props {
  title: string;
  cols: {
    model: string;
  }[];
}
const props = defineProps<Props>();

interface Emits {
  (event: 'submit', data: Record<string, string>): void;
}
const emit = defineEmits<Emits>();

const data = reactive<Record<string, string>>({});

</script>

<style lang="less" scoped>
section {
  padding: 0 2.5rem;
  border-bottom: 1px solid black;
}
</style>