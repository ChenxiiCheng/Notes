## requireDirectory实现路由自动注册

1. **之前写法：手动写路由**

   ```js
   const Koa = require('koa');
   const Router = require('koa-router');
   import book from './api/v1/book.js';
   import classic from './api/v1/classic.js';
   
   const app = new Koa();
   
   app.use(book.routes());
   app.use(classic.routes());
   ```

   

2. **使用了require-directory实现路由自动注册**

   ```js
   const Koa = require('koa');
   const requireDirectory = require('require-directory');
   const Router = require('koa-router');
   
   const app = new Koa();
   
   // 去./api目录下获取路由文件
   requireDirectory(module, './api', { visit: whenLoadModule });  
   
   function whenLoadModule(obj) {
     if (obj instanceof Router) {    // 判断obj是不是路有文件，是的话注册路由
       app.use(obj.routes());
     }
   }
   ```



3. 如果更改了放路由的文件位置，会报错，因为我们路径是硬编码

   ```js
   class InitManager {
     static initCore(app) {
       // 入口方法
       InitManager.app = app;
       InitManager.initLoadRouters();
     }
     static initLoadRouters() {
       // path config
       // 改成软编码 process.cwd()获取根路径
       const apiDirectory = `${process.cwd()}/app/api`;   
       requireDirectory(module, apiDirectory, { visit: whenLoadModule });
   
       function whenLoadModule(obj) {
         if (obj instanceof Router) {
           InitManager.app.use(obj.routes());
         }
       }
     }
   }
   ```

   