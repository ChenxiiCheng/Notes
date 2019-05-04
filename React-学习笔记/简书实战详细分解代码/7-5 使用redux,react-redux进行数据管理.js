//使用redux,react-redux进行数据管理
（1）安装redux  (2)安装react-redux 
第一个是我们用redux管理数据，第二个是方便我们在react里使用redux

步骤1：
创建store:
在src下新建store文件夹，在此文件夹下新建index.js, reducer.js

#store/index.js:
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

export default store;


#reducer.js:
const defaultState = {
  // focused: false
};

export default (state = defaultState, action) => {
  // if (action.type === 'search_focus') {
  //   return {
  //     focused: true
  //   };
  // }

  // if (action.type === 'search_blur') {
  //   return {
  //     focused: false
  //   };
  // }
  return state;
};

--------------------------------------------------------

步骤2：
在App.js文件中：
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>  //把使用需要用到store里数据的组件放在Provider组件里
        <Header />
      </Provider>
    );
  }
}
export default App;

--------------------------------------------------------

步骤3：
header组件如何连接到store呢？
在header/index.js文件中：
import { connect } from 'react-redux';


//获取store里的数据放到组件的props里
const mapStateToProps = state => {
  return {
    //focused: state.focused
  };
};

//若组件里想改变store里的数据，则绑定的事件写在这里
//写action,然后dispatch，然后在reducer.js中进行操作
const mapDispatchToProps = dispatch => {
  return {
    // handleInputFocus() {
    //   const action = {
    //     type: 'search_focus'
    //   };
    //   dispatch(action);
    // },

    // handleInputBlur() {
    //   const action = {
    //     type: 'search_blur'
    //   };
    //   dispatch(action);
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);






