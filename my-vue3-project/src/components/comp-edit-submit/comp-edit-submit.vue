<template>
  <view class="comp-edit-submit">
    <fui-button
      class="submitBtn"
      :disabled="!title"
      @click="handleAddArticleClick"
      >发表文章</fui-button
    >
  </view>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import getipToAddress from '@/utils/getipToAddress'
const props = defineProps<{
  edit: any
  title: string
}>()

const db = uniCloud.database()
// 点击发表文章按钮事件
const handleAddArticleClick = async () => {
  const title = props.title
  const abstract = props.edit.editRef.getText()
  const content = props.edit.editRef.getContent()
  const cover = props.edit.cover.slice(0,3)
  const result = await getipToAddress()
  const address = (<AnyObject>result.data).province
  console.log('值', abstract, content, address)
  uni.showLoading({
    title: '发布中...'
  })
  db.collection('articles').add({
    title,
    abstract,
    cover,
    content,
    publish_address: address
  }).then(() => {
    uni.showLoading({
      title: '发布成功'
    })
    setTimeout(() => {
      uni.hideLoading()
    }, 500);
  }).catch(() => {
    uni.showLoading({
      title: '发布失败'
    })
    setTimeout(() => {
      uni.hideLoading()
    }, 500);
  })
}
</script>

<style lang="scss" scoped>
.submitBtn {
  width: 100%;
  display: inline-block;
  margin-bottom: 18rpx;
}
</style>
