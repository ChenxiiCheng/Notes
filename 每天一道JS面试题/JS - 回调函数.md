## JS - 回调函数

我们知道在 JavaScript 中，函数是一等公民，当一个函数传入另一个函数当做参数时，我们就可以把这个函数叫做 Callback 函数。而被传入函数作为参数的那个函数叫做 Hight order function 高阶函数

```javascript
function F1() {
  var a = 100;
  return function () {
    console.log(a);
  }
}
function F2(f1) {        // F2高阶函数，F1回调函数
  var a = 200;
  console.log(f1());
}
var f1 = F1();
F2(f1);
```



> 题目：什么是回调函数？回调函数有什么缺点？如何解决回调地狱问题？

下面是一个回调函数的例子：

```javascript
ajax(url, () => {
  // 处理逻辑
})
```

但是回调函数有一个致命的弱点，就是容易写出回调地狱（Callback hell）。假设多个请求存在依赖性，可能会写出如下代码：

```javascript
ajax(url, () => {
  // 处理逻辑
  ajax(url1, () => {
    // 处理逻辑
    ajax(url2, () => {
      // 处理逻辑
    })
  })
})
```

回调地狱的根本问题就是：

1. 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身
2. 嵌套函数一多，就很难处理错误

当然，回调函数还存在着别的几个缺点，比如不能使用 `try catch` 捕获错误，不能直接 `return`