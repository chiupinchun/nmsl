<template>
  <el-form :model="form" label-width="120px">
    <el-form-item v-for="(col, idx) in cols" :label="col.text">
      <el-select v-if="col.type === 'select'" v-model="form[col.model]" :placeholder="col.placeholder">
        <el-option v-for="opt in col.options" :label="col.text" :value="opt.value" />
      </el-select>
      <template v-else-if="col.type === 'date'">
        <template v-if="Array.isArray(form[col.model])">
          <el-col :span="11">
            <el-date-picker v-model="(form[col.model] as unknown[])[0]" type="date" placeholder="起" style="width: 100%" />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-picker v-model="(form[col.model] as unknown[])[1]" placeholder="迄" style="width: 100%" />
          </el-col>
        </template>
      </template>
      <el-switch v-else-if="col.type === 'switch'" v-model="form[col.model]" />
      <el-checkbox-group v-else-if="col.type === 'checkbox'" v-model="form[col.model]">
        <template v-if="Array.isArray(form[col.model])">
          <el-checkbox v-for="(opt, idx) in col.options" :label="opt.text" v-model="(form[col.model] as boolean[])[idx]"
            :name="form[col.model]" />
        </template>
      </el-checkbox-group>
      <el-radio-group v-else-if="col.type === 'radio'" v-model="form[col.model]">
        <el-radio v-for="opt in col.options" :label="opt.value">{{ opt.text }}</el-radio>
      </el-radio-group>
      <template v-else-if="col.type === 'markdown'">
        <div v-show="previewIdx === idx" v-html="parseMarkdown(form[col.model] as string | undefined ?? '')"
          style="width: 100%"></div>
        <el-input v-show="previewIdx !== idx" type="textarea" v-model="form[col.model]" :rows="20"></el-input>
        <el-button @click="previewIdx = previewIdx === undefined ? idx : undefined">預覽</el-button>
      </template>
      <el-input v-else v-model="form[col.model]" :type="col.type" :placeholder="col.placeholder" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">送出</el-button>
      <el-button @click="emit('cancel')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { marked } from 'marked';
import type { FormCol } from '@/types/form';
import deepCopy from '@/utils/deepCopy';

interface Props {
  cols: FormCol[];
}
const props = defineProps<Props>();

interface Emits {
  (event: 'cancel'): void;
  (event: 'submit', data: Record<string, unknown>): void;
}
const emit = defineEmits<Emits>();

// do not use same name with ref
const form = reactive<Record<string, unknown | unknown[]>>(props.cols.reduce((res, item) => ({ ...res, [item.model]: item.value }), {}));

const previewIdx = ref<number | undefined>();

const parseMarkdown = (src: unknown) => {
  if (typeof src !== 'string') return src;
  return marked(src.replaceAll('<', '&lt;'));
};

const onSubmit = () => {
  emit('submit', form);
  emit('cancel');
};
</script>

<style lang="less" scoped></style>