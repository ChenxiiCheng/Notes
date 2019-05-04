//使用combineReducer实现对数据的拆分管理

1.使用chrome扩展redux：
根目录的store文件夹, store/index.js:
import { createStore, compose } from 'redux';
import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers());

export default store;

===============================================================

2.(1)在header文件夹下新建store文件夹,在其中新建index.js, reducer.js
header/store/index.js:

//这样在总的reducer中导入这个header的reducer的路径直接写到store就行
import reducer from './reducer';

export { reducer };


header/store/reducer.js:
把一开始写在总的那个reducer里的代码拷贝过来


(2)在根目录下的store/reducer.js中：
import { combineReducers } from 'redux';
import { reducer as headerReducer } from '../common/header/store'; 
//这里路径只需到store就是因为header/store/index.js中把header的reducer导出去了

const reducer = combineReducers({
  header: headerReducer
});

export default reducer;


(3)这个时候看chrome的redux插件里的数据，state里之前是：focused:false
现在是header->focused:false，所以在组件里使用数据的时候，需要加header
这个header就是我们自己命名的``header: headerReducer``

const mapStateToProps = state => {
  return {
    focused: state.header.focused //之前是focused:state.focused
  };
};

