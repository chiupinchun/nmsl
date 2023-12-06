<template>
  <Search title="課程編輯" :cols="[]" @submit="query => $router.push({ query })" />
  <div class="tool-bar" style="padding: 0 2.5rem;">
    <div class="mx-auto"></div>
    <el-button @click="editingId = undefined">新增</el-button>
  </div>
  <Table :cols="tableCols" :data-list="announces?.data ?? []" @edit="setEditForm" @delete="delAnnounce" />
  <el-pagination layout="prev, pager, next" :total="announces?.totalRecord"
    @current-change="(page: number) => $router.push({ query: { ...$route.query, page } })" />

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
import { useRoute } from 'vue-router';

const route = useRoute();

const { data: announces, refresh } = useFetch(
  () => request<any[]>('/announce', { query: route.query as Record<string, string> }),
  {
    watch: [() => route.query.page]
  }
);

const tableCols = {
  id: 'id',
  title: "標題",
  content: "內文",
  createTime: "創建時間",
  updateTime: "創建時間"
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
  const url = `/announce/${editingId.value ?? ''}`;
  const promise = request(url, {
    body: data,
    method: editingId.value ? 'PATCH' : 'POST'
  });
  onResult(promise);
};

const delAnnounce = (id: number) => {
  const sure = confirm(`確定要刪除id為${id}的教程嗎？`);
  if (!sure) return;
  const promise = request('/announce/' + id, {
    method: 'DELETE'
  });
  onResult(promise);
};
</script>

<style lang="less" scoped></style>