<template>
  <view class="comp-home-category">
    <template v-for="category in categoryData" :key="category.name">
      <view class="category-item">
        <view class="category-img-wrap">
          <image
            class="category-img"
            :src="category.imgUrl"
            @click="handleImageClick(category)"
          ></image>
        </view>
        <text class="category-name">{{ category.name }}</text>
      </view>
    </template>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'

interface ICategory {
  name: string
  imgUrl: string
}

const props = defineProps<{
  data: ICategory[]
}>()

const categoryData = computed(() => props.data)

const handleImageClick = (category: ICategory) => {
  console.log(category)
}
</script>

<style lang="scss" scoped>
.comp-home-category {
  min-width: 100vw;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  row-gap: 10px;
  box-sizing:border-box;
  padding: 8px 16px;
  background: $uni-color-title;
  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .category-img-wrap {
      width: 100rpx;
      height: 100rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background: $uni-color-paragraph;
      border-radius: 50%;
      aspect-ratio: 1 / 1;

      .category-img {
        width: 40px;
        height: 40px;
      }
    }
    .category-name {
      margin-top: 4px;
      font-size: 24rpx;
    }
  }
}
</style>
