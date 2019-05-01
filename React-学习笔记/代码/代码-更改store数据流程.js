creatStore | store.dispatch | store.getState | store.subscribe

==============================================================

//创建store和reducer初始化

//store文件夹下index.js中：
import { creatStore } from 'redux';
import reducer from './reducer';

const store = creatStore(reducer);

export default store;


//reducer.js
const defaultState = {};

export default (state=defaultState, action) => {
  return state;
};

//TodoList.js中constructor函数中取出store的数据放到state里
constructor(props) {
	super(props);
	this.state = store.getState(); //获取到state里的数据，组件里才能通过{this.state.xxx}使用数据
}

===================================================

//整个更改store里数据的流程

1.首先创建并发送action:
handleInputChange(e) {
	const action = {
		type: 'change_input_value',
		value: e.target.value   //获取到input框输入是内容
	};
	store.dispatch(action)
}


2.store将prevState, action传给reducer.js中进行处理
const defaultState = {
	inputValue: '',
	list: []
}
//reducer中只能接收state，不能更改state，所以我们定义了一个新的newState
//更改发生在newState中，最后将newState交给store,store自己更新自己的数据
export default (state=defaultState, action) => {
	if (action.type === 'change_input_value') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.inputValue = action.value;
		return newState;
	}
	return state;
}


3.TodoList.js中,store需要自己更新reducer处理后的数据

constructor(props) {
	super(props);
	this.state = store.getState(); //获取到state里的数据，组件里才能通过{this.state.xxx}使用数据
	this.handleStoreChange = this.handleStoreChange.bind(this);
	store.subscribe(this.handleStoreChange);  //监听store数据变化,store更新reducer处理后的数据成为新的store数据
}


handleStoreChange() {
	this.setState(store.getState());
}










//TodoList.js代码
import React, { Component, Fragment } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store';
import {
  getInputChangeAction,
  getAddItemAction,
  getDeleteItemAction
} from './store/actionCreators';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    store.subscribe(this.handleStoreChange);
  }

  render() {
    return (
      <Fragment>
        <div style={{ marginTop: '10px', marginLeft: '10px' }}>
          <Input
            placeholder="todo info"
            value={this.state.inputValue}
            style={{ width: '300px', marginRight: '10px' }}
            onChange={this.handleInputChange}
          />
          <Button type="danger" onClick={this.handleBtnClick}>
            提交
          </Button>
          <List
            style={{ marginTop: '10px', width: '300px' }}
            bordered
            dataSource={this.state.list}
            renderItem={(item, index) => (
              <List.Item onClick={this.handleItemDelete.bind(this, index)}>
                {item}
              </List.Item>
            )}
          />
        </div>
      </Fragment>
    );
  }

  handleInputChange(e) {
    const action = getInputChangeAction(e.target.value);
    store.dispatch(action);
  }

  handleStoreChange() {
    this.setState(store.getState());
  }

  handleBtnClick() {
    const action = getAddItemAction();
    store.dispatch(action);
  }

  handleItemDelete(index) {
    const action = getDeleteItemAction(index);
    store.dispatch(action);
  }
}

export default TodoList;








//store/index.js代码
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;




//store/reducer.js代码
import {
  CHANGE_INPUT_VALUE,
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM
} from './actionTypes';

const defaultState = {
  inputValue: '',
  list: []
};

export default (state = defaultState, action) => {
  if (action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }

  if (action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = '';
    return newState;
  }

  if (action.type === DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }
  return state;
};





//actionTypes.js
export const CHANGE_INPUT_VALUE = 'change_input_value';
export const ADD_TODO_ITEM = 'add_todo_item';
export const DELETE_TODO_ITEM = 'delete_todo_item';




//actionCreators.js
import {
  CHANGE_INPUT_VALUE,
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM
} from './actionTypes';

export const getInputChangeAction = value => ({
  type: CHANGE_INPUT_VALUE,
  value
});

export const getAddItemAction = value => ({
  type: ADD_TODO_ITEM
});

export const getDeleteItemAction = index => ({
  type: DELETE_TODO_ITEM
});