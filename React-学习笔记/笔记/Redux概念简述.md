# Redux概念简述

1. **Redux = Reducer + Flux**

![image-20190420142614248](/Users/chenxi/Library/Application Support/typora-user-images/image-20190420142614248.png)



2. **Redux是把所有组件的数据存储在Store里面，若某个组件改变了Store里的数据，其他组件自动从Store里感应到数据的变化**



3. **Redux工作流程**

   ```
   1. React Component: 类似借书的用户
   2. Action Creators: "我要借xx书"这句话
   3. Store: 图书管理员
   4. Reducers: 图书管理员的记录本，因为他记不住这么多图书信息
   ```

   

4. **创建Redux里的store**

   ```javascript
   1. 安装redux
   sudo yarn add redux
   
   2.在src文件下新建store文件夹，在store文件夹下新建index.js
   在新建的index.js文件中：
   import { createStore } from 'redux';
   
   const store = createStore();
   
   export default store;
   
   3.在store文件夹下新建reducer.js，也就是那个图书管理员的笔记本
   const defaultState = {}
   
   export default (state = defaultState, action) => {
       return state;
   }
   
   4.在store/index.js中：
   import { createStore } from 'redux';
   import reducer from './reducer';
   
   const store = createStore(reducer);
   
   export default store;
   ```

   

5. **如何在组件里使用store**

   ```javascript
   1. TodoList.js中导入:
   import React, { Component } from 'react';
   import 'antd/dist/antd.css';
   import { Input, Button, List } from 'antd';
   import store from './store';
   
   
   class TodoList extends Component {
   
       constructor(props) {
           super(props);
           this.state = store.getState();  //接收store里的数据
           console.log(this.state);
       }
   
       render() {
           return (
               <div style={{ marginTop: '10px', marginLeft: '10px' }}>
                   <div>
                       <Input 
                       value={this.state.inputValue}   //使用数据
                       placeholder="Todo Info" 
                       style={{ width: '300px', marginRight: '10px' }} />
                       <Button type="primary">提交</Button>
                   </div>
                   <List
                       style={{marginTop: '10px', width: '300px'}}
                       bordered
                       dataSource={this.state.list}    //使用数据
                       renderItem={item => (<List.Item>{item}</List.Item>)}
                   />
               </div>
           )
       }
   }
   
   export default TodoList;
   ```

   