<template>
  <Search title="課程編輯" :cols="[]" @submit="query => $router.push({ query })" />
  <div class="tool-bar" style="padding: 0 2.5rem;">
    <div class="mx-auto"></div>
    <el-button @click="editingId = undefined">新增</el-button>
  </div>
  <Table :cols="tableCols" :data-list="lessons?.data ?? []" @edit="setEditForm" @delete="delLesson" />

  <el-dialog v-model="showEditDialog" :title="editingId ? '編輯課程' : '新增課程'" width="90%">
    <Form :key="`${editingId}`" :cols="editingId ? editCols : addCols" @submit="onFormSubmit"
      @cancel="showEditDialog = false" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { request, useFetch } from '@/api/core';
import Search from '@/components/admin/search.vue';
import Table from '@/components/admin/table.vue';
import Form from '@/components/admin/form.vue';
import { computed, ref } from 'vue';
import addCols from './edit';
import { ElMessage } from 'element-plus';

const { data: lessons, refresh } = useFetch(
  () => request<any[]>('/lesson')
);

const tableCols = {
  id: 'id',
  series: "合集",
  author: "講師",
  title: "標題",
  content: "內文",
  src: "連結",
  tags: "tags",
  weight: "權重",
  goods: '點讚數',
  views: '曝光數',
  createTime: "創建時間",
};

const editingId = ref<number | null | undefined>(null);
const showEditDialog = computed({
  get: () => editingId.value !== null,
  set: (value) => {
    if (!value) editingId.value = null;
  }
});

const editCols = ref(addCols);
const setEditForm = (data: Record<string, any>) => {
  editCols.value = editCols.value.map(item => ({ ...item, value: data[item.model] }));
  editingId.value = data.id;
};

const onResult = async (promise: ReturnType<typeof request>) => {
  const res = await promise;
  if (res.success) {
    ElMessage({
      message: '操作成功。',
      type: 'success',
    });
    refresh();
  } else alert(res.msg);
};

const onFormSubmit = (data: Record<string, unknown>) => {
  if (editingId.value === null) return;
  const url = `/lesson/${editingId.value ?? ''}`;
  const promise = request(url, {
    body: data,
    method: editingId.value ? 'PATCH' : 'POST'
  });
  onResult(promise);
};

const delLesson = (id: number) => {
  const sure = confirm(`確定要刪除id為${id}的教程嗎？`);
  if (!sure) return;
  const promise = request('/lesson/' + id, {
    method: 'DELETE'
  });
  onResult(promise);
};
</script>

<style lang="less" scoped></style>