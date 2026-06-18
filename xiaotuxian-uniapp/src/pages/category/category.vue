<template>
  <view class="viewport">
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
        <view class="item" v-for="(item, index) in 10" :key="item" :class="{ active: index == 0 }">
          <text class="name">居家</text>
        </view>
      </scroll-view>
      <!-- 右侧：二级分类 -->
      <scroll-view class="secondary" scroll-y> </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
