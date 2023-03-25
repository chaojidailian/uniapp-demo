<template>
  <view class="comp-home-list">
    <scroll-view
      class="scroll-view"
      scroll-x="true"
    >
      <template v-for="(item, index) in listData" :key="item.name">
        <slot :data="item" :index="index">
          <view
            class=".scroll-view-item_H"
            :class="current === index ? 'active' : ''"
            @click="handleItemClick(item, index)"
            >{{ item.name }}</view
          >
        </slot>
      </template>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref } from 'vue'
const props = defineProps<{
  data: any[]
}>()

const listData = computed(() => props.data)
const current = ref(0)
const handleItemClick = (item: any, index: number) => {
  if (current.value !== index) {
    current.value = index
  }
  console.log(item, index)
}
</script>

<style lang="scss" scoped>
$list-heigh: 60rpx;
.scroll-view {
  box-sizing: border-box;
  white-space: nowrap;
  height: $list-heigh;
  border: 1px solid red;
  .scroll-view-item_H {
    display: inline-block;
    width: 30%;
    line-height: $list-heigh;
    text-align: center;
    font-size: $uni-font-size-lg;
  }
  .active {
    color: $uni-color-primary;
  }
}
</style>
