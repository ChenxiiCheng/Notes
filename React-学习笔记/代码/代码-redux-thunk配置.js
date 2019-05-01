//使用redux-thunk使得我们可以把ajax请求放在action里
//中间件其实就是对store的dispatch方法进行升级
//之前store的dispatch方法只能接收对象，升级后也可以接收函数了
//之前Action只能是对象，但是用了redux-thunk，Action也可以是函数
//在Dispatch里，若发现action是对象，则直接传给store
//若发现action是函数，则dispatch直接处理了

//redux-thunk配置
在store文件夹下index.js中
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducer, enhancer);

export default store;




//我们使用了redux-thunk，就把发送ajax的代码放在action的那个文件里
//然后在TodoList.js中的componentDidMount(原本我们放发送ajax请求的地方)
//中调用actionCreators.js中的getTodoList(放ajax请求代码的那个函数)
//TodoList.js中：
componentDidMount() {
  const action = getTodoList();
  store.dispatch(action);
}

//actionCreators.js中：
export const getTodoList = () => {
  return dispatch => {
    axios
      .get('/list.json')
      .then(res => {
        const data = res.data;
        const action = initListAction(data);
        dispatch(action);
      })
      .catch(() => {
        alert('error');
      });
  };
};
