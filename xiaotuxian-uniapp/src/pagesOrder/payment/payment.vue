<template>
  <scroll-view class="viewport" scroll-y @scrolltolower="onScrolltolower">
    <view class="overview">
      <view class="status icon-checked">支付成功</view>
      <view class="buttons">
        <navigator
          class="button navigator"
          hover-class="none"
          open-type="switchTab"
          url="/pages/index/index"
        >
          返回首页
        </navigator>
        <navigator
          class="button navigator"
          hover-class="none"
          open-type="redirect"
          :url="`/pagesOrder/detail/detail?id=${query.id}`"
        >
          查看订单
        </navigator>
      </view>
    </view>
    <xtx-guess ref="guessRef"></xtx-guess>
  </scroll-view>
</template>

<script lang="ts" setup>
import { useGuessList } from '@/composables'

const query = defineProps<{
  id: string
}>()

const { guessRef, onScrolltolower } = useGuessList()
</script>

<style lang="scss" scoped>
.viewport {
  background-color: #f7f7f8;
}

.overview {
  line-height: 1;
  padding: 50rpx 0;
  color: #fff;
  background-color: #27ba9b;
  .status {
    font-size: 36rpx;
    font-weight: 500;
    text-align: center;
    &::before {
      display: block;
      font-size: 110rpx;
      margin-bottom: 20rpx;
    }
  }
  .buttons {
    height: 60rpx;
    line-height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60rpx;
  }
  .button {
    text-align: center;
    margin: 0 10rpx;
    font-size: 28rpx;
    color: #fff;
    &:first-child {
      width: 200rpx;
      border-radius: 64rpx;
      border: 1rpx solid #fff;
    }
  }
}
</style>
