// 首页推荐部分代码

1.编写<RecommendWrapper>和<RecommendItem>部分：
<RecommendWrapper>
  <RecommendItem imgUrl="https://picture's url1" />
  <RecommendItem imgUrl="https://picture's url2" />
</RecommendWrapper>

编写样式：
export const RecommendWrapper = styled.div`
  margin: 27px 0 15px 0;
  width: 280px;
`;

export const RecommendItem = styled.div`
  width: 280px;
  height: 50px;
  background: url(${props => props.imgUrl});
  background-size: contain;
  margin-bottom: 5px;
`;

如果background这边是直接写url，那么会发现首页上所有的RecommendItem显示的图片都一样，
所以我们应该是在首页RecommendItem这边，每个item传一个图片的url过来，在css中获取到传过来的
图片url，然后再显示

========================================================================

2.图片url不应该写死的，我们应该把url存在store里
在reducer.js中添加：
recommendList: [
    {
      id: 1,
      imgUrl:
        'http://cdn2.jianshu.io/assets/web/banner-s-club-aa8bdf19f8cf729a759da42e4a96f366.png'
    }
]

Recommend.js中想使用store里的数据怎么办？
老套路：
import { connect } from 'react-redux';

const mapState = state => ({
  list: state.getIn(['home', 'recommendList'])
});

export default connect(
  mapState,
  null
)(Recommend);

获取到list后，更新上面：
<RecommendWrapper>
{this.props.list.map(item => {
  return (
    <RecommendItem key={item.get('id')} imgUrl={item.get('imgUrl')} />
  );
})}
</RecommendWrapper>












