## Koa 路由

### 1. 获取路由

#### (1) 通过ctx.path 获取浏览器中输入的路由

```js
app.use(async (ctx, next) => {
console.log(ctx.path);
})

在浏览器中输入:   localhost:3000/classic/latest
控制台输出：/classic.latest
```



#### (2) 通过ctx.method 获取请求方法

```js
app.use(async (ctx, next) => {
console.log(ctx.method);
})

控制台输出：GET
```



 #### (3) 如果我们想返回些东西显示在客户端，不能直接通过return

**而是要挂载到 ctx.body 上**

```js
app.use(async (ctx, next) => {
  console.log(ctx.path);
  console.log(ctx.method);
  if (ctx.path === '/classic/latest' && ctx.method === 'GET') {
    ctx.body = 'classic';
  }
});

在浏览器中输入： localhost:3000/classic/latest 后，页面显示classic
```



**现在服务端一般返回给客户端的格式是JSON，Node在这方面有优势，我们只要写成{}形式，Node内部会自动帮我们转成JSON格式**

```js
app.use(async (ctx, next) => {
  console.log(ctx.path);
  console.log(ctx.method);
  if (ctx.path === '/classic/latest' && ctx.method === 'GET') {
    ctx.body = { key: 'classic' };
  }
});

在浏览器中输入： localhost:3000/classic/latest 后，页面显示{ "key": "classic" }
```



### 2. 路由

```js
// 这就是路由，如果自己写的话，挺麻烦的，有第三方库koa-router可以直接用方便
if (ctx.path === '/classic/latest' && ctx.method === 'GET') {
  ctx.body = { key: 'classic' };
}
if(ctx.path === '/next') {}
```

**这里我们使用koa-router，同时我们进行router的拆分**

考虑客户端兼容性的话，我们可以支持多个版本，那么如何区别是哪个版本发的http请求呢

通过api携带版本号【三种方案】：

- url路径   `eg: /v1/classic/latest`
- 查询参数   `eg: /classic/latest?version=v1`
- header

根目录下新建api文件夹，在其中新建v1文件夹，v1中新建book.js, classic.js文件

```js
// classis.js
const Router = require('koa-router');
const router = new Router();

router.get('/v1/classic/latest', (ctx, next) => {
  ctx.body = { key: 'classic' };
});

module.exports = router;
```

```js
// book.js
const Router = require('koa-router');
const router = new Router();

router.get('/v1/book/latest', (ctx, next) => {
  ctx.body = { key: 'book' };
});

module.exports = router;
```

```js
// app.js
const Koa = require('koa');
const book = require('./api/v1/book');
const classic = require('./api/v1/classic');

const app = new Koa();

app.use(book.routes());
app.use(classic.routes());

app.listen(3000);
```