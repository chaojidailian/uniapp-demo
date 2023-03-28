<template>
  <view class="page-edit">
    <fui-button class="submitBtn" @click="handleAddArticleClick"
      >发表文章</fui-button
    >
    <view>
      <fui-input
        v-model="formData.title"
        label="标题"
        :bottomLeft="0"
        placeholder="请输入文章标题"
        color="#000"
        inputBorder
        required
        clearable
      ></fui-input>
    </view>
    <view class="edit-tools">
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
    <view></view>
    <view class="edit-view">
      <mp-html ref="editRef" :content="formData.html" :editable="true" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
import { defineComponent, reactive, ref, onMounted } from 'vue'
import getFileExt from '@/utils/getFileExt'
defineComponent({
  mpHtml,
})
const formData = reactive({
  title: '',
  html: '',
})
const db = uniCloud.database()
// 上传文章后的操作
const handleAddArticleClick = () => {
  // db.collection('articles')
  //   .add({
  //     title: '测试文章4',
  //     content: `枣树，他们简直落尽了叶子。先前，还有一两个孩子来了他们别人打剩的枣子，现在是一个也不剩了，连叶子也落尽了，他知道小粉红花的梦，秋后要有春；他也知道落叶的梦，春后还是秋。他简直落尽叶子，单剩干子，然而脱了当初满树是果实和叶子时候的弧形，欠伸得很舒服。但是，有几枝还低亚着，护定他从打枣的竿梢所得的皮伤，而最直最长的几枝，却已默默地铁似的直刺着奇怪而高的天空，使天空闪闪地鬼陕眼；直刺着天空中圆满的月亮，使月亮窘得发白。`,
  //   })
  //   .then((res) => {
  //     console.log(res)
  //   })

  const content = editRef.value.getContent()
  fullContent(content)
}
const editRef = ref()
onMounted(() => {
  // mp-html获取文件类型的操作，这里只对图片进行操作
  editRef.value.getSrc = () => {
    return new Promise((resolve, reject) => {
      uni
        .chooseImage()
        .then((res) => {
          resolve(res.tempFilePaths)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
})

// 富文本：插入文字工具栏
const handleWenZiClick = () => {
  editRef.value.insertText()
}
// 富文本：插入图片工具栏
const handleImgClick = () => {
  editRef.value.insertImg()
}
// 富文本：撤销工具栏
const handleUndoClick = () => {
  editRef.value.undo()
}
// 富文本：重做工具栏
const handleRedoClick = () => {
  editRef.value.redo()
}
// 富文本：清空工具栏
const handleClearClick = () => {
  editRef.value.clear()
}
// 工具函数：匹配所有的图片src，上传并做替换
const fullContent = (text: string) => {
  const imgReg = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi
  let result: any
  result = replaceImgUrl(text, imgReg)
  console.log('result', result)
  return ''
}

const replaceImgUrl = (text: string, reg: string | RegExp) => {
  return text.replace(reg, async (match, p1) => {
    const result = await uniCloud
      .uploadFile({
        filePath: p1.trim(),
        cloudPath: `文章图片-${Date.now()}${getFileExt(p1)}`,
      })
      .then((res) => {
        return res.fileID
      })
    return result
  })
}

// http://tmp/kJkEnGTjaS8i5ccf338d0a1b6bc77349a55691dac3a6.png
</script>

<style lang="scss" scoped>
.page-edit {
  padding: 36rpx;

  .submitBtn {
    width: 100%;
    display: inline-block;
    margin-bottom: 18rpx;
  }

  .edit-tools {
    width: 100%;
    height: 80rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    border-bottom: 1rpx solid #bcbcbc;
    .icon {
      font-size: 36rpx;
      color: #333;
      &:active {
        color: #0199fe;
      }
    }
  }
  .edit-view {
    height: calc(100vh - 300rpx);
    margin-top: 36rpx;
    padding: 8rpx;
  }
}
</style>
