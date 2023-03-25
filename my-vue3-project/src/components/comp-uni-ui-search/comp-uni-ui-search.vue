<template>
  <view class="comp-uni-ui-search">
    <view class="view-search">
      <uni-search-bar
        class="uni-search"
        placeholder="搜索框"
        :radius="100"
        v-model="searchValue"
        @confirm="search"
      ></uni-search-bar>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchValue = ref('')
const search = (e: { value: string }) => {
  console.log(e)
}
</script>

<style lang="scss" scoped>
.view-search {
  min-width: 100vw;
  background: pink;
}
</style>
