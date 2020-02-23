## Express.js

## 0. 

### (0.1) .env.local 中放私密密匙、密码等信息

#### .env.local文件

- 在根目录下新建.env.local文件，create-react-app cli 生成的.gitignore里已经添加了.env.local不会提交上去的。
- 在这个文件里写密匙、密码等信息，在其他文件里调用
```js
const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
);
```



### (0.2) concurrently同时运行前后端

### 安装concurrently包，配置脚本一个命令同时运行前后端

- `npm -D install concurrently`
- 根目录下 `npx create-react-app client`
- 根目录下的package.json中，新增脚本
**package.json**
```json
"scripts": {
   "start": "node server.js",
   "server": "nodemon server.js",
   "client": "npm start --prefix client",
   "clientinstall": "npm install --prefix client",
   "dev": "concurrently \"npm run server\" \"npm run client\""
},
```
- 在client目录下的package.json中添加proxy，这样我们在react里写请求的时候就不需要加前缀了
**client/package.json**
```json
{
  ....
  "proxy": "http://localhost:5000"
}
```



## 1. Express客户端登陆校验

### 如果我们的页面（例如新建页面）没有请求后端，后端就不会进行服务端登陆校验返回401，我们前端axios响应拦截器拦截不到错误就不会跳转到登陆界面。所以我们需要做客户端登陆校验！

#### 突然明白了brad用的高阶组件PrivateRoute，其实就是前端路由守卫啊！！

#### Vue中使用路由守卫，先给login路由加个meta信息在后面钩子里通过这个meta信息判断出是不是login页面。login这个路由是public的不需要守卫，然后使用beforeEach钩子做判断和限制
```js
Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },
      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },
      { path: '/heroes/create', component: HeroEdit },
      { path: '/heroes/edit/:id', component: HeroEdit, props: true },
      { path: '/heroes/list', component: HeroList },
      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/articles/list', component: ArticleList },
      { path: '/ads/create', component: AdEdit },
      { path: '/ads/edit/:id', component: AdEdit, props: true },
      { path: '/ads/list', component: AdList },
      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login');
  }
  next();
});

export default router;
```





## 2. Express 服务端登陆校验

### (2.1). 第一步，在前端传的http Request Header中添加Authorization字段，把token放在里面，这样token就传给了后端
```js
import axios from 'axios';
import Vue from 'vue';
import router from './router';

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
});

http.interceptors.request.use(
  function(config) {
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + (localStorage.token || '');
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
```



### (2.2). 后端需要登陆校验的路由里使用校验token中间件

#### 通用CRUD总路由中使用token校验中间件
```js
module.exports = app => {
  const express = require('express');
  const multer = require('multer');
  const jwt = require('jsonwebtoken');
  const assert = require('http-assert');
  const inflection = require('inflection');
  const AdminUser = require('../../models/AdminUser');
  const router = express.Router({
    mergeParams: true
  });

  ...

  // 通用CRUD总路由中使用token校验中间件
  app.use(
    '/admin/api/rest/:resource',
    async (req, res, next) => {
      // auth中间件：校验token
      const token = String(req.headers.authorization || '')
        .split(' ')
        .pop();
      assert(token, 401, '请先登录');

      const { id } = jwt.verify(token, app.get('secret'));
      assert(id, 401, '请先登录');

      req.user = await AdminUser.findById(id);

      assert(req.user, 401, '请先登录');

      await next();
    },
    async (req, res, next) => {
      const modelName = inflection.classify(req.params.resource);
      req.Model = require(`../../models/${modelName}`);
      next();
    },
    router
  );

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;
    // 1. 根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password');

    // 使用了http-assert这个第三方库
    // 若错误直接抛出异常，然后在后面写个错误处理函数，把错误返回给前端
    // 前端在axios的响应拦截器里拦截到错误
    assert(user, 422, '用户不存在');

    // 2. 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password);
    assert(isValid, 422, '密码错误');

    // 3. 返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'));
    return res.send({ token });
  });

  // 错误处理函数，四个参数的就表示错误处理中间件
  // 后端返回错误，前端的http响应拦截器拦截到后端这边返回的错误
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
};
```



### (2.3). 第三步，使用http-assert第三方库，若出错直接抛出错误，所以我们编写个错误处理函数(err, req, res, next) 四个参数的就是错误处理函数，捕捉node里的所有异常。在错误处理函数中，返回给前端错误码和错误信息，前端在axios的响应拦截器里拦截到错误

#### 比如 `assert(token, 401, '请先登录')`，axios响应拦截器中还能根据具体的错误码，做些操作，比如 `if (err.response.status === 401) {router.push('/login')}` 跳转到登陆界面

#### 这里的处理方式和brad经常用的不太一样，brad是直接在auth校验中间件中try...catch直接return 错误码和错误信息，就不需要再写错误处理函数了。两中做法都行，brad的比较直接简单些

```js
module.exports = app => {
  const express = require('express');
  const multer = require('multer');
  const jwt = require('jsonwebtoken');
  const assert = require('http-assert');
  const inflection = require('inflection');
  const AdminUser = require('../../models/AdminUser');
  const router = express.Router({
    mergeParams: true
  });

  ...

  // 错误处理函数，四个参数的就表示错误处理中间件
  // 后端返回错误，前端的http响应拦截器拦截到后端这边返回的错误
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
};
```





## 3. Express 登陆接口

### (3.1). 前端登录界面

### 前端做的5步操作：
1. 获取到用户输入的username和password
2. 发起http post请求，把username和password传给后端
3. 把接收到的token存在浏览器的localStorage中
4. 路由跳转
5. 提示框告知用户登录成功

```js
<template>
  <div class="login-container">
    <el-card header="Login" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="Username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="secondary" native-type="submit" size="small"
            >LOGIN</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post('/login', this.model);
      localStorage.token = res.data.token;
      this.$router.push('/');
      this.$message({
        type: 'success',
        message: '登录成功'
      });
    }
  }
};
</script>

<style>
.login-card {
  margin: 9rem auto;
  width: 25rem;
}
</style>
```



### (3.2). 后端登录接口

### 后端的3步操作：
1. 根据前端传的username 或者 email来查找数据库user 【这个是根据username还是email看前端怎么传呗】
2. 校验密码
3. 返回token

- 在后端入口index.js里
```
// 在当前express的实例app上设置变量
app.set('secret', 'qwe12e9u123jbsf');
```

- 这里使用的是 `bcrypt`第三方包，不是brad经常用的`bcryptjs`，brad用的这个包加密需要先生成salt

```js
  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;
    // 1. 根据用户名找用户
    const AdminUser = require('../../models/AdminUser');
    const user = await AdminUser.findOne({ username }).select('+password');
    if (!user) {
      return res.status(422).send({
        message: '用户不存在'
      });
    }
    // 2. 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password);
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      });
    }
    // 3. 返回token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id }, app.get('secret'), { expiresIn: '30d' });
    return res.send({ token });
  });
```





## 4. 设置托管静态文件、跨域、第三方库接收上传资源

### (4.1). express设置托管静态文件，用户在浏览器通过 http://localhost:5000/xxx/xx.jpg可访问到后端xxx文件夹下的资源

- 这里我们把后端的uploads目录设置为静态资源目录
- **在项目入口index.js中**
```
app.use('/uploads', express.static(__dirname + '/uploads'))
// app.use('/url', express.static('静态资源目录'));
```



### (4.2). express设置跨域资源共享

- `npm install cors`
- **在server.js中（项目入口）**
```js
const cors = require('cors');

app.use(cors());
```



### (4.3). 使用第三方库multer 接收前端传的图片资源

- `npm install multer`
- 在路由中配置
```js
  // 上传新建物品的图标
  const multer = require('multer');
  const upload = multer({ dest: __dirname + '/../../uploads' });  // 设置图片上传到哪，以中间件的形式使
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    res.send(file);
  });
```





## 5. auth中间件【校验token、角色权限控制】

### (5.1). 校验token

- **新建middlewares/auth.js**
```js
const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // else if (req.cookies.token) {
  //   token = req.cookies.token
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }

  // Verify token
  // {id: 1, iat: xxx, exp: xxx}
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
});
```

- **给private的路由加上这个protect校验**
```js
const { protect } = require('../middlewares/auth');

router.get('/me', protect, getMe);
```



### (5.2). 角色权限控制

#### 我们在设计数据库的时候，每个用户都有一个role字段，只有三种选项，‘’publisher' 和 'user' 和 'admin'，对于crud相关的操作我们限制只有该登录用户是 'publisher'和'admin'才能进行操作，如何设计控制权限呢？

**其实实现很简单，利用闭包。编写一个函数，这个函数是直接在路由上调用，传入我们设置有权限的role，该role值传入函数，我们利用闭包，判断路由上设置的roles中是否包含我们req.user.role的值，若无，则说明没角色权限。**

- **在middlewares/auth.js**
```js
// 角色控制权限
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
```

- **在路由上控制**
```js
const { protect, authorize } = require('../middlewares/auth');

router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'admin'), deleteCourse);
```





## 6. Express 加密password放到中间件中操作（利用mongoose提供的hooks)

### (6.1). 原本加密直接写在controllers/auth.js中就行了，但现在想要保持controllers/auth.js文件简洁 和 尝试下新方法

### 1. controllers/auth.js
```js
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

/**
 * @desc    Register user
 * @route   GET /api/v1/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  // 把加密password放在中间件中处理(利用mongoose提供的hooks)，在数据保存到数据库前触发这个加密操作
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  res.status(200).json({ success: true });
});

```



### 2. models/User.js

```js
// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  // this.password获取到User.create({})里传的password
  this.password = await bcrypt.hash(this.password, salt);

  next();
});
```



### (6.2). 另种实现加密方式，直接在模型上的password字段里写set函数

```js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String,
    set(val) {
      return require('bcrypt').hashSync(val, 10);
    }
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
```





## 7. 两个路由公用一个controller + 路由配置解决方案

### (7.1). controllers/courses.js

```js
const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

/**
 * @desc    Get courses
 * @route   GET /api/v1/courses
 * @route   GET /api/v1/bootcamps/:bootcampId/courses
 * @access  Public
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    // GET /api/v1/bootcamps/:bootcampId/courses
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    // GET /api/v1/courses
    query = Course.find();
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
});
```



### (7.2). 路由配置

- **对于 /api/v1/courses 的路由配置在routes/courses.js中**
```js
const express = require('express');
const { getCourses } = require('../controllers/courses');
const router = express.Router();

router.route('/').get(getCourses);

module.exports = router;
```

- **对于/api/v1/bootcamps/:bootcampId/courses**
   - **方案一：可以配置在routes/bootcamps.js中，把上面这个controller导进bootcamps.js路由文件里**
   - **方案二：配置在routes/courses.js中，路由前缀是/bootcampId，我们在routes/bootcamps.js中设置下，当路前缀是/bootcampsId，转发到routes/courses.js路由中**

**routes/bootcamps.js**
```js
// Include other resource routers
const courseRouter = require('./courses');                         // 新增

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);          // 新增
```

**在routes/courses.js中 修改下**
```js
const express = require('express');
const { getCourses } = require('../controllers/courses');
const router = express.Router({ mergeParams: true });            // 新增mergeParams: true

router.route('/').get(getCourses);

module.exports = router;
```







## 8. 编写asyncHandler中间件

### 我们想把controllers/bootcamps.js中的try..catch都去掉，如何改写呢？

**编写一个asyncHandler中间件，包裹住async即可**

- **在middlewares目录下新建async.js**
```js
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
```

- **改写controllers/bootcamps.js**
**用asyncHandler包裹在async外面即可，所有函数都包上**

```js
const asyncHandler = require('../middlewares/async');

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});
```







## 9. 编写Error Handler中间件

### (9.1). 初级写法

**（1）controllers/bootcamps.js 中**
**原本**
```js
  try {
    ...
  } catch (err) {
    res.status(400).json({ success: false });
  }
```
**修改成：把错误通过next(err)形式，传递到下个中间件里**
```js
  try {
    ...
  } catch (err) {
    next(err)
  }
```

**（2）在middlewares目录下新建error.js**
```js
const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  console.log(err.stack.red);

  res.status(500).json({
    success: false,
    error: err.message
  });
};

module.exports = errorHandler;

```

**（3）在server.js中使用这个error.js中间件，设置在router分发后面**
- 这样在controllers/bootcamps.js中使用next()，就会传递到errorHandler这里面，也就是我们的middlewares/error.js中
```js
const errorHandler = require('./middlewares/error');

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);                                  // 放在这里！！！
```



### (9.2). 进阶版一：我们想要在controllers/bootcamps.js的next()里，传我们设置的错误信息和错误状态码到中间件middlewares/error.js中

**(1) 因为我们是在catch()里调用next(err)的，传过去的只有err.message，我们需要扩展下，写个类，这个类继承Error，在类里添加上statusCode**
- 在根目录下新建utils目录，在其中新建errorResponse.js
```js
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);                                   // 继承父类的message
    this.statusCode = statusCode;           // 添加了statusCode属性
  }
}

module.exports = ErrorResponse;
```

**(2) 在controllers/bootcamps.js中使用这个扩展类**
```js
const ErrorResponse = require('../utils/errorResponse');

 try {
    ...
    }
  } catch (err) {
    next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
```

**(3) 改写middlewares/error.js**

```js
const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  console.log(err.stack.red);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
};

module.exports = errorHandler;
```



### (9.3). 进阶版二：继续简化，我们想在controllers/bootcamps.js了直接next(err)，new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)的操作放到middlewares/error.js里写

**(1) 通过在middlewares/error.js里console.log(err.name)我们得知可以通过不同的err.name在error.js里判断应该new ErrorResponse()什么样的message和statusCode**

**controllers/bootcamps.js**
```js
 try {
    ...
    }
  } catch (err) {
    next(err)
  }
```

**middlewares/error.js**
```js
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  // 这里要先给error加上message，是因为我们后面new ErrorResponse这个扩展类里要继承父类的message
  error.message = err.message;

  // Log to console for dev
  console.log(err.stack.red);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
```



### (9.4). 继续进阶：补充完善error.js中间件 【我们可以随意根据err的name, code等来判断是什么错误，来指定错误信息和statusCode，这就是我们的错误处理中间件！！】

- Mongoose duplicate key，【create new bootcamp】当重复的post body发送第二次的时候
- Mongoose validation error，【create new bootcamp】当post body为空的时候

```js
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err);

  // console.log(err.name); CastError
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key 
  // create new bootcamp，当重复的post body发送第二次的时候
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error  
  // create new bootcamp，当post body为空的时候
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
```