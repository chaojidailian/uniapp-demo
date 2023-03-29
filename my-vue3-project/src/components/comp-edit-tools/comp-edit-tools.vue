<template>
  <view class="comp-edit-tools">
    <view class="item"
      ><fui-icon
        custom-prefix="iconfont"
        name="icon-xingzhuang-wenzi"
        :size="46"
        @click="handleWenZiClick"
      ></fui-icon
    ></view>
    <view class="item"
      ><fui-icon
        custom-prefix="iconfont"
        name="icon-charutupian"
        :size="46"
        @click="handleImgClick"
      ></fui-icon
    ></view>
    <view class="item"
      ><fui-icon
        custom-prefix="iconfont"
        name="icon-shangyibu"
        :size="46"
        @click="handleUndoClick"
      ></fui-icon
    ></view>
    <view class="item"
      ><fui-icon
        custom-prefix="iconfont"
        name="icon-xiayibu"
        :size="46"
        @click="handleRedoClick"
      ></fui-icon
    ></view>
    <view class="item"
      ><fui-icon
        custom-prefix="iconfont"
        name="icon-shanchusekuai"
        :size="46"
        @click="handleClearClick"
      ></fui-icon
    ></view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps<{
  edit: any
}>()

// 向富文本框中增加一行文本
const handleWenZiClick = () => {
  console.log('ref',props.edit)
  props.edit.editRef.insertText()
}
// 向富文本框中添加图片
const handleImgClick = () => {
  props.edit.editRef.insertImg()
}
// 撤销上一次在富文本框中的操作
const handleUndoClick = () => {
  props.edit.editRef.undo()
}
// 恢复上一次在富文本框中的操作
const handleRedoClick = () => {
  props.edit.editRef.redo()
}
// 清空富文本框中的内容
const handleClearClick = () => {
  props.edit.editRef.clear()
}
</script>

<style lang="scss" scoped>
.comp-edit-tools {
  width: 100%;
  height: 80rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  border-bottom: 1rpx solid #bcbcbc;
}
</style>
