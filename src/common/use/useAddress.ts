/*
 * @Author: jiangruohui
 * @Date: 2022-04-21 18:02:45
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-04-28 10:44:01
 * @Description: 选择地址
 */
import { AddressItem } from '@/typings/address'
import { queryDefaultAddress } from '@/common/api/address'
import { getStore } from '@/utils/store'

export default function useAddress() {
  const address = ref<AddressItem | null>(null)
  const router = useRouter()

  const addressDetail = computed(() => {
    if (address.value) {
      return `${address.value.province}${address.value.city}${address.value.area}${address.value.address}`
    }
    return ''
  })

  /**
   * 获取地址
   */
  const getAddress = () => {
    return new Promise<void>((resolve, reject) => {
      const addressStore = getStore('orderAddress', 'session')
      if (addressStore) {
        address.value = addressStore
        resolve()
        return
      }
      // 查询用户默认地址
      queryDefaultAddress()
        .then((res) => {
          if (res.data) {
            address.value = Object.assign({}, res.data, { defaultFlag: 1 })
            resolve()
            return
          }
          reject()
        })
        .catch(() => {
          reject()
        })
    })
  }

  /**
   * 选择地址
   */
  const chooseAddress = () => {
    const query = address.value?.addressId ? `?id=${address.value?.addressId}` : ''
    router.push(`/user/address/choose${query}`)
  }

  return {
    address,
    addressDetail,
    getAddress,
    chooseAddress
  }
}
