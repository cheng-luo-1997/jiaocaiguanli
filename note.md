├── build                      // 构建相关  所有源代码打包后生成的代码放在这
├── node_modules               // npm install 时下载的依赖包都在这，vue elementui，都在里面
├── mock                       // mock 前端模拟请求用的
├── public                       // 项目图标和最外层HTML，所有的vue文件都会渲染到这个HTML里
├── src                        // 源代码    
│   ├── api                    // 所有请求   所有页面的数据请求接口都封装在这，每个模块对应一个文件, 每个文件的代码都差不多，url是接口名，一个函数就是一个请求
│   ├── assets                 // 主题 字体等静态资源  
│   ├── components             // 全局公用组件 vue是组件化开发，页面的菜单和顶部栏就是由很多公共的组件组成，一个组件就是一部分HTML和css、js
│   ├── icons                  // 项目所有 svg icons 系统中的图标，比如菜单左侧的那些图标
│   ├── router                 // 路由   这个文件比较重要，设置了页面的所有页面的路由关系，就是配置点击哪个菜单跳转到哪个页面的功能
│   ├── store                  // 全局 store管理  管理系统运行时一些共用的数据，比如登录用户的信息，每个请求都用到，所以通过store来管理
│   ├── styles                 // 全局样式  公共的css, 比如菜单的显色，对elementui组件库的一些自定义样式，菜单的样式，页面跳转时的过度效果等
│   ├── utils                  // 全局公用方法 包括获取cookie，axios这个网络请求的封装，一些数据处理过程中常用的处理方法
│   ├── views                   //  所有的系统页面文件都在这里，一个模块一个文件夹
│   ├── App.vue                // 入口页面 根页面，系统会从这个文件开始渲染
│   ├── main.js                // 入口文件 系统代码最开始执行的地方，加载element组件 初始化配置等，创建vue实例
│   └── permission.js          // 权限管理  使用router对访问页面的权限进行控制，所有页面都必须登录
├── .babelrc                   // babel-loader js编译配置
├── .env.**                   // 配置不同开发环境下基本的url
├── eslintrc.js                // eslint 代码检查配置项
├── .gitignore                 // git 管理代码时忽略的文件配置
└── package.json               // package.json 项目依赖包管理文件
└── vue.config.js              // package.json  vue-cli配置文件，包括webpack配置
