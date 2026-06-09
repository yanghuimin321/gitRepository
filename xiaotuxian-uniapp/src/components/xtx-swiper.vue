<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="false" :interval="300" @change="onChange">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image :src="item.imgUrl" mode="aspectFill" class="image" />
        </navigator>
      </swiper-item>
    </swiper>
    <view class="indicator">
      <text
        class="dot"
        :class="{ active: index === activeIndex }"
        v-for="(item, index) in list"
        :key="item.id"
      ></text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BannerItem } from '@/types/home'

// 定义 props 接收
defineProps<{
  list: BannerItem[]
}>()

const activeIndex = ref(0)

const onChange: UniHelper.SwiperOnChange = (item) => {
  // ! 非空断言，主观上排除掉空值情况
  activeIndex.value = item.detail.current
}
</script>

<style lang="scss">
.carousel {
  height: 280rpx;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  background-color: #efefef;
  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;
    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .active {
      background-color: #fff;
    }
  }
}
</style>
