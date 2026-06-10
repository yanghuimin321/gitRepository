<template>
  <!-- 自定义导航栏 -->
  <custom-navbar></custom-navbar>
  <!-- 滚动view，下拉刷新页面数据，上拉更新“猜你喜欢”数据 -->
  <scroll-view
    scroll-y
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    @scrolltolower="onScrolltolower"
    :refresher-triggered="isTriggered"
    class="scroll-view"
  >
    <!-- 骨架屏（界面等待请求展示） -->
    <page-skeleton v-if="loading"></page-skeleton>
    <template v-else>
      <!-- 首页幻灯片 -->
      <xtx-swiper :list="swiperList"></xtx-swiper>
      <!-- 首页分类 -->
      <category-panel :list="categoryList"></category-panel>
      <!-- 热门推荐 -->
      <hot-panel :list="hotList"></hot-panel>
      <!-- 猜你喜欢 -->
      <xtx-guess ref="guessRef"></xtx-guess>
    </template>
  </scroll-view>
</template>

<script setup lang="ts">
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { CategoryItem, BannerItem, HotItem } from '@/types/home'
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type { XtxGuessInstance } from '@/types/components.js'
import XtxGuess from '@/components/xtx-guess.vue'
import { onLoad } from '@dcloudio/uni-app'
import PageSkeleton from './components/PageSkeleton.vue'

const swiperList = ref<BannerItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const hotList = ref<HotItem[]>([])
const loading = ref(false)
onLoad(async () => {
  loading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  loading.value = false
})

const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  swiperList.value = res.result
}
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

const guessRef = ref<XtxGuessInstance>()
// 滚动触底事件
const onScrolltolower = () => {
  guessRef.value?.getMore()
}

const isTriggered = ref(false)
// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  isTriggered.value = true
  guessRef.value?.resetData()
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isTriggered.value = false
}
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
  .scroll-view {
    flex: 1;
    height: 0;
  }
}
</style>
