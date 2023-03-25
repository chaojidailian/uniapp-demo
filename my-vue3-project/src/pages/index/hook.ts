import { ref } from 'vue'
import {
  requestHomeList,
  requestHomeBanners,
  requestHomeActivity,
  requestHomeCategory,
  requestHomeCommend,
} from '@/api/home/home'
import type compHomeRecommend from '@/components/comp-recommend/comp-recommend.vue'

const commendRef = ref<InstanceType<typeof compHomeRecommend>>()
const commendData = ref<any[]>([])

export function getHomeList() {
  const listData = ref<any[]>([])
  requestHomeList().then((res) => {
    listData.value = <any[]>res.data
  })
  return { listData }
}

/**
 *
 * @returns 返回首页轮播图数据
 */
export function getHomeBanners() {
  const bannerData = ref<string[]>([])
  requestHomeBanners().then((res) => {
    bannerData.value = (<AnyObject>res.data).banners
  })
  return { bannerData }
}

/**
 *
 * @returns 返回首页活动图数据
 */
export function getHomeActivity() {
  const activityData = ref('')
  requestHomeActivity().then((res) => {
    activityData.value = (<AnyObject>res.data).imgUrl
  })
  return { activityData }
}

/**
 *
 * @returns 返回首页分类数据
 */
export function getHomeCategory() {
  const categoryData = ref<any[]>([])
  requestHomeCategory().then((res) => {
    categoryData.value = (<AnyObject>res.data).categorys
  })
  return { categoryData }
}

/**
 *
 * @returns 返回首页商品推荐数据和组件对象
 */
export function getHomeCommend() {
  requestHomeCommend().then((res) => {
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
  })
  return { commendData, commendRef }
}

/**
 *
 * @returns 返回上拉刷新钩子函数
 */
export function setReachBottom() {
  return function () {
    if (commendRef.value) {
      commendRef.value.status = 'loading'
    }
    requestHomeCommend().then((res) => {
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
    })
  }
}

/**
 *
 * @returns 返回下拉刷新钩子函数
 */
export function setPullDownRefresh() {
  return function () {
    console.log('下拉刷新')
    setTimeout(() => {
      //结束下拉刷新
      uni.stopPullDownRefresh()
    }, 500)
  }
}
