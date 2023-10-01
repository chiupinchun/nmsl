<template>
  <main class="container">
    <ul class="tab">
      <li @click="mode = Mode.normal" :class="{ active: mode === Mode.normal }">普通模式</li>
      <li @click="mode = Mode.yueli" :class="{ active: mode === Mode.yueli }">月莉模式</li>
    </ul>
    <label>莊家
      <select v-model="dealer">
        <option v-for="name in member" :value="name">{{ name }}</option>
      </select>
    </label>
    <el-button @click="draw">{{ jinx.length ? '下一位倒楣鬼' : '抽倒楣鬼' }}</el-button>
    <ul>
      <li v-for="(name, index) in jinx">{{ `第${index + 1}位倒楣鬼：${name}` }}</li>
    </ul>
  </main>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import _member from '@/assets/ts/member';
import deepCopy from '@/utils/deepCopy';

enum Mode {
  normal,
  yueli
}
const mode = ref(Mode.normal);
watch(mode, () => {
  jinx.length = 0;
});

const member = computed(() => mode.value === Mode.yueli ? ['小月', '莉莉'] : deepCopy(_member));

const dealer = ref<string | undefined>();

const jinx = reactive<string[]>([]);

const draw = () => {
  const drawFrom = member.value.filter(name => ![dealer.value, ...jinx].includes(name));
  if (!drawFrom.length) return ElMessage.error('沒人能抽啦！');
  jinx.push(drawFrom[Math.floor(Math.random() * drawFrom.length)]);
};
</script>

<style lang="less" scoped>
.container {
  margin: 5rem auto;
  width: 50vw;

  .tab {
    display: flex;
    margin-bottom: 2.5rem;

    li {
      margin-right: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid gray;
      border-radius: 5px;
      cursor: pointer;

      &.active {
        box-shadow: 0 0 5px 5px pink;
      }
    }
  }

  label {
    display: block;
    margin-bottom: 2.5rem;
  }
}
</style>