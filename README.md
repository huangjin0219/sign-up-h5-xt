<!--
 * @Author: jiangruohui
 * @Date: 2022-03-14 14:42:23
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-11-15 16:38:35
 * @Description: 
-->
# 运行项目
yarn dev
# 打包项目
yarn build

## 目录结构

├── publish/
└── src/
    ├── assets/                    // 静态资源目录
    ├── common/                    // 通用类库目录
    ├── components/                // 公共组件目录
    ├── router/                    // 路由配置目录
      ├── index.ts                    // 路由配置文件
    ├── store/                     // 状态管理目录
    ├── style/                     // 通用 CSS 目录
    ├── utils/                     // 工具函数目录
    ├── views/                     // 页面组件目录
    ├── App.vue
    ├── main.ts
    ├── shims-vue.d.ts
├── tests/                         // 单元测试目录
├── index.html
├── tsconfig.json                  // TypeScript 配置文件
├── vite.config.ts                 // Vite 配置文件
└── package.json


-----
### 开发规范：
1. 页面组件不允许多根节点。vue3支持多根节点，但`<transition>`只能用于单元素/组件之上，为了保证路由切换正常，该项目的页面组件不允许多根节点。

-----
### SvgIcon使用
```
<SvgIcon name="user" color="#999" />
```

### router
```以我的订单页为例
{
  path: '/order',
  name: 'MyOrder',
  component: () => import('@/views/order/my/index.vue'),
  meta: { 
    title: '我的订单',  // 页面标题
    requireAuth: true, // 页面是否需要校验登陆
    keepAlive: true    // 缓存页面
  }
}
```

### 全局过滤器的使用
```template
  <p>{{ $filters.currency(price) }}</p>
```

### unplugin-auto-import

使用插件自动引入vue API， 无需在组件里手动引用

vite.config.ts
```
export default defineConfig({
  ...
  AutoImport({
    // 有新增的库加在这里，重启项目就会更新这个文件 src/auto-import.d.ts
    imports: ['vue', 'vue-router', 'pinia'],
    dts: 'src/auto-import.d.ts'
  })
}
```

### vueUse

### vscode扩展程序json2ts

> 通过json自动生成ts的interface接口定义

复制到剪贴板，快捷键cmd+alt+V or ctrl+alt+V

### vscode配置用户代码片段
设置 -> 用户代码片段 -> 新建一个全局脚本
```json
{
	"Print to console": {
		"prefix": "vue3",
		"body": [
      "<template>",
      "  <div></div>",
      "</template>",
      "",
      "<script lang='ts' setup></script>",
			"<script lang='ts'>",
			"export default {",
			"  name: 'ComponentName'",
			"}",
      "</script>",
      "",
			"<style lang='scss' scoped>",
			"</style>",
			""
		],
		"description": "vue3模板"
	}
}
```
---

###开发约定
1. 公共路由参数： 
```
{
  token: '' , // 用户token
  env: 'minipro' // 浏览器环境类型 'minipro' | 'app' | 'h5'
}
```