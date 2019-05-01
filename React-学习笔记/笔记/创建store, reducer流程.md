# 创建store, reducer流程

1. **在src文件夹下新建store文件夹**

2. **在store文件夹下新建index.js，这个文件就是写store的**

   ```javascript
   import { createStore } from 'redux';
   
   const store = createStore();
   
   export default store;
   ```

   

3. **在store文件夹下新建reducer.js，这个文件写reducer的**

   ```javascript
   1.首先需要在store/index.js文件夹中导入reducer.js
   import { createStore } from 'redux';
   import reducer from './reducer';
   
   const store = createStore(reducer);
   
   export default store;
   
   2.写reducer.js
   const defaultState = {
       inputValue: '',
       list: []
   }
   
   export default (state = defaultState, action) => {
       return state;
   }
   ```

   

4. **在TodoList.js组件中使用store的话，需要这么写**

   ```javascript
   1.首先把store文件夹导入
   import store from './store';
   
   2.需要使用constructor
   import React, { Component } from "react";
   import store from './store';
   
   class TodoList extends Component {
   
       constructor(props) {
           super(props);
           this.state = store.getState();
       }
   
       render() {
           return (
               <div>
                   <div>
                       <input value={this.state.inputValue}/>
                       <button>提交</button>
                   </div>
                   <ul>
                       <li>Dell</li>
                   </ul>
               </div>
           )
       }
   }
   
   export default TodoList;
   ```

   