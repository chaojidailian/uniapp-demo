<template>
  <view class="comp-swiper">
    <swiper
      circular
      class="swiper"
      :indicator-dots="options.indicatorDots"
      :autoplay="options.autoplay"
      :interval="options.interval"
      :duration="options.duration"
      :current="current"
    >
      <swiper-item
        v-for="(banner, index) in banners"
        :key="index"
        class="swiper-item"
      >
        <image
          class="swiper-image"
          :src="banner"
          mode="heightFix"
          @click="gotoPages(banner)"
        ></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref, watchEffect } from 'vue'

interface SwiperProps {
  /** 是否显示面板指示点 */
  indicatorDots?: boolean
  /** 指示点颜色 */
  indicatorColor?: string
  /** 当前选中的指示点颜色 */
  indicatorActiveColor?: string
  /** 可见时的 class */
  activeClass?: string
  /** acceleration 设置为 true 时且处于滑动过程中，中间若干屏处于可见时的class */
  changingClass?: string
  /** 是否自动切换 */
  autoplay?: boolean
  /** 当前所在滑块的 index */
  current?: number
  /** 当前所在滑块的 item-id ，不能与 current 被同时指定*/
  currentItemId?: string
  /** 自动切换时间间隔*/
  interval?: number
  /** 滑动动画时长*/
  duration?: number
  /** 是否采用衔接滑动*/
  circular?: boolean
  /** 滑动方向是否为纵向*/
  vertical?: boolean
  /** 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值*/
  previousMargin?: string | number
  nextMargin?: string | number
  acceleration?: boolean
  disableProgrammaticAnimation?: boolean
  displayMultipleItems?: number
  skipHiddenItemLayout?: boolean
}

const props = withDefaults(
  defineProps<{
    options?: SwiperProps
    data: any[]
  }>(),
  {
    options: {
      indicatorDots: true,
      autoplay: true,
      duration: 500,
      interval: 2000,
      indicatorActiveColor: '#ffffff',
    },
  }
)

const banners = ref<string[]>([])
watchEffect(() => {
  banners.value = props.data
})

const current = ref(0)

const gotoPages = (banner: any) => {
  console.log(banner)
}
</script>

<style lang="scss" scoped>
.comp-swiper {
  min-width: 100vw;
  background: $uni-color-success;
}
.swiper-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.swiper-image {
  height: 260rpx;
  border-radius: 20px;
}
</style>
