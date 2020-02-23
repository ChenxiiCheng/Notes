## Sequelize初始化配置 & User模型

- Sequelize 连接数据库 配置一些数据库的参数
- 使用sequlize操作mysql的话，需要安装相应的驱动，这里我们需要安装 `mysql2`

#### 1. 在config.js文件中写配置

```js
module.exports = {
  environment: 'dev',     // 这是之前写的判断当前环境
  database: {             // 这是我们要写的数据库的一些相关配置
    dbName: '7yue',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '!qwe123qwe'
  }
};
```



#### 2. 在core文件夹下新建db.js，这里初始化sequelize实例

```js
const Sequelize = require('sequelize');
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database;

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {}
});

module.exports = {
  db: sequelize
};
```



#### 3. User模型

**在app/models/user.js中**

```js
const { db } = require('../../core/db');

const { Sequelize, Model } = require('sequelize');

class User extends Model {}

User.init({
  // 主键 关系型数据库
  // 主键：不能重复 不能为空
  // 注册 User id编号系统600001 600002
  // 自动增长id编号1 2 3
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nikename: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
});
```



**编写User API**

```js
//在app/api/v1/user.js

const Router = require('koa-router');

const { RegisterValidator } = require('../../validators/validator');
const router = new Router({
  prefix: '/v1/user'
});

// 注册 新增数据 put get delete

router.post('/register', async (ctx, next) => {
  // 思维路径
  // 1.接收参数 -> LinValisator校验
  // email password1 password2 nickname
  const v = new RegisterValidator().validate(ctx);
});

module.exports = router;
```

```js
// 在validator.js中
class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [new Rule('isEmail', '不符合Email规范')];
    this.password1 = [
      // 用户指定范围 要求用户密码强度
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule(
        'matches',
        '密码不符合规范',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
      )
    ];
    this.password2 = this.password1;
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      })
    ];
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同');
    }
  }
}

module.exports = {
  RegisterValidator
};
```























