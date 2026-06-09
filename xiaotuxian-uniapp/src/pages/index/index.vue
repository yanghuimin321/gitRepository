<template>
  <scroll-view
    scroll-y
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
    class="scroll-view"
  >
    <custom-navbar></custom-navbar>
    <xtx-swiper :list="swiperList"></xtx-swiper>
    <category-panel :list="categoryList"></category-panel>
    <hot-panel :list="hotList"></hot-panel>
    <scroll-view :scroll-y="true" @scrolltolower="onScrolltolower">
      <xtx-guess ref="guessRef"></xtx-guess>
    </scroll-view>
  </scroll-view>
</template>

<script setup lang="ts">
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { CategoryItem, BannerItem, HotItem } from '@/types/home'
import { ref, onMounted } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type { XtxGuessInstance } from '@/types/components.js'
import XtxGuess from '@/components/xtx-guess.vue'

const swiperList = ref<BannerItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const hotList = ref<HotItem[]>([])
onMounted(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotData()
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

<style lang="scss"></style>
