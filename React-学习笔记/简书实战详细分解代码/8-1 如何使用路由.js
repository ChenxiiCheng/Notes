//如何使用路由
1.安装路由
sudo yarn add react-router-dom

==================================================================

2.如何使用
在App.js文件中：
import { BrowserRouter, Route } from 'react-router-dom';

<Provider store={store}>
  <Header />
  <BrowserRouter>
    <Route path="/" exact render={() => <div>home</div>} />
    <Route path="/detail" exact render={() => <div>detail</div>} />
  </BrowserRouter>
</Provider>

在Provider里添加<BrowserRouter>, 在此里面加入<Route>

==================================================================

3.路由进阶使用方法：
我现在有两个页面，一个是home,一个是detail，我的这两个页面要写成两个组件

那么路由如何使用组件呢？

(1)在src文件夹下新建pages文件夹，在里面新建home文件夹，detail文件夹，
分别在这两个文件夹(home, detail)里新建index.js
pages/home/index.js:
import React, { Component } from 'react';

class Home extends Component {
  render() {
    return <div>Home</div>;
  }
}

export default Home;

pages/detail/index.js:
import React, { Component } from 'react';

class Home extends Component {
  render() {
    return <div>Detail</div>;
  }
}

export default Detail;


(2)在App.js文件中：
import Home from './pages/home';
import Detail from './pages/detail';

<Provider store={store}>
  <Header />
  <BrowserRouter>
    <Route path="/" exact component={Home} />
    <Route path="/detail" exact component={Detail} />
  </BrowserRouter>
</Provider>

<Route>里使用component={Home} 即可！


















