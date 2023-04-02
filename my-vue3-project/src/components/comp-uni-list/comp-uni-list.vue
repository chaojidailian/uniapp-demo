<template>
  <view class="comp-uni-list">
    <uni-list>
      <uni-list-item
        v-for="item in config"
        :key="item.title"
        class="item"
        clickable
        showArrow
        @click="handleItemClick(item)"
      >
        <template #header>
          <view class="header">
            <uni-icons :type="item.iconType" :size="item.iconSize"></uni-icons>
            <text class="header-text">{{ item.title }}</text>
          </view>
        </template>
      </uni-list-item>
    </uni-list>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import type { IConfig } from './types'

const emits = defineEmits(['item-click'])
defineProps<{
  config: IConfig[]
}>()

const handleItemClick = (item: IConfig) => {
  console.log('item...')
  emits('item-click', item)
}
</script>

<style lang="scss" scoped>
.comp-uni-list {
  margin: 16rpx 0;
  border-radius: $uni-border-radius-lg;
  .item {
    .header {
      display: flex;
      align-items: center;
      .header-text {
        margin-left: 12rpx;
      }
    }
  }
}
</style>
