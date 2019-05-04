//首页专题区域布局及reducer的设计

1.因为如果对每个小组件都给他一个style.js的话，需要些太多文件了，其实每个小组件样式代码也不多，
这样有点过度设计了。所以我们统一把小组件的样式写在home目录下的style.js中

export const TopicWrapper = styled.div`
  overflow: hidden;
  padding: 20px 0 10px 0;
  margin-left: -18px;
`;

export const TopicItem = styled.div`
  float: left;
  height: 32px;
  line-height: 32px;
  margin-left: 18px;
  margin-bottom: 12px;
  padding-right: 6px;
  background: #f7f7f7;
  font-size: 13px;
  color: #000;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  .topic-pic {
    display: block;
    float: left;
    width: 38px;
    height: 32px;
    margin-right: 6px;
  }
`;

在Topic.js中：
<TopicWrapper>
  <TopicItem>
    <img
      className='topic-pic'
      src='http://www.zjaf.net/upload/image/image/20180419/20180419083818_77623.png'
    />
    社会热点
  </TopicItem>
</TopicWrapper>

===========================================================================

2.给home添加store，用于存储小组件们所需的数据
(1)在src/home下新建store文件夹，在此文件夹里新建index.js, reducer.js
index.js的作用是store里的文件的统一出口：
//目前store里只有一个reducer.js需要导出，之后会有actionCreators.js,constants.js
import reducer from './reducer';

export { reducer };


reducer.js中：
import { fromJS } from 'immutable';

const defaultState = fromJS({
  topicList: [
    {
      id: 1,
      title: '社会热点',
      imgUrl:
        'http://www.zjaf.net/upload/image/image/20180419/20180419083818_77623.png'
    },
    {
      id: 2,
      title: '童话故事',
      imgUrl:
        'http://img.zcool.cn/community/0319a5f578511980000018c1b45f834.jpg'
    }
  ]
});

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};


(2)在根目录的总store里导入这个管理home文件夹的store分支
import { reducer as homeReducer } from '../pages/home/store';

const reducer = combineReducers({
  header: headerReducer,
  home: homeReducer   -----> 新增这里！!
});


(3)store相关的配置好了，那么我们的小组件如何连接到store呢？
在App.js中看，我们的home组件是包裹在<Provider>里的，所以我们的home下的小组件
肯定可以使用store的

在Topic.js中，通过connect方法连接到store，同时新建两个函数，分别用来获取store数据到组件的props里，
如果我们想改变store里数据，进行dispatch时用的函数
import { connect } from 'react-redux';

const mapState = state => ({
  list: state.getIn(['home', 'topicList'])
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Topic);

(4)接着Topic.js上面JSX代码中就可以用store中的数据了，而不是我们写死的数据
<TopicWrapper>
{this.props.list.map(item => {
  return (
    <TopicItem key={item.get('id')}>
      <img className="topic-pic" src={item.get('imgUrl')} alt="" />
      {item.get('title')}
    </TopicItem>
  )});
}
</TopicWrapper>


代码可以优化：把内部的return 去掉的方法就是花括号变成圆括号，代表着会有return
<TopicWrapper>
{this.props.list.map(item => (
    <TopicItem key={item.get('id')}>
      <img className="topic-pic" src={item.get('imgUrl')} alt="" />
      {item.get('title')}
    </TopicItem>
  ));
}
</TopicWrapper>

