## 使用express开发博客

### 使用 express

- express 是 node.js 最常用的 Web server 框架
- 什么是框架
- 不要以为 express 过时了！



### 目录

- express 下载、安装和使用，express 中间件机制
- 开发接口，连接数据库，实现登录，日志记录
- 分析 express 中间件原理



### 介绍 express

- 安装（使用脚手架 express-generator）

  ```javascript
  //1. npm install express-generator -g
  
  //2. express express-test    // 项目名
  
  //3. 进入目录  npm install
  
  //4. npm start  运行   localhost:3000
  
  //5. 为了修改代码后自动重启方便和区分开发和上线环境，我们安装两个第三方库帮我们
  npm install nodemon cross-env --save-dev
  ```

- 初始化代码介绍，处理路由

- 使用中间件



### 介绍 app.js

- 各个插件的作用
- 思考各个插件的实现原理
- 处理 get 请求和 post 请求



------



### 中间件机制

```javascript
const express = require('express');

// 本次 http 请求的实例
const app = express();

app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url);
  next();
});

app.use('/api', (req, res, next) => {
  console.log('处理 /api 路由');
  next();
});

// 模拟登陆验证
function loginCheck(req, res, next) {
  console.log('模拟登陆成功');
  setTimeout(() => {
    next();
  });
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('get /api/get-cookie');
  res.json({
    errno: 0,
    data: req.cookie
  });
});
```

输出的结果：

当走到 `app.get('/api/get-cookie')` 的时候，接着去执行中间件 `loginCheck`了，因为在 loginCheck里写了next，所以执行完这个中间件后会继续往下走，再接着才执行后面的 `(req, res, next) => {}`

```
请求开始... GET /api/get-cookie
处理 /api 路由
模拟登陆成功
get /api/get-cookie
```

如果 `loginCheck` 里改成 '模拟登陆失败'，然后我们直接返回，不写 `next()`，就不会继续向下走去执行 `app.get('/api/get-cookie', loginCheck, (req, res, next) => {})` 中 `loginCheck` 后面的 `(req, res, next) => {}` 了

```javascript
// 模拟登陆验证
function loginCheck(req, res, next) {
  console.log('模拟登陆失败');
  setTimeout(() => {
    res.json({
      errno: -1,
      msg: '登陆失败'
    });

    // console.log('模拟登陆成功');
    // next();
  });
}
```

输出结果：

```
请求开始... GET /api/get-cookie
处理 /api 路由
模拟登陆失败
```



------



### express 开发接口

- 初始化项目，之前的部分代码可以复用
- 开发路由，并实现登录
- 记录日志



#### 1. 初始化环境

- 安装插件 mysql xss
- Mysql controller resModel 相关代码可以复用
- 初始化路由

```
npm install mysql xss --save
```



#### 2. 登录

- 使用 express-session 和 connect-redis，简单方便
- req.session 保存登录信息，登陆校验做成 express 中间件

```
npm install redis connect-redis --save
```







































