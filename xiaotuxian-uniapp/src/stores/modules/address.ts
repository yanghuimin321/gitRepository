import type { AddressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore('address', () => {
  const seletedAddress = ref<AddressItem>()

  const changeSelectedAddress = (val: AddressItem) => {
    seletedAddress.value = val
  }

  return { seletedAddress, changeSelectedAddress }
})
