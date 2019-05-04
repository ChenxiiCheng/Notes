//使用immutable.js来管理store中的数据
//immutable能把一个js对象转化成immutable对象
(1)安装sudo yarn add immutable
(2)header/store/reducer.js中：
import { fromJS } from 'immutable';

const defaultState = fromJS({
  focused: false
});


这样的话，在header/index.js中，从store获取数据到组件的props里需要改：
const mapStateToProps = state => {
  return {
  	//immutable对象，如果想调用它的属性，不能直接state.header.focused了
  	//原本写法：focused:state.header.focused
    focused: state.header.get('focused')
  };
};


在header/store/reducer.js中：
export default (state = defaultState, action) => {
  if (action.type === constants.SEARCH_FOCUS) {
    //immutable对象的set方法，会结合之前immutable对象的值
    //和设置的值，返回一个全新的对象,所以它并没有改变state的内容，所以是可以的
    //原本写法：return {focused: true}
    return state.set('focused', true);
    // return {
    //   focused: true
    // };
  }

  if (action.type === constants.SEARCH_BLUR) {
    return state.set('focused', false);
    // return {
    //   focused: false
    // };
  }
  return state;
};
