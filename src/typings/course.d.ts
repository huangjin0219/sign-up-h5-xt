/*
 * @Author: jiangruohui
 * @Date: 2022-04-15 10:20:59
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-01-05 13:50:29
 * @Description:
 */
export interface TeacherModel {
  teacherCode: string
  teacherName: string
  teacherImageUrl: string
  teacherDescription: string
  teacherType: number
  teacherTypeDesc: string
  projectNames: string[] | null
  subjectNames: string[] | null
}

export interface CourseOutline {
  id: number
  courseCode: string
  courseName: string
  courseType: number
  courseTypeDesc: string
  sequence: number
  hasAudition: number | null
}

export interface PackageOutline {
  abbreviationName: string
  packageCode: string
  subjectCode: string
  courseOutlineList: CourseOutline[]
}

export interface Product {
  productCode: string
  productName: string
  imageUrl?: string
  abbreviationName: string
  examinationPeriodType: number
  examinationPeriodTypeDesc: string
  saleStartTime: number
  saleEndTime: number
  salePrice: number
  packageCodes: string[]
  electronicLabels: string[]
  paperLabels: string[]
  continuedReadConfig?: {
    continuedReadCount: number
  } | null
  scholarshipConfig?: any
  refundConfig?: any
  contractCode?: string
  isHaveMaterialGood?: boolean
  [propName: string]: any
}

export interface ProductGroup {
  id: number
  name: string
  productGroupCode: string
  year: string
  imageUrl: string
  description: string
  markingLabels: string[]
  serviceLabels: string[]
  saleProductType: number
  saleProductTypeDesc: string
  hasAudition: number
  teacherModel: TeacherModel[]
  packageList: any[]
  productList: Product[]
  packageOutlineList: PackageOutline[]
}

// 自选课程
export interface OptionalCourse extends Product {
  saleProductType: number
  saleProductTypeDesc: string
  imageUrl: string
  effectiveStartTime: number
  effectiveEndTime: number
  courseStatus: number
  courseStatusDesc: string
  isExpire?: boolean
}

export interface ProductGroupItem {
  productGroupCode?: string
  name?: string
  imageUrl?: string
  markingLabels?: string[]
  teacherModel?: TeacherModel[]
  salePrice: number
  visitNum?: number
  canUseConpons: 0 | 1 // 能否使用优惠券
  discountSalePrice: number // 券后价
}
