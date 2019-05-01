# 开发简书Header

1. index.js项目入口, App.js根组件

2. 在common文件夹下新建header文件夹，在header文件夹下新建style.css

   ```javascript
   import styled from 'styled-components';
   
   export const HeaderWrapper = styled.div`
     height: 56px;
     background: red;
   `;
   
   我们导出了一个带有样式的div标签，这样在组件里就可把<HeaderWrapper>当做<div>来用
   ```



3. 安装redux

   ```
   sudo yarn add redux
   sudo yarn add react-redux
   ```



4. 创建store

   ```javascript
   1.在src文件夹下创建store文件夹
   2.在store文件夹下创建index.js
   3.在store/index.js中：
   import { creatStore, createStore } from 'redux';
   import reducer from './reducer';
   
   const store = createStore(reducer);
   
   export default store;
   4.在store文件夹下新建reducer.js中：
   const defaultState = {};
   
   export default (state = defaultState, action) => {
     return state;
   };
   
   5.在App.js这个跟组件里：
   import { Provider } from 'react-redux';
   import store from './store';
   把<Header/>包裹在Provider里，这样做的话，就是说Provider里的组件都可以使用store里的数据
   class App extends Component {
     render() {
       return (
         <Provider sotre={store}>
           <Header />
         </Provider>
       );
     }
   }
   
   6.到header的组件里header/index.js
   App.js中使用了<Provider>把数据提供了包裹着的里面的组件，但是还需要header/index.js，想使用store里的数据，还需要这个组件连接下store.
   import { connect } from 'react-redux';
   //connect方法就是帮助我们使header组件和store连接
   
   然后添加，修改export
   const mapStateToProps = state => {
     return {};
   };
   
   const mapDispathToProps = dispatch => {
     return {};
   };
   //组件在和state做连接的时候，组件要改变store里的内容需要调用dispatch方法，
   //我们把需要调用dispatch方法的都写在mapDispathToProps里面，这样的话，这些方法都有能力
   //调用store.dispatch了
   
   export default connect(
     mapStateToProps,
     mapDispathToProps
   )(Header);
   
   
   
   //那么如何使用store里的数据呢?
   我们用了store之后就不能直接从state里取focused了，我们把默认初始值放在defaultState里：
   const defaultState = {
     focused: false
   };
   
   然后我们在下面这个函数里，把state里的值映射到我们的props里，然后在组件里就可以用这个focused的数据了。
   const mapStateToProps = state => {
     return {
       focused: state.focused
     };
   };
   ```



5. redux里的数据修改需要走的套路流程

   ```javascript
   先创建action,再给到store,再给到reducer，再返回给store，数据发生更新，页面跟着变
   所以绑定时间，获取数据都是通过this.props来弄的，然后我们一开始就写了两个函数是把store映射到props的！！
   const mapStateToProps = state => {
     return {
       focused: state.focused
     };
   };
   
   const mapDispathToProps = dispatch => {
     return {
       handleInputFocus() {
         const action = {
           type: 'search_focus'
         };
         dispatch(action);
       }
     };
   };
   
   store.dispatch是store把action和之前的数据一起交给reducer来处理
   所以我们需要写个action，里面包含type，然后发送action: dispatch(action)
   这个handleInputFocus事件的需要改变的值是在reducer.js中我们通过action.type == "search_focus"找到后改变focused值
   ```

   

6. 我们使用了redux公共存储数据，Header就成了一个无状态组件，只有一个render函数

   ```javascript
   那我们可以写成一个函数，里面的this去掉，然后无状态组件没有用到{Component}把它去掉。写成无状态组件的好处是性能高
   const Header = props => {
     return (
       <HeaderWrapper>
         <Logo />
         <Nav>
           <NavItem className="left active">首页</NavItem>
           <NavItem className="left">下载App</NavItem>
           <NavItem className="right">登陆</NavItem>
           <NavItem className="right">
             {/* <i className="iconfont">&#xe636;</i> */}
           </NavItem>
           <SearchWrapper>
             <CSSTransition in={props.focused} timeout={200} classNames="slide">
               <NavSearch
                 className={props.focused ? 'focused' : ''}
                 onFocus={props.handleInputFocus}
                 onBlur={props.handleInputBlur}
               />
             </CSSTransition>
             {/* <i className={this.state.focused ? 'focused iconfont' : 'iconfont'}>&#xe623;</i> */}
           </SearchWrapper>
         </Nav>
         <Addition>
           <Button className="writting">
             {/* <i className="iconfont">&#xe615;</i> */}
             写文章
           </Button>
           <Button className="reg">注册</Button>
         </Addition>
       </HeaderWrapper>
     );
   };
   ```

   

7. 配置redux-devtools-extension

   ```javascript
   在store/index.js中：
   import { createStore, compose } from 'redux';
   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
   
   const store = createStore(reducer, composeEnhancers());
   ```

   

8. 数据拆分管理

   ```javascript
   原因：
   reducer.js中有过多数据导致不好维护，所以我们把一个reducer.js拆分成多个子reducer，最终再做一个整合
   总的那个reducer.js: 
   import { combineReducers } from 'redux';
   #使用redux提供的combineReducers方法把子reducer整合到整个的那个reducer.js中
   import headerReducer from '../common/header/store/reducer';
   #我们给header的reducer起名叫headerReducer
   
   const reducer = combineReducers({
     header: headerReducer
     #这个header是我们自己起名的，记住：在前面组件里对应的要加上state.header.focused
     //const mapStateToProps = state => {
     //return {
       //focused: state.header.focused
     //};
   //};
   });
   
   export default reducer;
   ```

   

9. 派发action改写

   ```javascript
   1.在header/store/下新建一个actionCreators.js，我们把action专门写到这个文件里
   export const searchFocus = () => ({
     type: 'search_focus'
   });
   
   export const searchBlur = () => ({
     type: 'search_blur'
   });
   
   2. 然后index.js里派发action地方可以这么写：
   import * as actionCreators from './store/actionCreators';
   
   const mapDispathToProps = dispatch => {
     return {
       handleInputFocus() {
         dispatch(actionCreators.searchFocus());
       },
   
       handleInputBlur() {
         dispatch(actionCreators.searchBlur());
       }
     };
   };
   
   3.actionCreators.js里的type我们应该写成const比较好，所以在header/store/新建constants.js：
   export const SEARCH_FOCUS = 'header/SEARCH_FOCUS';
   export const SEARCH_BLUR = 'header/SEARCH_BLUR';
   
   actionCreators.js中：
   import * as constants from './constants';
   
   export const searchFocus = () => ({
     type: 'constants.SEARCH_FOCUS'
   });
   
   export const searchBlur = () => ({
     type: 'constants.SEARCH_BLUR'
   });
   
   reducer.js中：
   import * as constants from './constants';
   
   export default (state = defaultState, action) => {
     if (action.type === 'constants.SEARCH_FOCUS') {
       return {
         focused: true
       };
     }
   
     if (action.type === 'constants.SEARCH_BLUR') {
       return {
         focused: false
       };
     }
   ```

   

10. 我们嫌Index.js导入actionCreators.js, constants,js太麻烦，解决办法

    ```javascript
    我们在store文件夹下新建一个index.js，把它当做一个出口文件，把store文件夹下的actionCreators.js, constants.js, reducer.js文件都集成在这个index.js里导出去，这样在其他地方需要使用以上这些js文件时候，只需要导入这个index.js文件即可。
    
    import reducer from './reducer';
    import * as actionCreators from './actionCreators';
    import * as constants from './constants';
    
    export { reducer, actionCreators, constants };
    
    
    然后再header文件夹下的index.js文件中就可以这么改写了：
    //原本的写法
    import * as actionCreators from './store/actionCreators';
    
    //现在的写法
    import { actionCreators } from './store';
    ```

    

11. 安装immutable.js

    ```javascript
    sudo yarn immutable
    新手在写代码的时候，可能会不小心直接改变了state的值，而找不到错误地方，使用这个第三方的库我们可以避免这个问题
    
    //如何使用：
    reducer.js中
    import { fromJS } from 'immutable';  #把一个js对象转换成immutable对象
    const defaultState = fromJS({
      focused: false
    });
    
    export default (state = defaultState, action) => {
      if (action.type === 'constants.SEARCH_FOCUS') {
        // immutable对象的set方法，会结合之前immutable对象的值
        // 和设置的值，返回一个全新的对象
        #原本写法：
        #return {focused: true;}
        return state.set('focused', true); 
      }
    
      if (action.type === 'constants.SEARCH_BLUR') {
        return state.set('focused', false);
      }
    
      return state;
    };
    
    //header下的index.js中：
    const mapStateToProps = state => {
      return {
        #原本写法：focused: state.header.focused
        focused: state.header.get('focused')
      };
    };
    ```

    

12. 安装redux-immutable

    ```javascript
    sudo yarn add redux-immutable
    
    //使用
    在总的reducer.js文件中
    #更改前：
    import { combineReducers } from 'redux';
    #更改后：
    import { combineReducers } from 'redux-immutable';
    
    在header文件夹下index.js文件中：
    #更改前：
    const mapStateToProps = state => {
      return {
        focused: state.header.get('focused')
      };
    };
    #更改后：
    const mapStateToProps = state => {
      return {
        focused: state.get('header').get('focused')
        #等价写法：
        focused: state.getIn(['header', 'focused'])
      };
    };
    ```

    

13. 我们项目中的异步放到action里处理，使用redux-thunk，redux-thunk是redux的一个中间件，它使得我们可以在action里写函数



14. 我们在开发的时候需要用后端数据测试怎么解决

    使用redux-thunk发送ajax数据，获取到数据后存到store里面，然后在页面上进行显示

    我们把异步获取数据的动作放到actionCreator里面，那么要求action返回的对象不能是普通的js对象了，而是一个函数，如果我们想actionCreator里返回的对象是一个函数，就必须使用redux-thunk中间件了。

    ```
    在public文件夹下新建api（固定命名方法）文件夹，在api文件夹下新建headerList.json(这个文件名自己命名)，然后在里面放数据
    ```

    

15. 改变store里的数据-》流程-》action -> store -> reducer

    ```javascript
    步骤：构建action,然后dispatch(action)，但是我们为了规范，所以把action的定义写在
    1.#actionCreators.js中，把type设为常量，所以在constants.js中设置
    构建action:
    const action = {
      type: 'change_list',
      data: data.data
    }
    
    2.#我们为了规范，统一把action写在actionCreators.js文件中，因为刚好这个getList也是在这个文件里，所以不用export
    const changeList = () => ({
      type: 'change_list',
      data
    });
    
    3.#把type设为常量，所以在constants.js中设置：
    export const CHANGE_LIST = 'header/CHANGE_LIST';
    上面changeList改写：
    const changeList = () => (
      type: 'CHANGE_LIST',
      data
    });
    
    4.#下面用：
    const action = getList(data.data)
    dispatch(action)
    
    可以简写成：
    dispatch(getList(data.data))
    
    #这样就把action和data发给reducer了，然后就在reducer里执行逻辑操作！！！
    
    
    #在reducer.js中：
    因为defaultState是一个immutable对象，所以里面的list也是immutable类型，但我们的数据文件headerList.json里面是普通的数据，那怎么办呢？
    在action那个文件(actionCreator.js中)
    import { fromJS } from 'immutable';
    
    const changeList = data => ({
      type: constants.CHANGE_LIST,
      data: fromJS(data)   #这里我们把传进去的data弄成immutable类型
    });
    
    
    #页面展示
      <SearchInfoList>
        {this.props.list.map(item => {
         return <SearchInfoItem key={item}>{item}</SearchInfoItem>;})}
      </SearchInfoList>
    ```

    

16. **为标签绑定了一个事件 -> actionCreators.js中定义这个action, constants.js中定义常量 -> mapDispathToProps中dispatch(action) -> reducer.js中写改变state操作**