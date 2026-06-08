<template>
  <swiper class="banner" :indicator-dots="true" :circular="true">
    <swiper-item v-for="item in pictures" :key="item.id">
      <image @tap="onPreviewImage(item.url)" :src="item.url"></image>
    </swiper-item>
  </swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const pictures = ref([
  {
    id: '1',
    url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_1.jpg',
  },
  {
    id: '2',
    url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_2.jpg',
  },
  {
    id: '3',
    url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_3.jpg',
  },
  {
    id: '4',
    url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_4.jpg',
  },
  {
    id: '5',
    url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_5.jpg',
  },
])
const onPreviewImage = (url: string) => {
  uni.previewImage({
    urls: pictures.value.map((v) => v.url),
    current: url,
  })
}
</script>

<style>
.banner,
.banner image {
  width: 750rpx;
  height: 750rpx;
}
</style>
