<template>
  <view class="comp-edit">
    <mp-html ref="editRef" :content="html" :editable="true" />
  </view>
</template>

<script lang="ts" setup>
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
import { defineComponent, ref, onMounted } from 'vue'
import getFileExt from '@/utils/getFileExt'
defineComponent({
  mpHtml,
})
const html = ref('')
const cover = ref<string[]>([])
const editRef = ref()
onMounted(() => {
  // mp-html获取文件类型的操作，这里只对图片进行操作
  editRef.value.getSrc = () => {
    return new Promise((resolve, reject) => {
      uni
        .chooseImage()
        .then(async (res) => {
          uni.showLoading({
            title: '加载中...',
          })
          // 选择多张图片
          if (Array.isArray(res.tempFilePaths)) {
            let promiseResult = []
            for (let i = 0; i < res.tempFilePaths.length; i++) {
              const temUrl = res.tempFilePaths[i]
              const result = await uniCloud.uploadFile({
                filePath: temUrl,
                cloudPath: `文章图片-${Date.now()}-${getFileExt(temUrl)}`,
              })
              promiseResult.push(result)
            }
            Promise.all(promiseResult).then((res) => {
              resolve(
                res.map((item) => {
                  cover.value.push(item.fileID)
                  return item.fileID
                })
              )
            })
            // 只选择一张图片
          } else if (typeof res.tempFilePaths === 'string') {
            uniCloud
              .uploadFile({
                filePath: res.tempFilePaths,
                cloudPath: `文章图片-${Date.now()}-${getFileExt(
                  res.tempFilePaths
                )}`,
              })
              .then((res) => {
                resolve(res.fileID)
              })
          }
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          uni.hideLoading()
        })
    })
  }
})

defineExpose({
  editRef,
  cover,
})
</script>

<style lang="scss" scoped>
.comp-edit {
  height: calc(100vh - 300rpx);
  margin-top: 18rpx;
  padding: 8rpx;
  border: 3rpx solid #ddd;
}
</style>
