<template>
  <scroll-view class="viewport" scroll-y>
    <view class="goods">
      <!-- 商品主图 -->
      <view class="preview">
        <swiper circular>
          <swiper-item>
            <image
              src="https://yanxuan-item.nosdn.127.net/99c83709ca5f9fd5c5bb35d207ad7822.png"
              mode="aspectFill"
            />
          </swiper-item>
          <swiper-item>
            <image
              src="https://yanxuan-item.nosdn.127.net/99c83709ca5f9fd5c5bb35d207ad7822.png"
              mode="aspectFill"
            />
          </swiper-item>
          <swiper-item>
            <image
              src="https://yanxuan-item.nosdn.127.net/99c83709ca5f9fd5c5bb35d207ad7822.png"
              mode="aspectFill"
            />
          </swiper-item>
          <swiper-item>
            <image
              src="https://yanxuan-item.nosdn.127.net/99c83709ca5f9fd5c5bb35d207ad7822.png"
              mode="aspectFill"
            />
          </swiper-item>
          <swiper-item>
            <image
              src="https://yanxuan-item.nosdn.127.net/99c83709ca5f9fd5c5bb35d207ad7822.png"
              mode="aspectFill"
            />
          </swiper-item>
        </swiper>
        <view class="indicator">
          <text class="current">1</text>
          <text class="split">/</text>
          <text class="total">5</text>
        </view>
      </view>

      <!-- 商品简介 -->
      <view class="meta">
        <view class="price">
          <text class="symbol">¥</text>
          <text class="number">29.90</text>
        </view>
        <view class="name ellipsis">云珍·轻软旅行长绒棉方巾</view>
        <view class="desc">轻巧无捻小方巾，旅行便捷</view>
      </view>

      <!-- 操作面板 -->
      <view class="action">
        <view class="item arrow">
          <text class="label">选择</text>
          <text class="text ellipsis">选择商品规格</text>
        </view>
        <view class="item arrow">
          <text class="label">送至</text>
          <text class="text ellipsis">请选择收获地址</text>
        </view>
        <view class="item arrow">
          <text class="label">服务</text>
          <text class="text ellipsis">无忧退 快速退款 免费包邮</text>
        </view>
      </view>
    </view>

    <!-- 商品详情 -->
    <view class="detail panel">
      <view class="title">
        <text>详情</text>
      </view>

      <view class="content">
        <view class="properties">
          <view class="item">
            <text class="label">属性名</text>
            <text class="value">属性值</text>
          </view>
          <view class="item">
            <text class="label">属性名</text>
            <text class="value">属性值</text>
          </view>
        </view>

        <image
          src="https://yanxuan-item.nosdn.127.net/a8d266886d31f6eb0d7333c815769305.jpg"
          mode="widthFix"
        />
        <image
          src="https://yanxuan-item.nosdn.127.net/a8d266886d31f6eb0d7333c815769305.jpg"
          mode="widthFix"
        />
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
// 获取屏幕边界到安全区域的距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.viewport {
  background-color: #f4f4f4;
}
.arrow::after {
  position: absolute;
  top: 50%;
  right: 30rpx;
  content: '\e6c2';
  color: #ccc;
  font-family: 'erabbit' ip !important;
  font-size: 32rpx;
  transform: translateY(-50%);
}

.goods {
  background-color: #fff;
  .preview {
    height: 750rpx;
    position: relative;
    image {
      width: 750rpx;
      height: 750rpx;
    }
    .indicator {
      height: 40rpx;
      padding: 0 24rpx;
      line-height: 40rpx;
      border-radius: 30rpx;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 30rpx;
      right: 30rpx;
      .current {
        font-size: 26rpx;
      }
      .split {
        font-size: 24rpx;
        margin: 0 1rpx 0 2rpx;
      }
      .total {
        font-size: 24rpx;
      }
    }
  }

  .meta {
    position: relative;
    border-bottom: 1rpx solid #eaeaea;
    .price {
      height: 130rpx;
      padding: 25rpx 30rpx 0;
      color: #fff;
      font-size: 34rpx;
      box-sizing: border-box;
      background-color: #35c8a9;
      .number {
        font-size: 56rpx;
      }
    }
    .name {
      max-height: 88rpx;
      line-height: 1.4;
      margin: 20rpx;
      font-size: 32rpx;
      color: #333;
    }
    .desc {
      line-height: 1;
      padding: 0 20rpx 30rpx;
      font-size: 24rpx;
      color: #cf4444;
    }
  }

  .action {
    padding-left: 20rpx;
    .item {
      height: 90rpx;
      padding-right: 60rpx;
      border-bottom: 1rpx solid #eaeaea;
      font-size: 26rpx;
      color: #333;
      position: relative;
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: 0 none;
      }
    }
    .label {
      width: 60rpx;
      color: #898b94;
      margin: 0 16rpx 0 10rpx;
    }
    .text {
      flex: 1;
      -webkit-line-clamp: 1;
      line-clamp: 1;
    }
  }
}

.detail {
  padding-left: 20rpx;
  .content {
    margin-left: -20rpx;
    image {
      width: 100%;
    }
  }
}
</style>
