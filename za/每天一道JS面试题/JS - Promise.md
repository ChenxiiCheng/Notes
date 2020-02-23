## JS - Promise

`Promise` 是 CommonJS 提出来的一种规范，有多个版本，在 ES6 当中已经纳入规范，原生支持Promise对象，非 ES6 环境可以用类似 Bluebird、Q这类库来支持

`Promise` 可以将回调变成链式调用写法，流程更加清晰，代码更加优雅

简单归纳下 Promise：**三个状态**、**两个过程**、**一个方法**

**三个状态：**`pending`、`fulfilled`、`rejected`

**两个过程：**

1. pending ——> fulfilled （resolve）
2. pending ——> rejected （reject）

**一个方法：** `then`

当然还有其他概念，如 `catch`、`Promise.all / race`



> 题目：Promise 的特点是什么，分别有什么优缺点？什么是 Promise 链？Promise 构造函数执行和 then 函数执行有什么区别？

`Promise` 有三种状态：

1. 等待中 （pending）
2. 完成了 （resolved）
3. 拒绝了 （rejected）

`Promise` 一旦从等待状态变成其他状态就永远不能更改状态了，也就是说一旦状态变为 resolved 后，就不能再次改变

```javascript
new Promise((resolve, reject) => {
  resolve('success');
  // 无效
  reject('reject');
})
```

当我们在构造 `Promise` 的时候，构造函数内部的代码是立即执行的

```javascript
new Promise((resolve, reject) => {
  console.log('new Promise');
  resolve('success');
})
console.log('finish');       // new Promise -> finish
```

`Promise` 实现了链式调用，也就是说每次调用 `then` 之后返回的都是一个 `Promise`，并且是一个全新的 `Promise`，原因也是因为状态不可变。如果你在 `then` 中 使用了 `return`，那么 `return` 的值会被 `Promise.resolve()` 包装

```javascript
Promise.resolve(1)
  .then(res => {
    console.log(res) // => 1
    return 2 // 包装成 Promise.resolve(2)
  })
  .then(res => {
    console.log(res) // => 2
  })
```

当然了，`Promise` 也很好地解决了回调地狱的问题，可以把之前的回调地狱例子改写为如下代码：

```javascript
// 回调地狱
ajax(url, () => {
  // 处理逻辑
  ajax(url1, () => {
    // 处理逻辑
    ajax(url2, () => {
      // 处理逻辑
    })
  })
})

//Promise写法解决了回调地狱
ajax(url)
  .then(res => {
      console.log(res)
      return ajax(url1)
  }).then(res => {
      console.log(res)
      return ajax(url2)
  }).then(res => console.log(res))
```

前面都是在讲述 `Promise` 的一些优点和特点，其实它也是存在一些缺点的，比如无法取消 `Promise`，错误需要通过回调函数捕获。