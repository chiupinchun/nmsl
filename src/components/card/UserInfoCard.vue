<template>
  <el-card body-style="display: flex; justify-content: space-between" class="card">
    <div class="info-block">
      <div class="left-right-block">
        <el-avatar :src="data.avatar ?? defaultImg" size="large" />
        <div class="ms-5">
          <h3>{{ data.name }}</h3>
          <p class="job">{{ data.job }}</p>
        </div>
      </div>
      <el-divider />
      <p class="info">{{ data.info }}</p>
    </div>
    <div>
      <Radar :data="chartData" :options="{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }" />
    </div>

    <div class="float-btns">
      <el-button @click="emit('back')" type="info">返回</el-button>
    </div>
    <i @click="ElMessage({
      message: whisper,
      type: 'success',
      icon: StarFilled
    })" v-if="surprise" class="surprise"></i>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { ElMessage } from 'element-plus';
import { StarFilled } from '@element-plus/icons-vue';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'vue-chartjs';
import whisper from '../../assets/ts/whisper';
import defaultImg from '@/assets/images/question-mark.png';

interface Props {
  data: UserInfo;
}
const props = defineProps<Props>();

const emit = defineEmits(['back']);

const calcScore = (data: number[]) => {
  const pass = Number(data[0] ?? 0);
  const fail = Number(data[1] ?? 0);
  const result = pass / (pass + fail);
  return 60 + (isNaN(result) ? 0 : result * 40);
};

const chartData = {
  labels: [
    'vue',
    'js',
    'css',
  ],
  datasets: [
    {
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [calcScore(props.data.vue), calcScore(props.data.js), calcScore(props.data.css)]
    },
    {
      data: [0, 0, 0]
    }
  ]
};
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const surprise = ref<any>();

onMounted(() => {
  surprise.value = (window as any).s;
  delete (window as any).s;
  document.documentElement.classList.add('dark');
});
onBeforeUnmount(() => {
  document.documentElement.classList.remove('dark');
});
</script>

<style lang="less" scoped>
.card {
  position: relative;
  margin: 0 auto 50px;
  max-width: 750px;
  overflow: visible;
  background: url(@/assets/images/starsky.jpg);
  background-size: cover;
  background-position: center right;

  .info-block {
    width: 100%;

    .left-right-block {
      display: flex;
      // justify-content: space-between;
      align-items: center;

      .job {
        color: var(--el-text-color-regular);
      }
    }
  }

  .float-btns {
    position: absolute;
    right: 0;
    bottom: -50px;
  }
}

:deep(canvas) {
  padding: 25px 10px 0;
  background-color: white;
  // border-radius: 5px;
  box-shadow: inset 0px 0px 5px 10px #0E0E18;
}

i.surprise {
  position: absolute;
  top: -20px;
  right: -13px;
  width: 48px;
  height: 57px;
  background: url(@/assets/images/ribbon.png);
  cursor: pointer;
}
</style>
