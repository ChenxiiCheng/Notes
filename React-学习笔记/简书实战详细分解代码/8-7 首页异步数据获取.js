//首页异步数据获取

1.我们前面是把数据写在reducer里的，但是实际是需要请求获取数据的
我们现在写的首页，所以需要获取首页的数据，我们和后端定义一个接口
/api/home.json

返回数据：
{
  success: true,
  data: {
  	id: 1,
  	title: '社会热点',
  	article: 'ansdhafu'
  }
}

然后把reducer.js中的数据清空：
const defaultState = fromJS({
  topicList: [],
  articleList: [],
  recommendList: []
});

从那边获取数据呢？（从哪边发送ajax请求），这些数据都是首页的数据，理所当然想到
在首页的home/index.js里发送ajax请求！

================================================================

2.在home/index.js中:
componentDidMount() {
  axios.get('/api/home.json').then(res => {
    const result = res.data.data;
    const action = {
      type: 'change_home_data',
      topicList: result.topicList,
      articleList: result.articleList,
      recommendList: result.recommendList
    };
    this.props.changeHomeData(action);
  });
}


const mapDispatch = dispatch => ({
  changeHomeData(action) {
    dispatch(action);
  }
});

================================================================

3.在home/store/reducer.js中：
//action.topicList是一个普通JS对象，原来（defaultState）里的topicList
//是一个immutable对象，所以不能直接更新topicList，对把它变成普通的JS对象，
//我们把action.topicList变成immutable对象再更新store里的值就行了

const defaultState = fromJS({
  topicList: [],
  articleList: [],
  recommendList: []
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'change_home_data':
      return state.merge({
        topicList: fromJS(action.topicList),
        articleList: fromJS(action.articleList),
        recommendList: fromJS(action.recommendList)
      });
    default:
      return state;
  }
};















hom