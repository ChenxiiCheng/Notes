//异步操作代码拆分优化

1.把componentDidMount()中发送异步请求的代码放到mapDispatch()中
componentDidMount() {
  this.props.changeHomeData();
}

const mapDispatch = dispatch => ({
  changeHomeData() {
    const action = actionCreators.getHomeInfo();
    dispatch(action);
  }
});

=============================================================

2.(1)在store下新建actionCreators.js文件
import axios from 'axios';

export const getHomeInfo = () => {
  return dispatch => {
    axios.get('/api/home.json').then(res => {
      const result = res.data.data;
      const action = {
      	type: 'change_home_data',
  			topicList: result.topicList,
  			articleList: result.articleList,
  			recommendList: result.recommendList
      };
      dispatch(action);
    });
  };
};


(2)继续优化：
发送ajax请求的代码在actionCreator.js中了，然后其中用到了action,我们拉出来定义一个函数
const changeHomeData = result => ({
  type: 'change_home_data',
  topicList: result.topicList,
  articleList: result.articleList,
  recommendList: result.recommendList
});

export const getHomeInfo = () => {
  return dispatch => {
    axios.get('/api/home.json').then(res => {
      const result = res.data.data;
      const action = changeHomeData(result);
      dispatch(action);
    });
  };
};


(3)继续优化：
type定义成常量，在store下新建constants.js文件
在store/index.js中导出actionCreators.js, constants.js文件
index.js中：
import reducer from './reducer';
import * as actionCreators from './actionCreators';
import * as constants from './constants';

export { reducer, actionCreators, constants };


constants.js中：
export const CHANGE_HOME_DATA = 'home/change_home_data';


actionCreators.js中：
import * as constants from './constants';

const changeHomeData = result => ({
  type: constants.CHANGE_HOME_DATA,
  topicList: result.topicList,
  articleList: result.articleList,
  recommendList: result.recommendList
});

export const getHomeInfo = () => {
  return dispatch => {
    axios.get('/api/home.json').then(res => {
      const result = res.data.data;
      const action = changeHomeData(result);
      dispatch(action);
    });
  };
};

=================================================================
3.在reducer.js中：
import * as constants from './constants';

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_HOME_DATA:   -----> 改这里！
      return state.merge({
        topicList: fromJS(action.topicList),
        articleList: fromJS(action.articleList),
        recommendList: fromJS(action.recommendList)
      });
    default:
      return state;
  }
};








