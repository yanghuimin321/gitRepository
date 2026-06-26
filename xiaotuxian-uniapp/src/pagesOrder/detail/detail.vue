<template>
  <!-- 自定义导航栏：默认透明不可见，scroll-view 滚动到50时展示 -->
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="wrap">
      <navigator class="back icon-left" v-if="true" open-type="navigateBack"></navigator>
      <navigator
        class="back icon-home"
        v-else
        url="/pages/index/index"
        open-type="switchTab"
      ></navigator>
      <view class="title">订单详情</view>
    </view>
  </view>

  <!-- 主体内容 -->
  <scroll-view class="viewport" id="scroller" scroll-y @scrolltolower="onScrolltolower">
    <template v-if="true">
      <!-- 订单状态 -->
      <view class="overview" :style="{ paddingTop: safeAreaInsets!.top + 20 + 'px' }">
        <!-- 待付款状态：展示去支付按钮和倒计时 -->
        <template v-if="true">
          <view class="status icon-clock">等待付款</view>
          <view class="tips">
            <text class="money">应付金额：¥ 99.00</text>
            <text class="time">支付剩余</text>
            00 时 29 分 59 秒
          </view>
          <view class="button">去支付</view>
        </template>
        <!-- 其他订单状态：展示再次购买按钮 -->
        <template v-else>
          <!-- 订单状态文字 -->
          <view class="status">待付款</view>
          <view class="button-group">
            <navigator
              class="button"
              hover-class="none"
              :url="`/pagesOrder/create/create?orderId=${query.id}`"
            >
              再次购买
            </navigator>
            <!-- 待发货状态：模拟发货，开发期间使用，用于修改订单状态为已发货 -->
            <view class="button" v-if="false">模拟发货</view>
          </view>
        </template>
      </view>
      <!-- 配送状态 -->
      <!-- 商品信息 -->
      <!-- 订单信息 -->
      <!-- 猜你喜欢 -->
      <xtx-guess ref="guessRef"></xtx-guess>
      <!-- 底部操作栏 -->
    </template>
    <template v-else>
      <!-- 骨架屏 -->
    </template>
  </scroll-view>

  <!-- 取消订单弹窗 -->
  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <view class="popup-root">
      <view class="title">订单取消</view>
      <view class="description">
        <view class="tips">请选择取消订单的原因：</view>
        <view class="cell" v-for="item in reasonList" :key="item" @tap="reason = item">
          <text class="text">{{ item }}</text>
          <text class="icon" :class="{ checked: item == reason }"></text>
        </view>
      </view>
      <view class="footer">
        <view class="button" @tap="popup?.close?.()">取消</view>
        <view class="button primary">确认</view>
      </view>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { useGuessList } from '@/composables'
import { ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 猜你喜欢
const { guessRef, onScrolltolower } = useGuessList()

// 获取页面参数
const query = defineProps<{
  id: string
}>()

// 弹出层组件
const popup = ref<UniHelper.UniPopupInstance>()

// 取消原因
const reason = ref('')
const reasonList = ref([
  '商品无货',
  '不想要了',
  '商品信息填错了',
  '地址信息填写错误',
  '商品降价',
  '其它',
])

// 复制内容
const onCopy = (id: string) => {
  uni.setClipboardData({ data: id })
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 750rpx;
  color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: transparent;
  .wrap {
    position: relative;
    .title {
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32rpx;
      color: transparent;
    }
    .back {
      position: absolute;
      left: 0;
      height: 44px;
      width: 44px;
      display: flex;
      font-size: 44px;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
  }
}

.popup-root {
  padding: 30rpx 30rpx 0;
  border-radius: 10rpx 10rpx 00;
  overflow: hidden;
  .title {
    font-size: 30rpx;
    text-align: center;
    margin-bottom: 30rpx;
  }
  .description {
    font-size: 28rpx;
    padding: 0 20rpx;
    .tips {
      color: #444;
      margin-bottom: 12rpx;
    }
    .cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15rpx 0;
      color: #666;
    }
    .icon::before {
      content: '\e6cd';
      font-family: 'erabbit' !important;
      font-size: 38rpx;
      color: #999;
    }
    .icon.checked::before {
      content: '\e6cc';
      font-size: 38rpx;
      color: #27ba9b;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 0 40rpx;
    font-size: 28rpx;
    color: #444;
    .button {
      flex: 1;
      height: 72rpx;
      text-align: center;
      line-height: 72rpx;
      margin: 0 20rpx;
      color: #444;
      border-radius: 72rpx;
      border: 1rpx solid #ccc;
    }
    .primary {
      color: #fff;
      background-color: #27ba9b;
      border: none;
    }
  }
}

.viewport {
  background-color: #f7f7f8;
}

.overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
  padding-bottom: 30rpx;
  color: #fff;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: cover;
  .status {
    font-size: 36rpx;
    &::before {
      margin-right: 6rpx;
      font-weight: 500;
    }
  }
  .tips {
    margin: 30rpx 0;
    display: flex;
    font-size: 14px;
    align-items: center;
  }
}
</style>
