<template>
  <view class="personal-center">
    <view class="user-info">
      <!-- <uni-list>
        <uni-list-item showArrow>
          <template #header>
            <image
              src="@/static/image/tabBar-personal-s.png"
              mode="scaleToFill"
            />
          </template>
          <template #body>
            <view class="name">
              <text>姓名</text>
            </view>
          </template>
        </uni-list-item>
      </uni-list> -->
    </view>
    <view class="user-other">
      <view class="article-sum"></view>
      <view class="my-pick-comment">
        <comp-uni-list :config="pickConfig" @item-click="handleItemClick"></comp-uni-list>
      </view>
      <view class="options">
        <comp-uni-list :config="optionsConfig" @item-click="handleItemClick"></comp-uni-list>
      </view>
      <view class="logout">
        <comp-uni-list :config="logoutConfig" @item-click="handleItemClick"></comp-uni-list>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { mutations } from '@/uni_modules/uni-id-pages/common/store'
import type { IConfig } from '@/components/comp-uni-list/types'

const pickConfig = [
  { title: '我的长文', iconType: 'compose', iconSize: 30 },
  { title: '我的点赞', iconType: 'hand-up', iconSize: 30 },
  { title: '评论过的', iconType: 'chat', iconSize: 30 },
]
const optionsConfig = [
  { title: '关于', iconType: 'settings-filled', iconSize: 30 },
  { title: '意见反馈', iconType: 'chatbubble', iconSize: 30 },
]
const logoutConfig = [  { title: '退出登录', iconType: 'closeempty', iconSize: 30 }]

const handleItemClick = (item: IConfig) => {
  console.log('item', item)
}

const handleLoginClick = () => {
  uni.navigateTo({ url: '/uni_modules/uni-id-pages/pages/login/login-withpwd' })
}
const handleLogoutClick = () => {
  mutations.logout()
}
const handleProfileClick = () => {
  uni.navigateTo({ url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo' })
}
const handleFileUpClick = () => {
  uni.navigateTo({ url: '/pages/personal-center/demo' })
}
</script>

<style lang="scss" scoped>
.personal-center {
  min-height: 100vh;
  padding: 0 12rpx;
  background: #eee;

}
</style>
