//使用iconfont嵌入图标
1.先去iconfont.cn中 => 点击图标管理里的我的项目 => 点击右边中间文件夹图标新建项目 => 选择需要的图标加入购物车 => 下载至本地

2.解压 => 在项目src/static下新建iconfont文件夹

3.把.css/.eot/.svg/.ttf/.woff/.woff2 文件放入这个iconfont文件夹里

4.在项目根目录的index.js中引入iconfont.css：
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';
import './static/iconfont/iconfont.css';

ReactDOM.render(<App />, document.getElementById('root'));

5.然后在header/index.js中就可以直接用了：
<Button className="writting">
  <i className="iconfont">&#xe670;</i>
  写文章
</Button>