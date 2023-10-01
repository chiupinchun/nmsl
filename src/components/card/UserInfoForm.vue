<template>
  <el-form :model="form" label-width="120px" label-position="left" class="form">
    <div class="form-header">
      <el-avatar @click="showAvatarModal = true" size="large" class="avatar" :src="avatar ?? defaultImg" />
      <div>
        <el-button type="danger" @click="clear">清空</el-button>
        <el-button type="primary" @click="onSubmit">生成卡片</el-button>
      </div>
    </div>

    <el-dialog v-model="showAvatarModal" title="選擇頭像">
      <div v-for="avatarItem in avatars" class="mx-5 mb-3">
        <el-avatar @click="tempAvatar = avatarItem.img" :src="avatarItem.img"
          :class="{ active: tempAvatar === avatarItem.img }" size="large" class="avatar" />
        <div style="text-align: center">{{ avatarItem.name }}</div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAvatarModal = false">取消</el-button>
          <el-button type="primary" @click="confirmAvatar">
            確定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <template v-for="item in form">
      <el-form-item :label="item.name">
        <el-input v-if="!item.counts" v-model="item.value" :type="item.type" />
        <el-row v-else :gutter="20">
          <el-col :span="12">
            <el-input v-model="item.counts[0]" type="number" placeholder="正確" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="item.counts[1]" type="number" placeholder="錯誤" />
          </el-col>
        </el-row>
      </el-form-item>
    </template>

    <el-form-item>

      <!-- <el-button type="primary" @click="test">test</el-button> -->
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ElNotification } from 'element-plus';
import deepCopy from '@/utils/deepCopy';
import Dog from '@/assets/images/avatars/Dog.png';
import Fish from '@/assets/images/avatars/Fish.png';
import Hato from '@/assets/images/avatars/Hato.png';
// import Lemon from '@/assets/images/avatars/Lemon.png';
import Lemon2 from '@/assets/images/avatars/Lemon2.png';
import Lemon3 from '@/assets/images/avatars/Lemon3.png';
import Mole from '@/assets/images/avatars/Mole.png';
import Rabbit from '@/assets/images/avatars/Rabbit.png';
import defaultImg from '@/assets/images/question-mark.png';

const emit = defineEmits(['generate']);

const avatars = reactive([
  {
    name: '吉娃娃',
    img: Dog
  },
  {
    name: '雜魚',
    img: Fish,
  },
  {
    name: '鴿子',
    img: Hato
  },
  // {
  //   name: '檸檬',
  //   img: Lemon
  // },
  {
    name: '笑笑檸檬',
    img: Lemon2
  },
  {
    name: '眨眼檸檬',
    img: Lemon3
  },
  {
    name: '地鼠',
    img: Mole
  },
  {
    name: '兔兔',
    img: Rabbit
  }
]);

const tempAvatar = ref<string | undefined>();
const avatar = ref<string | undefined>();

const confirmAvatar = () => {
  avatar.value = tempAvatar.value;
  showAvatarModal.value = false;
};

const emptyForm = [
  {
    key: 'name',
    name: '暱稱',
    value: ''
  },
  {
    key: 'job',
    name: '職稱',
    value: ''
  },
  {
    key: 'info',
    name: '狀態消息',
    value: '',
    type: 'textarea'
  },
  {
    key: 'js',
    name: 'js',
    counts: []
  },
  {
    key: 'vue',
    name: 'vue',
    counts: []
  },
  {
    key: 'css',
    name: 'css',
    counts: []
  }
];
const form = reactive<{
  key: string;
  name: string;
  value?: string;
  counts?: number[];
  type?: string;
}[]>(deepCopy(emptyForm));

const showAvatarModal = ref(false);

const onSubmit = () => {
  const notFinished = form.filter(item => {
    if (item.counts || item.value) return false;
    return true;
  });
  if (notFinished.length) {
    return ElNotification({
      title: '尚未填寫完成！',
      message: '未填寫欄位：' + notFinished.map(item => item.name).join('、'),
      type: 'warning'
    });
  }
  emit('generate', {
    avatar: avatar.value,
    ...form.reduce((res: Record<string, string | number[] | undefined>, item) => {
      if (!item.counts) res[item.key] = item.value;
      else res[item.key] = item.counts;
      return res;
    }, {})
  });
};

const clear = () => {
  avatar.value = undefined;
  const newEmptyForm = deepCopy(emptyForm);
  for (const key in form) form[key] = newEmptyForm[key];
};

const test = () => {
  emit('generate', {
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
    name: 'pg',
    job: '客服兼PM',
    info: '我想下班',
    js: [1, 0],
    vue: [1, 0],
    css: [0, 0]
  });
};
</script>

<style lang="less" scoped>
:deep(.el-dialog__body) {
  display: flex;
  justify-content: space-around;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.avatar {
  cursor: pointer;

  &.active {
    box-shadow: 0 0 20px var(--el-color-primary);
  }
}
</style>