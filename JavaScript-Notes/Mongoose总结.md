## 1. mongoose的增删改查
### (1). 定义Schema
> 数据库中的Schema，是数据库对象集合。schema是mongoose里会用到的一种数据模式，可以理解为表结构的定义；每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力
```js
// 操作user表（集合）  定义一个Schema
const UserSchema = mongoose.Schema({
  name: String,
  age: Number,
  status: Number
})
```



### (2). 创建数据模型

> 定义好了Schema，接下来就是生成Model。model是由schema生成的模型，可以对数据库的操作
> **注意：mongoose.model里可以传入两个参数也可以传入三个参数**
- mongoose.model【参数1：模型名称（首字母大写），参数2：Schema】
- mongoose.model【参数1：模型名称（首字母大写），参数2：Schema，参数3：数据库集合名称】
- **如果传入2个参数的话：**这个模型会和模型名称相同的复数的数据库建立连接。如通过下面方法创建模型，那么这个模型将会操作users这个集合
```
const User = mongoose.model('User', UserSchema);  // 默认操作users表
```
- **如果传入3个参数的话：**模型默认操作第三个参数定义的集合名称
```
const User = mongoose.model('User', UserSchema, 'user');  // 默认操作user表
```



### (3). 查询

```js
User.find({}, function(err, doc) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(doc);
});
```



### (4). 增加数据

```js
const u = new User({
  name: 'haha',
  age: 38,
  status: 1
});

u.save(function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('成功');
});
```



### (5). 更新数据

```js
User.updateOne({ "_id": "xxxxxxxxxxxxx"}), { "title": "我是新用户22" , function(err, doc) {
   if(err) {
      return console.log(err);
   }
   console.log(doc);
}}
```



### (6). 删除数据

```js
User.delete({ "_id", () => {
   if(err) {
      return console.log(err);
   }
   console.log(doc);
} })
```





## 2. mongoose默认参数、模块化、性能

### (1) mongoose默认参数：增加数据的时候，如果不传入数据会使用默认配置的数据
```js
const UserSchema = mongoose.Schema({
   name: String,
   age: Number,
   status: {
      type: Number,
      default: 1            // 默认参数
   }
})
```



### (2) 模块化

- 把连接数据库放到db.js文件中
- 新建user.js文件放User模型
```js
const mongoose = require('./db.js');

const UserSchema = mongoose.Schema({
  name: String,
  age: Number,
  status: {
    type: Number,
    default: 1
  }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
```
- 在app.js中，需要用哪个模型引入哪个
```
const UserModel = require('./model/user.js');


UserModel.find({}, function(err. docs) {
   if(err) {
      return console.log(err);
   }
   console.log(doc);
})
```





## 3. 预定义模式修饰符、Getter和Setter修饰符

### (1) 预定义模式修饰符
- lowercase、uppercase、trim（左右去空格）
- mongoose提供的预定义模式修饰符，可以对我们增加的数据进行一些格式化
```js
const UserSchema = mongoose.Schema({
   name: {
      type: String,
      trim: true
   },
   age: Number,
   status: {
      type: Number,
      default: 1
   }
})
```



### (2) Getters 和 Setters 自定义修饰符

> 除了mongoose内置的修饰符以外，我们还可以通过set（建议使用）修饰符在增加数据的时候对数据进行格式化。也可以通过get（不建议使用）在实例获取数据的时候对数据进行格式化


### (2.1) Setters修饰符【数据写入数据库的时候进行格式化】
- set(params) {}中params可以获取到当前字段的值
- redirect字段，用户可能会输入完整的http://www.baidu.com 或者 https://www.baidu.com，或者只有www.baidu.com，我们希望保存在数据库中的统一都是加上前缀http或者https
```js
const mongoose = require('./db.js');

const FocusSchema = mongoose.Schema({
   title: {
      type: String,
      trim: true   
   },
   pic: String,
   redirect: {
      type: String,
      set(params) {
         // params可以获取到redirect的值，返回的数据就是redirect在数据库实际保存的值
         if(!params) {
            return ''
         } else {
            if(params.indexOf('http://') !== 0 && params.indexOf('https://') !== 0) {
               return 'http://' + params;
            }
            return params;
         }
      }
   }
})

module.exports = mongoose.model('Focus', FocusSchema, 'focus');
```

```js
const FocusModel = require('./model/focus.js');

const focus = new FocusModel({
   title: '新闻',
   pic: 'www.baidu.com/x.png',
   redirect: 'www.baidu.com'
})

focus.save(function () {
   if(err) {
      return console.log(err);
   }
   console.log(doc);
})
```



### (2.2) Getters修饰符【获取数据的时候进行格式化】【不建议使用】

```js
const mongoose = require('./db.js');

const UserSchema = mongoose.Schema({
   name: {
      type: String,
      get(params) {
         return '001' + params;
      }
   },
   age: Number
})

module.exports = mongoose.model('User', UserSchema, 'user');
```
```js
const UserModel = require('./model/user.js');

const user = new UserModel({
   name: '张三',
   age: 20
})

console.log(user.name, user.age);        // 001张三 20
```





## 4. mongoose索引、内置CRUD方法、静态方法、实例方法

### (1) 索引
> 索引是对数据库表中一列或多列的值进行排序的一种结构，可以让我们查询数据库变得更快。mongoDB的索引几乎与传统的关系型数据库一模一样，这其中也包括一些基本的查询优化技巧。

- **可以在定义Schema的时候指定创建索引**
```js
const DeviceSchema = new mongoose.Schema({
   sn: {
      type: Number,
      // 唯一索引
      unique: true
   },
   name: {
      type: String,
      index: true           // 设置索引
   }
})
```



### (2) 扩展 mongoose CRUD方法

**静态方法和示例方法区别**
- ES5写法
```js
function Person() {
   this.run1 = function() {
      
   }
}

Person.name = '哈哈';
Person.run2 = function() {      // 静态方法
   
}

const p = new Person();
Person.run2();                // 静态方法的调用
p.run1();                           // 实例方法
```

- TS/ES6 写法
```js
class Per {
   public name: string;
   public age: number = 20;
   // 静态属性
   static sex = '男';
   constructor(name: string) {
      this.name = name;
   }
   run() {                                              // 实例方法
      alert(`${this.name} 在运动`);
   }
   work() {
      alert(`${this.name} 在工作`);
   }

   static print() {                                // 静态方法
      alert('print方法' + Per.sex);
   }
}

const p = new Per('lisi');
p.run();                                  // 调用实例方法

Per.print();                            // 调用静态方法

```



### (2.1) 静态方法【比如mongoose内置的findById，我现在想根据sn来查询，于是自己编写一个findBySn静态方法】

**在定义Schema的文件中**
- 通过this可以获取当前的model
```js
const mongoose = require('./db.js');
const UserSchema = mongoose.Schema({
   name: {
      type: String
   },
   sn: {
      type: String,
      index: true
   },
   age: Number,
   status: {
      type: Number,
      default: 1
   }
})

UserSchema.statics.findBySn = function(sn, callback) {
   // 通过find方法获取sn的数据
   this.find({ "sn": sn }, function(err, docs) {
      callback(err, docs);
   })
}

module.exports = mongoose.model(User, UserSchema);
```
```js
const UserModel = require('./model/user.js');

UserModel.findBySn('12233333', function(err, docs) {
   if(err) {
      console.log(err);
      return;
   }
   console.log('成功');
})
```



### (2.2) 实例方法

- this能拿到实例的属性

```js
const mongoose = require('./db.js');
const UserSchema = mongoose.Schema({
   name: {
      type: String
   },
   sn: {
      type: String,
      index: true
   },
   age: Number,
   status: {
      type: Number,
      default: 1
   }
})

UserSchema.methods.print = function() {
   // 这里this能拿到实例的属性 eg: this.name, this.sn, this.age
   console.log('实例方法');
}

module.exports = mongoose.model(User, UserSchema);
```
```js
const UserModel = require('./model/user.js');

const user = new UserModel({
   name: 'zz',
   sn: '1111111',
   age: 17
})

user.print();             // 自定义的实例方法
```





## 5. mongoose的数据校验

- require：表示这个数据必须传入，用在任意类型
- max：用于Number类型数据，最大值
- min：用于Number类型数据，最小值
- enum：枚举类型，用在String类型，要求数据必须满足枚举值   enum: ['0', '1', '2']
- match：用在String类型，增加的数据必须符合match（正则）的规则
- maxlength：用在String类型，最大值
- minlength：用在String类型，最小值

```js
const UserSchema = mongoose.Schema({
   name: {
      type: String,
      trim: true,
      required: true
   },
   sn: {
      type: String,
      index: true,
      set(val) {
         return val;
      },
     minlength: 10,
     maxlength: 20,
     match: /^sn(.*)/
   },
   age: {
      type: Number,
      min: 0,
      max: 150
   },
   status: {
      type: String,
      default: 'success',
      enum: ['success', 'error']
   }
})
```



### 5.1 mongoose自定义的验证器【validate: function() {}】

```js
const UserSchema = mongoose.Schema({
   sn: {
      type: String,
      index: true,
      set(val) {
         return val;
      },
     // minlength: 10,
     // maxlength: 20,
     validate: function(sn) {
        return sn.length >= 10;
     }
     match: /^sn(.*)/
   },
})
```





## 6. 聚合管道【表和表的关联查询】【aggregation是mongoDB的方法，mongoose有个强大的populate能实现类似mongoDB聚合管道作用】

### 6.1 MongoDB写法
- 我们现在有两张表，第一张是order订单表，第二张是order_item订单商品表，是一对多的关系
**订单表1、2、3**
```
db.order.insert({ "order_id": "1", "uid": 10, "trade_no": "111", "all_price": 100, "all_num": 2 })
db.order.insert({ "order_id": "2", "uid": 7, "trade_no": "222", "all_price": 90, "all_num": 2 })
db.order.insert({ "order_id": "3", "uid": 9, "trade_no": "333", "all_price": 20, "all_num": 6 })
```
**订单表1中的商品**
```
db.order_item.insert({ "order_id": "1", "title": "商品鼠标 1", "price": 50, "num": 1 })
db.order_item.insert({ "order_id": "1", "title": "商品键盘 2", "price": 10, "num": 1 })
db.order_item.insert({ "order_id": "1", "title": "商品键盘 3", "price": 20, "num": 1 })
```

**在mongoDB中查询：order表和order_item表关联，通过order表的order_id字段和order_item表的order_id字段关联，查询结果放在items中**
```js
db.order.aggregate([
   {
      $lookup:             // 表关联
         {
            from: "order_item",
            localField: "order_id",
            foreignField: "order_id",
            as: "items"
         }
   },
{
   $match: { "all_price": { $gte: 90 } }
}
])
```

**查询结果JSON格式**
```json
{
   "_id": ObjectId("xxxxxxxxxxxxx"),
   "order_id": "1",
   "uid": 10,
   "trade_no": "111",
   "all_price": 100,
   "all_num": 2,
   "items": [{
      "_id": ObjectId("xxxxxxxxxxxxx"),
      "order_id": "1",
      "title": "商品鼠标 1",
      "price": 50,
      "num": 1
   }, {
      "_id": ObjectId("xxxxxxxxxxxxx"),
      "order_id": "1",
      "title": "商品键盘 2",
      "price": 10,
      "num": 1
}, {
      "_id": ObjectId("xxxxxxxxxxxxx"),
      "order_id": "1",
      "title": "商品键盘 2",
      "price": 10,
      "num": 1
   }]
 .....
} 
```



### 6.2 Mongoose写法【查询order表并包含每个订单的order_item】

- **order Schema**
```js
const mongoose = require('./db.js');

const OrderSchema = mongoose.Schema({
   order_id: String,
   uid: Number,
   trade_no: String,
   all_price: Number,
   all_num: Number
})

module.exports = mongoose.model('Order', OrderSchema, 'order');
```

- **order_item Schema**
```js
const mongoose = require('./db.js');

const OrderItemSchema = mongoose.Schema({
   order_id: String,
   title: String,
   price: Number,
   num: Number
})

module.exports = mongoose.model('OrderItem', OrderItemSchema, 'order_item');
```

- 在app.js中，注意是谁关联谁【order表关联order_item】
```js
const OrderModel = require('./model/order.js');

// 查询order 表的数据
OrderModel.find({}, function(err, docs) {
   console.log(docs);
})

// 查询order表并包含每个订单的order_item
// order表关联order_item
OrderModel.aggregate([
   {
      $lookup:             // 表关联
         {
            from: "order_item",             // 表名称
            localField: "order_id",
            foreignField: "order_id",
            as: "items"
         }
   },
   {
   $match: { "all_price": { $gte: 90 } }      // 过滤all_price字段大于等于90的数据才返回出去
   }
], function(err, docs) {
   if(err) { 
      console.log(err);
      return;
   }
   console.log(docs);       // 就实现了！！
})
```



### 6.3 查询某个商品的订单号

### 第一种实现方式：
**查询order_item，找出商品名称是酸奶的商品，酸奶这个商品对应的订单的订单号以及订单的总价格**

```js
const OrderItemModel = require('./model/order_item.js');
const OrderModel = require('./model/order.js');

OrderItemModel.find({ "_id": xxxxxxxxxxx }, function(err, docs) {
   const order_item =JSON.parse(JSON.stringify(docs));

   // 查询到酸奶的信息
   const order_id = docs[0].order_id;

   // 拼接
   OrderModel.find({ "order_id": order_id }, function(err, order) {
      order_item[0].order_info = order[0];
     
      console.log(order_item);
   })
})
```

**达到预期结果**
```
[{
    _id: 'xxxxxxxxxxxx',
    order_id: '2',
    title: '酸奶',
    price: 40,
    num: 1,
    order_info: {
       _id: xxxxxxxxxxxx,
      order_id: '2',
      uid: 7,
      trade_no: '222',
      all_price: 90,
      all_num: 2
    } 
}]
```

### 第二种方式：
**order_item表关联order表【反过来了】**
```js
OrderItemModel.aggregate([
   {
      $lookup:             // 表关联
         {
            from: "order",             // 表名称
            localField: "order_id",
            foreignField: "order_id",
            as: "order_info"
         }
   },
   {
   $match: { "_id": mongoose.Types.ObjectId('xxxxxxxxxxxxxx')} }     
   }
], function(err, docs) {
   if(err) {
      console.log(err);
      return;
   }

   console.log(JSON.stringify(docs));
})
```





## 7. N个表的关联查询

![image](https://user-images.githubusercontent.com/46094447/74686258-f4163480-519e-11ea-8430-01faa6d09619.png)

```js
const ArticleSchema = new Schema({
   title: {
      type: String,
      unique: true
   },
   cid: {
      type: Schema.Types.ObjectId           // 分类id
   },
   author_id: {
      type: Schema.Types.ObjectId          // 用户的id
   },
   description: String,
   content: String
});

module.exports = mongoose.model('Article', ArticleSchema, 'article');
```

```js
const ArticleCateSchema = new Schema({
   title: {
      type: String,
      unique: true
   },
   description: String,
   addtime: {
      type: Date
   }
})
```

```js
const UserSchema = new Schema({
   username: {
      type: String,
      unique: true
   },
   password: String,
   name: String,
   age: Number,
   sex: String,
   tel: Number,
   status: {
      type: Number,
      default: 1
   }
})

module.exports = mongoose.model('User', UserSchema, 'user');
```

### 查询文章信息并显示文章的分类以及文章作者的信息
```js
ArticleModel.aggregate([
   {
      $lookup: {
         from: "articlecate",
         localField: "cid",  
         foreignField: "_id",
         as: "cate"
      }
   },
   {
      $lookup: {
         from: "user",
         localField: "author_id",  
         foreignField: "_id",
         as: "user"
      }
   },
], function(err, docs) {
    console.log(JSON.stringify(docs));
})
```





## 8. Populate 类似聚合管道的表的关联查询【3.2版本后才有聚合管道】

> MongoDB has the join-like $lookup aggregation operator in versions >= 3.2. Mongoose has a more powerful alternative called `populate()`, which lets you reference documents in other collections.

### 使用populate方法实现上面7中的情况**
### (1)写Schema的时候，就要写ref，表之间的关系
![image](https://user-images.githubusercontent.com/46094447/74686258-f4163480-519e-11ea-8430-01faa6d09619.png)

```js
const ArticleSchema = new Schema({
   title: {
      type: String,
      unique: true
   },
   cid: {          // 分类id，外键接到ArticleCate【外键的意思就是当前模型通过这个字段连接到其他模型】
      type: Schema.Types.ObjectId,  
      ref: 'ArticleCate'            // model的名称，文章 属于 文章分类
   },
   author_id: {        // 用户的id，外键接到User
      type: Schema.Types.ObjectId,
      ref: 'User'                       // 用户id 属于 作者表 
   },
   author_name: {
      type: String
   },
   description: String,
   content: String
})
```

### (2) 关联查询
```js
ArticleModel.find({}).populate('cid').populate('author_id').exec(function(err, docs) {
   console.log(docs);
})
```



==============================================================================



## 全栈之巅

## 1. 修改
- db.collection.update(查询条件，新对象)
   - update() 默认情况下会使用新对象来替换旧的对象
   - 如果只修改指定的属性，而不是整个替换需要使用修改操作符来完成修改
      - `$set`：可以用来修改文档中的指定属性
      - `$unset`：可以 用来删除文档的指定属性
   - update() 默认只会修改一个
   - update(查询条件, 新对象, { multi: true }) 修改多个
- db.collection.updateMany()
   - 同时修改多个符合条件的文档
- db.collection.updateOne()
   - 修改一个符合条件的文档

```
db.stus.update({ name: "沙和尚" }, { $set: { gender: "男", address: "流沙河" } })
```
```
db.stus.update({ name: "沙和尚" }, { $unset: { address: 1 } })
```





## 2. 删除

- db.collection.remove()
   - 删除一个或多个，可以第二个参数传递一个true，则只会删除一个
   - 如果只传递一个空对象，则会删除所有的
- db.collection.deleteOne()
- db.collection.deleteMany()
- db.collection.drop() 删除集合
- db.dropDatabase() 删除数据库





## 3. 文档之间的关系

- 一对一 (one to one)
- 一对多 (one to many) / 多对一 (many to one)

```js
db.users.insert([
   { username: 'swk' },
   { username: 'zbj' }
]);

db.order.insert({
   list: ["牛肉", "漫画"],
   user_id: ObjectId('猪八戒的_id')
})
```

- 多对多 (many to many)
```js
db.teacher.insert([
   { username: '黄药师' },     // ObjectId('xxxxxxxxx1')
   { username: '唐僧' },         // ObjectId('xxxxxxxxx2')
   { username: '洪七公' },
]);

db.student.insert([
   { 
      name: '孙悟空‘,
      teacher_ids: [
          ObjectId('xxxxxxxxx1'),
          ObjectId('xxxxxxxxx2'),
      ]
   }
])
```





## 4. API

### (1) Model.findOne([condition], [projection], [options], [callback])
- condition：查询的条件
- projection：投影 需要获取到的字段
   - 其中的project两种写法
      - [name: 1, _id: 0]   （只显示name字段，_id字段不显示）
      - "name -_id"        （作用同上）
- options：查询选项（skip，limit）
- callback：回调函数，查询结果会通过回调函数返回

```js
stuModel.find({}, "name age -_id", { skip: 2, limit: 1 }, function(err, docs) {
   if (!err) {
      console.log(docs);
   }
});
```



### (2) Model.update(conditions, doc, [options], [callback])

- conditions：查询的条件
- doc：修改后的对象
- options：配置参数
- callback：回调函数

```js
StuModel.updateOne({ name: '唐僧' }, { $set: { age: 20 }}, function(err) {
   if (!err) {
      console.log('修改成功')
   }
})
```



### (3) Model.remove(conditions, [callback])



======================================================================



## 1. 两张表设置关联
### 比如文章Post表和分类Category表，按照文章所属分类来设置"外键"字段，【以后都是按照属于思想来设置】。在Post模型中设置category字段【文章属于哪个分类，当然一篇文章可以有多个分类，把category字段的值写成[]数组形式即可】

- 表1：Category表
```js
const CategorySchema = new mongoose.Schema({
    name: { type: String }
});

const Category = mongoose.model('Category', CategorySchema);
```

- 表2：Post表
```js
const PostSchema = new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  // category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }]
});

const Post = mongoose.model('Post', PostSchema);
```

- 给帖子设置category

### 通过populate把关联的字段查询出来

**先插入些数据**

```
await Post.insertMany([
  { title: '我的第一篇帖子', body: '内容1' },
  { title: '我的第二篇帖子', body: '内容2' },
  { title: '我的第三篇帖子', body: '内容3' }
]);
await Category.insertMany([{ name: 'nodejs' }, { name: 'vuejs' }]);
```

```js
const cat1 = await Category.findOne({ name: 'nodejs' });
const cat2 = await Category.findOne({ name: 'vuejs' });
const post1 = await Post.findOne({ title: '我的第一篇帖子' });
const post2 = await Post.findOne({ title: '我的第二篇帖子' });
post1.categories = [cat1, cat2];
post2.categories = [cat2];
await post1.save();
await post2.save();
const posts = await Post.find().populate('categories');    // 通过populate把关联的字段查询出来
console.log(posts[0], posts[1]);
```





## 2. 当然一篇文章可以有多个分类，把category字段的值写成[]数组形式即可





##  3. 高级用法，Post模型里有categories字段，所以查询Post模型时通过populate可以把categories字段对应的Category模型数据查出来；但是反过来，能不能通过Category模型查出post呢？

### 我们知道Category模型了没有post字段，但是我们可以虚拟一个Category模型连接Post模型的字段 posts【自己取名的】

### 其实就是和我们在Post模型中设置categories字段，关联Category模型一样；当时用的是Post模型里的categories字段关联Category模型的id；在下面virtuals中，localField对应Category的id，foreignField对应Post模型的categories

- 设置关联哪个模型ref
- localField: 本模型中用于关联的字段 【Category模型中用于关联Post模型的字段，这里用Category的id】
- foreignField: Post表中的和本Category表连接的那个键

```js
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String }
  },
  {
    toJSON: { virtuals: true }
  }
);

// 想通过Category查询post，但是Category模型里没有post字段
// 于是虚拟一个，第一个参数就是我们取的字段名 posts
// ref: 关联哪个模型；localField: 本模型中用于关联的字段;
// foreignField: Post表中的和本Category表连接的那个键
CategorySchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'categories',
  justOne: false
});

const Category = mongoose.model('Category', CategorySchema);
```

### 因为在Category模型里设置了toJSON，所以可以通过JSON.stringify()在控制台打印出对应的post
### 如果想在返回的接口里带上cats的话，需要在Category模型里配置toJSON这项

```js
async function main() {
  const cats = await Category.find().populate('posts');
  console.log(JSON.stringify(cats));
}
```

