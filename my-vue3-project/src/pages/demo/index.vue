<template>
  <view class="demo">
    <view v-for="item in data" :key="item._id">
      <text>{{ item.imgUrl }}</text>
      <text>{{ item.path }}</text>
      <text>--------------------------</text>
    </view>
    <view class="form-goods">
      <form>
        <label for="imgUrl"
          >商品url
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            v-model="formData.imgUrl"
            placeholder="请输入商品imgUrl"
          />
        </label>
        <label for="title"
          >商品标题
          <input
            type="text"
            id="title"
            name="title"
            v-model="formData.title"
            placeholder="请输入商品imgUrl"
          />
        </label>
        <label for="price"
          >商品价格
          <input
            type="number"
            id="price"
            name="price"
            v-model="formData.price"
            placeholder="请输入商品imgUrl"
          />
        </label>
        <label for="path"
          >商品路径
          <input
            type="text"
            id="path"
            name="path"
            v-model="formData.path"
            placeholder="请输入商品imgUrl"
          />
        </label>
        <button @click="resetForm">重置</button>
        <button @click="submitForm">提交</button>
      </form>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { onShow } from '@dcloudio/uni-app'
const data = ref<any[]>([])
let formData = reactive({
  imgUrl: '',
  title: '',
  price: '',
  path: '',
})

const resetForm = () => {
  formData = reactive({ imgUrl: '', title: '', price: '', path: '' })
  console.log('重置数据')
}
const submitForm = () => {
  console.log(formData)
  console.log("提交数据")
}

onShow(() => {
  uniCloud
    .callFunction({
      name: 'banners-get',
    })
    .then((res) => {
      console.log(res)
      data.value = res.result.data
    })
})
</script>

<style scoped></style>
