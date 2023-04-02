<template>
  <view class="comp-detail-like">
    <view
      class="like-count"
      :class="isLike ? 'active' : ''"
      @click="handleLikeClick"
    >
      <uni-icons type="hand-up" size="30" :color="iconsColor"></uni-icons>
      <text v-if="article.like_count">{{ article.like_count }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, ref, defineEmits,defineExpose } from 'vue'
const props = defineProps<{
  article: any
}>()
const emits = defineEmits(['increment','decrement'])

const articlesObj = uniCloud.importObject('articles-obj')
let isLike = ref<boolean>()
const iconsColor = ref('')
let timer: number

const handleLikeClick = async () => {

  // 先处理前端页面显示的样式
  isLike.value = !isLike.value
  if (isLike.value) {
    iconsColor.value = '#fff'
    emits('increment')
  } else {
    iconsColor.value = '#000'
    props.article.like_count <= 0 ? '' : emits('decrement')
  }
  
  // 防抖操作，防止用户频繁操作发送网络请求
  clearTimeout(timer)
  timer = setTimeout(async () => {
    const count = await articlesObj.getArticleLikeCount(
      props.article._id._value,
      props.article.user_id[0]._id
    )
    if (isLike.value) {
      //有记录则直接返回，不执行新增操作
      if (count.total > 0) return
      articlesObj
        .addArticleLike(props.article._id._value)
        .then(() => {
          articlesObj.operation(
            'articles',
            'like_count',
            props.article._id._value,
            1
          )
        })
        .catch((err: any) => {
          console.log(err)
        })
    } else {
      //没有记录则直接返回，不执行删除操作
      if (count.total === 0) return
      articlesObj
        .removeArticleLike(
          props.article._id._value,
          props.article.user_id[0]._id
        )
        .then(() => {
          articlesObj.operation(
            'articles',
            'like_count',
            props.article._id._value,
            -1
          )
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
  }, 1000)
}

defineExpose({
  isLike,
  iconsColor
})
</script>

<style lang="scss" scoped>
.comp-detail-like {
  width: 100%;
  display: flex;
  justify-content: center;

  .like-count {
    width: 280rpx;
    min-height: 100rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12rpx 0;
    border-radius: 100vw;
    background: #eee;
  }
  .active {
    background: $uni-color-primary;
    color: #fff;
  }
  text {
    font-size: 36rpx;
  }
}
</style>
