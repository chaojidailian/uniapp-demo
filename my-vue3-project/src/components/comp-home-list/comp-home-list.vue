<template>
  <view class="comp-home-list">
    <fui-tabs
      :tabs="listData"
      :current="current"
      center
      scroll
      @change="handleTabsChange"
    ></fui-tabs>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref } from 'vue'
const props = defineProps<{
  data: any[]
}>()

const listData = computed(() => props.data)
const current = ref(0)
const handleTabsChange = (e: any) => {
  current.value = e.index
  console.log(e, current.value)
}
</script>

<style lang="scss" scoped></style>
