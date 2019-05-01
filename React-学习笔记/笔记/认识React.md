# 认识React

1. 组件化思想： 把网页显示的每个部分都看成一个个组件，例如标题、搜索栏、左侧个人信息等等都是一个个独立的组件，在项目里最终是把这些组件通过import的方式聚集在index.js文件里

   ```javascript
   src文件下：
   - App.js
   - index.js
   App.js中写的就是一个组件
   App.js中如何定义该文件是组件 (写法)：
   
   import React from 'react';
   
   #另一种写法
   import React, { Component } from 'react';
   等价于：
   import React from 'react'
   const Component = React.Component
   
   下面就写成： class App extends Component {}
   
   class App extends React.Component {  #定义App.js是React的一个组件
     render() {
       return (
       	<div>
       		hello, chenxi
       	</div>
       );
     }
   }
   
   export default App; #把这个组件export出去，这样在index.js中才可以import App from './App';
   ```

   

2. 每个组件是如何对应网页哪部分呢？

   React中用```ReactDOM.render```实现组件和前端模板对应位置的联系，(也称把组件挂载在前端哪个部分)

   ````javascript
   在index.js中：
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './App';
   
   ReactDOM.render(<App />, document.getElementById('root'))
   
   在前端模板中index.html中的那个<div id="root">就是这个组件的位置：
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="utf-8" />
     <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
     <meta name="theme-color" content="#000000" />
   
     <title>TodoList</title>
   </head>
   <body>
       
     <noscript>You need to enable JavaScript to run this app.</noscript>
     <div id="root"></div>
   
   </body>
   
   </html>
   ````

   

3. 在js文件中写css，在react中称为JSX语法

4. React中要求写前端模板必须在只能在一个标签里

   ```javascript
   例如：
   import React, { Component } from 'react'
   
   class TodoList extends Component {
       render() {
           return (
             <div>
             	<input /><button>提交</button>
             </div>
             <ul>
             	<li>学英语</li>
             	<li>Learning react</li>
             </ul>
           )
       }
   }
   这样写会报错，因为return里有两个标签了，一个div,一个ul
   
   解决方法1：最外面加一个div，所有标签都在这个div中，但是这样会带来一个问题，我们在浏览器里inspect时候发现，最外面的div是有占一些页面位置的(虽然看不到)，但是我们想有没有其他方法
   class TodoList extends Component {
       render() {
           return (
             <div>
               <div>
                 <input /><button>提交</button>
               </div>
               <ul>
                 <li>学英语</li>
                 <li>Learning react</li>
               </ul>
             </div>
           )
       }
   }
   
   解决方法2：使用占位符Fragment，它能帮我们解决react的只有一个标签的要求，同时不会占用页面
   import React, { Component, Fragment } from 'react'
   
   class TodoList extends Component {
       render() {
           return (
               <Fragment>
                   <div>
                       <input /><button>提交</button>
                   </div>
                   <ul>
                       <li>学英语</li>
                       <li>Learning react</li>
                   </ul>
               </Fragment>
           )
       }
   }
   ```

   

5. this.state存储组件里的数据，事件绑定的时候需要用.bind(this)对函数的作用域进行变更，如果想改变state里的数据，需要用setState这个函数

   ```javascript
   class TodoList extends Component {
   
       constructor(props) {
           super(props);
           this.state = {   #state里存储数据
               inputValue: '',
               list: []
           }
       }
   
       render() {
           return (
               <Fragment>
                   <div>
                       <input value={this.state.inputValue}  #input框显示数据
                           onChange={this.handleInputChange.bind(this)} #绑定事件 
                           #绑定时间时需要对函数的作用域进行变更
                       />
                       <button>提交</button>
                   </div>
                   <ul>
                       <li>学英语</li>
                       <li>Learning react</li>
                   </ul>
               </Fragment>
           )
       }
   
       handleInputChange(e) {   #改变state里的数据需要用setState函数
           this.setState({
               inputValue: e.target.value
           })
       }
   }
   
   export default TodoList;
   ```

   

6. JS中写注释：

   ```
   {
     // 下面是注释
   }
   
   {/*
   	下面是注释
   */}
   ```



7. 如果想直接显示输入的东西，而不显示html标签

   ```javascript
   <ul>
     {
     this.state.list.map((item, index) => {
       return <li key={index} onClick={this.handleItemDelete.bind(this, index)}
   dangerouslySetInnerHTML={{ __html: item }}
   #使用dangerouslySetInnerHTML，这样 我们在input框里输入<h1>hello world</h1>显示的h1大小的hello world而不是<h1>hello world</h1>
     >
       </li>
   })
   }
   </ul>
   ```




8. 运行项目

   ```
   进入项目目录
   npm run start
   ```

   

9. 工程目录

   ```javascript
   1. index.js是整个项目的运行入口，index.js文件中引入了App.js文件，App.js文件中引入了App.css文件
   2. App.text.js：自动化测试的文件
   
   #在index.js文件中:
   ...
   import App from './App';    #加载App这个组件
   
   #如何写组件
   App.js文件中
   class App extends React.Component {
   #定义一个类App继承React.Component这个基类，那么这个App类就是一个组件了
     render() {     # render函数返回的东西决定这个组件在页面上显示的内容
       return (     # 在这里就是显示hello world
       	<div>
       		hello world!
       	</div>
       )
     }
   }
   
   
   #index.js文件中
   ReactDOM.render(<App />, document.getElementById('root'));
   第三方ReactDOM的render方法可以把这个组件挂载到某个前端结点上
   
   index.html中写结点, eg: <div id='root'></div>
   
   然后每个组件在自己的App.js里写js和html，这个组件要显示什么是在自己的render()中写的，然后在index.js中把这个组件挂载到index.html中的某个结点上
   
   举例：【一个完整的流程】
   （1）index.html中：
   		<div id='root'></div>
    (2) App.js中：
   		App.js文件中
       class App extends React.Component {
       #定义一个类App继承React.Component类，那么这个App类就是一个组件了
         render() {     # render函数返回的东西决定这个组件在页面上显示的内容
           return (     # 在这里就是显示hello world
             <div>
               hello world!    #这个组件要在前端显示的东西
             </div>
           )
         }
       }
    (3) index.js中：
   		ReactDOM.render(<App />, document.getElementById('root'));
   		#第三方ReactDOM的render方法可以把这个组件挂载到某个前端结点上
   ```

   

10. 在index.js文件中使用自己的组件，组件名开头必须大写eg: App



11. React中不用关心DOM的操作，我们只关心对数据的操作，React会自动帮我们处理DOM



12. (1) 每一个类里面都有一个constructor函数，这个函数有一个固定写法的参数props。

    (2) React中把数据放在组件的状态里，通过{this.state.xxx} 把state里的数据和html里的元素绑定在一起, input框和state里的数据绑在一起后，react会自动把state的数据放到input框里，只要我们改变state里的数据，那么react会自动感应到数据的变化，然后更新input框里显示的数据

    ```javascript
    class TodoList extends Component {
        
        constructor(props) {
            super(props);
            this.state = {
                inputValue: 'hello',
                list: []
            }
        }
        
        render() {
            return (
                <Fragment>
                    <div>
                        <input 
              							#input框里显示state.inputValue里的数据
              							value={this.state.inputValue}
      											onChange={this.handleInputChange.bind(this)}
    												#绑定事件,bind(this)这个this是指组件
      									/>  
                        <button>提交</button>
                    </div>
                    <ul>
                        <li>学英语</li>
                        <li>Learning React</li>
                    </ul>  
                </Fragment>
            )
        }
        
        //handleInputChange(e) { 
        //这样做是错的因为在react里面不能直接改state里的值，要用setState函数来改state里的数据
            //this.state.inputValue = e.target.value;
        //}
        
        handleInputChange(e) {
            this.setState({
                inputValue: e.target.value
            })
        }
    } 
    ```

    

13. button增加点击事件

    ```javascript
    1. this.state.list.map((item, index) => {
      		return <li key={ index }>{ item }</li>   
    })  #map方法实现数组循环，把所有item取出来
    		#在react里当进行循环渲染的时候，需要给渲出的每一项增加一个key值，这里使用index作为key值
    
    2. this.setState({
      		list: [...this.state.list]  #...this的...是展开运算符，实现把this.state.list
    })																	中的数据全部取出来
    
    
    import React, { Component, Fragment } from 'react';
    
    class TodoList extends Component {
        
        constructor(props) {
            super(props);
            this.state = {
                inputValue: '',
                list: []
            }
        }
        
        render() {
            return (
                <Fragment>
                    <div>
                        <input 
                            value={this.state.inputValue}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <button onClick={this.handleBtnClick.bind(this)}>提交</button>
                    </div>
                    <ul>
                        {
                            this.state.list.map((item, index) => {
                                return <li key={index}>{ item }</li>
                            })
                        }
                    </ul>  
                </Fragment>
            )
        }
    
        handleInputChange(e) {
            this.setState({
                inputValue: e.target.value
            })
        }
    
        handleBtnClick() {
            this.setState({
                list: [...this.state.list, this.state.inputValue],
                inputValue: ''
            })
        }
    
    } 
    
    export default TodoList;
    ```

    

14. 点击每一项<li>时，删除该项

    ```javascript
    1. 给<li>增加点击事件：
      this.state.list.map((item, index) => {
         return <li 
         					key={index} 
         					onClick={this.handleItemDelete.bind(this, index)}
         				>{ item }</li>
    })
    
        handleItemDelete(index) {
            const list = [...this.state.list];
            list.splice(index, 1);  
    				//splice()方法向/从数组中添加/删除项目，然后返回被删除的项目。
            //为什么先拷贝出来再改呢？这是因为react中不允许直接改state里的数据
            //必须通过setState函数来修改
            //所以我们先取出state.list中的数据，然后修改完再在setState里改变原本的list
          
            this.setState({
                list:list
            })
        }
    
    
    完整code:
    import React, { Component, Fragment } from 'react';
    
    class TodoList extends Component {
        
        constructor(props) {
            super(props);
            this.state = {
                inputValue: '',
                list: []
            }
        }
        
        render() {
            return (
                <Fragment>
                    <div>
                        <input 
                            value={this.state.inputValue}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <button onClick={this.handleBtnClick.bind(this)}>提交</button>
                    </div>
                    <ul>
                        {
                            this.state.list.map((item, index) => {
                                return <li key={index} onClick={this.handleItemDelete.bind(this, index)}>{ item }</li>
                            })
                        }
                    </ul>  
                </Fragment>
            )
        }
    
        handleInputChange(e) {
            this.setState({
                inputValue: e.target.value
            })
        }
    
        handleBtnClick() {
            this.setState({
                list: [...this.state.list, this.state.inputValue],
                inputValue: ''
            })
        }
    
        handleItemDelete(index) {
            const list = [...this.state.list];
            list.splice(index, 1);
    
            this.setState({
                list:list
            })
        }
    
    } 
    
    export default TodoList;
    ```

    

15. 给组件写css

    ```javascript
    1. 在src文件下新建style.css文件，和TodoList.js, index.js同个目录
    	在style.css中：
    	.input {
        border: 1px solid red;
    	}
    	
    	在Todolist.js中导入style.css文件
    	import './style.css'
    	给input框增加一个className
    	className='input'
    
    2.想要在Input框里输入<h1>Hello World</h1>，显示h1样式的Hello而不是<h1>Hello World</h1>
    this.state.list.map((item, index) => {
          return <li key={index} onClick={this.handleItemDelete.bind(this, index)}
             			dangerouslySetInnerHTML={{__html: item}}></li>
    })
    
    3.新增一个label，我们想要当点击"输入内容"时，光标跳到input框
      <label htmlFor="insertArea">输入内容</label>   #这里使用htmlFor而不是for
      <input 
            id="insertArea"
            className='input'
            value={this.state.inputValue}
            onChange={this.handleInputChange.bind(this)}
      />
    
    
    完整code:
    import React, { Component, Fragment } from 'react';
    import './style.css'
    
    class TodoList extends Component {
        
        constructor(props) {
            super(props);
            this.state = {
                inputValue: '',
                list: []
            }
        }
        
        render() {
            return (
                <Fragment>
                    <div>
                        <label htmlFor="insertArea">输入内容</label>
                        <input 
                            id="insertArea"
                            className='input'
                            value={this.state.inputValue}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <button onClick={this.handleBtnClick.bind(this)}>提交</button>
                    </div>
                    <ul>
                        {
                            this.state.list.map((item, index) => {
                                return <li key={index} onClick={this.handleItemDelete.bind(this, index)}
                                    dangerouslySetInnerHTML={{__html: item}}
                                ></li>
                            })
                        }
                    </ul>  
                </Fragment>
            )
        }
    
        handleInputChange(e) {
            this.setState({
                inputValue: e.target.value
            })
        }
    
        handleBtnClick() {
            this.setState({
                list: [...this.state.list, this.state.inputValue],
                inputValue: ''
            })
        }
    
        handleItemDelete(index) {
            const list = [...this.state.list];
            list.splice(index, 1);
    
            this.setState({
                list:list
            })
        }
    
    } 
    
    export default TodoList;
    ```




16. 新增TodoItem组件

    ```javascript
    1.新建TodoItem.js文件
    	import React, { Component } from 'react'
    
      class TodoItem extends Component {
          render() {
              return <div>item</div>
          }
      }
    
      export default TodoItem;
    
    2.在TodoList.js中导入TodoItem组件
        <ul>
          {
          this.state.list.map((item, index) => {
    
            return (
              <TodoItem />
            	)
          	})
        	}
        </ul>  
    
    3.在页面里测试，新增随便输入几个字符，点击提交后，下面显示的是item
    
    4.如果我们想每次输入的值显示出来，而不是固定显示item，怎么做？
    这里涉及到父子组件通信，父组件把item传给子组件
    父组件向子组件传递参数是通过属性的形式，子组件中使用{this.props.xxx} xxx为对应父组件传的参数
    父组件通过属性向子组件传值，子组件通过方法反过来调用父组件的数据，去改变父组件的一些数据都可以
    
    TodoItem.js中：
    import React, { Component } from 'react'
    
    class TodoItem extends Component {
        render() {
            return <div>{ this.props.content }</div>
        }
    }
    
    export default TodoItem;
    
    TodoList.js中：
    <ul>
      {
      this.state.list.map((item, index) => {
    
        return (
          <TodoItem content={item}/>
    			)
    		})
    	}
      </ul> 
    
    5.子组件里如何调用父组件里的方法,只需要把父组件里的这个函数传给子组件
    在TodoList.js中：
    <ul>
      {
      this.state.list.map((item, index) => {
        return (
          <TodoItem 
          content={item} 
    			index={index}
    			deteleItem = {this.handleItemDelete.bind(this)} #这里this绑定父组件
    			/>
    			)
    		})
    	}
    </ul> 
    
    在TodoItem.js中：
    handleClick() {
      this.props.deteleItem(this.props.index)
    }
    ```

    

17. 单向数据流概念

    ```
    父组件向子组件传递值，子组件可以用这个值，但是不能直接改变这个值
    ```



18. 如何限制父组件传递过来的数据的类型(要不然父组件乱传...)

    ```javascript
    1.使用PropTypes
    import PropTypes from 'prop-types'
    
    2.定义要接收的数据的类型
    TodoItem.propTypes = {
        test: PropTypes.string.isRequired, #因为这是test是设置成必须，如果父组件没传这个参数会报错，怎么处理呢？给他设置一个默认的值，下面那个函数
        content: PropTypes.string,
        deteleItem: PropTypes.func,
        index: PropTypes.number
    }
    
    TodoItem.defaultProps = {  #给test设置默认值
        test: 'hello world'
    }
    ```

    