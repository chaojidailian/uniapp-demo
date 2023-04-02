<template>
  <view class="comp-detail-author">
    <view class="author-avatar">
      <image
        v-if="article.user_id[0]?.avatarfile"
        :src="
          article.user_id[0].avatarfile &&
          article.user_id[0].avatarfile.url +
            article.user_id[0].avatarfile.extname
        "
      ></image>
      <image
        v-else
        src="@/static/image/tabBar-personal-s.png"
        mode="scaleToFill"
      />
    </view>
    <view class="author-info">
      <view class="author-name">{{
        article.user_id[0].nickname ?? article.user_id[0].username
      }}</view>
      <view class="article-time">
        <uni-dateformat
          :date="article.last_modify_date"
          :threshold="[60000, 3600000 * 24 * 30]"
          format="yyyy/MM/dd hh:mm"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps<{
  article: any
}>()
</script>

<style lang="scss" scoped>
.comp-detail-author {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  .author-avatar {
    margin-right: 20rpx;
    image {
      width: 46rpx;
      height: 46rpx;
      border-radius: 50%;
    }
  }
  .author-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .author-name {
      font-size: 38rpx;
    }
    .article-time {
      font-size: 28rpx;
      color: #333;
    }
  }
}
</style>
