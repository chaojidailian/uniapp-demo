<template>
  <view class="comp-cart-goods-item">
    <view class="goods-left">
      <radio @change="handleRadioChange" :checked="false"></radio>
      <image class="goods-img"></image>
    </view>
    <view class="goods-right">
      <view class="goods-info">
        <text>商品信息</text>
        <view @click="btnCLick">上弹出来的选择框</view>
        <view>优惠信息</view>
        <view>
          <text>￥100.00</text>
          <view>
            <text>-</text>
            <input type="number" />
            <text>+</text>
          </view>
        </view>
      </view>
    </view>
    <view class="tete"></view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
const props = defineProps<{
  data?: any
}>()

const goodsData = computed(() => props.data)

const handleRadioChange = () => {}
const btnCLick = () => {
  uni.showActionSheet({
    itemList: ['A', 'B', 'C'],
    success: function (res) {
      console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
    },
    fail: function (res) {
      console.log(res.errMsg)
    },
  })
}
</script>

<style lang="scss" scoped>
.comp-cart-goods-item {
  min-width: 100vw;
  min-height: 300rpx;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  .goods-left {
    display: flex;
    align-items: center;
    margin-left: 12px;
    .goods-img {
      width: 240rpx;
      height: 240rpx;
      margin: 0 8px;
      border-radius: 10px;
      background: red;
    }
  }
  .goods-right {
    flex: 1;
    display: flex;

    .goods-info {
    }
  }

  .tete {
    display: none;
    position: fixed;
    bottom: var(--window-bottom);
    width: 100vw;
    height: 350px;
    background: red;
    border: 2px solid blue;
  }
}
</style>
