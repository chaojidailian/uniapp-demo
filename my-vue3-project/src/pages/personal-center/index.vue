<template>
  <view class="personal-center">
    <button @click="handleProfileClick">个人信息</button>
    <button @click="handleLoginClick">登录页</button>
    <button @click="handleLogoutClick">退出登录</button>
    <button @click="handleFileUpClick">手动上传文件</button>
  </view>
</template>

<script lang="ts" setup>
import {mutations} from '@/uni_modules/uni-id-pages/common/store'


const handleLoginClick = () => {
  uni.navigateTo({ url: '/uni_modules/uni-id-pages/pages/login/login-withpwd' })
}
const handleLogoutClick = () => {
  mutations.logout()
}
const handleProfileClick = () => {
  uni.navigateTo({url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo'})
}
const handleFileUpClick = () => {
  uni.navigateTo({url: '/pages/personal-center/demo'})
}
</script>

<style lang="scss" scoped></style>
