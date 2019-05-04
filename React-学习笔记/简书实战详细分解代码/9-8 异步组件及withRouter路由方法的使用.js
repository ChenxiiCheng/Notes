//异步组件及withRouter路由方法的使用

1.打开浏览器控制台点开network->JS,整个网站只加载了一个bundle.js，点击详情页/登录/退出
始终没有在家其他文件，这就说明一个问题，我所有组件对应的代码其实都在这个bundle.js里了。
那就有一个问题了，我现在访问的是首页，但是把详情页面，登录页面的代码都一起加载了，这样的话
首页加载的速度其实是比较慢的。当我们做一个复杂项目的时候，按照这样一个bundle去打包的话，
大小可能1，2M了。我们希望当加载首页的时候，只加载首页的代码，当访问详情页的时候，再去
加载详情页的代码，这就需要我们使用异步组件来实现我们的想法，我们选择使用封装好的第三方模块来实现
我们选择使用react-loadable这个库

(1)先安装：
sudo yarn add react-loadable

(2)在detail文件夹下新建loadable.js
import React from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading() {
    return <div>正在加载...</div>;
  }
});

export default () => <LoadableComponent />;


(3)App.js中：
原本：import Detail from './pages/detail';
现在：import Detail from './pages/detail/loadable.js';
这样detail就变成了一个异步组件了，我们就实现了我们想要的情况。


发现页面报错了，在detail/index.js中获取不到id了 [this.props.match.params.id] 
如何解决呢？

import { withRouter } from 'react-router-dom';

export default connect(mapState, mapDispatch)(withRouter(Detail));










