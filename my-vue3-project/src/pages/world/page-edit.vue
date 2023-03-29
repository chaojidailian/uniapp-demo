<template>
  <view class="page-edit">
    <comp-edit-submit :condition="title" :edit="compEditRef" :title="title"></comp-edit-submit>
    <comp-edit-title :title="title" @titleChange="handleTitleChange"></comp-edit-title>
    <comp-edit-tools :edit="compEditRef"></comp-edit-tools>
    <comp-edit ref="compEditRef"></comp-edit>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const title = ref('')
const handleTitleChange = (newTitle: string) => {
  title.value = newTitle
}
const compEditRef = ref()

</script>

<style lang="scss" scoped>
.page-edit {
  padding: 36rpx;
}
</style>
