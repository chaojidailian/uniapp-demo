<template>
  <view class="page-edit">
    <fui-input
      v-model="formData.title"
      label="标题"
      :bottomLeft="0"
      placeholder="请输入文章标题"
      color="#000"
      inputBorder
      required
      clearable
    ></fui-input>
    <view>编辑</view>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const formData = reactive({
  title: '',
})
</script>

<style lang="scss" scoped></style>
