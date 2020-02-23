## JS - 浅拷贝、深拷贝

### 浅拷贝和深拷贝

**浅拷贝**只复制指向某个对象指针，而不赋值对象本身，新旧对象还是共享同一块内存

1. 浅拷贝的实现方式：
   - Object.assign()：需要注意的是目标对象只有一层的时候，是深拷贝
   - Array.prototype.concat()
   - Array.prototype.slice()

**深拷贝**就是在拷贝数据的时候，将数据的所有引用结构都拷贝一份。简单地说就是，在内存中存在两个数据结构完全相同又相互独立的数据，将引用类型进行复制，而不是只复制其引用关系

1. 浅拷贝的实现方式：
   - 热门的函数库lodash，也有提供_.cloneDeep用来做深拷贝
   - jquery提供一个$.extend可以用来做深拷贝
   - JSON.parse(JSON.stringify())
   - 手写递归方法



### 深浅拷贝

> 题目：什么是浅拷贝？如何实现浅拷贝？什么是深拷贝？如何实现深拷贝？

我们知道对象类型在赋值的过程中其实是复制了地址，从而导致改变了一方，另一方也会被改变的情况。通常我们在开发中不希望出现这样的问题，我们可以使用浅拷贝来解决这个情况。

```javascript
// 对象赋值其实是复制地址
// a, b指向同一个地址，改变了a，也就改变了b
let a = {
	age: 1
}
let b = a;
a.age = 2;
console.log(b.age);    // 2
```

#### 浅拷贝

首先可以通过 `Object.assign` 来解决这个问题。`Object.assign` 只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址。

```javascript
let a = {
  age: 1
}
let b = Object.assign({}, a);
a.age = 2;
console.log(b.age);      // 1
```

也可以通过展开运算符 `...` 来实现浅拷贝

```javascript
let a = {
  age: 1
}
let b = { ...a };
a.age = 2;
console.log(b.age);    // 1
```

通常浅拷贝能解决大部分问题，但是当我们遇到如下情况就可能需要使用到深拷贝了。

**浅拷贝** 只解决了第一层的问题，如果接下去的值中还有对象的话，那么就又回到最开始的话题了。要解决这个问题，我们就需要使用 **深拷贝** 了。

```javascript
let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
let b = { ...a };
a.jobs.first = 'native';
console.log(b.jobs.first);    // native
```



#### 深拷贝

这个问题通常可以通过 `JSON.parse(JSON.stringify(object))` 来解决

```javascript
let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
let b = JSON.parse(JSON.stringify(a));
a.jobs.first = 'native';
console.log(b.jobs.first);     // FE
```

但是该方法也是有局限性的：

- 会忽略 `undefined`
- 会忽略 `symbol`
- 不能序列化函数
- 不能解决循环引用的对象