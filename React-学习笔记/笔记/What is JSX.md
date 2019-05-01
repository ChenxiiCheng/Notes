# What is JSX

1. 等价的两种写法

   ```javascript
   正常写法：
   class App extends Component {
     render() {
       return (
          <div className="App">
            <h1>The App Component</h1>
            <input type="text"></input>
          </div>
       );
     }
   }
   
   等价写法：
   class App extends Component {
     render() {
       return React.createElement(
         'div',
         { className: 'App' },
         React.createElement('h1', null, 'The App Component')
       );
     }
   }
   ```

   

2. 若组件里写子组件

   ```javascript
   1.若子组件是以类的形式来写的，则父组件传过来的参数，需要使用{this.props.xx}的形式获取：
   eg: Contact.js
   import React, { Component } from 'react'
   
   class Contact extends Component {
     render() {
       return (
         <div>
           <h4>{this.props.name}</h4>
           <ul>
             <li>{this.props.email}</li>
             <li>{this.props.phone}</li>
           </ul>
         </div>
       );
     }
   }
   
   export default Contact;
   
   2.若子组件是以函数的形式来写的，则父组件传过来的参数，把props写到函数定义的括号里，在函数体里直接用{props.xxx}的形式即可。
   
   import React from 'react'
   import App from '../App';
   
   const Header = (props) => {
     return (
       <div>
         <h1>{props.branding}</h1>
       </div>
     );
   }
   
   export default Header;
   ```



3. 子组件设置默认值

   ```javascript
   const Header = props => {
     const { branding } = props;
     return (
       <div>
         <h1>{branding}</h1>
       </div>
     );
   };
   
   Header.defaultProps = {
     branding: 'My App'
   };
   ```



4. 给组件设置数据类型限制

   ```javascript
   1.Header.js:  结构：**类名.propTypes = {参数名: PropTypes.类型.isRequired}**
   Header.propTypes = {
     branding: PropTypes.string.isRequired
   };
   
   2.Contact.js:
   Contact.propTypes = {
     name: PropTypes.string.isRequired,
     email: PropTypes.string.isRequired,
     phone: PropTypes.string.isRequired
   };
   ```

   

5. 给JSX添加样式css的方法

   ```css
   1.直接写元素里写style     
   <div>
      <h1 style={{ color: 'red' fontSize: '50px' }}>{ branding }</h1>
   </div>
   
   或者这么写：
   <div>
      <h1 style={ headingStyle }>{ branding }</h1>
   </div>
   
   const headingStyle = {
     color: 'red',
     fontSize: '50px'
   }
   
   2.在components文件夹下新建一个contact.css文件，在这个文件里写css:
   h4 {
     color: blue;
     text-transform: uppercase;
   }
   然后在Contact.js里引入这个css文件：
   import './contact.css'
   ```

   

6. 使用bootstrap

   ```
   1.安装bootstrap
   npm install bootstrap
   
   2.在App.js组件里导入bootstrap
   import 'bootstrap/dist/css/bootstrap.min.css';
   ```

   

7. ##Contact.js改写 —— 模板！！！

   ```javascript
   import React, { Component } from 'react';
   import PropTypes from 'prop-types';
   
   class Contact extends Component {
     render() {
       const { contact } = this.props;
       #这里之前是这样写的: const { name, email, phone } = this.props;
       #下面就直接用name,email,phone了
       #不过现在这种写法的好处就是，父组件传参数的时候，只需传一个contact就行了
       #之前那种写法需要把name,email,phone分别传过来，代码就多了
       #props的作用就是连接父子组件，子组件从props里取得父组件传过来的数据
       
       #还可以再改，既满足父组件只需传一个参数过来，子组件里也不需要写contact.name的前缀
       # const { name, email, phone } = this.props.contact
       return (
         <div className="card card-body mb-3">
           <h4>{contact.name}</h4>
           <ul className="list-group">
             <li className="list-group-item">Email:{contact.email}</li>
             <li className="list-group-item">Phone:{contact.phone}</li>
           </ul>
         </div>
       );
     }
   }
   
   Contact.propTypes = {  #设置Contact接收的从父组件传过来的props里的数据类型
     name: PropTypes.string.isRequired,
     email: PropTypes.string.isRequired,
     phone: PropTypes.string.isRequired
   };
   
   #若父组件是把name, email, phone分别传过来的，则限制类型是按照上面这么写
   
   #若我们采用父组件只穿contact一个参数过来，那么我们只需要限制contact的类型：
   Contact.propTypes = {
     contact: PropTypes.object.isRequired
   };
   
   export default Contact;
   ```

   

8. **给按钮设置点击时间时候，this的指向**

   ```javascript
   class Contact extends Component {
     constructor() {
       super();
       this.state = {};
   
       this.onShowClick = this.onShowClick.bind(this);  #这里绑定了this
     }
   
     onShowClick() {
       console.log(this.state);
     }
     ------------
     <h4>
       {name} <i onClick={this.onShowClick} className="fas fa-sort-down" />
     </h4>
   
   
   export default Contact;
   
   //另一种写法，不需要绑定this
   state = {};
   onShowClick = () => {
     console.log(this.state);
   }
   
   //最终我们使用的是第二种写法
   import React, { Component } from 'react';
   import PropTypes from 'prop-types';
   
   class Contact extends Component {
     state = {};
   
     onShowClick = (name, e) => {
       console.log(name);    #函数接收name和元素e(这个e是包含传过来那个标签里的所有东西)，打印出name
     };
   
     render() {
       const { name, email, phone } = this.props.contact;
       return (
         <div className="card card-body mb-3">
           <h4>
             {name}{' '}
             <i
               onClick={this.onShowClick.bind(this, name)} #bind(this, name)每次点击控制台显示名字，我们把参数传给onShowClick这个函数，在函数里写逻辑
               className="fas fa-sort-down"
             />
           </h4>
           <ul className="list-group">
             <li className="list-group-item">Email:{email}</li>
             <li className="list-group-item">Phone:{phone}</li>
           </ul>
         </div>
       );
     }
   }
   
   Contact.propTypes = {
     contact: PropTypes.object.isRequired
   };
   
   export default Contact;
   
   ```

   

9. **setState写法**

   ```javascript
   state = {
   	showContactInfo: true
   };
   onShowClick = (e) => {
     this.setState({
       showContactInfo: !this.state.showContactInfo
     });
   }
   ```

   

10. 如何实现下拉框显示

    ```javascript
    1.在state里写:
    state = {
      showContactInfo: true
    };
    
    2.render里：
    const { showContactInfo } = this.state;
    
    <h4>
      {name}
    <i
    	onClick={() => 
      	this.setState({
      		showContactInfo: !this.state.showContactInfo #每次点击这个icon，就改变true/false,下面写逻辑如果是true,则显示数据，否则不显示
    	})
    }
    className="fas fa-sort-down"
    />
    </h4>
    
    {showContactInfo ? (
      <ul className="list-group">
      	<li className="list-group-item">Email:{email}</li>
     		<li className="list-group-item">Phone:{phone}</li>
     	</ul>
     ) : null}
    ```

    

11. 删除功能

    ```javascript
    1.在子组件里写一个图标，绑定一个点击事件
    <i
    	className="fas fa-times"
    	style={{ cursor: 'pointer', float: 'right', color: 'red' }}
    	onClick={this.onDeleteClick}
    />
        
    2.这个点击事件函数我们写成是父组件传递过来的属性，因为是props，所以我们还需要添加类型限制
    onDeleteClick = () => {
      this.props.deleteClickHandler();
    };
    
    Contact.propTypes = {
      contact: PropTypes.object.isRequired,
      deleteClickHandler: PropTypes.func.isRequired   #传递的是一个函数
    };
    
    3.在父组件中<Contact />组件中传递属性：
    <Contact key={contact.id} contact={contact} 
    	deleteClickHandler={this.deleteContact}/>
        
    然后写deleteContact这个函数
    deleteContact = id => {
      const { contacts } = this.state;
    
      const newContacts = contacts.filter(contact => contact.id !== id);
    
      this.setState({
        contacts: newContacts
      });
    };
    ```

    

12. **箭头函数**

    ```javascript
    1.我们先来按常规语法定义函数：
    function funcName(params) {
       return params + 2;
     }
    funcName(2);
    // 4
    
    2.该函数使用箭头函数可以使用仅仅一行代码搞定！ 自动return函数体
    var funcName = (params) => params + 2
    funcName(2);
    // 4
    ```

    

13. **Provider, Consumer**

    ```javascript
    1.我们写个context.js把所有state数据放这里面
    import React, { Component } from 'react';
    
    const Context = React.createContext();
    
    export class Provider extends Component {
      state = {
        contacts: [
          {
            id: 1,
            name: 'John Doe',
            email: 'jdoe@gmail.com',
            phone: '555-555-5555'
          },
          {
            id: 2,
            name: 'Karen Williams',
            email: 'karen@gmail.com',
            phone: '222-222-2222'
          },
          {
            id: 3,
            name: 'Henry Johnson',
            email: 'henry@gmail.com',
            phone: '111-111-1111'
          }
        ]
      };
    
      render() {
        return (
          <Context.Provider value={this.state}>   #value属性里是我们的state，其他组件要用state的数据时需要先导入Consumer，然后获取到value里的state
            {this.props.children}
          </Context.Provider>
        );
      }
    }
    
    export const Consumer = Context.Consumer;
    
    2.在App.js里，所有jsx代码包裹在<Provider></Provider>里
    
    3.如果组件里想使用state里的数据，需要引入Consumer
    import { Consumer } from '../context';
    然后把jsx代码包裹在<Consumer></Consumer>里
          <Consumer>
            {value => {
              const { contacts } = value;
              return (
                <Fragment>
                  {value.contacts.map(contact => (
                    <Contact
                      key={contact.id}
                      contact={contact}
                      deleteClickHandler={this.deleteContact.bind(this, contact.id)}
                    />
                  ))}
                </Fragment>
              );
            }}
          </Consumer>
    ```

    

14. **如何添加数据**

    ```javascript
    1. 每一栏(name, email, phone)添加一个ref
    <input
    	type="text"
    	name="name"
    	className="form-control form-control-lg"
    	placeholder="Enter Name..."
    	defaultValue={name}
    	ref={this.nameInput}
    />
        
    2. constructor函数
      constructor(props) {
        super(props);
    
        this.nameInput = React.creatRef();
        this.emailInput = React.creatRef();
        this.phoneInput = React.creatRef();
      }
    ```

    