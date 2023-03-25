<template>
  <view class="comp-activity">
    <image :src="activityImgUrl" class="activity-img"></image>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'

const props = defineProps<{
  data: string
}>()

const activityImgUrl = computed(() => {
  return props.data
})

</script>

<style lang="scss" scoped>
.comp-activity {
  display: flex;
  justify-content: center;
  padding: 5px;
  min-width: 100vw;
  background: $uni-color-primary;
}
.activity-img {
  height: 120rpx;
  border-radius: 10px;
}
</style>
