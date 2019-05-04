//首页文章列表制作

1.List.js中添加<ListItem> <ListInfo>
<ListItem>
  <img className="pic" src='图片的url地址' alt="" />
  <ListInfo>
    <h3 className="title">我是标题</h3>
    <p className="desc">我是文本内容</p>
  </ListInfo>
</ListItem>

设置样式：
export const ListItem = styled.div`
  overflow: hidden;
  padding: 20px 0;
  border-bottom: 1px solid #dcdcdc;
  .pic {
    display: block;
    width: 125px;
    height: 100px;
    float: right;
    border-radius: 10px;
  }
`;

export const ListInfo = styled.div`
  width: 500px;
  float: left;
  .title {
    line-height: 27px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  .desc {
    line-height: 24px;
    font-size: 13px;
    color: #999;
  }
`;

==========================================================================

2.把数据放到store里：
在defaultState中新增articleList字段
articleList: [
    {
      id: 1,
      title: '星星工程师和刷牙机器人',
      desc:
        '睡觉前念两本书是从很小的时候开始养成的习惯。最近一年，小姑娘渐渐掌握了基础的拼读规律，可以自己读一些简单的英文书了，她的书架上就多了很多幼儿阅读...',
      imgUrl:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551744003397&di=6cf11681f830cf731a7bf86da84a6da8&imgtype=0&src=http%3A%2F%2Fpic26.photophoto.cn%2F20130106%2F0005018343084544_b.jpg'
    }
]

=========================================================================

3.List.js文件如何取到store里的数据？
List.js文件中：
import { connect } from 'react-redux';

const mapState = state => ({
  list: state.getIn(['home', 'articleList'])
});

export default connect(mapState, null)(List);

然后上面就可以用数据了
更新：
return (
  <div>
    {this.props.list.map(item => {
      return (
        <ListItem key={item.get('id')}>
          <img className="pic" src={item.get('imgUrl')} alt="" />
          <ListInfo>
            <h3 className="title">{item.get('title')}</h3>
            <p className="desc">{item.get('desc')}</p>
          </ListInfo>
        </ListItem>
      );
    })}
  </div>
);

======================================================================

4.发现点搜索，跳出来的框成虚的了
在header/style.js中，加个背景白色
export const SearchInfo = styled.div`
  position: absolute;
  left: 0;
  top: 56px;
  width: 240px;
  padding: 0 20px 10px 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  background: #fff;   --------> 添加的是这里！！！
`;

