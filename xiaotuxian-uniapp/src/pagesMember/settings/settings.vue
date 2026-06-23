<template>
  <view class="viewport">
    <view class="list" v-if="memberStore.profile">
      <navigator url="/pagesMember/address/address" hover-class="none" class="item arrow">
        我的收货地址
      </navigator>
    </view>

    <view class="list">
      <button class="item arrow" hover-class="none" open-type="openSetting">授权管理</button>
      <button class="item arrow" hover-class="none" open-type="feedback">问题反馈</button>
      <button class="item arrow" hover-class="none" open-type="contact">联系我们</button>
    </view>

    <view class="list">
      <navigator class="item arrow" hover-class="none" url="">关于小兔鲜儿</navigator>
    </view>

    <view class="action" v-if="memberStore.profile">
      <view class="button" @tap="onLogOut">退出登录</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useMemberStore } from '@/stores'

//用户信息
const memberStore = useMemberStore()

//退出登录
const onLogOut = () => {
  uni.showModal({
    content: '是否退出登录？',
    success: (res) => {
      //清理用户信息
      memberStore.clearProfile()
      //返回上一页
      uni.navigateBack()
    },
  })
}
</script>

<style lang="scss" scoped>
.viewport {
  padding: 20rpx;
  height: 100%;
  background-color: #f4f4f4;
}

.list {
  padding: 0 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  .item {
    line-height: 90rpx;
    padding-left: 10rpx;
    font-size: 30rpx;
    color: #333;
    border-top: 1rpx solid #ddd;
    position: relative;
    text-align: left;
    border-radius: 0;
    background-color: #fff;
    &::after {
      width: auto;
      height: auto;
      left: auto;
      border: none;
      right: 5rpx;
    }
    &:first-child {
      border: none;
    }
  }
  .arrow::after {
    content: '\e6c2';
    position: absolute;
    top: 50%;
    color: #ccc;
    font-family: 'erabbit' !important;
    font-size: 32rpx;
    transform: translateY(-50%);
  }
}

.action {
  text-align: center;
  line-height: 90rpx;
  margin-top: 40rpx;
  font-size: 32rpx;
  color: #333;
  .button {
    background-color: #fff;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
  }
}
</style>
