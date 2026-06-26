<template>
  <scroll-view class="viewport" scroll-y>
    <page-skeleton v-if="loading"></page-skeleton>
    <template v-else>
      <view class="goods">
        <!-- 商品主图 -->
        <view class="preview">
          <swiper circular style="height: 100%" @change="onChange">
            <swiper-item v-for="src in goodInfo?.mainPictures" :key="src">
              <image :src="src" mode="aspectFill" @tap="onTapImage(src)" />
            </swiper-item>
          </swiper>
          <view class="indicator">
            <text class="current">{{ currentIndex + 1 }}</text>
            <text class="split">/</text>
            <text class="total">{{ goodInfo?.mainPictures.length }}</text>
          </view>
        </view>

        <!-- 商品简介 -->
        <view class="meta">
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goodInfo?.price }}</text>
          </view>
          <view class="name ellipsis">{{ goodInfo?.name }}</view>
          <view class="desc">{{ goodInfo?.desc }}</view>
        </view>

        <!-- 操作面板 -->
        <view class="action">
          <view class="item arrow" @tap="openSkuPopup(SkuMode.Both)">
            <text class="label">选择</text>
            <text class="text ellipsis">选择商品规格</text>
          </view>
          <view class="item arrow" @tap="openPopup('address')">
            <text class="label">送至</text>
            <text class="text ellipsis">请选择收获地址</text>
          </view>
          <view class="item arrow" @tap="openPopup('service')">
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
            <view class="item" v-for="item in goodInfo?.details.properties" :key="item.name">
              <text class="label">{{ item.name }}</text>
              <text class="value">{{ item.value }}</text>
            </view>
          </view>

          <image v-for="src in goodInfo?.details.pictures" :key="src" :src="src" mode="widthFix" />
        </view>
      </view>

      <!-- 同类推荐 -->
      <view class="similar panel">
        <view class="title">
          <text>同类推荐</text>
        </view>

        <view
          class="content"
          :style="{ paddingBottom: `calc(110rpx + ${safeAreaInsets?.bottom}px)` }"
        >
          <navigator
            class="goods"
            hover-class="none"
            v-for="item in goodInfo?.similarProducts"
            :key="item.id"
            :url="`/pages/goods/goods?id=${item.id}`"
          >
            <image mode="aspectFill" :src="item.picture"></image>
            <view class="name ellipsis">{{ item.name }}</view>
            <view class="price">
              <text class="symbol">¥</text>
              <text class="number">{{ item.price }}</text>
            </view>
          </navigator>
        </view>
      </view>
    </template>
  </scroll-view>

  <!-- 用户操作 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="icons">
      <button class="icons-button"><text class="icon-heart"></text>收藏</button>
      <button class="icons-button" open-type="contact">
        <text class="icon-handset"></text>客服
      </button>
      <navigator class="icons-button" url="/pages/cart/cart2" open-type="navigate">
        <text class="icon-cart"></text>购物车
      </navigator>
    </view>
    <view class="buttons">
      <view class="addcart" @tap="openSkuPopup(SkuMode.Cart)">加入购物车</view>
      <view class="buynow" @tap="openSkuPopup(SkuMode.Buy)">立即购买</view>
    </view>
  </view>

  <!-- uni-ui弹出层 -->
  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <address-panel v-if="popupName === 'address'" @close="popup?.close()"></address-panel>
    <service-panel v-if="popupName === 'service'" @close="popup?.close()"></service-panel>
  </uni-popup>

  <!-- 商品规格弹出层 -->
  <vk-data-goods-sku-popup
    v-model="isShowSku"
    :localdata="localdata"
    :mode="mode"
    add-cart-bakadd-cart-background-color="#FFA868"
    buy-now-background-color="#27BA9B"
    ref="skuPopupRef"
    :actived-style="{
      color: '#27ba9b',
      borderColor: '#27ba9b',
      backgroundColor: '#e9f8f5',
    }"
    @add-cart="onAddCart"
    @buy-now="onBuyNow"
  ></vk-data-goods-sku-popup>
</template>

<script setup lang="ts">
import { getGoodsByIdAPI } from '@/services/goods'
import type { GoodsResult } from '@/types/goods'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import AddressPanel from './components/AddressPanel.vue'
import ServicePanel from './components/ServicePanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import type { SkuPopupEvent, SkuPopupLocaldata } from '@/types/vk-data-goods-sku-popup.js'
import { postMemberCartAPI } from '@/services/cart.ts'

// 获取屏幕边界到安全区域的距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const query = defineProps<{
  id: string
}>()

// 获取商品详情
const goodInfo = ref<GoodsResult>()
const getGoodsByIdDdata = async () => {
  const res = await getGoodsByIdAPI(query.id)
  goodInfo.value = res.result
  localdata.value = {
    _id: res.result.id,
    name: res.result.name,
    goods_thumb: res.result.mainPictures[0],
    spec_list: res.result.specs.map((v) => ({ name: v.name, list: v.values })),
    sku_list: res.result.skus.map((v) => ({
      _id: v.id,
      goods_id: res.result.id,
      goods_name: res.result.name,
      image: v.picture,
      price: v.price * 100, // 注意：需要乘以 100
      stock: v.inventory,
      sku_name_arr: v.specs.map((vv) => vv.valueName),
    })),
  }
}
const loading = ref(false)
onLoad(async () => {
  loading.value = true
  await getGoodsByIdDdata()
  loading.value = false
})

// 幻灯片图片切换和预览
const currentIndex = ref(0)
const onChange: UniHelper.SwiperOnChange = (ev) => {
  currentIndex.value = ev.detail.current
}
const onTapImage = (url: string) => {
  uni.previewImage({
    current: url,
    urls: goodInfo.value!.mainPictures,
  })
}

//弹出层
const popup = ref<{
  open: (type?: UniHelper.UniPopupType) => void
  close: () => void
}>()
const popupName = ref<'address' | 'service'>()
const openPopup = (name: typeof popupName.value) => {
  popupName.value = name
  popup.value?.open()
}

// 商品规格弹出层
const isShowSku = ref(false)
const localdata = ref({} as SkuPopupLocaldata)
enum SkuMode {
  Both = 1,
  Cart = 2,
  Buy = 3,
}
const mode = ref<SkuMode>()
const openSkuPopup = (val: SkuMode) => {
  isShowSku.value = true
  mode.value = val
}
// 加入购物车
const onAddCart = async (ev: SkuPopupEvent) => {
  await postMemberCartAPI({ skuId: ev._id, count: ev.buy_num })
  uni.showToast({ title: '添加成功' })
  isShowSku.value = false
}

const onBuyNow = async (ev: SkuPopupEvent) => {
  uni.navigateTo({ url: `/pagesOrder/create/create?skuId=${ev._id}&count=${ev.buy_num}` })
}
</script>

<style lang="scss" scoped>
.viewport {
  background-color: #f4f4f4;
  flex: 1;
  height: 0;
}
.arrow {
  &::after {
    position: absolute;
    top: 50%;
    right: 30rpx;
    content: '\e6c2';
    color: #ccc;
    font-family: 'erabbit' !important;
    font-size: 32rpx;
    transform: translateY(-50%);
  }
}

.panel {
  margin-top: 20rpx;
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    line-height: 1;
    padding: 30rpx 60rpx 30rpx 6rpx;
    position: relative;
    box-sizing: border-box;
    text {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
      border-left: 4rpx solid #27ba9b;
    }
    navigator {
      font-size: 24rpx;
      color: #666;
    }
  }
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
      display: block;
    }

    .properties {
      padding: 0 20rpx;
      margin-bottom: 30rpx;
      .item {
        display: flex;
        line-height: 2;
        padding: 10rpx;
        font-size: 26rpx;
        color: #333;
        border-bottom: 1rpx dashed #ccc;
        .label {
          width: 200rpx;
        }
        .value {
          flex: 1;
        }
      }
    }
  }
}

.similar {
  .content {
    padding: 0 20rpx 110rpx;
    background-color: #f4f4f4;
    display: flex;
    flex-wrap: wrap;
    .goods {
      width: 340rpx;
      padding: 24rpx 20rpx 20rpx;
      margin: 20rpx 9rpx;
      border-radius: 10rpx;
      background-color: #fff;
      box-sizing: border-box;
      image {
        width: 300rpx;
        height: 260rpx;
      }
      .name {
        height: 80rpx;
        margin: 10rpx 0;
        font-size: 26rpx;
        color: #262626;
      }
      .price {
        line-height: 1;
        font-size: 20rpx;
        color: #cf4444;
      }
      .number {
        font-size: 26rpx;
        margin-left: 2;
      }
    }
    navigator:nth-child(even) {
      margin-right: 0;
    }
  }
}

.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;

  .buttons {
    display: flex;
    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }
    .addcart {
      background-color: #ffa868;
    }
    .buynow {
      background-color: #27ba9b;
      margin-left: 20rpx;
    }
  }

  .icons {
    padding-right: 10rpx;
    display: flex;
    align-items: center;
    flex: 1;
    .icons-button {
      flex: 1;
      text-align: center;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: #333;
      background-color: #fff;
      &::after {
        border: none;
      }
    }
    text {
      display: block;
      font-size: 34rpx;
    }
  }
}
</style>
