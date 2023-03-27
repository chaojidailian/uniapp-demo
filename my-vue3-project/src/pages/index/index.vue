<template>
  <view class="content">
    <comp-uni-ui-search></comp-uni-ui-search>
    <comp-home-list :data="listData"></comp-home-list>
    <comp-home-swiper :data="bannerData"></comp-home-swiper>
    <comp-home-activity :data="activityData"></comp-home-activity>
    <comp-home-category :data="categoryData"></comp-home-category>
    <comp-home-recommend
      :data="commendData"
      ref="commendRef"
    ></comp-home-recommend>
  </view>
</template>

<script setup lang="ts">
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import {
  getHomeList,
  getHomeBanners,
  getHomeActivity,
  getHomeCategory,
  getHomeCommend,
  setPullDownRefresh,
  setReachBottom,
} from './hook'

const { bannerData } = getHomeBanners()
const { activityData } = getHomeActivity()
const { categoryData } = getHomeCategory()
const { commendData, commendRef } = getHomeCommend()
const { listData } = getHomeList()

onReachBottom(setReachBottom())
onPullDownRefresh(setPullDownRefresh())
</script>

<style lang="scss" scoped>
</style>
