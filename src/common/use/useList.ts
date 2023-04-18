/*
 * @Author: jiangruohui
 * @Date: 2022-05-10 16:13:38
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-01-06 17:07:42
 * @Description: 上拉加载，下拉刷新
 */
import { Ref } from 'vue'

/**
 * @method: useList
 * @description 上拉加载，下拉刷新
 * @param {Ref} list 列表数据
 * @param {any} listParams 请求列表参数, 可以是ref创建的数据，也可以是普通对象
 * @param {any} queryList 请求列表接口
 * @return {*}
 */
export default function useList(list: Ref<any[]>, listParams: any, queryList: any, successCallback?: any) {
  const pagination = reactive({
    pageNum: 1,
    pageSize: 10
  })
  const loading = ref(false)
  const finished = ref(false)
  const error = ref(false)
  const refreshing = ref(false)

  /**
   * 刷新数据
   */
  const onRefresh = () => {
    finished.value = false
    loading.value = true
    pagination.pageNum = 1
    list.value = []
    getList()
  }

  /**
   * 上拉加载
   */
  const loadMore = () => {
    loading.value = true
    pagination.pageNum += 1
    getList()
  }

  const getList = () => {
    const { pageNum, pageSize } = pagination
    queryList({ ...unref(listParams), pageNum, pageSize }).then(
      (res: any) => {
        // 加载状态结束
        loading.value = false
        if (refreshing.value) {
          refreshing.value = false
        }
        const { total } = res.data
        const data = (res.data && res.data.list) || []
        if (pageNum === 1) {
          list.value = data
        } else {
          list.value = [...list.value, ...data]
        }
        if (pageSize * pageNum >= total) {
          finished.value = true
        }
        if (successCallback) {
          successCallback()
        }
      },
      () => {
        loading.value = false
        error.value = true
        if (refreshing.value) {
          refreshing.value = false
        }
      }
    )
  }

  return {
    pagination,
    loading,
    finished,
    error,
    refreshing,
    onRefresh,
    loadMore
  }
}
