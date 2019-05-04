//发送ajax请求我们使用redux-thunk
//使用了redux-thunk，在actionCreators.js中写的可以是函数，之前是写的返回对象
1.(1)安装redux-thunk:
sudo yarn add redux-thunk
(2)配置redux-thunk
在根目录的store/index.js文件中：[因为是中间件所以需要在总的那个store/index.js中配置]
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
//添加applyMiddleware

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;


================================================================

2.发送ajax请求需要使用axios这个第三方库
所以安装axios: sudo yarn add axios

然后我们就在header/store/actionCreators.js中导入axios，并且就在这个文件夹里写ajax请求操作
import axios from 'axios';

const changeList = data => ({
  type: constants.CHANGE_LIST,
  data: fromJS(data)
});

export const getList = () => {
  return dispatch => {
    axios
      .get('/spi/headerList.json')
      .then(res => {
      	const data = res.data;
      	const action = changeList(data.data);
      	dispatch(action);
      })
      .catch(() => {
        console.log('error');
      });
  };
};

然后在reducer.js中写操作：
if (action.type === constants.CHANGE_LIST) {
return state.set('list', action.data);
}
return state;

注意，因为list是immutable的对象的属性（list是immutable类型的数组），所以
const defaultState = fromJS({
  focused: false,
  list: []
});

如果直接state.set('list', action.data) 会把immutable类型数组变成普通的数组
因为传过来的action.data其实就是我们在publi/api/headerList.json中写的数据，是普通的数据
所以在构造的action里，要把data变成immutable类型的数组
const changeList = data => ({
  type: constants.CHANGE_LIST,
  data: fromJS(data)    ---> 这里
});

================================================================

3.在public文件夹下新建api文件夹，在api下新建headerList.json，在里面放我们的数据
headerList.json:
{
  "success": true,
  "data": [
    "高考",
    "三生三世",
    "斗破苍穹",
    "Github 996",
    "瑞幸咖啡",
    "微软市值过万亿",
    "知乎",
    "抹茶妹妹",
    "NYU",
    "GRE",
    "考研",
    "华侨大学",
    "Google",
    "Golden sach",
    "华尔街",
    "爱奇艺",
    "喜欢你我也是",
    "中国新说唱"
  ]
}

==================================================================

最后一步，header/index.js中获取到store修改过后的数据：
const mapStateToProps = state => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list'])
  };
};

//循环展示出来
<SearchInfoList>
{this.props.list.map(item => {
  return <SearchInfoItem key={item}>{item}</SearchInfoItem>;
})}
</SearchInfoList>
