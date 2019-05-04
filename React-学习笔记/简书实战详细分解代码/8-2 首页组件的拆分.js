//首页组件的拆分

1.首页有个HomeWrapper然后内部分成左边右边，左边是张图片，右边是推荐栏
//使用sytled-components写组件样式
//在home文件夹下新建style.js文件，为index.js中的组件写样式
//home/index.js中：
class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img
            className="banner-img"
            src="//upload.jianshu.io/admin_banners/web_images/4652/f32e7f414d86d5a1709f8e6f00ec3272fd9f604b.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
            alt=""
          />
        </HomeLeft>
        <HomeRight>Right</HomeRight>
      </HomeWrapper>
    );
  }
}

//在style.js中：
import styled from 'styled-components';

export const HomeWrapper = styled.div`
  overflow: hidden;
  width: 960px;
  margin: 0 auto;
`;

export const HomeLeft = styled.div`
  float: left;
  margin-left: 15px;
  width: 625px;
  padding-top: 30px;
  .banner-img {
    width: 625px;
    height: 270px;
  }
`;

export const HomeRight = styled.div`
  float: right;
  width: 240px;
`;

！！！注意：
<HomeWrapper>
	<HomeLeft>
	<HomeRight>
</HomeWrapper>

<HomeWrapper>里包含了<HomeLeft><HomeRight>,这两个组件分别是<HomeWrapper>包含的区域的左边和右边，然后他们是浮动的，所以要把父组件写上overflow:hidden,
这样bfc才会被触发，子组件才可以实现左右浮动

======================================================================

2.(1)在左侧图片下面是主题栏和文章列表，右边推荐栏下面是二维码和推荐作者栏
所以需要写这些小组件. 在home文件夹下新建components文件夹，在里面新建List.js,Recommend.js,Topic.js,Writer.js,Qrcode.js
eg:
每个小组件里都先写个类似这样的代码：
import React, { Component } from 'react';

class List extends Component {
  render() {
    return <div>List</div>;
  }
}

export default List;


(2)然后在home/index.js中导入这些组件，插入到首页里
import Topic from './components/Topic';
import List from './components/List';
import Recommend from './components/Recommend';
import Writer from './components/Writer';
import Qrcode from './components/Qrcode';

class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img
            className="banner-img"
            src="//upload.jianshu.io/admin_banners/web_images/4652/f32e7f414d86d5a1709f8e6f00ec3272fd9f604b.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
            alt=""
          />
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <Qrcode />
          <Writer />
        </HomeRight>
      </HomeWrapper>
    );
  }
}

