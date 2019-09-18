## JS - map forEach every some

### 1. map 函数

```javascript
// 1. map函数
// 输出：
// a = [1, 2, 3, 4, 5]
// b = [1, 4, 9, 16, 25]
let a = [1, 2, 3, 4, 5];
let b = a.map(item => {
  return item ** 2;
});
console.log('a = ', a);    // a = [1, 2, 3, 4, 5]
console.log('b = ', b);    // b = [1, 4, 9, 16, 25]
```

 

### 2. forEach 函数

```javascript
// 2. forEach函数 - function(currentValue, index, arr)
// currentValue: 必需。当前元素
// index: 可选。当前元素的索引值。
// arr: 可选。当前元素所属的数组对象。
// forEach是直接在原数组上进行操作的
// 有固定的的格式, currentValue: 当前元素
// index: 当前元素的索引值
// arr: 当前元素所属的数组对象
// 输出：[1, 4, 9, 16, 25]
let a = [1, 2, 3, 4, 5];
a.forEach((currentValue, index, arr) => {
  arr[index] = currentValue ** 2;
});
console.log('a = ', a);
```



### 3. filter 函数

```javascript
// 3. filter函数 - function(currentValue, index,arr)
// currentValue: 必须。当前元素的值;
// index: 可选。当前元素的索引值
// arr: 	可选。当前元素属于的数组对象
// filter返回一个新的数组，不是在原数组上进行操作
// 回调函数返回true的元素放入新数组中，false则不放入
let a = [1, 2, 3, 4, 5];
let b = a.filter((currentValue, index, arr) => {
  return currentValue % 2 == 1;
});
console.log('a: ', a);
console.log('b: ', b);
```



### 4. reduce 函数

```javascript
// 4. reduce函数 - function(total, currentValue, index, arr)
// 对数组中的所有元素调用指定的回调函数。 该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供。
// total: 必需。初始值, 或者计算结束后的返回值。
// currentValue: 必需。当前元素
// currentIndex: 可选。当前元素的索引
// arr: 可选。当前元素所属的数组对象。
let a = [1, 2, 3, 4, 5];
let b = a.reduce((total, currentValue) => {
  return (total += currentValue);
});
console.log('a: ', a);
console.log('b: ', b);
```



### 5. some 函数

```javascript
// 5. some函数 - function(currentValue, index,arr)
// currentValue: 必需。当前元素
// index: 可选。当前元素的索引值。
// arr: 可选。当前元素所属的数组对象。
// 输出：a = [1,2,3,4,5]; b = true
// some函数是“存在”有一个回调函数返回true的时候终止执行并返回true，否则返回false。
let a = [1, 2, 3, 4, 5];
let b = a.some(item => {
  return item > 3;
});
console.log('a: ', a);
console.log('b: ', b);
```



### 6. every 函数

```javascript
// 6. every函数 - function(currentValue, index,arr)
// currentValue: 必需。当前元素
// index: 可选。当前元素的索引值。
// arr: 可选。当前元素所属的数组对象。
// 输出：a = [1,2,3,4,5]; b = false
//every是“所有”函数的每个回调函数都返回true的时候才会返回true，当遇到false的时候终止执行，返回false；
let a = [1, 2, 3, 4, 5];
let b = a.every(item => {
  return item > 3;
});
console.log('a: ', a);
console.log('b: ', b);
```