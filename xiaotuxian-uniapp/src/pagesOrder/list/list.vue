<template>
  <view class="viewport">
    <view class="tabs">
      <text
        class="item"
        v-for="(item, index) in orderTabs"
        :key="item.orderState"
        @tap="activeIndex = index"
      >
        {{ item.title }}
      </text>
      <view class="cursor" :style="{ left: activeIndex * 20 + '%' }"></view>
    </view>

    <swiper class="swiper" :current="activeIndex" @change="activeIndex = $event.detail.current">
      <swiper-item v-for="item in orderTabs" :key="item.orderState">
        <order-list :order-status="item.orderState"></order-list>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import { orderTabs } from '@/services/constants'
import { ref } from 'vue'
import OrderList from './components/OrderList.vue'

const query = defineProps<{
  type: string
}>()
// 高亮下标
const activeIndex = ref(orderTabs.findIndex((v) => v.orderState == Number(query.type)))
</script>

<style lang="scss" scoped>
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.tabs {
  display: flex;
  justify-content: space-around;
  line-height: 60rpx;
  margin: 0 10rpx;
  background-color: #fff;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
  position: relative;
  z-index: 2;
  .item {
    flex: 1;
    text-align: center;
    padding: 20rpx;
    font-size: 28rpx;
    color: #262626;
  }
  .cursor {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 20%;
    height: 6rpx;
    padding: 0 50rpx;
    background-color: #27ba9b;
    transition: all 0.4s;
  }
}

.swiper {
  background-color: #f7f7f8;
}
</style>
