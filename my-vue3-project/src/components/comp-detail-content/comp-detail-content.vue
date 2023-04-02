<template>
  <view class="comp-detail-content">
    <mp-html ref="mpHtmlRef" container-style="padding: 5px;">加载中...</mp-html>
  </view>
</template>

<script lang="ts" setup>
import { ref, defineComponent, defineExpose } from 'vue'
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
defineComponent({
  mpHtml,
})
const mpHtmlRef = ref()
defineExpose({
  mpHtmlRef,
})
</script>

<style lang="scss" scoped></style>
