<template>
  <el-table :data="dataList" stripe style="width: 100%;">
    <template #empty>
      {{ pendding === true ? '資料撈取中...' : '沒有資料' }}
    </template>
    <el-table-column v-for="col in Object.keys(cols)" :prop="col" :label="cols[col]" width="180" />
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">編輯</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">刪除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
interface Props {
  cols: Record<string, string>;
  dataList: Record<string, any>[];
  pendding?: boolean;
}
const props = defineProps<Props>();

type Row = typeof props.dataList[0];
interface Emits {
  (event: 'edit', data: Row): void;
  (event: 'delete', id: number): void;
}
const emit = defineEmits<Emits>();

const handleEdit = (_: number, row: typeof props.dataList[0]) => {
  emit('edit', row);
};

const handleDelete = (_: number, row: typeof props.dataList[0]) => {
  emit('delete', row.id);
};
</script>

<style lang="less" scoped>
:deep(.cell) {
  max-height: 5rem;
}
</style>