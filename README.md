## 使用

```bash
  # 安装依赖
  npm install
  
  # 启动服务
  npm run dev           # 测试环境
  npm run server:dev    # 测试环境
  npm run server:prod   # 生产环境
```

## 发布
```bash
  npm run build:dev         # 测试环境
  npm run build:prod        # 生产环境
```

## 分支管理
```bash
  - master          # 生产分支
  - dev             # 测试分支
  - feature_*       # 开发分支
```

## 项目架构
```
school_h5
├─ .browserslistrc
├─ .editorconfig
├─ .eslintrc.js
├─ .gitignore
├─ babel.config.js
├─ jest.config.js
├─ package-lock.json
├─ package.json
├─ public               // 入口页面
│  ├─ corporate-univ.html
│  ├─ favicon.ico
│  ├─ index.html
│  └─ xiaoetong.html
├─ README.md
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  └─ logo.png
│  ├─ components
│  │  └─ HelloWorld.vue
│  ├─ main.js
│  ├─ pages             // 主项目以外的其他页面，目录结构对应入口页面public/**.html
│  │  ├─ corporateUniv  // 企业大学
│  │  │  ├─ App.vue
│  │  │  └─ main.js
│  │  └─ xiaoetong      // 小鹅通
│  │     ├─ App.vue
│  │     └─ main.js
│  ├─ router
│  │  └─ index.js
│  ├─ store
│  │  └─ index.js
│  └─ views
│     ├─ About.vue
│     └─ Home.vue
├─ tests
│  └─ unit
│     └─ example.spec.js
└─ vue.config.js
```


### 配置多页面

1. public目录下添加入口文件 *.html(命名方式: 连字符命名，比如corporate-univ)
2. src/pages下新建文件夹(驼峰法命名，比如corporateUniv)，添加vue入口文件main.js(名称固定)


### REM适配

注意单位！基于375px的设计稿
main.js文件需要引入`flexible.js`

```
import 'lib-flexible/flexible.js
```

### git log
建议git log遵循规范，commit使用指令`git cz`


https://crmh5.xuetian.cn