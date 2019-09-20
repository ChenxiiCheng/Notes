## async、await 异步终极解决方案

#### 1. await 作用

#### （1）求值关键字

```js
app.use((ctx, next) => {
  // ctx: 上下文
  // next: 下一个中间件
  // 洋葱模型
  const a = next();
  const a = await next(); 
  console.log(a);       // 不使用await => 显示 Promise { 'abc' }, 使用了await => 显示 abc
});

app.use((ctx, next) => {
  return 'abc'
});
```



#### （2）阻塞当前线程

```js
app.use(async (ctx, next) => {
  const axios = require('axios');
  const start = Date.now();
  const res = await axios.get('http://7yue.pro');
  const end = Date.now();
  console.log(end - start);  // 不使用await 显示 0ms， 使用await，会阻塞停在res那行，等待请求数据返回后才继续向下执行，console的结果根据网络情况不同，我这边4459ms
});
```



#### 2. async 作用

**在函数前面使用了async，那么该函数的返回值会被包在 Promise 里**

```js
async function f1() {
  return 'hello';
}

console.log(f1());

返回结果：Promise { 'hello' }
```



#### 3. 使用了async 和 await之后，程序可能不是按照洋葱模型了

下面的代码，如果没有使用async await，输出的顺序是：1 -> 3 -> 4 -> 2

使用了async await之后，输出的顺序是：1 -> 3 -> 2 -> 4

因为console.log(3)后执行到res，这边是异步，await阻塞了当前线程，所以JS直接去执行下一个线程了，也就是console.log(2)，当前面的异步执行完，被阻塞的线程可以继续执行，才执行到console.log(4)

```js 
app.use((ctx, next) => {
  console.log(1);
  next();
  console.log(2);
})

app.use(async (ctx, next) => {
  console.log(3);
  const axios = require('axios');
  const res = await axios.get('http://7yue.pro');
  next();
  console.log(4);
})
```



#### 4. 问题来了，如果我们想无论多么复杂的程序，十几个中间件这种，我们还想保持洋葱模型，怎么操作呢？

**解决方法就是我们在每个中间件函数开头都使用async关键字，同时某个中间件函数里有next，一定要在next前面加上await关键字**

```js
app.use(async (ctx, next) => {      // 加上async
  console.log(1); 
  await next();                     // 加上await
  console.log(2);
})

app.use(async (ctx, next) => {
  console.log(3);
  const axios = require('axios');
  const res = await axios.get('http://7yue.pro');
  next();                           // 这里不用加await是因为后面没中间件了
  console.log(4); 
})
```



#### 5. 第一个中间件如果获取到第二个中间操作完的内容？

（1）可以在第二个中间件里使用return，但是我们知道koa是一个非常精简的框架，我们之后会使用大量的第三方中间件，我们就没办法控制return了

（2）另一种方法，我们知道我们在写每个中间件的时候，都会传进去两个东西，(ctx, next)，我们可以再第二个中间件里把要返回的内容挂到 ctx 里，在第一个中间件中通过 ctx.xx 获取。**注意：这种方式的前提是所有中间件的执行顺序是按照洋葱模型来的**

```js
app.use(async (ctx, next) => {
  await next();      // 等待第二个中间件执行完
  const r = ctx.r;   // 第二个中间件执行完了，我们通过ctx.r获取到第二个中间件要返回的内容
  console.log(r);
})

app.use(async (ctx, next) => {
  const axios = require('axios');
  const res = await axios.get('http://7yue.pro');
  ctx.r = res         // 把要返回的内容挂载到ctx.r上，这个随意，ctx.b, ctx.n 都行
  await next();
})
```