<template>
  <view class="address-panel">
    <text class="close icon-close" @tap="emit('close')"></text>
    <view class="title">配送至</view>

    <view class="content">
      <view class="item" v-for="(item, index) in contentText" :key="index">
        <view class="user">{{ item.user }}</view>
        <view class="address">{{ item.address }}</view>
        <text class="icon" :class="[index == 0 ? 'icon-checked' : 'icon-ring']"></text>
      </view>
    </view>

    <view class="footer">
      <view class="button primary">新建地址</view>
      <view class="button primary" v-if="false">确定</view>
    </view>
  </view>
</template>

<script setup lang="ts">
const contentText = [
  {
    user: '李明 13824686868',
    address: '北京市顺义区后沙峪地区安平北街6号院',
  },
  {
    user: '王东 13824686868',
    address: '北京市顺义区后沙峪地区安平北街6号院',
  },
  {
    user: '张三 13824686868',
    address: '北京市朝阳区孙河安平北街6号院',
  },
]
const emit = defineEmits<{
  (event: 'close'): void
}>()
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
