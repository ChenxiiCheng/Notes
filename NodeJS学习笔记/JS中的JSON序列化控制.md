## JS中的JSON序列化控制

#### 若我们不想把返回的数据中的created_at, deleted_at 数据返回，如何删除呢？

```js
//js序列化
const obj = {
  name: '7yue',
  age: 18
}

console.log(JSON.stringify(obj));
打印出的结果：{"name": "7yue", "age": 18}
```

**这两个是有区别的，上面的obj是一个对象，下面打印出来的经过序列化的是一个字符串**

- JSON序列化是把一个对象变成字符串
- JSON是为了解决多种语言之间进行数据交换，字符串这种类型是在各种语言之间都有的。



```js
const obj = {
  name: '7yue',
  age: 18,
  toJSON: function() {
    return {
      name1: '8yue'
    }
  }
}

console.log(JSON.stringify(obj));  => {"name1": "8yue"}
```

**我们发现现在JSON序列化的对象不再是原来的obj了，而是toJSON中返回的对象。每个对象里，一旦定义了toJSON的方法，那么在调用JSON.stringify的时候，就不再是序列化原来的对象了。序列化哪个对象是由toJSON返回的结果来决定的**



```js
  static async addComment(bookID, content) {
    const comment = await Comment.findOne({
      where: {
        book_id: bookID,
        content
      }
    });
    if (!comment) {
      return await Comment.create({
        book_id: bookID,
        content,
        nums: 1
      });
    } else {
      return await comment.increment('nums', {
        by: 1
      });
    }
  }
```

之前按上面的写法，返回的数据里会有create_at, delete_at这些字段，我们只想要content和nums字段，如何操作呢？

**就是用到toJSON方法**

```js
  static async addComment(bookID, content) {
    const comment = await Comment.findOne({
      where: {
        book_id: bookID,
        content
      }
    });
    if (!comment) {
      return await Comment.create({
        book_id: bookID,
        content,
        nums: 1
      });
    } else {
      return await comment.increment('nums', {
        by: 1
      });
    }
  }  
  
  toJSON() {           // 我们只想返回content和nums字段
    return {
      content: this.getDataValue('content'),
      nums: this.getDataValue('nums')
    };
  }
```

