//Redux-saga的配置和使用
//不同于redux-thunk把ajax请求写在action里
//redux-saga把ajax请求写在一个单独的文件里
//redux-thunk / redux-saga 都是中间件，可以接收到store.dispatch传给reducer的东西，
//之前我们都是store.dispatch之后去reducer.js中写逻辑，现在我们加了中间件
//它也可以获取到store.dispatch发送的东西，然后我们在中间件里写ajax请求操作
//redux-thunk 和 redux-saga不同地方在于，redux-saga提供了更多的api操作
//而redux-thunk没有api，它只是提供我们能够在action里写ajax请求
//所以，当项目小的时候用redux-thunk，大型项目用redux-saga

#配置redux-saga:
在store/index.js中：

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import todoSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, enhancer);

sagaMiddleware.run(todoSagas);

export default store;


-----------------------------------------------------------------

#TodoList.js文件中：
//我们一般把请求ajax操作放在componentDidMount生命周期函数里
//因为使用了中间件，这边只要发送一个action即可，我们通过中间件获取到store.dispatch发送的东西
//在中间件中(saga->在sagas.js中写ajax)(thunk在action中写ajax)写ajax请求
componentDidMount() {
  const action = getInitList();
  store.dispatch(action);
}

-----------------------------------------------------------------
export const getInitList = () => ({
  type: GET_INIT_LIST
});
--------
export const GET_INIT_LIST = 'get_init_list';
--------
#在store文件夹下新建sagas.js文件：（我们把ajax请求写在这里）
import { takeEvery, put } from 'redux-saga/effects';
import { GET_INIT_LIST } from './actionTypes';
import { initListAction } from './actionCreators';
import axios from 'axios';

function* getInitList() {
  try {
    const res = yield axios.get('/list.json');
    const action = initListAction(res.data);
    yield put(action);   //这里我们不用store.dispatch()了，用redux-saga提供的api put方法
  } catch (e) {
    console.log('list.json 网络请求失败');
  }
  //   axios
  //     .get('/list.json')
  //     .then(res => {
  //       const data = res.data;
  //       const action = initListAction(data);
  //       put(action);
  //     })
  //     .catch(() => {
  //       alert('error');
  //     });
}

// generator 函数
function* mySaga() {
  yield takeEvery(GET_INIT_LIST, getInitList);
}

export default mySaga;
