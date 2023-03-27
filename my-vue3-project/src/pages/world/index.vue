<template>
  <view class="world-index">
    <fui-tabs
      :tabs="list"
      :current="current"
      center
      scroll
      @change="handleTabsChange"
    ></fui-tabs>
    <view class="article">
      <view class="article-info">
        <view class="info-left">
          <fui-avatar
            src="/static/image/tabBar-personal.png"
            errorSrc="/static/image/tabBar-personal.png"
            size="small"
            shape="circle"
          ></fui-avatar>
          <text>用户名称</text>
          <uni-dateformat
            date="2023/03/20 20:20:20"
            :threshold="[60000, 3600000 * 24 * 30]"
          ></uni-dateformat>
        </view>
        <view class="info-right">
          <fui-icon name="more-fill" :size="60"></fui-icon>
        </view>
      </view>
      <view class="article-content">
        <text
          >这是一段文本文本呢北往南本文岗位反对撒飞洒发顺丰幅度萨芬撒地方
          给商店啊的说法都是发商店发商店发生发发士大夫精神的发生发第三方
          昂发都是啊发撒发撒ff范德萨范德萨分富士达范德萨分</text
        >
      </view>
      <view class="article-imgs">
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
      </view>
      <view class="article-options">
        <fui-icon name="fabulous" :size="60"></fui-icon>
        <fui-icon name="comment" :size="60"></fui-icon>
        <fui-icon name="share" :size="60"></fui-icon>
      </view>
    </view>
    <view class="article">
      <view class="article-info">
        <view class="info-left">
          <fui-avatar
            src="/static/image/tabBar-personal.png"
            errorSrc="/static/image/tabBar-personal.png"
            size="small"
            shape="circle"
          ></fui-avatar>
          <text>用户名称</text>
          <uni-dateformat
            date="2023/03/20 20:20:20"
            :threshold="[60000, 3600000 * 24 * 30]"
          ></uni-dateformat>
        </view>
        <view class="info-right">
          <fui-icon name="more-fill" :size="60"></fui-icon>
        </view>
      </view>
      <view class="article-content">
        <text
          >这是一段文本文本呢北往南本文岗位反对撒飞洒发顺丰幅度萨芬撒地方
          给商店啊的说法都是发商店发商店发生发发士大夫精神的发生发第三方
          昂发都是啊发撒发撒ff范德萨范德萨分富士达范德萨分</text
        >
      </view>
      <view class="article-imgs">
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
        <image
          src="/static/image/tabBar-personal.png"
          mode="aspectFill"
        ></image>
      </view>
      <view class="article-options">
        <fui-icon name="fabulous" :size="60"></fui-icon>
        <fui-icon name="comment" :size="60"></fui-icon>
        <fui-icon name="share" :size="60"></fui-icon>
      </view>
    </view>
    <view class="article-edit" ref="editRef">
      <view class="edit" @click="handleEditClick">
        <fui-icon name="edit" :size="80"></fui-icon>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const current = ref(0)
const list = ['推荐', '热门']
const handleTabsChange = (e: any) => {
  current.value = e.index
  console.log(e, current.value)
}
const editRef = ref()
const handleEditClick = () => {
  uni.navigateTo({
    url: '/pages/world/page-edit',
  })
}
</script>

<style lang="scss" scoped>
.world-index {
  background: #ccc;
  position: relative;
  .article {
    background: #fff;
    border-radius: $uni-border-radius-base;
    box-shadow: 2px 2px 5px #999;
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
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 36rpx;
      margin: {
        top: 12rpx;
        bottom: 24rpx;
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
      background: #ccc;
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
