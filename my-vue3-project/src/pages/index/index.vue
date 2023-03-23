<template>
  <view class="content">
    <comp-swiper :data="bannerData"></comp-swiper>
    <comp-activity :data="activityData"></comp-activity>
    <uni-search-bar></uni-search-bar>
    <uni-title title="上报统计数据"></uni-title>
  </view>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import compSwiper from '@/components/comp-swiper.vue'
import compActivity from '@/components/comp-activity.vue'

defineComponent({
  components: {
    compSwiper,
    compActivity
  },
})

const bannerData = ref<string[]>([])

const getHomeBanners = async () => {
  const res = await uni.request({
    url: 'https://mock.apifox.cn/m1/2481033-0-default/gethomebanners',
  })
  if (res.statusCode === 200) {
    bannerData.value = res.data.banners
  }
}
getHomeBanners()

const activityData = ref('')
const getHomeActivity = async () => {
  const res = await uni.request({
    url: 'https://mock.apifox.cn/m1/2481033-0-default/gethomeactivity',
  })
  if (res.statusCode === 200) {
    activityData.value = res.data.imgurl
    console.log(activityData.value)
  }
}
getHomeActivity()
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 100vw;
  min-height: 100vh;
}
</style>
