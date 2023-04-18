/*
 * @Author: jiangruohui
 * @Date: 2022-05-10 17:13:22
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-06-14 16:06:44
 * @Description:
 */
export interface ContractItem {
  contractName: string // 产品合同名称
  productName: string // 商品名称
  createdTime: string // 创建时间
  afterFileXtossUrl: string // 网签后合同文本的学天的oss路径
  [propName: string]: any
}
