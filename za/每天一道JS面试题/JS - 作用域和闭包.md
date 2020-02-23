## JS - 作用域和闭包

#### 执行上下文

**变量提升：说出下面执行的结果**

```javascript
//1.有定义的变量
var a = 100;
console.log(a)     //undefined

//2.无定义的变量
b = 100;
console.log(b);    // 这里会报错
//Uncaught ReferenceError: b is not defined

//3.有声明的函数
fn('chenxi');      //'chenxi' 22
function fn(name) {
  age = 20;
  console.log(name, age);
  var age
}
```

**分析：**在一段JavaScript脚本执行之前，要先解析代码，解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的（内部函数的不算，因为你不知道函数何时执行）变量、函数声明都拿出来。变量先暂时赋值为`undefined`，函数则先声明好可使用。这一步做完之后，然后才开始正式执行程序。**这就是在代码执行之前做的工作！**

在上面的例子中，为什么`a`是`undefined`，而`b`却报错了呢？这是因为在实际JavaScript代码执行之前，要**全文解析**，发现了`var a`，知道`a`是一个变量，因此存入了执行上下文，而`b`没有找到`var`关键字，所以`b`变量没有在执行上下文中提前**占位**，所以代码执行的时候，提前报到的`a`是有记录的，只不过暂时还没有赋值，即为`undefined`，而`b`在执行上下文没有找到，自然会报错。

另外，一个函数在执行之前，也会创建一个**函数执行上下文**环境，跟**全局上下文**差不多，不过**函数执行上下文**中会多出`this`、`arguments`和函数的参数。参数和`arguments`好理解，这里我们需要研究下`this`。

**总结：**

1. 全局上下文：变量定义，函数声明
2. 函数上下文：变量定义，函数声明，`this`，`arguments`



#### `this`

**`this`的值是在执行的时候才能确认，定义的时候不能确认！**为什么呢？——因为`this`是执行上下文环境的一部分，而执行上下文需要在代码执行之前确定，而不是定义的时候。

```javascript
var a = {
	name: 'A',
  fn: function () {
    console.log(this.name);
  }
}
a.fn();        // this === a
a.fn.call({name: 'B'})    // this === {name: 'B'}
var fn1 = a.fn;
fn1();         // this == window
===================================================
// 情况1：普通函数
function foo() {
  console.log(this);
}
foo();                  // this -> windows

// 情况2：对象的属性是函数
function fn() {
  console.log(this);
}
var obj = {fn: fn};
obj.fn();                // this -> obj

// 情况3：构造函数
function CreateJsPerson(name, age) {   
  this.name = name;
  this.age = age;
}
var p1 = new CreateJsPerson('chenxi', 23);      // this -> p1

// 情况4：call、apply函数
function add(c, d) {
  return this.a + this.b + c + d;
}
var p = {a: 1, b: 3};
add.call(p, 5, 7);        // 1 + 3 + 5 + 7 = 16      this -> p
add.apply(p, [10, 20]);   // 1 + 3 + 10 + 20 = 34    this -> p

// 情况5：箭头函数
<button id="btn1">箭头函数</button>
<script type="text/javascript">
	let btn1 = document.getElementById('btn1');
	let obj = {
    name: 'Chenxi',
    age: 23,
    getName: function() {
      btn1.onclick = () => {
        console.log(this);           // this -> obj
      }
    }
  }
</script>
```

`this`执行会有不同，主要集中在这几个场景中

1. 对于直接调用 **普通函数**（情况1中foo函数），this指向window
2. 对于 obj.foo，我们只需记住，谁调用了函数，谁就是 this，所以在情况2中调用 foo 函数的是 obj 对象，所以 this 指向 obj
3. 在 **构造函数** 模式中，类中（函数体中）出现的 this.xxx = xxx中的 this 是当前类的一个实例，所以 this 是指向这个实例
4. **call、apply、bind**：this指向第一个参数
5. **箭头函数**：箭头函数没有自己的 this，看其外层是否有函数，如果有，外层函数的 this 就是内部箭头函数的 this，如果没有，则 this 指向 window

![image-20190722161923544](/Users/chenxi/Library/Application Support/typora-user-images/image-20190722161923544.png)



#### 如何理解JavaScript中的作用域和作用域链

#### (1). 作用域

ES6之前JavaScript没有块级作用域。

```javascript
if (true) {
  var name = 'chenxi';
}
console.log(name);      // chenxi
```

从上面的例子可以体会到作用域的概念，作用域是一个独立的底盘，让变量不会外泄、暴露出去。上面的`name`变量就被暴露出去了，因此，**JavaScript没有块级作用域，只有全局作用域和函数作用域**

```javascript
var a = 100;
function fn() {
  var a = 200;
  console.log('fn', a);
}
console.log('global', a)   //100
fn();       //200
```

全局作用域就是最外层的作用域，如果我们写了很多行JavaScript代码，变量定义都没有用函数包括，那么它们就全部都在全局作用域中。这样的坏处就是很容易撞车、冲突。

```javascript
// 张三写的代码
var data = {a: 100}
// 李四写的代码
var data = {x: true}
```

这也是为何`jQuery`等库的源码，所有的代码都会放在`(function() {....})()`中。因为放在里面的所有变量，都不会被外泄和暴露，不会污染到外面，不会对其他的库或者JS脚本造成影响。这是函数作用域的一个体现。



#### (2). 作用域链

首先认识一下什么叫做 **自由变量**。如下代码中，`console.log(a)`想要得到`a`变量，但是在当前的作用域中没有定义`a`变量。当前作用域中没有定义的变量，这就是 **自由变量**。自由变量如何得到呢？——向父级作用域中寻找

```javascript
var a = 100;
function fn() {
  var b = 200;
  console.log(a);
  console.log(b);
}
fn();          // a=100, b=200
```

如果父级也没有呢？——那就再往上一层找，直到找到全局作用域还是没找到，就宣布放弃。这种一层层的关系，就是 **作用域链**。

```javascript
var a = 100;
function F1() {
  var b = 200;
  function F2() {
    var c = 300;
    console.log(a);     // 自由变量，顺着作用域链向父作用域找
    console.log(b);     // 自由变量，顺着作用域链向父作用域找
    console.log(c);     // 本作用域的变量
  }
  F2();
}
F1();
```



#### 闭包

通过例子来理解闭包

```javascript
function F1() {
  var a = 100;
  return function () {
    console.log(a);
  }
}
var f1 = F1();
var a = 200;
f1();        // 100
```

自由变量将从作用域链中去寻找，但是 **依据的是函数定义时的作用域链，而不是函数执行时**，上面这个例子就是闭包。**闭包主要有两个应用场景：**

1. **函数作为返回值**，上面这个例子
2. **函数作为参数传递**，下面这个例子

```javascript
function F1() {
  var a = 100;
  return function () {
    console.log(a);
  }
}
function F2(f1) {
  var a = 200;
  console.log(f1());
}
var f1 = F1();
F2(f1);
```

