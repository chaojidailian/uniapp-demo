<template>
  <view class="page-article-detail">
    <view class="article-title">
      <text>{{ article && article.title }}</text>
    </view>
    <view class="article-author">
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
    <view class="article-content">
      <mp-html ref="mpHtmlRef" container-style="padding: 5px;"
        >加载中...</mp-html
      >
    </view>
    <view class="article-like-button">
      <view
        class="like-count"
        :class="isLike ? 'active' : ''"
        @click="handleLikeClick"
      >
        <uni-icons type="hand-up" size="30" :color="iconsColor"></uni-icons>
        <text v-if="article.like_count">{{ article.like_count }}</text>
      </view>
    </view>
    <view class="article-like-users"> 点赞该文章的用户头像 </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, defineComponent, nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
defineComponent({
  mpHtml,
})

const article = ref()
const mpHtmlRef = ref()
const db = uniCloud.database()
const articlesObj = uniCloud.importObject('articles-obj')
onLoad((e) => {
  if (e?.id) {
    const artTemp = db
      .collection('opendb-news-articles')
      .where({
        _id: e.id,
      })
      .getTemp()
    const userTemp = db
      .collection('uni-id-users')
      .field('_id,nickname,username,avatar_file')
      .getTemp()
    const likeTemp = db.collection('article-likes').getTemp()
    db.collection(artTemp, userTemp, likeTemp)
      .get()
      .then((res) => {
        article.value = res.result.data[0]
        console.log(article.value._id['article-likes'], '长度')
        isLike.value = article.value._id['article-likes']?.length ? true : false
        console.log('赞', isLike.value)
        console.log('文章a', article.value)
        articlesObj
          .operation('opendb-news-articles', 'view_count', e.id, 12)
          .then((res: any) => {
            console.log('阅读量', res)
          })
        setTimeout(() => {
          mpHtmlRef.value.setContent(article.value.content)
        }, 1000)
      })
  }
})

let isLike = ref(false)
const iconsColor = ref('#000')
const handleLikeClick = async () => {
  //使用防抖，记录最后一个点击状态，页面也进行动态显示，后台先不发数据
  const tempLike = isLike.value
  if(isLike.value) {
    article.value.like_count <= 0 ? '' : article.value.like_count--
  }else {
    article.value.like_count++
  }

  isLike.value = !isLike.value
  if (isLike.value) {
    iconsColor.value = '#fff'
  } else {
    iconsColor.value = '#000'
  }
  const count = await db
    .collection('article-likes')
    .where({
      article_id: article.value._id._value,
      user_id: article.value.user_id[0]._id,
    })
    .count()
  console.log('点赞了吗', count)
  if (count.result.total) {
    db.collection('article-likes')
      .where({
        article_id: article.value._id._value,
        user_id: article.value.user_id[0]._id,
      })
      .remove()
    articlesObj.operation(
      'opendb-news-articles',
      'like_count',
      article.value._id._value,
      -1
    )
  } else {
    db.collection('article-likes').add({
      article_id: article.value._id._value,
    })
    articlesObj.operation(
      'opendb-news-articles',
      'like_count',
      article.value._id._value,
      1
    )
  }
}
</script>

<style lang="scss" scoped>
.page-article-detail {
  padding: 12rpx;
  .article-title {
    font-size: 50rpx;
    font-weight: 550;
    margin-bottom: 20rpx;
  }
  .article-author {
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
  .article-content {
  }
  .article-like-button {
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
}
</style>
