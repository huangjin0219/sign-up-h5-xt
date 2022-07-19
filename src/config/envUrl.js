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
    testing: 'https://testservicecenterapi.xuetian.cn',
    production: 'https://servicecenterapi.xuetian.cn'
  },
  // 配置中心
  setting: {
    development: 'https://devdataconfigapi.xuetian.cn',
    testing: 'https://testdataconfigapi.xuetian.cn',
    production: 'https://dataconfigapi.xuetian.cn'
  },
  // 用户中心域名
  uic: {
    development: 'https://devxtapi.xuetian.cn/uic',
    testing: 'https://testxtapi.xuetian.cn/uic',
    production: 'https://xtapi.xuetian.cn/uic'
  },
  // data-service服务，上传图片
  ds: {
    development: 'https://devxtapi.xuetian.cn/data-service',
    testing: 'https://testxtapi.xuetian.cn/data-service',
    production: 'https://dsw.xuetian.cn'
  },
  // 新网校
  rhea: {
    development: 'https://devrhea.xuetian.cn',
    testing: 'https://testrhea.xuetian.cn',
    production: 'https://rhea.xuetian.cn'
  },
  // admin - finance里面用到
  crmadmin: {
    development: 'https://devcrmadminj.xuetian.cn',
    testing: 'https://testcrmadminj.xuetian.cn',
    production: 'https://crmadminj.xuetian.cn'
  },
  zeus: {
    development: 'https://devxtapi.xuetian.cn/zeus',
    testing: 'https://testxtapi.xuetian.cn/zeus',
    production: 'https://xtapi.xuetian.cn/zeus'
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
