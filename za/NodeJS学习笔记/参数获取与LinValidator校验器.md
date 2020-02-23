## 参数获取与LinValidator校验器

### 1. 参数获取

- 第一种传参方式

  ```js
  router.get('/v1/{param}/classic/latest', (ctx, next) => {
  	ctx.body = {
  		key: 'classic'
  	}
  })
  ```

- 第二种传参方式

  ```js
  router.get('/v1/classic/latest?param=', (ctx, next) => {
  	ctx.body = {
  		key: 'classic'
  	}
  })
  ```

- 第三种传参方式：在header中传参

- 第四种传参方式：在body中传参



```js
//app.js中使用bodyparser中间件
const parser = require('koa-bodyparser');
app.use(parser());

//classic.js中
const Router = require('koa-router');
const router = new Router();

router.post('/v1/:id/classic/latest', (ctx, next) => {
  // url: localhost:3000/v1/3/classic/latest?param=8yue
  // postman中模拟请求 header中 token: 123123123
  
  // 获取到url中的id参数 => 3
  const path = ctx.param;
  
  // 获取到url中问号后面的查询参数 => 8yue
  const query = ctx.request.query;
  
  // 获取到http请求中header中的参数 => token=123123123
  const headers = ctx.request.header;
  
  // koa中获取body里的参数需要使用第三方库 koa-bodyparser
  const body = ctx.request.body;

  ctx.body = { key: 'classic' };
});
```

**在postman中**

rl: localhost:3000/v1/3/classic/latest?param=8yue

Headers项: 添加 key: token, value: 123123123

Body项：添加 { "key": "Chenxii" }

