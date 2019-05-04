//登陆页面布局

1.在pages文件夹下新建login文件夹，在里面创建index.js, styled.js文件
(1)index.js中：
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, Button } from './style';

class Login extends PureComponent {
  render() {
    return (
      <LoginWrapper>
        <LoginBox>
          <Input placeholder="账号" />
          <Input placeholder="密码" />
          <Button>登陆</Button>
        </LoginBox>
      </LoginWrapper>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({});

export default connect(
  mapState,
  mapDispatch
)(Login);


(2)styled.js中：
import styled from 'styled-components';

export const LoginWrapper = styled.div`
  z-index: 0;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 56px;
  background: #eee;
`;

export const LoginBox = styled.div`
  width: 400px;
  height: 160px;
  margin: 200px auto;
  padding-top: 20px;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  display: block;
  width: 200px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin: 10px auto;
  color: #777;
`;

export const Button = styled.div`
  width: 220px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: #3194d0;
  border-radius: 15px;
  margin: 15px auto;
  text-align: center;
`;

====================================================================

2.有了组件，我们还需要定义它的路由
在App.js中：

import Login from './pages/login';
<Route path="/login" exact component={Login} />









