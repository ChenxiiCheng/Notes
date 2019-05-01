//react-redux的使用

之前我们使用store是创建store文件夹，新建index.js,reducer.js
然后在TodoList.js中使用

  constructor(props) {
    super(props);
    this.state = store.getState();
  }

=======================================================
第一步：
照常创建store,index.js,reducer.js
但是我们不在TodoList.js中通过constructor来获取store的数据了
现在使用react-redux，是另种方式获取store里的数据：
在项目根入口index.js中：
//Provider是react-redux中一个很重要的api
//我们同构store={store}直接获取到store的数据交给<Provider>这个大组件，
//我们再把<TodoList />组件放在<Provider>组件里，那么TodoList组件也就可以
//直接使用store里的数据了。任何放在<Provider>中的组件都可以获取到store的数据

import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import { Provider } from 'react-redux';
import store from './store';

const App = (
  <Provider store={store}>
    <TodoList />
  </Provider>
);

ReactDOM.render(App, document.getElementById('root'));

========================================================
第二步：
//在TodoList.js中，需要使用connect连接到store [TodoList和store做连接]
//然后定义函数mapStateToProps，就是把store里的数据映射到组件的props里
//然后在input框里使用value={this.props.inputValue}
//之前获取store里的数据，是先写constructors函数，this.state=store.getState(),
//然后在input框里使用value={this.state.inputValue}，现在使用了react-redux则是按照上面那种写法

import React, { Component } from 'react';
import store from './store';
import { connect } from 'react-redux';

class TodoList extends Component {
  render() {
    return (
      <div>
        <div>
          <input 
          	type="text" 
          	value={this.props.inputValue} 
          	onChange={this.props.changeInputValue}
          />
          <button>提交</button>
          <ul>
            <li>Dell</li>
          </ul>
        </div>
      </div>
    );
  }
}

//把store里的数据映射到组件的props里
const mapStateToProps = state => {
  return {
    inputValue: state.inputValue
  };
};

//store.dispatch, props
//我们若要改store里的数据，则需要走那一套流程，调用store.dispatch
//现在我们把store.dispatch映射到了props里，所以上面绑定事件是用{this.props.changeInputValue}
//这个事件就卸载mapDispatchToProps里
const mapDispatchToProps = dispatch => {
  return {
    changeInputValue(e) {
      const action = {
        type: 'change_input_value',
        value: e.target.value
      };
      // console.log(e.target.value);
      dispatch(action);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);


===========================================================
//reducer.js中：处理发送过来的action
const defaultState = {
  inputValue: 'hello world',
  list: []
};

export default (state = defaultState, action) => {
  if (action.type === 'change_input_value') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }
  return state;
};




