# JavaScript 数值

1. **整数和浮点数**

   ```javascript
   //JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。所以，1与1.0是相同的，是同一个数。
   //这就是说，JavaScript 语言的底层根本没有整数，所有数字都是小数（64位浮点数）。容易造成混淆的是，某些运算只有整数才能完成，此时 JavaScript 会自动把64位浮点数，转成32位整数，然后再进行运算
   //JavaScript 提供的有效数字最长为53个二进制位。精度最多只能到53个二进制位，这意味着，绝对值小于2的53次方的整数，即-(253-1)到253-1，都可以精确表示
   
   1 === 1.0 // true
   
   //至于具体的最大值和最小值，JavaScript 提供Number对象的MAX_VALUE和MIN_VALUE
   Number.MAX_VALUE // 1.7976931348623157e+308
   Number.MIN_VALUE // 5e-324
   ```

   

2. **与数值相关的全局方法**

   (1) parseInt() 用于将字符串转为整数

   ```javascript
   1.parseInt('123') // 123
   
   2.//如果字符串头部有空格，空格会被自动去除。
   parseInt('   81') // 81
   
   3.//如果parseInt的参数不是字符串，则会先转为字符串再转换。
   parseInt(1.23) // 1
   // 等同于
   parseInt('1.23') // 1
   
   4.//字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。
   parseInt('8a') // 8
   parseInt('12**') // 12
   parseInt('12.34') // 12
   parseInt('15e2') // 15
   parseInt('15px') // 15
   
   5.//上面代码中，parseInt的参数都是字符串，结果只返回字符串头部可以转为数字的部分。如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回NaN。
   parseInt('abc') // NaN
   parseInt('.3') // NaN
   parseInt('') // NaN
   parseInt('+') // NaN
   parseInt('+1') // 1
   
   6.//如果字符串以0x或0X开头，parseInt会将其按照十六进制数解析。
   parseInt('0x10') // 16
   
   7.//如果字符串以0开头，将其按照10进制解析。
   parseInt('011') // 11
   
   8.//parseInt方法还可以接受第二个参数（2到36之间），表示被解析的值的进制，返回该值对应的十进制数。默认情况下，parseInt的第二个参数为10，即默认是十进制转十进制。
   parseInt('1000', 10) // 1000
   parseInt('1000', 2) // 8
   parseInt('1000', 6) // 216
   parseInt('1000', 8) // 512
   ```

   

   (2) parseFloat()方法用于将一个字符串转为浮点数。

   ```javascript
   1.parseFloat('3.14') // 3.14
   
   2.//如果字符串包含不能转为浮点数的字符，则不再进行往后转换，返回已经转好的部分。
   parseFloat('3.14more non-digit characters') // 3.14
   
   3.//如果参数不是字符串，或者字符串的第一个字符不能转化为浮点数，则返回NaN。
   parseFloat([]) // NaN
   parseFloat('FF2') // NaN
   parseFloat('') // NaN
   ```

   