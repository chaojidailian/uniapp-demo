<template>
  <view class="comp-recommend">
    <view class="goods-title">
      <text
        >+++++++++++++&nbsp;&nbsp;&nbsp;&nbsp;推荐商品&nbsp;&nbsp;&nbsp;&nbsp;+++++++++++++</text
      >
    </view>
    <view class="goods-wrap">
      <template v-for="goods in recommendData" :key="goods.goodsDescription">
        <view class="goods">
          <view class="goods-img-wrap">
            <image class="goods-img" :src="goods.imgUrl"></image>
          </view>
          <view class="goods-other">
            <view class="goods-desc">
              <text>{{ goods.goodsDescription }}</text>
            </view>

            <view class="goods-price"
              ><text style="font-size: 10px">￥</text
              >{{ goods.goodsPrice }}</view
            >
            <view class="goods-comments-length"
              >{{ goods.goodsCommentsLength }}条评价</view
            >
          </view>
        </view>
      </template>
    </view>
    <uni-load-more :status="status" color="#123456"></uni-load-more>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, defineExpose, computed, ref } from 'vue'
const props = defineProps<{
  data: any
}>()

const recommendData = computed(() => props.data)

const status = ref<'more' | 'loading' | 'noMore'>('more')

defineExpose({
  status
})
</script>

<style lang="scss" scoped>
.comp-recommend {
  min-width: 100vw;
  height: auto;
  background: $uni-text-color-placeholder;
  .goods-title {
    min-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
    font-size: 24rpx;
    font-weight: 600;
    color: $uni-color-warning;
  }
  .goods-wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
    column-gap: 10px;
    row-gap: 20px;
    padding: 20rpx;

    .goods {
      border-radius: $uni-border-radius-lg;
      background: $uni-text-color-grey;
      overflow: hidden;
    }

    .goods-img-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      .goods-img {
        width: 100%;
        height: 360rpx;
      }
    }

    .goods-other {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 6px;
      .goods-desc {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-weight: 550;
        padding-right: 1px;
      }
      .goods-price {
        margin: 5px 0;
        color: $uni-color-error;
        font-size: $uni-font-size-lg;
      }
      .goods-comments-length {
        margin: 5px 0;
        color: $uni-text-color-disable;
        font-size: $uni-font-size-base;
      }
    }
  }
}
</style>
