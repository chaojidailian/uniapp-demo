<template>
  <view class="comp-article">
    <view class="article-info">
      <view class="info-left">
        <fui-avatar
          :src="userAvatarUrl"
          errorSrc="@/static/image/tabBar-personal-s.png"
          size="small"
          shape="circle"
        ></fui-avatar>
        <view class="info-detail">
          <view class="username"
            ><text>{{ userName }}</text></view
          >
          <view class="time-address">
            <uni-dateformat
              format="yyyy/MM/dd"
              :date="article.last_modify_date"
              :threshold="[60000, 3600000 * 24 * 30]"
            ></uni-dateformat>
            <text>发布于 {{ article.publish_address }}</text></view
          >
        </view>
      </view>
      <view class="info-right">
        <fui-icon name="more-fill" :size="60"></fui-icon>
      </view>
    </view>
    <view class="article-content">
      <text class="article-title" @click="handleArticleClick">{{ article.title }}</text>
      <text class="article-abstract"  @click="handleArticleClick">{{ article.abstract }}</text>
    </view>
    <view class="article-imgs">
      <template v-for="(img, index) in article.cover" :key="img">
        <image
          :src="img"
          mode="aspectFill"
          @click="handleImgClick(index)"
        ></image>
      </template>
    </view>
    <view class="article-options">
      <view
        ><fui-icon name="fabulous" :size="60"></fui-icon
        ><text>{{ likeCount }}</text></view
      >
      <view
        ><fui-icon name="comment" :size="60"></fui-icon
        ><text>{{ commentCount }}</text></view
      >
      <view><fui-icon name="share" :size="60"></fui-icon>转发</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
const props = defineProps<{
  article: any
}>()

const userAvatarUrl = computed(() => {
  return `${props.article.user_id[0].avatar_file.url}${props.article.user_id[0].avatar_file.extname}`
})
const userName = computed(() => {
  return props.article.user_id[0].nickname || props.article.user_id[0].username
})
const likeCount = computed(() => {
  return props.article.like_count ? props.article.like_count : '点赞'
})
const commentCount = computed(() => {
  return props.article.comment_count ? props.article.comment_count : '评论'
})
const articleId = computed(() => props.article._id)

const handleImgClick = (index: number) => {
  uni
    .previewImage({
      current: index,
      urls: props.article.cover,
    })
    .catch(() => {
      uni.showToast({
        title: '出错了',
      })
      setTimeout(() => {
        uni.hideToast()
      }, 500)
    })
}

const handleArticleClick = () => {
  uni.navigateTo({
    url: `/pages/world/page-article-detail?id=${articleId.value}`
  })
}
</script>

<style lang="scss" scoped>
.comp-article {
  background: #fff;
  border-radius: $uni-border-radius-base;
  box-shadow: 2px 2px 5px #ccc;
  padding: 36rpx;
  margin: 8rpx;
  margin-bottom: 18rpx;
  &:last-child {
    margin-bottom: 0;
  }
  .article-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info-left {
      display: flex;
      align-items: flex-start;

      .info-detail {
        display: flex;
        flex-direction: column;
        margin-left: 20rpx;
        .username {
          font-size: 32rpx;
          color: #000;
        }
        .time-address {
          display: flex;
          align-items: center;
          color: #666;
          font-size: 24rpx;
          text {
            margin-left: 24rpx;
          }
        }
      }
    }
  }
  .article-content {
    margin: {
      top: 12rpx;
      bottom: 24rpx;
    }
    .article-title {
      font-size: 38rpx;
      font-weight: 600;
    }
    .article-abstract {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 36rpx;
    }
  }
  .article-imgs {
    // display: grid;
    // grid-template-columns: repeat(3, 1fr);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8rpx;
    margin-bottom: 36rpx;
    image {
      width: calc((100vw - 104rpx) / 3);
      height: calc((100vw - 104rpx) / 3);
      border-radius: $uni-border-radius-lg;
    }
  }
  .article-options {
    display: flex;
    justify-content: space-around;
    align-items: center;
    view {
      display: flex;
      align-items: center;
    }
  }
}
</style>
