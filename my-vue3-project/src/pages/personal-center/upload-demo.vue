<template>
  <view class="demo">
    <view class="box" v-for="(img, index) in imgs" :key="img">
      <image :src="img" mode="aspectFil" @click="handleImgClick(index)"></image>
      <text @click="handleDeleteImagClick(index)">X</text>
    </view>
    <view class="add" @click="handleAddImgClick" v-if="imgs.length < 9">+</view>
    <button @click="handleUploadImg">上传图片</button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imgs = ref<string[]>([])
const handleAddImgClick = () => {
  uni.chooseImage().then((res) => {
    typeof res.tempFilePaths === 'string'
      ? imgs.value.push(res.tempFilePaths)
      : imgs.value.push(...res.tempFilePaths)
    imgs.value = imgs.value.slice(0, 9)
  })
}
const handleDeleteImagClick = (index: number) => {
  imgs.value.splice(index, 1)
}
const handleImgClick = (index: number) => {
  uni.previewImage({
    current: index,
    urls: imgs.value,
  })
}
const handleUploadImg = () => {
  let result = []
  for (let i = 0; i < imgs.value.length; i++) {
    result.push(upload(imgs.value[i]))
  }
  Promise.all(result).then((res) => {
    console.log('上传结果', res)
  })
}
const upload = async (imgUrl: string) => {
  console.log(imgUrl)
  console.log('类型', typeof imgUrl)
  return await uniCloud.uploadFile({
    filePath: imgUrl,
    cloudPath: '项目上传文件-' + Date.now() + getFileExt(imgUrl),
  })
}
const getFileExt = (fileName: string) => {
  return fileName.lastIndexOf('.') !== -1
    ? fileName.slice(fileName.lastIndexOf('.'))
    : ''
}
</script>

<style lang="scss" scoped>
.demo {
  padding: 30rpx;
  gap: 15rpx;
  display: flex;
  flex-wrap: wrap;
  @mixin box {
    width: 200rpx;
    height: 200rpx;
    background: #eee;
  }
  .box {
    @include box;
    position: relative;
    image {
      width: 100%;
      height: 100%;
    }
    text {
      width: 42rpx;
      height: 42rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 12rpx;
      right: 12rpx;
      background: #999;
      opacity: 0.8;
      border-radius: 50%;
    }
  }
  .add {
    @include box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80rpx;
  }
}
</style>
