## 项目介绍

此项目是由原来的 crmh5 项目（包含报名c端、支付、企微，多入口项目）迁移过来的。
现在项目是单一入口，只包含报名系统的h5页面。

但是此项目是在m站下面的子路径部署的站点，需设置`publicPath`为:`/bim`
线上域名地址为：https://m.xuetian.cn/bim

并且此项目路由模式为 history ，需设置根路径
```js
const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    base: '/bim', // 模式为 history 时，必须设置根路径
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes
  })

const router = createRouter()
```
### 项目内容

此项目是学员和销售都可以操作的报名h5页面，学员操作时没有登录会跳h5页面的登录，
销售进行操作时会从管理后台页面通过链接方式跳到此项目，
会验证 链接中的 `pid` 和 管理后台登录后存在 cookie 的 `staffId` （存在一级域名下，因为需要共享） 是否相同，验证通过才可以进行操作。

报名分两步，第一步是基本信息，第二步一般是上传图片和上传文件。
第一步和第二步都包含很多很多的字段，要展示哪个不展示哪个是根据返回的模板来决定的，几乎每个专业都会有一个新的模板，也就是要求录入的信息是有差别的。

一开始，如果新需求中有新字段（例如新需求需要录入学历，之前没有填过），就需要重新开发。
后面使用大概十几个拓展字段来优化了此项目，前端把输入项、选择项、上传文件、上传图片都进行了组件化，只需要根据接口返回的模板文件进行展示即可。

此项目在一年前用拓展字段优化后，前后端开发成本都几乎为0，后台进行配置即可。
所以此项目维护成本也几乎为零。

#### 拓展字段配置对象

- key：字符串，所有拓展字段的key都要包含 `EXTFIELD` ，如果又包含 `INPUT` 说明是输入框， `LIST` 是选择项，其他为上传
- type：字符串，`DOC`为文件，`IMAGE`为图片
- format：字符串，例如 `".doc,.docx,.pdf"`
- templateUrl：字符串，模板文件链接
- aliasLabelName：字符串，字段的别名
- tips：字符串，字段说明
- inputParameter：该字段的key值
- unnecessary：为true表示该字段选填

### 项目存在的问题

现在项目中使用的接口用到了四个域名，分别是：
- `crm-business`：crm业务的c端接口
- `uic`：登录相关
- `ds`：上传文件
- `setting`：配置系统（省份、民族）

其中 `crm-business` 和 `uic` 都算是新系统下的统一域名的形式，无需更改。

但是 `ds` 和 `setting` 是属于要废弃的域名，这些域名下的接口也非常少了，以后必然会更改的。
上传文件更改时要考虑到：此项目销售和学员都是可以操作的，接口需要带token销售的情况是不满足的。

## 使用

```bash
  # 安装依赖
  npm install
  
  # 启动服务
  npm run test        # 测试环境
  npm run dev         # 开发环境
  npm run prod        # 生产环境
```

## 发布
```bash
  npm run build:dev         # 开发环境
  npm run build:test        # 测试环境
  npm run build:prod        # 生产环境
```

## 分支管理
```bash
  - master          # 生产分支
  - test            # 测试分支
  - develop         # 开发分支
  - feature_*       # 功能开发分支
```

## 项目架构

- 安装 tree-node-cli ：`npm install -g tree-node-cli`
- 生成目录树：`treee -I "node_modules|dist" > list.txt`

```
bim-h5
├── README.md
├── babel.config.js
├── jest.config.js
├── package-lock.json
├── package.json
├── public                    // 入口页面
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── api
│   │   ├── common.js
│   │   ├── enrollSys.js
│   │   └── user.js
│   ├── assets                // 静态资源
│   │   └── ...
│   ├── components
│   │   └── base
│   │       └── Dialog.vue
│   ├── config
│   │   ├── envUrl.js
│   │   └── index.js
│   ├── constant
│   │   └── index.js
│   ├── filters
│   │   ├── currency.js
│   │   ├── date.js
│   │   ├── index.js
│   │   ├── num.js
│   │   ├── phone.js
│   │   └── time.js
│   ├── main.js
│   ├── permission.js
│   ├── router
│   │   ├── index.js
│   │   └── modules
│   │       └── demo.js
│   ├── store
│   │   ├── getters.js
│   │   ├── index.js
│   │   └── modules
│   │       ├── demo.js
│   │       └── user.js
│   ├── styles
│   │   ├── iconfont.css
│   │   ├── index.scss
│   │   ├── layout.scss
│   │   ├── mixin.scss
│   │   ├── reset.css
│   │   ├── vant-theme.less
│   │   └── var.scss
│   ├── utils
│   │   ├── auth.js
│   │   ├── index.js
│   │   ├── request.js
│   │   └── store.js
│   └── views
│       └── enrollSystem
│           ├── addInfo
│           │   ├── components
│           │   │   └── Template
│           │   │       └── TempTime.vue
│           │   └── index.vue
│           ├── basicInfo
│           │   ├── PhotoInfoForm.vue
│           │   ├── area.js
│           │   ├── components
│           │   │   ├── AuditResult
│           │   │   │   └── index.vue
│           │   │   ├── Stepbar
│           │   │   │   └── index.vue
│           │   │   ├── TabModule
│           │   │   │   └── index.vue
│           │   │   ├── Template
│           │   │   │   ├── TempAccount.vue
│           │   │   │   ├── TempAdditional.vue
│           │   │   │   ├── TempAddress.vue
│           │   │   │   ├── TempArea.vue
│           │   │   │   ├── TempBirthday.vue
│           │   │   │   ├── TempCardNo.vue
│           │   │   │   ├── TempCertNo.vue
│           │   │   │   ├── TempEmail.vue
│           │   │   │   ├── TempExamRoom.vue
│           │   │   │   ├── TempGender.vue
│           │   │   │   ├── TempGraduateSchool.vue
│           │   │   │   ├── TempGraduateTime.vue
│           │   │   │   ├── TempInputExtField.vue
│           │   │   │   ├── TempJobTime.vue
│           │   │   │   ├── TempListDirection.vue
│           │   │   │   ├── TempListEducation.vue
│           │   │   │   ├── TempListExamArea.vue
│           │   │   │   ├── TempListLevel.vue
│           │   │   │   ├── TempListQualification.vue
│           │   │   │   ├── TempListStudyMajor.vue
│           │   │   │   ├── TempListUnitPosiiton.vue
│           │   │   │   ├── TempListextField.vue
│           │   │   │   ├── TempMobile.vue
│           │   │   │   ├── TempName.vue
│           │   │   │   ├── TempNameSpell.vue
│           │   │   │   ├── TempNation.vue
│           │   │   │   ├── TempPassword.vue
│           │   │   │   ├── TempStudyMajor.vue
│           │   │   │   ├── TempWorkUnit.vue
│           │   │   │   └── TempWorkYear.vue
│           │   │   ├── Title
│           │   │   │   └── index.vue
│           │   │   └── UploadSlot
│           │   │       └── index.vue
│           │   ├── dialogs
│           │   │   ├── CheckDiffInfoTipDialog.vue
│           │   │   ├── IdentityTipDialog.vue
│           │   │   ├── InputCaptchaDialog.vue
│           │   │   └── SubmitSuccessDialog.vue
│           │   ├── index.vue
│           │   ├── upload.js
│           │   └── validate.js
│           ├── error
│           │   └── index.vue
│           ├── home
│           │   └── index.vue
│           ├── promise
│           │   └── index.vue
│           └── userInfo
│               ├── components
│               │   ├── AuditFailDialog.vue
│               │   └── AuditSuccessDialog.vue
│               └── index.vue
├── tests
│   └── unit
│       └── example.spec.js
├── vue.config.js
└── yarn.lock
```


### REM适配

注意单位！基于375px的设计稿
main.js文件需要引入`flexible.js`

```
import 'lib-flexible/flexible.js
```
