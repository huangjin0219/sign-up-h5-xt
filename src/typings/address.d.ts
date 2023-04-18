export interface AddressItem {
  name: string
  addressId: number | string
  mobile: string
  defaultFlag: number
  province?: string
  provinceId: number
  city?: string
  cityId: number
  area?: string
  areaId: number
  address: string
}

export interface Area {
  areaId: number
  name: string
  text?: string
}
