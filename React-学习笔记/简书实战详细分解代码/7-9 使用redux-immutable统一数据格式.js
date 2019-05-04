//使用redux-immutable统一数据格式
//前面我们使用了immutable来管理header/store/reducer.js中的defaultState数据

现在header/index.js中：
const mapStateToProps = state => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused'])
    //原本写法：focused: state.header.get('focused')
  };
};

原本写法中header是immutable对象，但是state不是，这个state是根目录的reducer的，
所以我们安装redux-immutable并在根目录的reducer中使用，那么state也是一个immutable对象了

在根目录store/reducer.js中：
(1)sudo yarn add redux-immutable
(2)
原本写法：import { combineReducers } from 'redux';
改后写法：import { combineReducers } from 'redux-immutable';
(3)然后在header/index.js中：
就可以这么写：
//1.最初版本:focused: state.header.focused
//2.header/store/reducer.js使用immutable后写法：
//	focused: state.header.get('focused')
//3.根目录store/reducer.js中使用'redux-immutable'后写法：
//	focused: state.get('header').get('focused')
//	也可以写成：focused: state.getIn(['header', 'focused'])