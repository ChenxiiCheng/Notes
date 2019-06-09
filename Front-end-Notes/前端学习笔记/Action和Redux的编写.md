# Action和Redux的编写

1. **TodoList.js**

```javascript

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store';


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
            <div style={{ marginTop: '10px', marginLeft: '10px' }}>
                <div>
                    <Input 
                        value={this.state.inputValue}
                        placeholder="Todo Info" 
                        style={{ width: '300px', marginRight: '10px' }} 
                        onChange={this.handleInputChange}
                    />
                    <Button type="primary" onClick={this.handleBtnClick}>提交</Button>
                </div>
                <List
                    style={{marginTop: '10px', width: '300px'}}
                    bordered
                    dataSource={this.state.list}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </div>
        )
    }

    handleInputChange(e) {
        const action = {
            type: 'change_input_value',
            value: e.target.value
        }
        store.dispatch(action);
    }

    handleStoreChange() {
        this.setState(store.getState());
    }

    handleBtnClick() {
        const action = {
            type: 'add_todo_item'
        };
        store.dispatch(action)
    }

}

export default TodoList;

```



2. **store/index.js**

   ```javascript
   import { createStore } from 'redux';
   import reducer from './reducer';
   
   const store = createStore(
       reducer, 
       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
   
   export default store;
   ```

   

3. **store/reducer.js**

   ```javascript
   const defaultState = {
       inputValue: '123',
       list: [1, 2]
   }
   
   // reducer可以接收state,但是绝不能修改state
   export default (state = defaultState, action) => {
       if (action.type == 'change_input_value') {
           const newState = JSON.parse(JSON.stringify(state));
           newState.inputValue = action.value;
           return newState;
       }
   
       if (action.type == 'add_todo_item') {
           const newState = JSON.parse(JSON.stringify(state));
           newState.list.push(newState.inputValue);
           newState.inputValue = '';
           return newState;
       }
       return state;
   }
   ```

   