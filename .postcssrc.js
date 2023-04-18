/*
 * @Author: jiangruohui
 * @Date: 2022-03-15 17:19:13
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-03-15 17:25:43
 * @Description: 
 */
module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      rootValue: 37.5,
      // Vant 官方根字体大小是 37.5
      propList: ['*'],
      selectorBlackList: ['.norem']
      // 过滤掉.norem-开头的class，不进行rem转换
    }
  }
}
