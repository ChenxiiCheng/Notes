//实现加载更多 功能
1.在List.js中加入组件：
<LoadMore>更多文字</LoadMore>

接着添加样式：
export const LoadMore = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 30px 0;
  background: #a5a5a5;
  text-align: center;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
`;

=========================================

2.绑定事件：
<LoadMore onClick={getMoreList}>更多文字</LoadMore>

const mapDispatch = dispatch => ({
  getMoreList() {
    dispatch(actionCreators.getMoreList());
  }
});

这个添加更多也是异步操作
在public/api下新建homeList.json中存数据

在actionCreator.js中：
const addHomeList = (list, nextPage) => ({
  type: constants.ADD_ARTICLE_LIST,
  list: fromJS(list),
  nextPage
});

export const getMoreList = () => {
  return dispatch => {
    axios.get('/api/homeList.json').then(res => {
      const result = res.data.data;
      dispatch(addHomeList(result));
    });
  };
};


在constants.js中：
export const ADD_ARTICLE_LIST = 'home/ADD_ARTICLE_LIST';


在reducer.js中：
case constants.ADD_ARTICLE_LIST:
  return state.set(
    articleList, state.get('articleList').concat(action.list),
  );

=============================================================

3.当发送ajax请求获取到数据文件时，我们希望发送的时候就告诉后端我们要的是第几页的数据
如果告诉后端我们需要的是第几页的数据呢？

(1)在reducer.js中：
const defaultState = fromJS({
  topicList: [],
  articleList: [],
  recommendList: [],
  articlePage: 1   --------> 新增！
});

(2)获取到page，然后在上面改成箭头函数，把当前page传过去
const mapState = state => ({
  list: state.getIn(['home', 'articleList']),
  page: state.getIn(['home', 'articlePage'])
});

<LoadMore onClick={() => getMoreList(page)}>更多文字</LoadMore>

const mapDispatch = dispatch => ({
  getMoreList(page) {
    dispatch(actionCreators.getMoreList(page));
  }
});

//在actionCreator.js中就获取到了当前页码
//发送ajax请求时，告诉后端我们需要当前页码的下一页内容
const addHomeList = (list, nextPage) => ({
  type: constants.ADD_ARTICLE_LIST,
  list: fromJS(list),
  nextPage
});

export const getMoreList = page => {
  return dispatch => {
    axios.get('/api/homeList.json?page=' + page).then(res => {
      const result = res.data.data;
      dispatch(addHomeList(result, page + 1));
    });
  };
};


（3）在reducer.js中：    
case constants.ADD_ARTICLE_LIST:
  return state.merge({
    articleList: state.get('articleList').concat(action.list),
    articlePage: action.nextPage
  });

















