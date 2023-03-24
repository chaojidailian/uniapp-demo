<template>
  <view class="content">
    <comp-uni-ui-search></comp-uni-ui-search>
    <comp-swiper :data="bannerData"></comp-swiper>
    <comp-activity :data="activityData"></comp-activity>
    <comp-home-category :data="categoryData"></comp-home-category>
    <comp-home-recommend
      :data="commendData"
      ref="commendRef"
    ></comp-home-recommend>
  </view>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import compSwiper from '@/components/comp-swiper.vue'
import compActivity from '@/components/comp-activity.vue'
import compUniUiSearch from '@/components/comp-uni-ui-search.vue'
import compHomeCategory from '@/components/comp-home-category.vue'
import compHomeRecommend from '@/components/comp-recommend.vue'

defineComponent({
  components: {
    compSwiper,
    compActivity,
    compUniUiSearch,
    compHomeCategory,
    compHomeRecommend,
  },
})

const bannerData = ref<string[]>([])

const getHomeBanners = async () => {
  const res = await uni.request({
    url: 'https://mock.apifox.cn/m1/2481033-0-default/gethomebanners',
  })
  if (res.statusCode === 200) {
    bannerData.value = (<AnyObject>res.data).banners
  }
}
getHomeBanners()

const activityData = ref('')
const getHomeActivity = async () => {
  const res = await uni.request({
    url: 'https://mock.apifox.cn/m1/2481033-0-default/gethomeactivity',
  })
  if (res.statusCode === 200) {
    activityData.value = (<AnyObject>res.data).imgUrl
  }
}
getHomeActivity()

const categoryData = ref<any[]>([])
const getHomeCategory = async () => {
  const res = await uni.request({
    url: 'https://mock.apifox.cn/m1/2481033-0-default/gethomecategory',
  })
  if (res.statusCode === 200) {
    categoryData.value = (<AnyObject>res.data).categorys
  }
}
getHomeCategory()

const commendRef = ref<InstanceType<typeof compHomeRecommend>>()
const commendData = ref<any[]>([])
const getHomeCommend = async () => {
  const res = await uni.request({
    url: 'https://mock.apifox.cn/m1/2481033-0-default/gethomerecommend',
  })
  if (res.statusCode === 200) {
    const result = (<AnyObject>res.data).recommends
    commendData.value = result.map((goods: any) => {
      return {
        imgUrl: goods.imgUrl,
        goodsDescription: goods.goodsDescription,
        goodsPrice: Number(
          Number.parseFloat(String(goods.goodsPrice)).toFixed(1)
        ).toFixed(2),
        goodsCommentsLength: goods.goodsComments.length,
      }
    })
  }
}
getHomeCommend()

onReachBottom(async () => {
  if (commendRef.value) {
    commendRef.value.status = 'loading'
  }
  const res = await uni.request({
    url: 'https://mock.apifox.cn/m1/2481033-0-default/gethomerecommend',
  })
  if (res.statusCode === 200) {
    const result = (<AnyObject>res.data).recommends
    commendData.value.push(
      ...result.map((goods: any) => {
        return {
          imgUrl: goods.imgUrl,
          goodsDescription: goods.goodsDescription,
          goodsPrice: Number(
            Number.parseFloat(String(goods.goodsPrice)).toFixed(1)
          ).toFixed(2),
          goodsCommentsLength: goods.goodsComments.length,
        }
      })
    )
    if (commendRef.value) {
      commendRef.value.status = 'more'
    }
  }
})
onPullDownRefresh(() => {
  console.log('下拉刷新')
  setTimeout(() => {
    //结束下拉刷新
    uni.stopPullDownRefresh()
  }, 500)
})
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 100vw;
  min-height: 100vh;
}
</style>
