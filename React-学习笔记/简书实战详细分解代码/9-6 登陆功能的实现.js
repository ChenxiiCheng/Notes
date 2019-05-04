//登陆功能的实现

1.(1)在login文件夹下新建store文件夹，在里面新建actionCreators.js, index.js, constants.js, reducer.js
(2)在根目录的reducer中加入login的reducer
import { reducer as LoginReducer } from '../pages/login/store';

const reducer = combineReducers({
  header: headerReducer,
  home: homeReducer,
  detail: DetailReducer,
  login: LoginReducer   ------> 新增这里！
});

(3)在login/store/reducer中加入用来判断是否登陆的变量
const defaultState = fromJS({
  login: false
});


(4)在header/index.js中，取出这个login状态变量
const mapStateToProps = state => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    login: state.getIn(['login', 'login'])  ----> 新增！
  };
};


JSX代码改写：
<NavItem className="left">下载App</NavItem>

改成：
{login ? (
	<NavItem onClick={logout} className="right">
  	退出
	</NavItem>
) : (
  <NavItem className="right">登陆</NavItem>
)}


(5)登陆这边我们需要加一个跳转连接到登陆页面：
<Link to="/login">
  <NavItem className="right">登陆</NavItem>
</Link>


(6)给登陆button绑定事件，两个input框，我们通过ref获取到这个dom节点
传给派发的login这个函数

<Input placeholder="账号" ref={input => {
    this.account = input;
 	}}
/>
<Input placeholder="密码" type="password" ref={input => {
    this.password = input;
  }}
/>

<ButtononClick={() => this.props.login(this.account, this.password)}>
  登陆
</Button>


const mapDispatch = dispatch => ({
  login(accountElem, passwordElem) {
    dispatch(actionCreators.login(accountElem.value, passwordElem.value));
  }
});


(7)在actionCreators.js中：

import axios from 'axios';
import * as constants from './constants';

const changeLogin = () => ({
  type: constants.CHANGE_LOGIN,
  value: true
});

//mapDispatch中dispatch是为了发送ajax请求获取数据(使用了redux-thunk)，所以我们
可以讲异步操作代码写在actionCreators.js里，在actionCreators中这个login函数中，
我们获取到数据之后，要把数据更新到store里，又是走一遍改变store数据的流程，发送dispatch

export const login = (account, password) => {
  return dispatch => {
    axios
      .get('/api/login.json?account=' + account + '&password=' + password)
      .then(res => {
        const result = res.data.data;
        if (result) {
          dispatch(changeLogin());
        } else {
          alert('登陆失败!');
        }
      });
  };
};


(8)我们没有后端数据，所以模拟下数据
在public/api下新建login.json文件：
{
  "success": true,
  "data": true
}


(9)在reducer.js中：
export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_LOGIN:
      return state.set('login', action.value);
    case constants.LOGOUT:              ------> 新增！
      return state.set('login', action.value);
    default:
      return state;
  }
};


(10)当我们登录成功后，应该跳转到首页才对
在login/index.js中：
先把store里的登录状态取出来：
const mapState = state => ({
  loginStatus: state.getIn(['login', 'login'])
});

//如果没登录，则显示login这个页面，若登录了，则用<Redirect>这个组件
跳转到首页

import { Redirect } from 'react-router-dom';

if (!this.props.loginStatus) {
      return (
        <LoginWrapper>
          <LoginBox>
            <Input
              placeholder="账号"
              ref={input => {
                this.account = input;
              }}
            />
            <Input
              placeholder="密码"
              type="password"
              ref={input => {
                this.password = input;
              }}
            />
            <Button
              onClick={() => this.props.login(this.account, this.password)}
            >
              登陆
            </Button>
          </LoginBox>
        </LoginWrapper>
      );
    } else {
      return <Redirect to="/" />;
    }



(11)接着做退出的功能
在header/index.js中：
给退出绑定一个事件
<NavItem onClick={this.props.logout} className="right">
  退出
</NavItem>

在mapDispatchToProps中定义这个logout方法：
其实就是改变store里登录状态的变量->改成False
logout() {
  dispatch(loginActionCreators.logout());
}

在header的store里的actionCreators只负责创建和header相关的一些action，而我们现在
要改变的是login页面上的一些数据，所以我们应该用login文件夹下的store里的actionCreators
来创建action。所以在header/index.js中引入login/store/actionCreators.js：

import { actionCreators as loginActionCreators } from '../../pages/login/store';

在login/store/actionCreators.js中：

export const logout = () => ({
  type: constants.LOGOUT,
  value: false
});


header/index.js中：
logout() {
  dispatch(loginActionCreators.logout());
}

这个dispatch的action所有的reducer都可以收到，我们选择写在login的reducer里：
export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_LOGIN:
      return state.set('login', action.value);
    case constants.LOGOUT:                   ------> 新增！！
      return state.set('login', action.value);
    default:
      return state;
  }
};





