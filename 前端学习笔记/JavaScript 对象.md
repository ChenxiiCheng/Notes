# JavaScript 对象

1. **对象**

   (1) 对象（object）是JavaScript的核心概念，也是最重要的数据类型。JavaScript的所有数据都可以被视为对象。简单说，所谓对象，就是一种无序的数据集合，由若干个“键值对”（key-value）构成。

   ```javascript
   //对象的所有键名都是字符串，所以加不加引号都可以。
   var o = {
     p: 'Hello World'
   };
   
   //对象的每一个“键名”又称为“属性”（property），它的“键值”可以是任何数据类型。如果一个属性的值为函数，通常把这个属性称为“方法”，它可以像函数那样调用。
   var o = {
     p: function (x) {
       return 2 * x;
     }
   };
   
   o.p(1)
   // 2
   ```

   

   (2) 对象的生成方法，通常有三种方法。除了像上面那样直接使用大括号生成（`{}`），还可以用`new`命令生成一个`Object`对象的实例，或者使用`Object.create`方法生成。

   ```javascript
   //下面三行语句是等价的。一般来说，第一种采用大括号的写法比较简洁，第二种采用构造函数的写法清晰地表示了意图，第三种写法一般用在需要对象继承的场合。
   var o1 = {};
   var o2 = new Object();
   var o3 = Object.create(Object.prototype);
   ```

   

   (3)读取属性

   ```javascript
   //读取对象的属性，有两种方法，一种是使用点运算符，还有一种是使用方括号运算符。
   var o = {
     p: 'Hello World'
   };
   
   o.p // "Hello World"
   o['p'] // "Hello World"
   
   //点运算符和方括号运算符，不仅可以用来读取值，还可以用来赋值。
   o.p = 'abc';
   o['p'] = 'abc';
   ```

   

   (4) 查看所有属性

   ```javascript
   //查看一个对象本身的所有属性，可以使用Object.keys方法。
   var o = {
     key1: 1,
     key2: 2
   };
   
   Object.keys(o);
   // ['key1', 'key2']
   ```

   

   (5) delete命令

   ```javascript
   //delete命令用于删除对象的属性，删除成功后返回true。
   var o = {p: 1};
   Object.keys(o) // ["p"]
   
   delete o.p // true
   o.p // undefined
   Object.keys(o) // []
   
   //注意，删除一个不存在的属性，delete不报错，而且返回true。
   var o = {};
   delete o.p // true
   ```

   

   (6) for…in 属性

   ```javascript
   //for...in循环用来遍历一个对象的全部属性。
   var o = {a: 1, b: 2, c: 3};
   
   for (var i in o) {
     console.log(o[i]);
   }
   // 1
   // 2
   // 3
   
   //eg:
   var obj = {
     x: 1,
     y: 2
   };
   var props = [];
   var i = 0;
   
   for (props[i++] in obj);
   
   props // ['x', 'y']
   ```

   