## JS - 原型和原型链

#### 原型

1. 所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（`null`除外）
2. 所有的引用类型（数组、对象、函数），都有一个`__proto__`属性，属性值是一个普通的对象
3. 所有的函数，都有一个`prototype`属性，属性值也是一个普通的对象
4. 所有的引用类型（数组、对象、函数），`__proto__`属性值指向它的构造函数的`prototype`属性值

**例子：**

执行`printName`很好理解，但是执行`alertName`时发生了什么？这里需要记住一个重点 **当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的`__proto__`（即它的构造函数的`prototype`）中寻找**。

**`f.__proto__` 就是 `Foo.prototype`**

1. 因此执行`f.alertName`的时候，先去`f`的属性里找，没找到`alertName`这个属性，然后就去`f`的`__proto__`也就是它的构造函数的`prototype`里找，找到了这个`alertName`
2. 执行`f.printName`的时候，先去`f`的属性里找，找到了`printName`这个属性

```javascript
//构造函数
function Foo(name, age) {
	this.name = name;
}
Foo.prototype.alertName = function () {
  alert(this.name);
}

//创建示例
var f = new Foo('chenxi');
f.printName = function () {
  console.log(this.name);
}

//测试
f.printName();
f.alertName();
```



#### 原型链

接着上面的例子，如果执行`f.toString()`，会发生什么？

```javascript
//测试
f.printName();
f.alertName();
f.toString();
```

因为 `f` 本身属性里没有 `toString()`，并且 `f.__proto__`（即 `Foo.prototype` ）中也没有 `toString`。这个问题还是得拿出刚才说的那句话——**当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的`__proto__`（即`Foo.prototype`）中寻找。**

如果在 `f.__proto__` 中没有找到 `toString`，那么就继续去 `f.__proto__.__proto__` 中寻找，因为 `f.__proto__` 就是一个普通的对象而已嘛！

所以，当执行 `f.toString()` 时经历了以下 **步骤**：【 **实例的属性中找 --> 父类的原型中找 --> 父父类的原型中找** 】

1. 现在 `f` 的属性中是否有 `toString`，没有找到 `toString`，继续往上找
2. `f.__proto__`（即 `Foo.prototype` ）, 没有找到 `toString`，继续往上找
3. `f.__proto__.__proto__` 即（ `Foo.prototype.__proto__` ）也就等于`Object.prototype`。`Foo.prototype` 就是一个普通的对象，因此 `Foo.prototype.__proto__` 就是 `Object.prototype`，在这里可以找到 `toString`
4. 因此 `f.toString` 最终对应到了 `Object.prototype.toString`

这样一直往上找，我们发现是一个链式的结构，所以叫做**“原型链”**。如果一直找到最上层都没有找到，那么就宣告失败，返回 `undefined`。最上层是什么呢？答案是：`Object.prototype.__proto__ === null` 

![image-20190723163631970](/Users/chenxi/Library/Application Support/typora-user-images/image-20190723163631970.png)



#### 原型链中的 `this`

所有从原型或更高级原型中得到、执行的方法，其中的 `this` 在执行时，指向当前触发这个事件执行的对象。因此 `f.printName` 和 `f.alertName` 中的 `this` 都是`f`



===============================================================================



### 3. 原型和原型链

- 构造函数
- 构造函数 - 扩展
- 原型规则和示例
- 原型链
- instanceof



#### 构造函数

```javascript
function Foo(name, age) {
  this.name = name;
  this.age = age;
  this.class = 'class-1';
  //return this    // 默认有这一行
}
var f = new Foo('zhangsan', 20);
// var f1 = new Foo('lisi', 22);    // 创建多个对象
```



#### 构造函数 - 扩展

- `var a = {}` 其实是 `var a = new Object()` 的语法糖
- `var a = []` 其实是 `var a = new Array()` 的语法糖
- `function Foo() {...}` 其实是 `var Foo = new Function(...)` 的语法糖
- 使用 `instanceof` 判断一个函数是否是一个变量的构造函数



#### 原型规则和示例

##### 5条原型规则，原型规则是学习原型链的基础

- 所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（除了 "null" 意外）

```javascript
var obj = {}; obj.a = 100;
var arr = []; arr.a = 100;
function fn() {}
fn.a = 100;
```

- 所有的引用类型（数组、对象、函数），都有一个 `__proto__`【隐式原型】，属性值是一个普通的对象

```javascript
var obj = {}; obj.a = 100;
var arr = []; arr.a = 100;
function fn() {}
fn.a = 100;

console.log(obj.__proto__);
console.log(arr.__proto__);
console.log(fn.__proto__);
```

- 所有的函数，都有一个 `prototype`  【显式原型】属性，属性值也是一个普通的对象

```javascript
console.log(fn.prototype);
```

- 所有的引用类型（数组、对象、函数）, `__proto__` 属性值指向它的构造函数的 “ prototype ” 属性值

```javascript
console.log(obj.__proto__ === Object.prototype);
```

- 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的 `__proto__` （即它的构造函数的prototype）中寻找



```javascript
// 构造函数
function Foo(name, age) {
  this.name = name;
}
Foo.prototype.alertName = function () {
  alert(this.name);
}

// 创建示例
var f = new Foo('zhangsan');
f.printName = function() {
  console.log(this.name);
}

// 测试
f.printName();
f.alertName();    // 现在f的属性里找，没找到就去f的构造原型里找
```



#### 循环对象自身的属性

```javascript
var item;
for (item in f) {
  // 高级浏览器已经在for in 中屏蔽了来自原型的属性
  // 但是这里建议大家还是加上这个判断，保证程序的健壮性
  if (f.hasOwnProperty(item)) {
    console.log(item);
  }
}
```



#### 原型链

```javascript
// 构造函数
function Foo(name, age) {
  this.name = name;
}
Foo.prototype.alertName = function() {
  alert(this.name);
}

// 创建示例
var f = new Foo('zhangsan');
f.printName = function() {
  console.log(this.name);
}

// 测试
f.printName();
f.alertName();
f.toString();     // 要去 f.__proto__.__proto__ 中查找
```

![image-20190813113608052](/Users/chenxi/Library/Application Support/typora-user-images/image-20190813113608052.png)



#### instanceof：用于判断 引用类型 属于哪个构造函数 的方法

- `f instanceof Foo` 的判断逻辑是：
- `f` 的 `__proto__` 一层一层往上，能否对应到 `Foo.prototype`
- 再试着判断 `f instanceof Object`



#### 上面知识点 - 面试题

> 1. 如何准确判断一个变量是数组类型

**答案：**

```javascript
var arr = [];
arr instanceof Array;      // true
typeof arr                 // object, typeof 是无法判断是否是数组的
```



> 2. 写一个原型链继承的例子

**答案：**

```javascript
// 动物
function Animal() {
  this.eat = function() {
    console.log('animal eat');
  }
}

// 狗
function Dog() {
  this.bark = function() {
    console.log('dog bark');
  }
}

Dog.prototype = new Animal();
// 哈士奇
var hashiqi = new Dog();
```

```javascript
function Elem(id) {
  this.elem = document.getElementById(id);
}

Elem.prototype.html = function(val) {
  var elem = this.elem;
  if (val) {
    elem.innerHTML = val;
    return this;   // 链式操作
  } else {
    return elem.innerHTML;
  }
}

Elem.prototype.on = function(type, fn) {
  var elem = this.elem;
  elem.addEventListener(type, fn);
}

var div1 = new Elem('div1');
div1.html('<p>hello imooc</p>').on('click', function() {
  alert('clicked');
})
```



> 3. 描述 new 一个对象的过程

**答案：**

```javascript
function Foo(name, age) {
  this.name = name;
  this.age = age;
  this.class = 'class-1';
  // return this     // 默认有这一行
}
var f = new Foo('zhangsan', 20);
// var f1 = new Foo('lisi', 22);    // 创建多个对象
```

- 创建一个新对象
- this 指向这个新对象
- 执行代码，即对 this 赋值
- 返回 this



> 4. zepto（或其他框架）源码中如何使用原型链

- 阅读源码是高效提高技能的方式
- 但不能 ”埋头苦钻“ 有技巧在其中

