<template>
  <view class="page-article-detail">
    <comp-detail-title :title="article.title"></comp-detail-title>
    <comp-detail-author :article="article"></comp-detail-author>
    <comp-detail-content ref="contentRef"></comp-detail-content>
    <comp-detail-like
      :article="article"
      @increment="addCount"
      @decrement="subCount"
      ref="likeRef"
    ></comp-detail-like>
    <view class="article-like-users"> 点赞该文章的用户头像 </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const articlesObj = uniCloud.importObject('articles-obj')
const article = ref()
const contentRef = ref()
const likeRef = ref()

onLoad(async (e) => {
  if (e?.id) {
    const res = await articlesObj.getArticle(e.id)
    article.value = res.data[0]

    setTimeout(() => {
      contentRef.value.mpHtmlRef.setContent(article.value.content)
      if (article.value._id['article-likes']?.length) {
        likeRef.value.isLike = true
        likeRef.value.iconsColor = '#fff'
      } else {
        likeRef.value.isLike = false
        likeRef.value.iconsColor = '#000'
      }
    }, 1000)

    articlesObj.operation('articles', 'view_count', e.id, 12)
  }
})

const addCount = () => {
  article.value.like_count++
}
const subCount = () => {
  article.value.like_count--
}
</script>

<style lang="scss" scoped>
.page-article-detail {
  padding: 12rpx;
}
</style>
