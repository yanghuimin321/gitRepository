<template>
  <page-skeleton v-if="loading"></page-skeleton>
  <view class="viewport" v-else>
    <!-- 搜索框 -->
    <view class="search">
      <view class="input">
        <text class="icon-search">女靴</text>
      </view>
    </view>
    <!-- 分类 -->
    <view class="categories">
      <!-- 左侧：一级分类 -->
      <scroll-view class="primary" scroll-y>
        <view
          class="item"
          v-for="(item, index) in categoryList"
          :key="item.id"
          :class="{ active: index == activeIndex }"
          @tap="activeIndex = index"
        >
          <text class="name">{{ item.name }}</text>
        </view>
      </scroll-view>
      <!-- 右侧：二级分类 -->
      <scroll-view class="secondary" scroll-y>
        <!-- 轮播图 -->
        <xtx-swiper class="banner" :list="bannerList"></xtx-swiper>
        <!-- 内容 -->
        <view class="panel" v-for="item in subCategoryList" :key="item.id">
          <view class="title">
            <text class="name">{{ item.name }}</text>
            <navigator class="more" hover-class="none">全部</navigator>
          </view>
          <view class="section">
            <navigator
              class="goods"
              hover-class="none"
              v-for="goods in item.goods"
              :key="goods.id"
              :url="`/pages/goods/goods?id=${goods.id}`"
            >
              <image :src="goods.picture" />
              <view class="name ellipsis">{{ goods.name }}</view>
              <view class="price">
                <text class="symbol">￥</text>
                <text class="number">{{ goods.price }}</text>
              </view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getCategoryBannerAPI, getCategoryTopAPI } from '@/services/category'
import type { CategoryTopItem } from '@/types/category'
import type { BannerItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import PageSkeleton from './components/PageSkeleton.vue'

const loading = ref(false)
onLoad(async () => {
  loading.value = true
  await Promise.all([getCategoryTopData(), getCategoryBannerData()])
  loading.value = false
})

// 轮播图数据
const bannerList = ref<BannerItem[]>([])
const getCategoryBannerData = async () => {
  const res = await getCategoryBannerAPI()
  bannerList.value = res.result
}

//分类数据
const categoryList = ref<CategoryTopItem[]>([])
const getCategoryTopData = async () => {
  const res = await getCategoryTopAPI()
  categoryList.value = res.result
}

//高亮下标
const activeIndex = ref(0)

// 当前选中高亮二级分类数据
const subCategoryList = computed(() => {
  return categoryList.value[activeIndex.value]?.children || []
})
</script>

<style lang="scss" scoped>
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;

  .search {
    padding: 20rpx 30rpx;
    background-color: #fff;
    .input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64rpx;
      padding-left: 26rpx;
      color: #8b8b8b;
      font-size: 28rpx;
      border-radius: 32rpx;
      background-color: #f3f4f4;
    }
    .icon-search::before {
      margin-right: 10rpx;
    }
  }

  .categories {
    flex: 1;
    min-height: 400rpx;
    display: flex;
    // 一级分类
    .primary {
      overflow: hidden;
      width: 180rpx;
      flex: none;
      background-color: #f6f6f6;
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 96rpx;
        font-size: 26rpx;
        color: #595c63;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 42rpx;
          bottom: 0;
          width: 96rpx;
          border-top: 1rpx solid #e3e4e7;
        }
      }

      .active {
        background-color: #fff;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 8rpx;
          height: 100%;
          background-color: #27ba9b;
        }
      }
    }
    .primary .item:last-child::after,
    .primary .active::after {
      display: none;
    }

    // 二级分类
    .secondary {
      background-color: #fff;
      :deep(.carousel) {
        height: 200rpx;
        margin: 0 30rpx 20rpx;
        border-radius: 4rpx;
        overflow: hidden;
      }

      .panel {
        margin: 0 30rpx 0rpx;
        .title {
          height: 60rpx;
          line-height: 60rpx;
          color: #333;
          font-size: 28rpx;
          border-bottom: 1rpx solid #f7f7f8;
          .more {
            float: right;
            padding-left: 20rpx;
            font-size: 24rpx;
            color: #999;
            &::after {
              font-family: 'erabbit' !important;
              content: '\e6c2';
            }
          }
        }
        .section {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding: 20rpx 0;
          .goods {
            width: 150rpx;
            margin: 0rpx 30rpx 20rpx 0;
            &:nth-child(3n) {
              margin-right: 0;
            }
            image {
              width: 150rpx;
              height: 150rpx;
            }
            .name {
              padding: 5rpx;
              font-size: 22rpx;
              color: #333;
            }
            .price {
              padding: 5rpx;
              font-size: 18rpx;
              color: #cf4444;
            }
            .number {
              font-size: 24rpx;
              margin-left: 2rpx;
            }
          }
        }
      }
    }
  }
}
</style>
