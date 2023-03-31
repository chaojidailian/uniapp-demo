<template>
  <view class="world-index">
    <fui-tabs
      :tabs="list"
      :current="current"
      center
      scroll
      @change="handleTabsChange"
    ></fui-tabs>
    <template v-for="article in articles" :key="article._id">
      <comp-article :article="article"></comp-article>
    </template>
    <view class="article-edit">
      <view class="edit" @click="handleEditClick">
        <fui-icon name="edit" :size="80"></fui-icon>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const current = ref(0)
const list = ['推荐', '热门']
const handleTabsChange = (e: any) => {
  current.value = e.index
  console.log(e, current.value)
}

const handleEditClick = () => {
  uni.navigateTo({
    url: '/pages/world/page-edit',
  })
}
const db = uniCloud.database()
const articles = ref<any[]>([])
onLoad(async () => {
  const artTab = db
    .collection('opendb-news-articles')
    .field(
      '_id,user_id,view_count,like_count,comment_count,last_modify_date,title,abstract,cover,publish_address'
    )
    .getTemp()
  const userTab = db
    .collection('uni-id-users')
    .field('_id,username,nickname,avatar_file')
    .getTemp()
  const res = await db.collection(artTab, userTab).get()
  articles.value = res.result.data
})
</script>

<style lang="scss" scoped>
.world-index {
  background: #eee;
  position: relative;
  .article {
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
        align-items: center;

        text {
          display: inline-block;
          background: blue;
          margin: {
            left: 10rpx;
            right: 30rpx;
          }
        }
      }
    }
    .article-content {
      margin: {
        top: 12rpx;
        bottom: 24rpx;
      }
      h2 {
        font-size: 54rpx;
      }
      text {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        font-size: 36rpx;
      }
    }
    .article-imgs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8rpx;
      margin-bottom: 36rpx;
      image {
        width: calc((100vw - 104rpx) / 3);
        height: calc((100vw - 104rpx) / 3);

        background: red;
        border-radius: $uni-border-radius-lg;
      }
    }
    .article-options {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  .article-edit {
    position: fixed;
    bottom: 100rpx;
    right: 40rpx;
    .edit {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #465cff;
      border-radius: $uni-border-radius-circle;
      opacity: 0.5;
    }
  }
}
</style>
