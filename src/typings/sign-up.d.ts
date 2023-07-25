/*
 * @Author: huangjin
 * @Description: 报名
 */

// 报名规则
export interface TEMPLATE_ITEM {
  ident?: string // 唯一标识（code+desc+时间戳）
  code?: number // 枚举的返回值
  desc?: string // 枚举的返回值
  aliasLabelName?: string // label 内容 - 标题
  tips?: string // 备注，括号里面的内容
  unnecessary?: boolean // 是否不必填
  itemType?: string // once表示有具体的提交参数 normal表示统一由userInfo提交信息
  options?: any[] // 选项数据
  value?: any // 需要收集的数据
  templateUrl?: string // 上传文件的模板文件
  format?: string[] // 上传文件时用到的 文件格式限制
  naming?: number // 命名
  connector?: string // 连接符
  suffix?: string // 后缀
  valueMode?: number // 取值模式
}
