const env = process.env.VUE_APP_ENV
console.log('TCL: ====================== process.env', process.env)

const API_URL_DEV = 'https://devxtapi.xuetian.cn'
const API_URL_TEST = 'https://testxtapi.xuetian.cn'
const API_URL_PROD = 'https://xtapi.xuetian.cn'
export function getEnvUrl (path) {
  return {
    development: `${API_URL_DEV}/${path}`,
    testing: `${API_URL_TEST}/${path}`,
    production: `${API_URL_PROD}/${path}`
  }
}

const server = {
  // ===================普通域名 start===============

  // 业务线域名
  business: {
    development: 'https://devservicecenterapi.xuetian.cn',
    testing: 'https://devservicecenterapi.xuetian.cn',
    production: 'https://servicecenterapi.xuetian.cn'
  },
  // 配置中心
  setting: {
    development: 'https://testdataconfigapi.xuetian.cn',
    testing: 'https://testdataconfigapi.xuetian.cn',
    production: 'https://testdataconfigapi.xuetian.cn'
  },
  // 用户中心域名
  uic: {
    development: 'https://devuseruic.xuetian.cn',
    testing: 'https://devuseruic.xuetian.cn',
    production: 'https://uic.xuetian.cn'
  },
  // data-service服务，上传图片
  ds: {
    development: 'https://dsw.xuetian.cn',
    testing: 'https://dsw.xuetian.cn',
    production: 'https://dsw.xuetian.cn'
  },
  // 新网校
  rhea: {
    development: 'https://devrhea.xuetian.cn',
    testing: 'https://devrhea.xuetian.cn',
    production: 'https://rhea.xuetian.cn'
  },
  // admin - finance里面用到
  crmadmin: {
    development: 'https://devcrmadminj.xuetian.cn',
    testing: 'https://testcrmadminj.xuetian.cn',
    production: 'https://crmadminj.xuetian.cn'
  },
  // servicecenterboss: {
  //   development: 'https://devservicecenterboss.xuetian.cn',
  //   testing: 'https://devservicecenterboss.xuetian.cn',
  //   production: 'https://servicecenterboss.xuetian.cn'
  // }
  // ===================普通域名 end===============
  // ===================统一域名 start===============
  // 报名C端
  'crm-business': {
    ...getEnvUrl('crm-business')
  }
  // ===================统一域名 end===============
}

export const getBaseUrl = (system = 'business') => {
  return server[system][env]
}

export const getServerDomain = () => {
  return server.crmadmin[env]
}
