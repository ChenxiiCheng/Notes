# React使用CSS3动画效果

1. 动画效果

   ```css
   .show {
       opacity: 1;
       animation: show-item 2s ease-in forwards;
   }
   
   .hide {
       opacity: 0;
       animation: hide-item 2s ease-in forwards;
   }
   
   #react只用keyframes写自己定义的动画效果
   @keyframes show-item {
       0% {
           opacity: 0;
           color: red;
       }
       50% {
           opacity: 0.5;
           color: green;
       }
       100% {
           opacity: 1;
           color: blue;
       }
   }
   
   @keyframes hide-item {
       0% {
           opacity: 1;
           color: red;
       }
       50% {
           opacity: 0.5;
           color: green;
       }
       100% {
           opacity: 0;
           color: blue;
       }
   }
   
   
   组件中：
   import React, { Component, Fragment } from 'react'
   import './style.css'
   
   class App extends Component {
   
       constructor(props) {
           super(props);
           this.state = {
               show: true
           }
           this.handleToggole = this.handleToggole.bind(this)
       }
   
       render() {
           return (
               <Fragment>
                   <div className={this.state.show ? 'show' : 'hide'}>hello</div>
                   <button onClick={this.handleToggole}>toggle</button>  
               </Fragment>
           )
       }
   
       handleToggole() {
           this.setState({
               show: this.state.show ? false : true
           })
       }
   
   }
   
   export default App;
   ```

   