<template>
  <view class="comp-detail-title">
    <text>{{ title }}</text>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
withDefaults(defineProps<{
  title?: string
}>(), {
  title: '默认标题'
})
</script>

<style lang="scss" scoped>
.comp-detail-title {
  font-size: 50rpx;
  font-weight: 550;
  margin-bottom: 20rpx;
}
</style>
