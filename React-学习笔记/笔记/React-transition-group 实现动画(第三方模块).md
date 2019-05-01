# React-transition-group 实现动画(第三方模块)

1. **如何使用**

   ```javascript
   1. 安装yarn add react-transition-group
   2. 导入，在App.js这个组件里： 
   		import { CSSTransition } from 'react-transition-group';
   3. 在需要用的地方包裹上<CSSTransition>
     	render() {
           return (
               <Fragment>
                   <CSSTransition>   #给hello包裹上
                   <div>hello</div>
                   </CSSTransition>
                   <button onClick={this.handleToggole}>toggle</button>  
               </Fragment>
           )
       }
   4. 这是我们就不需要给这个div添加className了，CSSTransition会自动帮我们添加className
   ```

   

2. **钩子和生命函数指的是同个东西，它指的是在某个时刻会自动执行的一个函数**

   ```javascript
   1. onEntered：当入场动画执行结束之后执行
       render() {
           return (
               <Fragment>
                   <CSSTransition
                       in={this.state.show}
                       timeout={1000}
                       classNames='fade'
                       unmountOnExit
                       onEnter={(el) => {el.style.color='blue'}}
                   >
                   <div>hello</div>
                   </CSSTransition>
                   <button onClick={this.handleToggole}>toggle</button>  
               </Fragment>
           )
       }
       
   2. appear={true}: 第一次展示页面时候也要动画效果
       render() {
           return (
               <Fragment>
                   <CSSTransition
                       in={this.state.show}
                       timeout={1000}
                       classNames='fade'
                       unmountOnExit
                       onEnter={(el) => {el.style.color='blue'}}
                       appear={true}    <------
                   >
                   <div>hello</div>
                   </CSSTransition>
                   <button onClick={this.handleToggole}>toggle</button>  
               </Fragment>
           )
       }
       
       
   3. onEnter()
       render() {
           return (
               <Fragment>
                   <CSSTransition
                       in={this.state.show}
                       timeout={1000}
                       classNames='fade'
                       unmountOnExit
                       onEnter={(el) => {el.style.color='blue'}}
                       #el指元素
                       appear={true}
                   >
                   <div>hello</div>
                   </CSSTransition>
                   <button onClick={this.handleToggole}>toggle</button>  
               </Fragment>
           )
       }
   
   CSSTransition中的一些钩子函数
   onEnter：入场动画第一帧的时候触发
   onEntering ： 入场动画第二帧的时候触发
   onEntered ：入场动画结束的时候触发
   onExit ： 出场动画结束第一帧的时候触发
   onExiting : 出场动画结束第二帧的时候触发
   onExited :  出场动画结束的时候触发
   ```

   