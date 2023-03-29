<template>
  <view class="comp-edit-title">
    <label for="title"
      >
      <text>*</text>
      <text>标题</text>
      <input
        id="title"
        :value="title"
        placeholder="请输入标题"
        @input="handleTitleChange"
      />
    </label>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
const emits = defineEmits(['titleChange'])
defineProps<{
  title: string
}>()

const handleTitleChange = (e: any) => {
  emits('titleChange', e.detail.value)
}
</script>

<style lang="scss" scoped>
.comp-edit-title {
  margin: 12rpx 0;
  label {
    display: flex;
    align-items: center;
    text {
      &:first-child {
        color: red;
        font-size: 36rpx;
        margin-right: 12rpx;
      }
      
    }
    input {
      display: inline-block;
      height: 54rpx;
      flex: 1;
      padding: 12rpx 36rpx;
      margin-left: 36rpx;
      border: 2rpx solid #ccc;
      border-radius: $uni-border-radius-lg;
    }
  }
}
</style>
