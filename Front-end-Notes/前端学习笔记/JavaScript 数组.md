# JavaScript 数组

1. **数组的定义**

   ```javascript
   1.任何类型的数据，都可以放入数组。
   //数组arr的3个成员依次是对象、数组、函数。
   var arr = [
     {a: 1},
     [1, 2, 3],
     function() {return true;}
   ];
   
   arr[0] // Object {a: 1}
   arr[1] // [1, 2, 3]
   arr[2] // function (){return true;}
   ```

   

2. **数组的本质**

   ```javascript
   1.本质上，数组属于一种特殊的对象。typeof运算符会返回数组的类型是object。
   typeof [1, 2, 3] // "object"
   
   2.数组的特殊性体现在，它的键名是按次序排列的一组整数（0，1，2…）。
   var arr = ['a', 'b', 'c'];
   
   Object.keys(arr)
   // ["0", "1", "2"]
   ```



3. **类似数组的对象**

   (1) 在JavaScript中，有些对象被称为“类似数组的对象”（array-like object）。意思是，它们看上去很像数组，可以使用`length`属性，但是它们并不是数组，所以无法使用一些数组的方法。

   ```javascript
   1.变量obj是一个对象，使用的时候看上去跟数组很像，但是无法使用数组的方法。这就是类似数组的对象。
   //类似数组的对象只有一个特征，就是具有length属性。换句话说，只要有length属性，就可以认为这个对象类似于数组。但是，对象的length属性不是动态值，不会随着成员的变化而变化。
   var obj = {
     0: 'a',
     1: 'b',
     2: 'c',
     length: 3
   };
   
   obj[0] // 'a'
   obj[2] // 'c'
   obj.length // 3
   obj.push('d') // TypeError: obj.push is not a function
   ```



4. **in运算符**

   (1) 检查某个键名是否存在的运算符`in`，适用于对象，也适用于数组。

   ```javascript
   var arr = [ 'a', 'b', 'c' ];
   2 in arr  // true
   '2' in arr // true
   4 in arr // false
   ```

   