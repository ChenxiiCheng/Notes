## 微信小程序登录鉴权&验证token

- 小程序登录只需要code码，调用微信API
- openid 唯一标识 鉴定
- 显示注册
- 唯一标识
- appid appsecret

![image-20190922132050599](/Users/chenxi/Library/Application Support/typora-user-images/image-20190922132050599.png)



#### 1. 在config.js中填入小程序相关配置信息

```js
  wx: {
    appId: '填写自己的appId',
    appSecret: '填写自己的appSecret',
    loginUrl:                         // 用了%s占位，我们之后会把这三个值拼接起来
      'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
```



#### 2. 在models/user.js中 写数据库操作

```js
// 通过openid（用户唯一标识符）查询用户
static async getUserByOpenid(openid) {
  const user = await User.findOne({
    where: {
      openid
    }
  });
  return user;
}

// 通过openid 创建用户
static async registerByOpenid(openid) {
  return await User.create({
    openid
  });
}
```



#### 3. 在wx.js中写业务实现上图操作

```js
class WXManager {
  static async codeToToken(code) {
    //使用nodejs内置的util库的format函数把微信登录凭证的四个值拼起来
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code
    );
    const result = await axios.get(url);  //使用axios库发送上面拼好的url到微信验证登录的网址
    if (result.status !== 200) {
      throw new global.errs.AuthFailed('openid获取失败');
    }
    const errcode = result.data.errcode;
    if (errcode !== 0) {
      throw new global.errs.AuthFailed('openid获取失败: ' + errcode);
    }
		// 先查询下数据库中有没有这个用户
    let user = await User.getUserByOpenid(result.data.openid);
    if (!user) {
      // 如果用户不存在在数据库，创建用户
      user = await User.registerByOpenid(result.data.openid);
    }
    return generateToken(user.id, Auth.USER);    // 返回给用户一个token令牌
  }
}
```

**生成令牌函数在core/util.js中**

```js
const generateToken = function(uid, scope) {
  const secretKey = config.security.secretKey;
  const expiresIn = config.security.expiresIn;
  const token = jwt.sign({ uid, scope }, secretKey, { expiresIn });
  return token;
};
```

```js
// config.js中配置的secretKey, expiresIn
security: {
  secretKey: 'abcdefg',
  expiresIn: 60 * 60 * 24 * 30
},
```



#### 4. 在token.js API中

```js
const router = new Router({
  prefix: '/v1/token'
});

router.post('/', async ctx => {
  const v = await new TokenValidator().validate(ctx);
  // type
  // email 小程序
  // 业务逻辑
  // 1. 在API接口编写
  // 2. Modal 分层

  // 业务分层 Model, Service
  let token;
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'));
      break;
    case LoginType.USER_MINI_PROGRAM:  // 根据请求时传的type判断是哪个类型登录
      token = await WXManager.codeToToken(v.get('body.account'));  // 参数是小程序code码
      break;
    case LoginType.ADMIN_EMAIL:
      break;
    default:
      throw new global.errs.ParameterException('没有响应的处理函数');
  }
  ctx.body = { token };
});
```



=================================================================================



### 验证token API接口

#### 1. 在auth.js中写一个验证token令牌函数

```js
static verifyToken(token) {
  try {
    jwt.verify(token, global.config.security.secretKey);
    return true;
  } catch (error) {
    return false;
  }
}
```



#### 2. 在validator.js中写NotEmptyValidator验证类型

```js
class NotEmptyValidator extends LinValidator {
  constructor() {
    super();
    this.token = [new Rule('isLength', '不允许为空', { min: 1 })];
  }
}
```



#### 3. 在token.js API接口中增加一个/verify 验证token接口

```js
router.post('/verify', async ctx => {
  // token
  const v = await new NotEmptyValidator().validate(ctx);
  const result = Auth.verifyToken(v.get('body.token'));
  ctx.body = {
    result
  };
});
```



#### 4. 在小程序里测试

```js
<l-button size="long" bind:lintap="onVerifyToken">验证Token</l-button>

Page({
  onGetToken() {
    // code
    wx.login({
      success: (res) => {
        if(res.code) {
          wx.request({
            url: 'http://localhost:3000/v1/token',
            method: 'POST',
            data: {
              account: res.code,
              type: 100
            },
            success: (res) => {
              console.log(res.data)
              const code = res.statusCode.toString()
              if(code.startsWith('2')) {
                wx.setStorageSync('token', res.data.token)
              }
            }
          })
        }
      }
    })
  },
  
  // 验证token
  onVerifyToken() {   
    wx.request({
      url: 'http://localhost:3000/v1/token/verify',
      method: 'POST',
      data: {
        token: '1234'
      },
      success: res => {
        console.log(res.data)
      }
    })
  }
})
```