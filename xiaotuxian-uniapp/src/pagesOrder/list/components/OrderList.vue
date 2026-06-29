<template>
  <scroll-view
    class="orders"
    scroll-y
    @scrolltolower="getMemberOrderData"
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
  >
    <!-- 订单列表 -->
    <view class="card" v-for="item in orderList" :key="item.id">
      <view class="status">
        <text class="date">{{ item.createTime }}</text>
        <text>{{ orderStateList[item.orderState].text }}</text>
        <!-- 待评价/已完成/已取消 状态：展示删除订单 -->
        <text
          class="icon-delete"
          v-if="
            [OrderState.DaiPingJia, OrderState.YiWanCheng, OrderState.YiQuXiao].includes(
              item.orderState,
            )
          "
          @tap="onOrderDelete(item.id)"
        ></text>
      </view>
      <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
      <navigator
        class="goods"
        hover-class="none"
        v-for="sku in item.skus"
        :key="sku.id"
        :url="`/pagesOrder/detail/detail?id=${item.id}`"
      >
        <view class="cover">
          <image :src="sku.image" mode="aspectFit" />
        </view>
        <view class="meta">
          <view class="name ellipsis">{{ sku.name }}</view>
          <view class="type">{{ sku.attrsText }}</view>
        </view>
      </navigator>
      <!-- 支付信息 -->
      <view class="payment">
        <text class="quantity">共{{ item.totalNum }}件商品</text>
        <text>实付</text>
        <text class="amount"><text class="symbol">¥</text>{{ item.payMoney }}</text>
      </view>
      <!-- 订单操作按钮 -->
      <view class="action">
        <!-- 待付款状态：显示去支付按钮 -->
        <template v-if="item.orderState == OrderState.DaiFuKuan">
          <view class="button primary" @tap="onOrderPay(item.id)">去支付</view>
        </template>
        <template v-else>
          <navigator
            class="button secondary"
            hover-class="none"
            :url="`/pagesOrder/create/create?orderId=${item.id}`"
          >
            再次购买
          </navigator>
          <!-- 待收货状态：展示确认收货 -->
          <view
            class="button primary"
            v-if="item.orderState == OrderState.DaiShouHuo"
            @tap="onOrderConfirm(item.id)"
          >
            确认收货
          </view>
        </template>
      </view>
    </view>
    <!-- 底部提示文字 -->
    <view class="loading-text" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
      {{ true ? '没有更多数据～' : '正在加载' }}
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { OrderState, orderStateList } from '@/services/constants'
import {
  deleteMemberOrderAPI,
  getMemberOrderAPI,
  getPayMockAPI,
  getPayWxPayMiniPayAPI,
  putMemberOrderReceiptByIdAPI,
} from '@/services/order'
import type { OrderItem, OrderListParams } from '@/types/order'
import { onMounted, ref } from 'vue'

const { safeAreaInsets } = uni.getSystemInfoSync()
const props = defineProps<{
  orderStatus: number
}>()

// 请求参数
const queryParams: Required<OrderListParams> = {
  page: 1,
  pageSize: 5,
  orderState: props.orderStatus,
}
const finish = ref(false)

// 获取订单列表
const orderList = ref<OrderItem[]>([])
const getMemberOrderData = async () => {
  if (finish.value == true) return uni.showToast({ icon: 'none', title: '没有更多数据～' })
  const res = await getMemberOrderAPI(queryParams)
  orderList.value.push(...res.result.items)
  if (queryParams.page < res.result.pages) queryParams.page++
  else finish.value = true
}

onMounted(() => {
  getMemberOrderData()
})

const isTriggered = ref(false)
// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  isTriggered.value = true
  resetData()
  await getMemberOrderData()
  isTriggered.value = false
}

const resetData = () => {
  queryParams.page = 1
  orderList.value = []
  finish.value = false
}

// 确认收货
const onOrderConfirm = (id: string) => {
  uni.showModal({
    content: '为保障您的权益，请收到货并确认无误后，再确认收货',
    success: async (success) => {
      if (success.confirm) {
        const res = await putMemberOrderReceiptByIdAPI(id)
        resetData()
        getMemberOrderData()
      }
    },
  })
}
// 删除订单
const onOrderDelete = (id: string) => {
  uni.showModal({
    content: '确认删除订单？删除后订单数据无法恢复',
    success: async (success) => {
      if (success.confirm) {
        const res = await deleteMemberOrderAPI({ ids: [id] })
        uni.showToast({ icon: 'success', title: '删除订单成功' })
        resetData()
        getMemberOrderData()
      }
    },
  })
}
// 订单支付
const onOrderPay = async (id: string) => {
  // 通过环境变量区分开发环境
  if (import.meta.env.DEV) {
    // 开发环境：模拟支付，修改订单状态为已支付
    await getPayMockAPI({ orderId: id })
  } else {
    // 生产环境：获取支付参数 + 发起微信支付
    const res = await getPayWxPayMiniPayAPI({ orderId: id })
    await wx.requestPayment(res.result)
  }
  // 关闭当前页，再跳转支付结果页
  uni.redirectTo({ url: `/pagesOrder/payment/payment?id=${id}` })
}
</script>

<style lang="scss" scoped>
.orders {
  .card {
    min-height: 100rpx;
    padding: 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;
    &:last-child {
      padding-bottom: 40rpx;
    }
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #999;
    margin-bottom: 15rpx;
    .date {
      color: #666;
      flex: 1;
    }
    .primary {
      color: #ff9240;
    }
    .icon-delete {
      line-height: 1;
      margin-left: 10rpx;
      padding-left: 10rpx;
      border-left: 1rpx solid #e3e3e3;
    }
  }
}

.goods {
  display: flex;
  margin-bottom: 20rpx;
  .cover {
    width: 170rpx;
    height: 170rpx;
    margin-right: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    position: relative;
  }
  .quantity {
    position: absolute;
    bottom: 0;
    right: 0;
    line-height: 1;
    padding: 6rpx 4rpx 6rpx 8rpx;
    font-size: 24rpx;
    color: #fff;
    border-radius: 10rpx 0 0 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .name {
    height: 80rpx;
    font-size: 26rpx;
    color: #444;
  }
  .type {
    line-height: 1.8;
    padding: 0 15rpx;
    margin-top: 10rpx;
    font-size: 24rpx;
    align-self: flex-start;
    border-radius: 4rpx;
    color: #888;
    background-color: #f7f7f8;
  }
  .more {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22rpx;
    color: #333;
  }
}

.payment {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  line-height: 1;
  padding: 20rpx 0;
  text-align: right;
  color: #999;
  font-size: 28rpx;
  border-bottom: 1rpx solid #eee;
  .quantity {
    font-size: 24rpx;
    margin-right: 16rpx;
  }
  .amount {
    color: #444;
    margin-left: 6rpx;
  }
  .symbol {
    font-size: 20rpx;
  }
}

.action {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 20rpx;
  .button {
    width: 180rpx;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20rpx;
    border-radius: 60rpx;
    border: 1rpx solid #ccc;
    font-size: 26rpx;
    color: #444;
  }
  .secondary {
    color: #27ba9b;
    border-color: #27ba9b;
  }
  .primary {
    color: #fff;
    background-color: #27ba9b;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
