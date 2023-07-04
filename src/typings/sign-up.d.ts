/*
 * @Author: huangjin
 * @Description: 报名
 */

// 报名规则
export interface TEMPLATE_ITEM {
  ident?: string
  code?: number
  desc?: string
  aliasLabelName?: string // label 内容 - 标题
  tips?: string // 备注，括号里面的内容
  unnecessary?: boolean // 是否不必填
  itemType?: string // once表示有具体的提交参数
  options?: any[] // 选项数据
  value?: any // 需要收集的数据
  templateUrl?: string // 上传文件的模板文件
  format?: string[] // 上传文件时用到的 文件格式限制
}
