<template name="skeleton">
  <view class="sk-container">
    <view class="navbar navbar data-v-baa4ebef data-v-baa4ebef" style="padding-top: 47px">
      <view class="wrap wrap data-v-baa4ebef data-v-baa4ebef">
        <navigator
          class="back icon-left data-v-baa4ebef sk-pseudo sk-pseudo-circle"
          open-type="navigateBack"
        ></navigator>
        <view class="title data-v-baa4ebef sk-transparent sk-text-14-2857-105 sk-text"
          >订单详情</view
        >
      </view>
    </view>
    <scroll-view
      :enable-back-to-top="true"
      :scroll-y="true"
      class="viewport viewport data-v-baa4ebef data-v-baa4ebef"
      id="scroller"
    >
      <view class="overview data-v-baa4ebef sk-image" style="padding-top: 67px">
        <view
          class="status icon-clock data-v-baa4ebef sk-transparent sk-text-0-0000-57 sk-text sk-pseudo sk-pseudo-circle"
          >等待付款</view
        >
        <view class="tips tips data-v-baa4ebef data-v-baa4ebef">
          <text class="money data-v-baa4ebef sk-transparent sk-text-0-0000-438 sk-text"
            >应付金额：¥ 582</text
          >
          <text class="time data-v-baa4ebef sk-transparent sk-text-0-0000-106 sk-text"
            >支付剩余</text
          >
          <view class="data-v-baa4ebef data-v-baa4ebef">
            <view
              class="uni-countdown countdown--uni-countdown data-v-342c352a countdown--data-v-342c352a"
            >
              <text
                class="uni-countdown__number countdown--uni-countdown__number data-v-342c352a countdown--data-v-342c352a sk-transparent sk-text-15-0000-765 sk-text"
                style="
                  color: rgb(255, 255, 255);
                  font-size: 14px;
                  width: 22px;
                  line-height: 20px;
                  border-radius: 3px;
                  background-position-x: 50%;
                "
                >00</text
              >
              <text
                class="uni-countdown__splitor countdown--uni-countdown__splitor data-v-342c352a countdown--data-v-342c352a sk-transparent sk-opacity"
                style="color: #fff; font-size: 12px; margin:"
                >时</text
              >
              <text
                class="uni-countdown__number countdown--uni-countdown__number data-v-342c352a countdown--data-v-342c352a sk-transparent sk-text-15-0000-709 sk-text"
                style="
                  color: rgb(255, 255, 255);
                  font-size: 14px;
                  width: 22px;
                  line-height: 20px;
                  border-radius: 3px;
                  background-position-x: 50%;
                "
                >29</text
              >
              <text
                class="uni-countdown__splitor countdown--uni-countdown__splitor data-v-342c352a countdown--data-v-342c352a sk-transparent sk-opacity"
                style="color: #fff; font-size: 12px; margin:"
                >分</text
              >
              <text
                class="uni-countdown__number countdown--uni-countdown__number data-v-342c352a countdown--data-v-342c352a sk-transparent sk-text-15-0000-211 sk-text"
                style="
                  color: rgb(255, 255, 255);
                  font-size: 14px;
                  width: 22px;
                  line-height: 20px;
                  border-radius: 3px;
                  background-position-x: 50%;
                "
                >50</text
              >
              <text
                class="uni-countdown__splitor countdown--uni-countdown__splitor data-v-342c352a countdown--data-v-342c352a sk-transparent sk-opacity"
                style="color: #fff; font-size: 12px; margin:"
                >秒</text
              >
            </view>
          </view>
        </view>
        <view
          class="button data-v-baa4ebef sk-transparent sk-text-28-7879-170 sk-text"
          style="background-position-x: 50%"
          >去支付</view
        >
      </view>
      <view class="goods goods data-v-baa4ebef data-v-baa4ebef">
        <view class="item item data-v-baa4ebef data-v-baa4ebef">
          <navigator class="navigator navigator data-v-baa4ebef data-v-baa4ebef" hover-class="none">
            <image class="cover data-v-baa4ebef sk-image"></image>
            <view class="meta meta data-v-baa4ebef data-v-baa4ebef">
              <view class="name ellipsis data-v-baa4ebef sk-transparent sk-text-14-2857-866 sk-text"
                >梅乃宿柚子酒720毫升</view
              >
              <view class="type data-v-baa4ebef sk-transparent sk-text-22-2222-904 sk-text"
                >日本梅乃宿柚子酒8度720mL</view
              >
              <view class="price price data-v-baa4ebef data-v-baa4ebef">
                <view class="actual actual data-v-baa4ebef data-v-baa4ebef">
                  <text class="symbol data-v-baa4ebef sk-transparent sk-opacity">￥</text>
                  <text class="data-v-baa4ebef sk-transparent sk-text-14-2857-435 sk-text"
                    >248</text
                  >
                </view>
              </view>
              <view class="quantity data-v-baa4ebef sk-transparent sk-opacity">x1</view>
            </view>
          </navigator>
          <navigator class="navigator navigator data-v-baa4ebef data-v-baa4ebef" hover-class="none">
            <image class="cover data-v-baa4ebef sk-image"></image>
            <view class="meta meta data-v-baa4ebef data-v-baa4ebef">
              <view class="name ellipsis data-v-baa4ebef sk-transparent sk-text-14-2857-810 sk-text"
                >意外设计小时光便携钢笔</view
              >
              <view class="type data-v-baa4ebef sk-transparent sk-text-22-2222-651 sk-text"
                >黑檀木F尖</view
              >
              <view class="price price data-v-baa4ebef data-v-baa4ebef">
                <view class="actual actual data-v-baa4ebef data-v-baa4ebef">
                  <text class="symbol data-v-baa4ebef sk-transparent sk-opacity">￥</text>
                  <text class="data-v-baa4ebef sk-transparent sk-text-14-2857-71 sk-text">328</text>
                </view>
              </view>
              <view class="quantity data-v-baa4ebef sk-transparent sk-opacity">x1</view>
            </view>
          </navigator>
        </view>
        <view class="total total data-v-baa4ebef data-v-baa4ebef">
          <view class="row row data-v-baa4ebef data-v-baa4ebef">
            <view class="text data-v-baa4ebef sk-transparent sk-text-0-0000-272 sk-text"
              >商品总价：</view
            >
            <view
              class="symbol data-v-baa4ebef sk-transparent sk-text-0-0000-686 sk-text sk-pseudo sk-pseudo-circle"
              >576</view
            >
          </view>
          <view class="row row data-v-baa4ebef data-v-baa4ebef">
            <view class="text data-v-baa4ebef sk-transparent sk-text-0-0000-525 sk-text">运费</view>
            <view
              class="symbol data-v-baa4ebef sk-transparent sk-text-0-0000-146 sk-text sk-pseudo sk-pseudo-circle"
              >6</view
            >
          </view>
          <view class="row row data-v-baa4ebef data-v-baa4ebef">
            <view class="text data-v-baa4ebef sk-transparent sk-text-0-0000-720 sk-text"
              >应付金额：</view
            >
            <view
              class="symbol primary data-v-baa4ebef sk-transparent sk-text-0-0000-833 sk-text sk-pseudo sk-pseudo-circle"
              >582</view
            >
          </view>
        </view>
      </view>
      <view class="detail detail data-v-baa4ebef data-v-baa4ebef">
        <view class="title data-v-baa4ebef sk-transparent sk-text-0-0000-832 sk-text"
          >订单信息</view
        >
        <view class="row row data-v-baa4ebef data-v-baa4ebef">
          <view class="item data-v-baa4ebef sk-transparent">
            订单编号：2071513441171935233
            <text class="copy data-v-baa4ebef sk-transparent sk-text-0-0000-278 sk-text">复制</text>
          </view>
          <view class="item data-v-baa4ebef sk-transparent sk-text-0-0000-13 sk-text"
            >下单时间: 2026-06-29 16:37:46</view
          >
        </view>
      </view>
      <view class="r r data-v-baa4ebef data-v-baa4ebef">
        <view class="caption guess--caption data-v-55379e62 guess--data-v-55379e62">
          <text
            class="text guess--text data-v-55379e62 guess--data-v-55379e62 sk-transparent sk-text-0-0000-171 sk-text sk-pseudo sk-pseudo-circle"
            >猜你喜欢</text
          >
        </view>
        <view class="guess guess--guess data-v-55379e62 guess--data-v-55379e62">
          <navigator class="guess-item guess--guess-item data-v-55379e62 guess--data-v-55379e62">
            <image
              class="image guess--image data-v-55379e62 guess--data-v-55379e62 sk-image"
              mode="aspectFill"
            ></image>
          </navigator>
          <navigator class="guess-item guess--guess-item data-v-55379e62 guess--data-v-55379e62">
            <image
              class="image guess--image data-v-55379e62 guess--data-v-55379e62 sk-image"
              mode="aspectFill"
            ></image>
          </navigator>
        </view>
      </view>
      <view class="toolbar toolbar data-v-baa4ebef data-v-baa4ebef" style="padding-bottom: 34px">
        <view class="button primary data-v-baa4ebef sk-transparent sk-text-14-2857-884 sk-text"
          >去支付
        </view>
        <view class="button data-v-baa4ebef sk-transparent sk-text-14-2857-339 sk-text"
          >取消订单</view
        >
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-105 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.0769rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-0-0000-57 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 34.6154rpx;
  position: relative !important;
}
.sk-text-0-0000-438 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-0-0000-106 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 26.9231rpx;
  position: relative !important;
}
.sk-text-15-0000-765 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 38.4615rpx;
  position: relative !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-15-0000-709 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 38.4615rpx;
  position: relative !important;
}
.sk-text-15-0000-211 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 38.4615rpx;
  position: relative !important;
}
.sk-text-28-7879-170 {
  background-image: linear-gradient(
    transparent 28.7879%,
    #eeeeee 0%,
    #eeeeee 71.2121%,
    transparent 0%
  ) !important;
  background-size: 100% 63.4615rpx;
  position: relative !important;
}
.sk-text-14-2857-866 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-22-2222-904 {
  background-image: linear-gradient(
    transparent 22.2222%,
    #eeeeee 0%,
    #eeeeee 77.7778%,
    transparent 0%
  ) !important;
  background-size: 100% 41.5385rpx;
  position: relative !important;
}
.sk-text-14-2857-435 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.3077rpx;
  position: relative !important;
}
.sk-text-14-2857-810 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-22-2222-651 {
  background-image: linear-gradient(
    transparent 22.2222%,
    #eeeeee 0%,
    #eeeeee 77.7778%,
    transparent 0%
  ) !important;
  background-size: 100% 41.5385rpx;
  position: relative !important;
}
.sk-text-14-2857-71 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 32.3077rpx;
  position: relative !important;
}
.sk-text-0-0000-272 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25rpx;
  position: relative !important;
}
.sk-text-0-0000-686 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25rpx;
  position: relative !important;
}
.sk-text-0-0000-525 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25rpx;
  position: relative !important;
}
.sk-text-0-0000-146 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25rpx;
  position: relative !important;
}
.sk-text-0-0000-720 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25rpx;
  position: relative !important;
}
.sk-text-0-0000-833 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 34.6154rpx;
  position: relative !important;
}
.sk-text-0-0000-832 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 28.8462rpx;
  position: relative !important;
}
.sk-text-0-0000-278 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 19.2308rpx;
  position: relative !important;
}
.sk-text-0-0000-13 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25rpx;
  position: relative !important;
}
.sk-text-0-0000-171 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 30.7692rpx;
  position: relative !important;
}
.sk-text-14-2857-884 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-text-14-2857-339 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 35rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
