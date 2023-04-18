/*
 * @Author: jiangruohui
 * @Date: 2022-03-14 15:49:50
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-03-31 14:31:11
 * @Description:
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    // 'plugin:vue/essential',
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 'vue/no-multiple-template-root': 'off', // 关闭多根节点的校验
    'no-param-reassign': 'off',
    // [
    //   'error',
    //   {
    //     props: true,
    //     ignorePropertyModificationsFor: [
    //       'state' // for vuex state
    //     ]
    //   }
    // ],
    'import/extensions': [
      // 解决ts引入报错
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'consistent-return': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'default-param-last': 'off',
    'prefer-object-spread': 'off',
    'no-empty': 'off',
    'import/no-unresolved': 'off',
    'func-names': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    }
  }
}
