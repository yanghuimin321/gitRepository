<template>
  <scroll-view scroll-y class="scroll-view" @scrolltolower="onScrolltolower">
    <!-- 已登录：显示购物车信息 -->
    <template v-if="memberStore.profile">
      <!-- 购物车有数据：购物车列表 -->
      <view class="cart-list" v-if="cartList.length">
        <!-- 优惠提示 -->
        <view class="tips">
          <text class="label">满减</text>
          <text class="desc">满1件，即可享受9折优惠</text>
        </view>
        <!-- 列表，滑动操作 -->
        <uni-swipe-action>
          <uni-swipe-action-item v-for="item in cartList" :key="item.skuId" class="cart-swipe">
            <!-- 商品信息 -->
            <view class="goods">
              <text
                @tap="onChangeSelected(item)"
                class="checkbox"
                :class="{ checked: item.selected }"
              ></text>
              <navigator
                class="navigator"
                hover-class="none"
                :url="`/pages/goods/goods?id=${item.id}`"
              >
                <image class="picture" mode="aspectFill" :src="item.picture"></image>
                <view class="meta">
                  <view class="name ellipsis">{{ item.name }}</view>
                  <view class="attrsText ellipsis">{{ item.attrsText }}</view>
                  <view class="price">{{ item.price }}</view>
                </view>
                <view class="count">
                  <vk-data-input-number-box
                    v-model="item.count"
                    :min="1"
                    :max="item.stock"
                    :index="item.skuId"
                    @change="onChangeCount"
                  ></vk-data-input-number-box>
                </view>
              </navigator>
            </view>
            <!-- 滑动右侧删除按钮 -->
            <template #right>
              <view class="cart-swipe-right">
                <button class="button delete-button" @tap="onDeleteCart(item.skuId)">删除</button>
              </view>
            </template>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
      <!-- 购物车空状态 -->
      <view class="cart-blank" v-else>
        <image class="image" src="/static/images/blank_cart.png"></image>
        <text class="text">购物车还是空的，快来挑选好货吧</text>
        <navigator url="/pages/index/index" open-type="switchTab" hover-class="none">
          <button class="button">去首页看看</button>
        </navigator>
      </view>
      <!-- 吸底工具栏 -->
      <view class="toolbar">
        <text @tap="onChangeSelectedAll" class="all" :class="{ checked: isSelectedAll }">全选</text>
        <text class="text">合计:</text>
        <text class="amount">{{ selectedCartListMoney }}</text>
        <view class="button-grounp">
          <view
            class="button payment-button"
            @tap="gotoPayment"
            :class="{ disabled: selectedCartList.length == 0 }"
            >去结算({{ selectedCarListCount }})</view
          >
        </view>
      </view>
    </template>
    <!-- 未登录：提示登录 -->
    <view class="login-blank" v-else>
      <text class="text">登录后可查看购物车中的商品</text>
      <navigator url="/pages/login/login" hover-class="none">
        <button class="button">去登录</button>
      </navigator>
    </view>
    <!-- 猜你喜欢 -->
    <xtx-guess ref="guessRef"></xtx-guess>
    <!-- 底部占位空盒子 -->
    <view class="toolbar-height"></view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { useGuessList } from '@/composables'
import {
  deleteMemberCartAPI,
  getMemberCartAPI,
  putMemberCartBySkuIdAPI,
  putMemberCartSelectedAPI,
} from '@/services/cart'
import { useMemberStore } from '@/stores'
import type { CartItem } from '@/types/cart'
import type { InputNumberBoxEvent } from '@/types/vk-data-input-number-box'
import { onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

//猜你喜欢组合式函数
const { guessRef, onScrolltolower } = useGuessList()

const memberStore = useMemberStore()

// 获取购物车数据
const cartList = ref<CartItem[]>([])
const getMemberCartData = async () => {
  const res = await getMemberCartAPI()
  cartList.value = res.result
}

onShow(() => {
  if (memberStore.profile) getMemberCartData()
})

// 点击删除按钮，删除购物车物品
const onDeleteCart = (skuId: string) => {
  uni.showModal({
    content: '是否删除？',
    success: async (res) => {
      if (res.confirm) {
        await deleteMemberCartAPI({ ids: [skuId] })
        getMemberCartData()
      }
    },
  })
}

// 商品数量修改
const onChangeCount = (ev: InputNumberBoxEvent) => {
  putMemberCartBySkuIdAPI(ev.index, { count: ev.value })
}

// 选中状态
const isSelectedAll = computed(() => {
  return cartList.value.length && cartList.value.every((v) => v.selected)
})
const onChangeSelectedAll = () => {
  const _isSelectedAll = !isSelectedAll.value
  cartList.value.forEach((item) => {
    item.selected = _isSelectedAll
  })
  putMemberCartSelectedAPI({ selected: _isSelectedAll })
}
const onChangeSelected = (item: CartItem) => {
  item.selected = !item.selected
  putMemberCartBySkuIdAPI(item.skuId, { selected: item.selected })
}

// 计算选中单品列表
const selectedCartList = computed(() => {
  return cartList.value.filter((item) => item.selected)
})
// 计算选中总件数
const selectedCarListCount = computed(() => {
  return selectedCartList.value.reduce((sum, item) => sum + item.count, 0)
})
//计算选中总金额
const selectedCartListMoney = computed(() => {
  return selectedCartList.value
    .reduce((sum, item) => sum + item.count * item.nowPrice, 0)
    .toFixed(2)
})
// 结算按钮
const gotoPayment = () => {
  if (selectedCarListCount.value === 0) {
    return uni.showToast({
      icon: 'none',
      title: '请选择商品',
    })
  }
  uni.navigateTo({ url: '/pagesOrder/create/create' })
}
</script>

<style lang="scss" scoped>
.scroll-view {
  height: 100vh;
  background-color: #f7f7f8;
}

.cart-list {
  padding: 0 20rpx;

  .tips {
    display: flex;
    align-items: center;
    line-height: 1;
    margin: 30rpx 10rpx;
    font-size: 26rpx;
    color: #666;
    .label {
      color: #fff;
      padding: 7rpx 15rpx 5rpx;
      border-radius: 4rpx;
      font-size: 24rpx;
      background-color: #27ba9b;
      margin-right: 10rpx;
    }
  }

  .cart-swipe {
    display: block;
    margin: 20rpx 0;
  }

  .goods {
    display: flex;
    padding: 20rpx 20rpx 20rpx 80rpx;
    border-radius: 10rpx;
    background-color: #fff;
    position: relative;
    .navigator {
      display: flex;
    }
    .checkbox {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80rpx;
      height: 100%;
      &::before {
        content: '\e6cd';
        font-family: 'erabbit' !important;
        font-size: 40rpx;
        color: #444;
      }
      &.checked::before {
        content: '\e6cc';
        color: #27ba9b;
      }
    }
    .picture {
      width: 170rpx;
      height: 170rpx;
    }
    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20rpx;
      .name {
        height: 72rpx;
        font-size: 26rpx;
        color: #444;
      }
      .attrsText {
        line-height: 1.8;
        padding: 0 15rpx;
        font-size: 24rpx;
        align-self: flex-start;
        border-radius: 4rpx;
        color: #888;
        background-color: #f7f7f8;
      }
      .price {
        line-height: 1;
        font-size: 26rpx;
        color: #444;
        margin-bottom: 2rpx;
        color: #cf4444;
        &::before {
          content: '¥';
          font-size: 80%;
        }
      }
    }
    .count {
      position: absolute;
      bottom: 20rpx;
      right: 5rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 220rpx;
      height: 48rpx;
      .text {
        height: 100%;
        padding: 0 20rpx;
        font-size: 32rpx;
        color: #444;
      }
      .input {
        height: 100%;
        text-align: center;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: #444;
        background-color: #f6f6f6;
      }
    }
  }

  .cart-swipe-right {
    display: flex;
    height: 100%;
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      padding: 6px;
      line-height: 1.5;
      color: #fff;
      font-size: 26rpx;
      border-radius: 0;
    }
    .delete-button {
      background-color: #cf4444;
    }
  }
}

.cart-blank,
.login-blank {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 60vh;
  .image {
    width: 400rpx;
    height: 281rpx;
  }
  .text {
    color: #444;
    font-size: 26rpx;
    margin: 20rpx 0;
  }
  .button {
    width: 240rpx !important;
    height: 60rpx;
    line-height: 60rpx;
    margin-top: 20rpx;
    font-size: 26rpx;
    border-radius: 60rpx;
    color: #fff;
    background-color: #27ba9b;
  }
}

.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: var(--window-bottom);
  z-index: 2;
  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  border-top: 1rpx solid #ededed;
  border-bottom: 1rpx solid #ededed;
  background-color: #fff;
  box-sizing: content-box;
  .all {
    margin-left: 25rpx;
    font-size: 14rpx;
    color: #444;
    display: flex;
    align-items: center;
    &::before {
      font-family: 'erabbit' !important;
      content: '\e6cd';
      font-size: 40rpx;
      margin-right: 8rpx;
    }
    &.checked::before {
      content: '\e6cc';
      color: #27ba9b;
    }
  }
  .text {
    margin-right: 8rpx;
    margin-left: 23rpx;
    color: #444;
    font-size: 14px;
  }
  .amount {
    font-size: 20px;
    color: #cf4444;
    .decimal {
      font-size: 12px;
    }
    &::before {
      content: '¥';
      font-size: 12px;
    }
  }
  .button-grounp {
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 72rpx;
    font-size: 13px;
    color: #fff;
    .button {
      width: 240rpx;
      margin: 0 10rpx;
      border-radius: 72rpx;
    }
    .payment-button {
      background-color: #27ba9b;
      &.disabled {
        opacity: 0.6;
      }
    }
  }
}

.toolbar-height {
  height: 100rpx;
}
</style>
