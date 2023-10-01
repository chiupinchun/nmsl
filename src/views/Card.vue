<template>
  <div class="background">
    <div class="container">
      <Transition>
        <Suspense>
          <component :is="editMode ? UserInfoForm : UserInfoCard" :data="userData" @generate="generateCard"
            @back="editMode = true"></component>
        </Suspense>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import UserInfoForm from '../components/card/UserInfoForm.vue';
import UserInfoCard from '../components/card/UserInfoCard.vue';

const editMode = ref(true);
const userData = reactive<UserInfo | {}>({});

const generateCard = ($event: UserInfo) => {
  editMode.value = false;
  Object.assign(userData, $event);
};
</script>

<style lang="less" scoped>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  // flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: url(@/assets/images/bg.jpg);

  .container {
    padding: 2.5rem;
    width: 50vw;
    border: 1px solid black;
    border-radius: 5px;
    background-color: rgb(220, 220, 255);
  }
}

.v-enter-active,
.v-leave-active,
.v-enter-from,
.v-leave-to {}

.v-enter-from,
.v-leave-to {
  transition: 0.5s;
  opacity: 0;
  position: absolute;
}
</style>