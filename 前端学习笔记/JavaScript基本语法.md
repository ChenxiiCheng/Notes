# JavaScript基本语法

1. **变量提升**

   (1) JavaScript引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。

   ```javascript
   console.log(a);
   var a = 1;
   
   真正运行的代码：
   var a;
   console.log(a);
   a = 1;
   ```

   (2) 请注意，变量提升只对`var`命令声明的变量有效，如果一个变量不是用`var`命令声明的，就不会发生变量提升。

   ```javascript
   console.log(b);
   b = 1;
   ```



2. **If…else结构**

   (1) `if`代码块后面，还可以跟一个`else`代码块，表示不满足条件时，所要执行的代码。

   ```javascript
   //优先采用“严格相等运算符”（===），而不是“相等运算符”（==）
   if (m === 3) {
     // then
   } else {
     // else
   }
   ```

   

3. **三元运算符**

   (1) JavaScript还有一个三元运算符（即该运算符需要三个运算子）`?:`，也可以用于逻辑判断。

   ```javascript
   (condition) ? expr1 : expr2
   ```



4. **for循环**

   (1) `for`语句是循环命令的另一种形式，可以指定循环的起点、终点和终止条件。它的格式如下。

   ```javascript
   /* for语句后面的括号里面，有三个表达式。
   
   初始化表达式（initialize）：确定循环的初始值，只在循环开始时执行一次。
   测试表达式（test）：检查循环条件，只要为真就进行后续操作。
   递增表达式（increment）：完成后续操作，然后返回上一步，再一次检查循环条件。 */
   
   for (initialize; test; increment)
     statement
   
   // 或者
   
   for (initialize; test; increment) {
     statement
   }
   
   // eg:举例 
   var x = 3;
   for (var i = 0; i < x; i++) {
     console.log(i);
   }
   ```



5. **break | continue**

   (1) `break`语句用于跳出代码块或循环。

   ```javascript
   //下面代码只会执行10次循环，一旦i等于10，就会跳出循环。
   var i = 0;
   
   while(i < 100) {
     console.log('i当前为：' + i);
     i++;
     if (i === 10) break;
   }
   ```

   (2) `continue`语句用于立即终止本轮循环，返回循环结构的头部，开始下一轮循环

   ```javascript
   // 下面代码只有在i为奇数时，才会输出i的值。如果i为偶数，则直接进入下一轮循环。
   var i = 0;
   
   while (i < 100){
     i++;
     if (i % 2 === 0) continue;
     console.log('i当前为：' + i);
   }
   ```

   