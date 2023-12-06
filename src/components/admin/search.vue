<template>
  <section>
    <h1>{{ title }}</h1>
    <el-form @submit.prevent="emit('submit', dataToSend)" :model="data" label-width="120px" label-position="top">
      <el-form-item v-for="(col, idx) in cols" :label="col.text" class="form-item">
        <el-select v-if="col.type === 'select'" v-model="data[col.model]" :placeholder="col.placeholder">
          <el-option v-for="opt in col.options" :label="col.text" :value="opt.value" />
        </el-select>
        <!-- <template v-else-if="col.type === 'date'">
          <template v-if="Array.isArray(data[col.model])">
            <el-col :span="11">
              <el-date-picker v-model="(data[col.model] as unknown[])[0]" type="date" placeholder="起"
                style="width: 100%" />
            </el-col>
            <el-col :span="2" class="text-center">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-time-picker v-model="(data[col.model] as unknown[])[1]" placeholder="迄" style="width: 100%" />
            </el-col>
          </template>
        </template> -->
        <el-switch v-else-if="col.type === 'switch'" v-model="data[col.model]" />
        <!-- <el-checkbox-group v-else-if="col.type === 'checkbox'" v-model="data[col.model]">
          <template v-if="Array.isArray(data[col.model])">
            <el-checkbox v-for="(opt, idx) in col.options" :label="opt.text" v-model="(data[col.model] as boolean[])[idx]"
              :name="data[col.model]" />
          </template>
        </el-checkbox-group> -->
        <el-radio-group v-else-if="col.type === 'radio'" v-model="data[col.model]">
          <el-radio v-for="opt in col.options" :label="opt.value">{{ opt.text }}</el-radio>
        </el-radio-group>
        <!-- <template v-else-if="col.type === 'markdown'">
          <div v-show="previewIdx === idx" v-html="parseMarkdown(form[col.model] as string | undefined ?? '')"
            style="width: 100%"></div>
          <el-input v-show="previewIdx !== idx" type="textarea" v-model="form[col.model]" :rows="20"></el-input>
          <el-button @click="previewIdx = previewIdx === undefined ? idx : undefined">預覽</el-button>
        </template> -->
        <el-input v-else v-model="data[col.model]" :type="col.type" :placeholder="col.placeholder" />
      </el-form-item>
    </el-form>
    <div class="tool-bar">
      <div class="mx-auto" />
      <el-button @click="emit('submit', dataToSend)">搜尋</el-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { FormCol } from '@/types/form';
import { computed, reactive } from 'vue';

interface Props {
  title: string;
  cols: FormCol[];
}
const props = defineProps<Props>();

interface Emits {
  (event: 'submit', data: Record<string, string>): void;
}
const emit = defineEmits<Emits>();

const data = reactive<Record<string, string>>({});
const dataToSend = computed(() => {
  return Object.keys(data).filter(key => data[key]).reduce((res, key) => ({ ...res, [key]: data[key] }), {});
})

</script>

<style lang="less" scoped>
section {
  padding: 0 2.5rem;
  border-bottom: 1px solid black;
}

.form-item {
  width: 300px;
}
</style>