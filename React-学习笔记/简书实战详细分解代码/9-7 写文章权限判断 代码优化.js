// 写文章权限判断 代码优化
1.在pages文件夹下新建write文件夹，在里面新建index.js
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Write extends PureComponent {
  render() {
    const { loginStatus } = this.props;

    if (loginStatus) {
      return <div>写文章页面</div>;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapState = state => ({
  loginStatus: state.getIn(['login', 'login'])
});

export default connect(
  mapState,
  null
)(Write);

===================================================================

2.给write添加路由，在App.js中：
import Write from './pages/write';

<Provider store={store}>
  <BrowserRouter>
    <Header />
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/write" exact component={Write} />   ------> 新增！！
    <Route path="/detail/:id" exact component={Detail} />
  </BrowserRouter>
</Provider>

===================================================================

3. 在header/index.js中：
给写文章 添加跳转：
<Link to="/write">
  <Button className="writting">
    <i className="iconfont">&#xe670;</i>
    写文章
  </Button>
</Link>



