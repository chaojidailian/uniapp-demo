<template>
  <view class="comp-edit-title">
    <fui-input
      :modelValue="titleData"
      label="标题"
      :bottomLeft="0"
      placeholder="请输入文章标题"
      color="#000"
      inputBorder
      required
      clearable
      @input="handleTitleChange"
    ></fui-input>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'
const emits = defineEmits(['titleChange'])
const props = defineProps<{
  title: string
}>()

// 当标题title发生改变，发送事件通知父组件中的title变化
const titleData = computed(() => props.title)
const handleTitleChange = () => {
  emits('titleChange',titleData.value)
}
</script>

<style lang="scss" scoped></style>
