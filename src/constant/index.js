/*
 * @Author: HuZhangjie
 * @Date: 2020-07-09 14:14:32
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-18 16:53:15
 * @Description: 常量文件
 */

// 错误编码前半截
export const PRE_ERR_CODE = 'code_service_center_api_'

// 错误编码map对象
export const ERR_CODE_MAP = {
  NOT_EXIST: '-50001', // 报名链接不存在
  TIME_ILLEGAL: '-50002', // 报名链接链接时间不合法
  GIVE_UP: '-50003' // 报名链接链接已经废弃
}

// 自定义处理的错误编码
export const BIM_CUSTOMER_ERR_CODE_LIST = [
  PRE_ERR_CODE + [ERR_CODE_MAP.NOT_EXIST],
  PRE_ERR_CODE + [ERR_CODE_MAP.TIME_ILLEGAL],
  PRE_ERR_CODE + [ERR_CODE_MAP.GIVE_UP]
]

// 模板数据的key map对象
export const BASIS_TEMPLATE_KEY_MAP = {
  INPUT_NAME: 'INPUT_NAME', // 姓名
  INPUT_NAMEPINYIN: 'INPUT_NAMEPINYIN', // 姓名拼音
  INPUT_GENDER: 'INPUT_GENDER', // 性别
  INPUT_MOBILE: 'INPUT_MOBILE', // 手机号码
  INPUT_ADDRESS: 'INPUT_ADDRESS', // 通讯地址
  INPUT_EMAIL: 'INPUT_EMAIL', // 邮箱
  INPUT_CARDNO: 'INPUT_CARDNO', // 身份证号
  INPUT_NATION: 'INPUT_NATION', // 民族
  DATE_BORN: 'DATE_BORN', // 出生日期
  AREA_APPLYAREA: 'AREA_APPLYAREA', // 报考省市
  INPUT_SCHOOL: 'INPUT_SCHOOL', // 毕业院校
  DATE_GRADUATEDATE: 'DATE_GRADUATEDATE', // 毕业日期
  LIST_EDUCATION: 'LIST_EDUCATION', // 学历
  LIST_EXAM_AREA: 'LIST_EXAM_AREA', // 报考地点
  INPUT_PROFESSION: 'INPUT_PROFESSION', // 所学专业-输入框
  LIST_PROFESSION: 'LIST_PROFESSION', // 专业-list选项
  INPUT_UNIT: 'INPUT_UNIT', // 工作单位
  INPUT_WORKYEAR: 'INPUT_WORKYEAR', // 工作年限
  INPUT_THIRDACCOUNT: 'INPUT_THIRDACCOUNT', // 学习网站账号
  INPUT_THIRDPASSWORD: 'INPUT_THIRDPASSWORD', // 学习账号密码
  INPUT_CERT_NO: 'INPUT_CERT_NO', // 注册证书编号
  LIST_ADDITIONAL: 'LIST_ADDITIONAL', // 主项/增项
  DATE_TAKEJOBTIME: 'DATE_TAKEJOBTIME', // 参加工作时间
  LIST_UNIT_POSITION: 'LIST_UNIT_POSITION', // 职位
  INPUT_EXAM_ROOM: 'INPUT_EXAM_ROOM', // 考场名称
  LIST_QUALIFICATIONCERTIFICATE: 'LIST_QUALIFICATIONCERTIFICATE', // 资格证书
  LIST_LEVEL: 'LIST_LEVEL', // 级别
  LIST_DIRECTION: 'LIST_DIRECTION', // 方向
  LABEL_SOFTWAVE: 'LABEL_SOFTWAVE', // 软件
  UPLOAD_CARD_FRONT: 'UPLOAD_CARD_FRONT', // 身份证正面照-国徽
  UPLOAD_CARD_BACK: 'UPLOAD_CARD_BACK', // 身份证背面照-人像
  UPLOAD_PHOTO: 'UPLOAD_PHOTO', // 证件照
  UPLOAD_PREEDUCATION: 'UPLOAD_PREEDUCATION', // 前置学历照
  UPLOAD_EDUCATION: 'UPLOAD_EDUCATION', // 学历证书
  UPLOAD_EDUCATION_DOCFILE: 'UPLOAD_EDUCATION_DOCFILE', // 学历扫描件文档
  UPLOAD_EMPLOYMENT: 'UPLOAD_EMPLOYMENT', // 从业证书
  UPLOAD_WORK_IMAGE: 'UPLOAD_WORK_IMAGE', // 工作证明
  UPLOAD_APPLY_CHECK_IMAGE: 'UPLOAD_APPLY_CHECK_IMAGE', // 报名审核表照片
  UPLOAD_FIRE_CONFIRMATION_IMAGE: 'UPLOAD_FIRE_CONFIRMATION_IMAGE', // 智慧消防确认书
  UPLOAD_QUALIFICATION: 'UPLOAD_QUALIFICATION', // 资格证书
  UPLOAD_TRAINING_CONFIRM_IMAGE: 'UPLOAD_TRAINING_CONFIRM_IMAGE', // 培训确认书
  UPLOAD_FRONT_AND_BACK_IDCARD_DOCFILE: 'UPLOAD_FRONT_AND_BACK_IDCARD_DOCFILE', // 身份证正反面word文档
  UPLOAD_EDUCATION_PREPARE_DOCFILE: 'UPLOAD_EDUCATION_PREPARE_DOCFILE', // 学历备案表pdf文档
  UPLOAD_EDUCATION_CHECK_REPORT_DOCFILE: 'UPLOAD_EDUCATION_CHECK_REPORT_DOCFILE', // 学历验证报告pdf文档
  UPLOAD_TEMPLATE_DOCFILE: 'UPLOAD_TEMPLATE_DOCFILE' // 带模板的报名表
}

// 所有的模板数据的列表
export const BASIS_TEMPLATE_KEY_LIST = [
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_NAME,
    param: 'name',
    desc: '姓名'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_NAMEPINYIN,
    param: 'namepinyin',
    desc: '姓名拼音'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_GENDER,
    param: 'gender',
    desc: '性别'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_MOBILE,
    param: 'signUpMobile',
    desc: '手机号码'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_ADDRESS,
    param: 'address',
    desc: '通讯地址'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_EMAIL,
    param: 'email',
    desc: '邮箱'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_CARDNO,
    param: 'cardNo',
    desc: '身份证号'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_NATION,
    param: 'nation',
    desc: '民族'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.DATE_BORN,
    param: 'born',
    desc: '出生日期'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.AREA_APPLYAREA,
    param: 'applyArea',
    desc: '报考省市'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_SCHOOL,
    param: 'school',
    desc: '毕业院校'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.DATE_GRADUATEDATE,
    param: 'graduateDate',
    desc: '毕业日期'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.LIST_EDUCATION,
    param: 'education',
    desc: '学历'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.LIST_EXAM_AREA,
    param: 'examArea',
    desc: '报考地点'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.LIST_UNIT_POSITION,
    param: 'unitPosition',
    desc: '单位职务'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_EXAM_ROOM,
    param: 'examRoom',
    desc: '考场名称'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_PROFESSION,
    param: 'profession',
    desc: '所学专业'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.LIST_PROFESSION,
    param: 'profession',
    desc: '专业'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_UNIT,
    param: 'Unit',
    desc: '工作单位'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_WORKYEAR,
    param: 'workYear',
    desc: '工作年限'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_THIRDACCOUNT,
    param: 'thirdAccount',
    desc: '学习网站账号'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_THIRDPASSWORD,
    param: 'thirdPassword',
    desc: '学习网站密码'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.INPUT_CERT_NO,
    param: 'certNo',
    desc: '注册证书编号'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.LIST_ADDITIONAL,
    param: 'additional',
    desc: '主项/增项'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.LIST_QUALIFICATIONCERTIFICATE,
    param: 'qualificationCertificate',
    desc: '资格证书'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.LIST_LEVEL,
    param: 'level',
    desc: '级别'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.LIST_DIRECTION,
    param: 'direction',
    desc: '方向'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.LABEL_SOFTWAVE,
    param: '',
    desc: '软件'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_CARD_FRONT,
    param: 'cardImage',
    desc: '身份证照'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_CARD_BACK,
    param: 'cardImage',
    desc: '身份证背面照'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_PHOTO,
    param: 'photoImage',
    desc: '证件照' // 一寸或二寸照
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_EDUCATION,
    param: 'educationImage',
    desc: '学历照片'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_EDUCATION_DOCFILE,
    param: 'educationDocFile',
    desc: '学历扫描件文档'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_WORK_IMAGE,
    param: 'workImage',
    desc: '工作证明'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_APPLY_CHECK_IMAGE,
    param: 'applyCheckImage',
    desc: '报名审核表'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_FIRE_CONFIRMATION_IMAGE,
    param: 'fireConfirmAtionImage',
    desc: '智慧消防确认书'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_EMPLOYMENT,
    param: 'employmentImage',
    desc: '从业证书'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_QUALIFICATION,
    param: 'qualificationImage',
    desc: '资格证书'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_TRAINING_CONFIRM_IMAGE,
    param: 'trainingConfirmationImage',
    desc: '培训确认书'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_FRONT_AND_BACK_IDCARD_DOCFILE,
    inputParameter: 'idCardFrontBackDocFile',
    desc: '身份证正反面word'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_EDUCATION_PREPARE_DOCFILE,
    inputParameter: 'educationPrepareDocFile',
    desc: '学历备案表',
    chosenType: '1/2',
    chosenName: '学历证明'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_EDUCATION_CHECK_REPORT_DOCFILE,
    inputParameter: 'educationCheckReportDocFile',
    desc: '学历验证报告',
    chosenType: '1/2',
    chosenName: '学历证明'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_TEMPLATE_DOCFILE,
    inputParameter: 'templateDocFile',
    desc: '带模板的报名表'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.UPLOAD_PREEDUCATION,
    inputParameter: 'preEducationImage',
    desc: '【选填项】如果现有学历不符合报考年限，请上传前置学历照片，要求图片清晰、边缘无留白，4M以内'
  },
  {
    key: BASIS_TEMPLATE_KEY_MAP.DATE_TAKEJOBTIME,
    inputParameter: 'takeJobTime',
    desc: '请输入您正确的参加工作时间'
  }
]

// 资料填写状态Map
export const DATA_WRITE_STATUS_MAP = {
  WAIT_WRITE: 1, // 待填写
  WRITEING: 2, // 填写中
  WRITED: 3 // 已填写
}

// 审核结果状态Map
export const AUDIT_STATUS_MAP = {
  WAIT_AUDIT: 1, // 待审核
  AUDIT_FAIL: 2, // 审核失败
  AUDIT_SUCCESS: 3, // 审核成功
  FIRST_AUDIT_FAIL: 7, // 一级审核失败
  FIRST_AUDIT_SUCCESS: 8, // 一级审核成功(状态为待终审)
  SECOND_AUDIT_FAIL: 13, // 二级审核失败
  SECOND_AUDIT_SUCCESS: 14 // 二级审核成功
}

// 考试状态
export const EXAM_STATUS_MAP = {
  UNKNOWN: 1, // 未知
  FAIL: 2, // 不通过
  PASS: 3 // 通过
}

// 各个报名机构的证件照大小限制 单位: kb
// 确定的是建教协的证件照50k,其他都是200k 2021.05.12
export const ID_PHOTO_ORGAN_SIZE_MAP = {
  // 2: 200, // 人社专技 200K
  4: 50, // 中国建设教育协会 50k
  // 5: 50, // 中国职鉴BIM 50k
  // 6: 50, // NTC-BIM 50k
  // 8: 50, // 邮电通信人才交流中心 50k
  // 9: 30, // 人事人才网 30k
  // 10: 50 // 工信部教考中心 50k
  11: 100, // bim 100K
  12: 50, // 浙江建委-三类人员 50K
  13: 80, // 建设教育协会-建协八大员 80K
  14: 80, // 浙江省住房与城乡建设厅-浙江七大员 80K
  16: 60 // 智慧建造师 60K
}

// pdf预览地址
export const PDF_VIEWER_HOST = 'https://www.xuetian.cn/pdf/web/viewer.html'
