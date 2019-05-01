# JavaScript 数据类型

1. JavaScript 语言的每一个值，都属于某一种数据类型。JavaScript 的数据类型，共有六种。

   ```
   1.数值（number）：整数和小数（比如1和3.14）
   2.字符串（string）：字符组成的文本（比如”Hello World”）
   3.布尔值（boolean）：true（真）和false（假）两个特定值
   4.undefined：表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值
   5.null：表示无值，即此处的值就是“无”的状态。
   6.对象（object）：各种值组成的集合
   ```

   

2. null | undefined

   (1) `null`表示空值，即该处的值现在为空。调用函数时，某个参数未设置任何值，这时就可以传入`null`。比如，某个函数接受引擎抛出的错误作为参数，如果运行过程中未出错，那么这个参数就会传入`null`，表示未发生错误。

   `undefined`表示“未定义”，下面是返回`undefined`的典型场景。 

   ```javascript
   // 变量声明了，但没有赋值
   var i;
   i // undefined
   
   // 调用函数时，应该提供的参数没有提供，该参数等于undefined
   function f(x) {
     return x;
   }
   f() // undefined
   
   // 对象没有赋值的属性
   var  o = new Object();
   o.p // undefined
   
   // 函数没有返回值时，默认返回undefined
   function f() {}
   f() // undefined
   ```

   