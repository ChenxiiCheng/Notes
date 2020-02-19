## NestJS 学习

![image-20200218153540575](/Users/chenxi/Library/Application Support/typora-user-images/image-20200218153540575.png)



## 1. NestJS 中的控制器

### Nest中的控制器层负责处理传入的请求，并返回对客户端的响应

- 处理一些简单的业务逻辑

- 通过NestCLI创建控制器

  ```
  nest g controller news
  ```

  

![image-20200218155051401](/Users/chenxi/Desktop/image-20200218155051401.png)





## 2. NestJS 中的路由

> Nest.js 中没有单独配置路由的地方。定义好控制器后nest.js会自动给我们配置对应的路由。

#### 👇代码定义了一个新闻控制器。装饰器为 @Controller('article')，装饰器参数里面的'article'就是我们的路由。

- 如果我们要返回index方法里面的内容我们在浏览器输入 `http://localhost:3000/article`
- 如果我们要返回add方法里面的内容我们在浏览器输入 `http://localhost:3000/article/add`

```js
import { Controller, Get } from '@nestjs/common';

@Controller('article')
export class ArticleController {
  @Get()
  index() {
    return '我是一个文章页面';
  }

  @Get('add')
  addArticle() {
    return '增加新闻';
  }
}
```





## 3. Nest.js 中的Get、Post以及通过方法参数装饰器获取传值

### (1) Nest.js中获取请求参数

- 在nest.js中获取Get传值或者Post提交的数据的话，我们可以通过使用Nest.js中的装饰器来获取

```js
@Request()                            req
@Response()                           res
@Next()                               next
@Session()                            req.session
@Param(key?: string)                  req.params / req.params[key]
@Body(key?: string)                   req.body / req.body[key]
@Query(key?: string)                  req.query / req.query[key]
@Headers(name?: string)               req.headers / req.headers[name]
```

**例子**

```js
import { Controller, Get, Query } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  index() {
    return '用户中心';
  }

  // http://localhost:3000/user/add?id=123&name=zhangsan
  // 输出 {id: '123', name: 'zhangsan'}
  @Get('add')
  addData(@Query() query) {
    console.log(query);
    return query;
  }
  
  // 通过Request装饰器获取get传值
  // http://localhost:3000/user/edit?id=111&name=zhangsan
  // 输出 {id: '111', name: 'zhangsan'}
  @Get('edit')
  editData(@Request() req) {
    console.log(req.query);
    return '通过Request获取get传值';
  }
  
  // 通过Body装饰器获取post传值
  @Post('create')
  create(@Body() body) {
    console.log('触发了post');
    console.log(body);
    return '我是post方法';
  }
}

```





### (2) Nest.js 中的动态路由

> 当需要接受动态数据作为请求的一部分时，具有静态路径的路由将不起作用（例如：GET  /cats/1）获取具有id的cat1。为了定义带参数的路由，我们可以在路由中添加路由参数标记，以捕获请求URL中该位置的动态值。@Get() 下面的装饰器实例中的路由参数标记演示了此用法。可以使用@Param() 装饰器访问以这种方式声明的路由参数，该装饰器应添加到函数签名中。



```js
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a ${params.id} cat`;
}
```







## 4. Nest.js 中配置静态资源

### (1) 配置静态资源 

#### 我们想 http://localhost:3000/pic.jpg 直接看到图片

**在根目录下新建public目录，把图片放进去。在main.ts中**

```js
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public'); // 配置静态资源目录
  await app.listen(3000);
}
bootstrap();
```



### (2) 配置虚拟目录

**我们想通过 http://localhost:3000/static/1.jpg** 来访问public目录里面的文件

```js
app.useStaticAssets('public', {
  prefix: '/static/',       // 设置虚拟路径
})
```





## 5. 配置模板引擎

### (1) 安装对应的模板引擎。比如ejs

```
npm i ejs --save
```



### (2) 配置爱模板引擎

```js
app.setBaseViewsDir(join(__dirname, '..', 'views'));     // 放视图的文件
app.setViewEngine('ejs');
```







## 5. Nest.js中的服务

> Nest.js中的服务可以是service也可以是provider。他们都可以通过constructor注入依赖关系。服务本质就是通过@Injectable() 装饰器注解的类。在Nest.js中服务相当于MVC的Model

![image-20200218224922684](/Users/chenxi/Library/Application Support/typora-user-images/image-20200218224922684.png)

- Model：处理复杂业务逻辑、和数据库打交道



### (1) Nest.js中创建和使用服务【服务可以依赖注入任何控制器里】

- 创建服务

```
nest g service user
```



- 使用服务
  - 需要在根模块引入并配置
  - 在用到的地方引入并配置



**操作**

- 先创建news的controller和service，脚手架会自动在根模块中导入这两个东西
- 在news/news.service.ts

```js
import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
  findAll() {
    return [
      { title: '新闻1' },
      { title: '新闻2' },
      { title: '新闻3' },
    ]
  }
}
```

- 在news/news.controller.ts

```js
import { Controller, Get, Render } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  // 依赖注入 newsService相当于是NewsService的实例
  constructor(private readonly newsServices: NewsService) {}   

  @Get()
  @Render('default/news')
  index() {
    return {
      newsList: this.newsServices.findAll();
    }
  }
}
```

- 在模板中渲染数据 news.ejs

```html
<ul>
  <%for(var i = 0; i < newsList.length; i++){%>
  <li>
    <%=newsList[i].title%>
  </li>
  <%}%>
</ul>
```











