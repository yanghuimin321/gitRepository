<template>
  <view class="address-panel">
    <text class="close icon-close" @tap="emit('close')"></text>
    <view class="title">配送至</view>

    <view class="content">
      <view class="item" v-for="item in addressList" :key="item.id">
        <view class="user">{{ item.receiver }} {{ item.contact }}</view>
        <view class="address">{{ item.fullLocation }} {{ item.address }}</view>
        <text class="icon" :class="[item.isDefault == 1 ? 'icon-checked' : 'icon-ring']"></text>
      </view>
    </view>

    <view class="footer">
      <navigator
        v-if="addressList.length == 0"
        class="button primary"
        url="/pagesMember/address-form/address-form"
        hover-class="none"
      >
        新建地址
      </navigator>
      <view class="button primary" v-else>确定</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getMemberAddressAPI } from '@/services/address'
import type { AddressItem } from '@/types/address'
import { onMounted, ref } from 'vue'

const emit = defineEmits<{
  (event: 'close'): void
}>()

//获取收货地址列表数据
const addressList = ref<AddressItem[]>([])
const getMemberAddressData = async () => {
  const res = await getMemberAddressAPI()
  addressList.value = res.result
}

onMounted(() => {
  getMemberAddressData()
})
</script>

<style lang="scss" scoped>
.address-panel {
  padding: 0 30rpx;
  border-radius: 10rpx 10rpx 0 0;
  position: relative;
  background-color: #fff;

  .title {
    line-height: 1;
    padding: 40rpx 0;
    text-align: center;
    font-size: 32rpx;
    font-weight: normal;
    border-bottom: 1rpx solid #ddd;
    color: #444;
  }
  .close {
    position: absolute;
    right: 24rpx;
    top: 24rpx;
  }

  .content {
    min-height: 300rpx;
    max-height: 540rpx;
    overflow: auto;
    padding: 20rpx;
    .item {
      padding: 30rpx 50rpx 30rpx 60rpx;
      background-size: 40rpx;
      background-repeat: no-repeat;
      background-position: 0 center;
      background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
      position: relative;
      .user {
        font-size: 28rpx;
        color: #444;
        font-weight: 500;
      }
      .address {
        font-size: 26rpx;
        color: #666;
      }
      .icon {
        color: #999;
        font-size: 40rpx;
        transform: translateY(-50%);
        position: absolute;
        top: 50%;
        right: 0;
      }
      .icon-checked {
        color: #27ba9b;
      }
      .icon-ring {
        color: #444;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    padding: 20rpx 0 40rpx;
    font-size: 28rpx;
    color: #444;
    .button {
      flex: 1;
      height: 72rpx;
      text-align: center;
      line-height: 72rpx;
      margin: 0 20rpx;
      color: #fff;
      border-radius: 72rpx;
    }
    .primary {
      color: #fff;
      background-color: #27ba9b;
    }
  }
}
</style>
