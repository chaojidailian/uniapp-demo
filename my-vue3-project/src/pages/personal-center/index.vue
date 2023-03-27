<template>
  <view class="personal-center">
    <button @click="handleProfileClick">个人信息</button>
    <button @click="handleLoginClick">登录页</button>
  </view>
</template>

<script lang="ts" setup>
const handleLoginClick = () => {
  uni.navigateTo({ url: '/uni_modules/uni-id-pages/pages/login/login-withpwd' })
}
const handleProfileClick = () => {
  uni.navigateTo({url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo'})
}
</script>

<style lang="scss" scoped></style>
