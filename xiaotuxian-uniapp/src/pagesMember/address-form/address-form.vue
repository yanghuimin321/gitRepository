<template>
  <view class="content">
    <uni-forms ref="formRef" :model="form" :rules="rules">
      <uni-forms-item class="form-item" name="receiver">
        <text class="label">收货人</text>
        <input type="text" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </uni-forms-item>
      <uni-forms-item class="form-item" name="contact">
        <text class="label">手机号码</text>
        <input type="text" placeholder="请填写收货人手机号码" v-model="form.contact" />
      </uni-forms-item>
      <uni-forms-item class="form-item" name="fullLocation">
        <text class="label">所在地区</text>
        <picker mode="region" :value="form.fullLocation.split(' ')" @change="onRegionChange">
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view class="placeholder" v-else>请选择省/市/区(县)</view>
        </picker>
      </uni-forms-item>
      <uni-forms-item class="form-item" name="address">
        <text class="label">详细地址</text>
        <input type="text" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </uni-forms-item>
      <uni-forms-item class="form-item">
        <text class="label">设为默认地址</text>
        <switch :checked="form.isDefault == 1" color="#27ba9b" @change="onSwitchChange" />
      </uni-forms-item>
    </uni-forms>
  </view>
  <button @tap="onSubmit">保存并使用</button>
</template>

<script lang="ts" setup>
import {
  getMemberAddressByIdAPI,
  postMemberAddressAPI,
  putMemberAddressByIdAPI,
} from '@/services/address'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const query = defineProps<{
  id?: string
}>()
const formRef = ref<UniHelper.UniFormsInstance>()
// 表单校验规则
const rules: UniHelper.UniFormsRules = {
  receiver: {
    rules: [{ required: true, errorMessage: '请输入收货人姓名' }],
  },
  contact: {
    rules: [
      { required: true, errorMessage: '请输入联系方式' },
      { pattern: /^1[3-9]\d{9}$/, errorMessage: '手机号格式不正确' },
    ],
  },
  fullLocation: {
    rules: [{ required: true, errorMessage: '请选择所在地区' }],
  },
  address: {
    rules: [{ required: true, errorMessage: '请选择详细地址' }],
  },
}
// 动态设置标题
uni.setNavigationBarTitle({ title: query.id ? '修改地址' : '新建地址' })

//获取收货地址详情数据
const getMemberAddressByIdData = async () => {
  if (query.id) {
    const res = await getMemberAddressByIdAPI(query.id)
    Object.assign(form.value, res.result)
  }
}

onLoad(() => {
  getMemberAddressByIdData()
})

// 表单数据
const form = ref({
  receiver: '', //收货人
  contact: '', //联系方式
  fullLocation: '', //省市区（前端展示）
  provinceCode: '', //省份编码（后端参数）
  cityCode: '', //城市编码（后端参数）
  countyCode: '', //区/县编码（后端参数）
  address: '', //详细地址
  isDefault: 0, //是否为默认地址，1是，0否
})

// change事件更新表单数据
const onRegionChange: UniHelper.RegionPickerOnChange = (ev) => {
  form.value.fullLocation = ev.detail.value.join(' ')
  const [provinceCode, cityCode, countyCode] = ev.detail.code!
  Object.assign(form.value, { provinceCode, cityCode, countyCode })
}
const onSwitchChange: UniHelper.SwitchOnChange = (ev) => {
  form.value.isDefault = ev.detail.value ? 1 : 0
}

// 提交表单
const onSubmit = async () => {
  try {
    await formRef.value?.validate?.()
    if (query.id) await putMemberAddressByIdAPI(query.id, form.value)
    else await postMemberAddressAPI(form.value)
    uni.showToast({ icon: 'success', title: '添加成功' })
    setTimeout(() => {
      uni.navigateBack()
    }, 400)
  } catch (error) {
    uni.showToast({ icon: 'error', title: '请填写完整信息' })
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  :deep(.uni-forms-item) {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;
    &:last-child {
      border: none;
    }
    .label {
      width: 200rpx;
      color: #333;
    }
    input {
      flex: 1;
      display: block;
      height: 46rpx;
    }
    switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }
    picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }
}

//调整uni-forms样式
:deep(.uni-forms-item__content) {
  display: flex;
  align-items: center;
}
:deep(.uni-forms-item__error) {
  margin-left: 200rpx;
}

button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
