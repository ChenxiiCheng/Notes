## JS - var、let、const 区别

> 题目：什么是提升？什么是暂时性死区？var、let 及 const 区别？

先了解下提升（hosting）这个概念

```javascript
console.log(a);    // undefined
var a = 1;     

上面代码等价于:

var a;             // 在代码执行前的解析步骤里，变量提升，变量值初始化为undefined
console.log(a);    // undefined
a = 1;
```

上述的代码中我们发现，虽然变量还没有声明，但是我们却可以使用这个未声明的变量，这种情况就叫做提升，并且提升的是声明

**其实不仅变量会提升，函数也会被提升**

```javascript
console.log(a);    // f a() {}
function a() {};
var a = 1;
```

对于上述代码，打印结果是 `f a() {}`，即使变量声明在函数之后，这也说明了函数被提升，并且 **函数提升是优先于变量提升的**

所以，**`var` 的作用**：使用 `var` 声明的变量会被提升到作用域的顶部

接着，来看 `let` 和 `const` ：**要点：**`let`、`const` 必须先声明，才能使用；这点和`var` 不一样

```javascript
// 1.
var a = 1;
let b = 1;
const c = 1;
console.log(window.b);     // undefined
console.log(window.c);     // undefined

//2.
function test() {
  console.log(c);
  let c;
}
test();      // Uncaught ReferenceError: Cannot access 'c' before initialization

//3.
function test() {
  console.log(c);
  var c;
}
text();      // undefined
```

1. 首先在全局作用域下使用 `let` 和 `const` 声明变量，变量并不会被挂载到 `window` 上，这一点就和 `var` 声明有了区别
2. 当我们在声明 `c` 之前就使用了 `c`，就会出现报错的情况【例子2】。报错的原因是因为存在暂时性死区，我们不能在声明前就使用变量，这也是 `let` 和 `const` 优于 `var` 的一点。

#### 总结

- **函数提升** 优先于 **变量提升**，函数提升会把 **整个函数挪到作用域顶部**，变量提升只会把 **声明挪到作用域顶部**
- `var` 存在提升，我们能在声明之前使用。**`let`、`const` 因为暂时性死区的原因，不能在声明前使用**
- `var` 在全局作用域下声明变量会导致变量挂载在 `window` 上，其他两者不会
- `let` 和 `const` 作用基本一致，但是后者声明的变量不能再次赋值