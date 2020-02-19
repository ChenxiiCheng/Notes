## 1. HTTP模块、URL模块、supervisor工具

### (1) HTTP模块

**创建一个http服务器**

```js
const http = require('http');

http
  .createServer((req, res) => {
    console.log(req.url); // 获取url
    res.writeHead(200, { 'Content-Type': "text/html;charset='utf-8'" });
    res.write("<head><meta charset='UTF-8'></head>");
    res.write('你好 this is nodejs');
    res.write('<h2>你好</h2>');
    res.end(); // 结束响应
  })
  .listen(3000);
```



### (2) URL模块解析url 获取参数

- 前端路由url是在req.url中，先从req.url中获取到url，然后再解析

- `url.parse(api, true)`：获取到url解析后的所有参数，传递true的话，query参数转成对象形式
- `url.parse(api, true).query`：就可以获取到url中的查询参数了

```
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.itying.com',
  port: null,
  hostname: 'www.itying.com',
  hash: null,
  search: '?name=zhangsan&age=20',
  query: [Object: null prototype] { name: 'zhangsan', age: '20' },
  pathname: '/',
  path: '/?name=zhangsan&age=20',
  href: 'http://www.itying.com/?name=zhangsan&age=20'
}
```

```js
const url = require('url');

var api = 'http://www.itying.com?name=zhangsan&age=20';

// console.log(url.parse(api, true));

var getValue = url.parse(api, true).query;

// console.log(getValue);

console.log(`姓名：${getValue.name} -- 年龄：${getValue.age}`);
```



### (3) supervisor

直接使用nodemon就可以了





## 2. CommonJS模块、NodeJS模块、自定义模块

> 在Nodejs中模块分为两类：一类是Node提供的模块，称为核心模块；另一类是用户编写的模块，称为文件模块。
>
> 核心模块有：HTTP模块、URL模块、Fs模块等



```js
const obj = {
  get: function() {
    console.log('从服务器获取数据');
  },
  post: function() {
    console.log('从服务器获取数据');
  }
}

module.exports = obj;
```

```js
exports.get = function() {
	console.log('从服务器获取数据');
}

exports.post = function() {
	console.log('从服务器获取数据');
}
```

```js
const request = require('./module/request');

console.log(request);   //对应第一种导出方式 {get: [Function: get], post: [Function: post]}

console.log(request);   //对应第二种导出方式 {get: [Function: get], post: [Function: post]}
```



#### node_modules目录下的axios目录下的index.js，可以直接 `const axios = require('axios') `导入，这也就是为啥npm安装的第三方包可以直接不写路径导入！因为它们都是安装在node_modules目录下的！





## 3. FS模块

- fs.stat：检测是文件还是目录
- fs.mkdir：创建目录
- fs.writeFile：创建写入文件
- fs.appendFile：追加文件
- fs.readFile：读取文件
- fs.readdir：读取目录
- fs.rename：重命名
- fs.rmdir：删除目录
- fs.unlink：删除文件

**fs.stat**

```js
const fs = require('fs');

fs.stat('./package.json', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`是文件: ${data.isFile()}`);
  console.log(`是目录: ${data.isDirectory()}`);
});
```



**fs.mkdir**

```js
/**
 * path      将要创建的目录路径
 * mode      目录权限（读写权限），默认777
 * callback  回调，传递异常参数err
 */
fs.mkdir('./css', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('创建成功');
});
```



**fs.writeFile**

```js
fs.writeFile('./html/index.html', '你好nodejs', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('创建写入文件成功');
});
```



**fs.appendFild**

```js
fs.appendFile('./css/base.css', 'body{color: red}', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('成功');
});
```



**fs.readFile**

```js
fs.readFile('./html/index.html', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
  // 把Buffer类型转成string类型
  console.log(data.toString());
});
```



**fs.readdir**

```js
fs.readdir('./html', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});
```



**fs.rename：1. 重命名文件   2. 移动文件**

```js
fs.rename('./css/aaa.css', './css/index.css', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('重命名成功');
});
```

```js
fs.rename('./css/index.css', './html/index.css', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('移动文件成功');
})
```



**fs.rmdir**

```js
fs.rmdir('./aaaa', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('删除目录成功');
});
```



**fs.unlink**

```js
fs.unlink('./aaaa/index.html', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('删除文件成功');
});
```





## 4. ES6常见语法、Async/await、Promise

### (1) ES6常见语法

- let/const

- 箭头函数

- 对象、属性的简写

  ```js
  // 属性 原本写法
  const name = 'zhangsan';
  const app = {
    name,
    run: function() {
      console.log(`${this.name}在跑步`);
    }
  }
  
  // es6写法
  const name = 'zhangsan';
  const app = {
    name,
    run() {
      console.log(`${this.name}在跑步`);
    }
  }
  ```

  

- 模板字符串

- Promise

  - **异步使用callback写法**

  ```js
  function getData(callback) {
    // 模拟ajax请求
    setTimeout(function() {
      let name = 'zhangsan';
      callback(name);
    }, 2000);
  }
  
  // 外部获取异步方法里面的数据
  getData(function(aaa) {
    console.log(aaa);
  })
  ```

  - **异步使用Promise写法【resolve成功后执行的回调，reject失败后执行的回调】**

  ```js
  const p = new Promise(function(resolve, reject) {
    setTimeout(function() {
      let name = 'zhangsan';
      resolve(name);    // 回调函数, 里面写resolve，外面用then
    }, 2000);
  })
  
  p.then(function(data) {
    console.log(data);
  });
  ```



### (2) async / await

> async是"异步"的简写，而await可以认为是 asynnc wait 的简写。所以可以理解async用于声明一个异步的function，而await用于等待一个异步方法执行完成

> 简单理解：async让方法变成异步，await等待异步方法执行完成

**async 方法返回的是Promise类型，使用await可以解开Promise，获得到数据**

```js
async function test() {
  return '您好nodejs';
}

console.log(test());          // Promise { '您好nodejs' } 
```



**通过async封装异步方法【如果async要返回的话，推荐封装在Promise里，不然就没必要使用async了】**

```js
async function test() {       // 想要在外部获取到name
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      const name = 'zhangsan';
      resolve(name);
    }, 2000)
  })
}

async function main() {
  const data = await test();
  console.log(data);
}
main();
```





## 5. NodeJS的非阻塞I/O、异步、事件驱动

> Node.js不为每个客户连接创建一个新的线程，而仅仅使用一个线程。当有用户连接了，就触发一个内部事件，通过非阻塞I/O、事件驱动机制，让Node.js程序宏观上也是并行的。使用Node.js，一个8GB内存的服务器，可以同时处理超过4万用户的连接。

### (1) 非阻塞I/O

- 下面代码执行结果：1 -> 3 -> 2

```js
const fs = require('fs');

console.log('1');

fs.readFile('package.json', (err, data) => {
  console.log('2');
});

console.log('3');
```



### Nodejs中处理异步获取数据的方法：

### 第一种：传回调函数

### 第二种：监听广播



### (1.1) 使用回调函数解决异步获取数据

- 这就产生了一个问题：我们在后面想拿到getMime里读到的数据拿不到

```js
const fs = require('fs');

function getMime() {
  fs.readFile('mime.json', function(err, data) {
    return data;
  })
}

console.log(getMime());      // undefined
```

**因为读取文件是异步操作，那怎么办才能让我们拿到getMime里读取到的数据呢？可以使用回调函数处理异步**

**在调用getMime的时候传一个回调函数进去，在getMime里当获取到data后你把data传进我给你的回调函数里，这样我在外面的回调函数里就能拿到data值了**

```js
const fs = require('fs');

function getMime(callback) {
  fs.readFile('mime.json', function(err, data) {
    callback(data);
  })
}

getMime(function(result) {
  console.loog(result.toString());
})
```



### (1.2) Nodejs events 模块处理异步 【监听和接收广播 or 订阅和通知】

> Node.js有多个内置的事件，我们可以通过引入events模块，并通过实例化EventEmitter类来绑定和监听事件

```js
const events = require('events');

const EventEmitter = new events.EventEmitter();

// 广播 和 接收广播

// 监听to_parent的广播：一开始不会执行回调函数，当EventEmitter.emit后，才会触发这个回调函数
EventEmitter.on('to_parent', function() {
  console.log('接收到了这个广播事件');
})

setTimeout(function() {
  console.log('开始广播...');
  // 广播to_parent事件
  EventEmitter.emit('to_parent', '发送的数据');
}, 2000)
```

**输出结果：开始广播、接收到了这个广播事件**



```js
const events = require('events');

const EventEmitter = new events.EventEmitter();

// 广播 和 接收广播

// 监听to_parent的广播：一开始不会执行回调函数，当EventEmitter.emit后，才会触发这个回调函数
EventEmitter.on('to_parent', function(data) {
  console.log(data);
})

setTimeout(function() {
  console.log('开始广播...');
  // 广播to_parent事件
  EventEmitter.emit('to_parent', '发送的数据');
}, 2000)
```

**输出结果：开始广播、发送的数据**



### 使用广播解决上面读取文件外部获取数据的例子【上面的解决方案是传一个回调函数进去】

```js
const events = require('events');

const EventEmitter = new events.EventEmitter();

function getMime() {
  fs.readFile('mime.json', function(err, data) {
    EventEmitter.emit('data', data);
  })
}

getMime();

// 监听广播数据
EventEmitter.on('data', function(data) {
  console.log(data);
})
```

























