## 1. useState

### (1) 只有一个state，改变状态

```jsx
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [count, setCount] = useState(10);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <div>{count}</div>
    </div>
  );
};

export default App;
```

**等价写法**

```jsx
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [count, setCount] = useState(10);

  return (
    <div>
      <button onClick={() => setCount(currentCount => currentCount + 1)}>
        +
      </button>
      <div>{count}</div>
    </div>
  );
};

export default App;
```



### (1.2) 两个state，只改变一个state的状态

```jsx
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [{ count1, count2 }, setCount] = useState({ count1: 10, count2: 20 });

  return (
    <div>
      <button
        onClick={() =>
          setCount(currentState => ({
            ...currentState,
            count1: currentState.count1 + 1
          }))
        }
      >
        +
      </button>
      <div>{count1}</div>
      <div>{count2}</div>
    </div>
  );
};

export default App;
```

**等价写法**

```jsx
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [{ count1, count2 }, setCount] = useState({ count1: 10, count2: 20 });

  return (
    <div>
      <button
        onClick={() =>
          setCount(currentState => ({
            count1: currentState.count1 + 1,
            count2: currentState.count2
          }))
        }
      >
        +
      </button>
      <div>{count1}</div>
      <div>{count2}</div>
    </div>
  );
};

export default App;
```



### (1.3) 拆成两个useState写法，同时改变state

```jsx
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [count1, setCount1] = useState(10);
  const [count2, setCount2] = useState(20);

  return (
    <div>
      <button
        onClick={() => {
          setCount1(currentState => currentState + 1);
          setCount2(currentState => currentState + 1);
        }}
      >
        +
      </button>
      <div>{count1}</div>
      <div>{count2}</div>
    </div>
  );
};

export default App;
```



### (1.4) 封装自己的useForm

#### 不自己封装的时候

```js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    </div>
  );
};

export default App;
```



 #### 使用封装的useForm【这个hook在任何地方都能复用】

- 新建useForm.js

```jsx
import { useState } from 'react';

export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }
  ];
};
```

```jsx
import React, { useState } from 'react';
import { useForm } from './useForm';

const App = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [values, handleChange] = useForm({ email: '', password: '' });

  return (
    <div>
      <input name="email" value={values.email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
```







## 2. useEffect

> 只要当前组件重新渲染了，就会执行useEffect这个钩子；如果给useEffect添加了依赖项，那么只有当依赖项的状态发生了改变，重新渲染的时候才会执行useEffect这个钩子



#### (2.1) useEffect无依赖项时，每次刷新浏览器控制台都会打印render

```jsx
import React, { useState, useEffect } from 'react';
import { useForm } from './useForm';

const App = () => {
  const [values, handleChange] = useForm({ email: '', password: '' });

  useEffect(() => {
    console.log('render');
  });

  return (
    <div>
      <input name="email" value={values.email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
```



### (2.2) useEffect有依赖项时

- 只有在password对应的input框里输入内容的时候，控制台打印render
- 当在email对应的input框里输入内容的时候，控制台不会打印render

```jsx
import React, { useState, useEffect } from 'react';
import { useForm } from './useForm';

const App = () => {
  const [values, handleChange] = useForm({ email: '', password: '' });

  useEffect(() => {
    console.log('render');
  }, [values.password]);

  return (
    <div>
      <input name="email" value={values.email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
```



### (2.3) 模拟componentDidMount

- 依赖项为空数组的时候

```jsx
import React, { useState, useEffect } from 'react';
import { useForm } from './useForm';

const App = () => {
  const [values, handleChange] = useForm({ email: '', password: '' });

  useEffect(() => {
    console.log('render');
  }, []);

  return (
    <div>
      <input name="email" value={values.email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
```



### (2.4) 清除

- 每次依赖项状态发生变化的时候，控制塔先打印出umount，接着才是render

```jsx
import React, { useState, useEffect } from 'react';
import { useForm } from './useForm';

const App = () => {
  const [values, handleChange] = useForm({ email: '', password: '' });

  useEffect(() => {
    console.log('render');
    
    return () => {
      // called when the component is going to unmount
      console.log('unmount');
    }
  }, [values.password]);

  return (
    <div>
      <input name="email" value={values.email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
```





### (2.5) 实用技巧

#### 1. 监听事件

```jsx
import React, { useState, useEffect } from 'react';
import { useForm } from './useForm';

const App = () => {
  const [values, handleChange] = useForm({ email: '', password: '' });

  useEffect(() => {
    const onMouseMove = e => {
      console.log(e);
    };
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div>
      <input name="email" value={values.email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
```



#### 2. 可以有多个useEffect

```jsx
import React, { useState, useEffect } from 'react';
import { useForm } from './useForm';

const App = () => {
  const [values, handleChange] = useForm({ email: '', password: '' });

  useEffect(() => {
    console.log('mount1');
  }, []);
  
  useEffect(() => {
    console.log('mount2');
  }, []);

  return (
    <div>
      <input name="email" value={values.email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
```



### 3. fetch API

- 新建useFetch.js

```jsx
import { useEffect, useState } from 'react';

export const useFetch = url => {
  const [state, setState] = useState({ data: null, loading: true });
  
  useEffect(() => {
    setState(state => ({ data: state.data, loading: true }));
    fetch(url)
    	.then(x => x.text())
      .then(y => {
      	setState({ data: y, loading: false });
    })
  }, [url, setState])
}
```

```jsx
import React, { useState, useEffect } from 'react';
import { useForm } from './useForm';

const App = () => {
  const [values, handleChange] = useForm({ email: '', password: '' });
  
  const [count, setCount] = useState(0);
  const [data, loading] = useFetch(`http://numbersapi.com/${count}/trivia`);

  return (
    <div>
      <div>{ !data ? "loading..." : data }</div>
      <input name="email" value={values.email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
```

**持久化存储：把count值存到localStorage里，每次刷新count值不会变成0**

```js
import React, { useState, useEffect } from 'react';
import { useForm } from './useForm';

const App = () => {
  const [values, handleChange] = useForm({ email: '', password: '' });
  
  const [count, setCount] = useState(() => JSON.parse(localStorage.getItem('count')));
  const [data, loading] = useFetch(`http://numbersapi.com/${count}/trivia`);
  
  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);

  return (
    <div>
      <div>{ !data ? "loading..." : data }</div>
      <input name="email" value={values.email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
```







## 3. useRef

> const isCurrentt = useRef()里存储的东西，通过isCurrent.current获取到

### (3.1) 获取input框的dom

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from './useForm';

const App = () => {
  const [values, handleChange] = useForm({ email: '', password: '' });

  const inputRef = useRef();                     // 新增

  return (
    <div>
      <input
        ref={inputRef}                           // 新增
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <button
        onClick={() => {
          // console.log(inputRef.current); 打印出input dom
          inputRef.current.focus();
        }}
      >
        ++++
      </button>
    </div>
  );
};

export default App;
```



### (3.2) 根据useRef的值判断是否还更新state的值

#### 当点击count增加后，更新count是再两秒后，我们在更新前点击toggle，Hello组件被unmount了，这时候应该不能进行state更新了，我们用isCurrent.current做判断

- Hello.js组件

```jsx
import {useEffect, useState, useRef} from 'react';

export const useFetch = url => {
  const isCurrent = useRef(true);
  const [state, setState] = useState({ data: null, loading: true });
  
  useEffect(() => {
    return () => {
      // called when the component is going to unmount
      isCurrent.current = false;
    }
  }, []);
  
  useEffect(() => {
    setState(state => ({ data: state.data, loading: true }));
    fetch(url)
    	.then(x => x.text())
      .then(y => {
      	setTimeout(() => {
          if (isCurrent.current) {
           	setState({ data: y, loading: false }); 
          }
      	}, 2000)
    })
  }, [url, setState])
  
  return state;
}
```

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from './useForm';
import Hello from './hello';

const App = () => {
  const [values, handleChange] = useForm({ email: '', password: '' });

  const inputRef = useRef();   
  
  const [showHello, setShowHello] = useState(true);

  return (
    <div>
      <button onClick={() => setShowHello(!showHello)}>toggle</button>
      {showHello && <Hello />}
      <input
        ref={inputRef}                      
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <button
        onClick={() => {
          // console.log(inputRef.current); 打印出input dom
          inputRef.current.focus();
        }}
      >
        ++++
      </button>
    </div>
  );
};

export default App;
```





## 4. useLayoutEffect

> The signature is identical to useEffect, but it fires synchronously after all DOM mutations. React team recommend starting with useEffect first and only trying useLayoutEffect if that causes a problem.



### (4.1) 获取dom的维度信息 top, height, width....

```jsx
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useForm } from './useForm';
import Hello from './hello';

const App = () => {
  const [values, handleChange] = useForm({ email: '', password: '' });

  const inputRef = useRef();   
  
  const [showHello, setShowHello] = useState(true);
  
  useLayoutEffect(() => {
    console.log(inputRef.current.getBoundingClientRect());
  }, [])

  return (
    <div>
      <button onClick={() => setShowHello(!showHello)}>toggle</button>
      {showHello && <Hello />}
      <input
        ref={inputRef}                      
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <button
        onClick={() => {
          // console.log(inputRef.current); 打印出input dom
          inputRef.current.focus();
        }}
      >
        ++++
      </button>
    </div>
  );
};

export default App;
```



### (4.2) 封装useMeasure

- 新建useMeasure.js

```jsx
import { useState, useRef, useLayoutEffect } from 'react';

export const useMeasure = (deps) => {
  const [rect, setRect] = useState({});
  const myRef = useRef();
  
  useLayoutEffect(() => {
    setRect(myRef.current.getBoundingClientRectt());   // dom自带的api
  }, deps);
  
  return [rect, myRef];
}
```

```jsx
import React, { useState, useEffect } from 'react';
import { useMeasure } from './useMeasure';

const App = () => {
  const [data, loading] = useFetch(`http://numbersapi.com/${count}/trivia`);
  
  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);
  
  const [rect, divRef] = useMeasure([data]);      // dom和依赖项传给useMeasure里

  return (
    <div>
     	<div style={{ display: 'flex' }}>
      	<div ref={divRef}>{ !data ? "loading..." : data }</div>
      </div>
    </div>
  );
};

export default App;
```





## 5. useCallback

#### 每次渲染Hello组件的时候，都会创建一个函数()=>setCount()

#### every time app is rendered, this function is going to be recreated.

#### 下面代码存在的问题，只要count发生改变了，App.js里重新渲染，子组件也重新渲染，但是increment这个方法其实不需要重新生成

- App.js

```jsx
import React from 'react';
import Hello from './Hello';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Hello increment={() => setCount(count + 1)} />
      <div>count: {count}</div>
    </div>
  );
};

export default App;
```

- Hello.js 【memo作用：监听当传进来的props发生变化时，才会重新渲染该组件；如果没用memo的话，react默认只要父组件重新渲染了，那么也会重新渲染子组件；但我们希望的是子组件根据传递进来的props是否变化了来决定是否重新渲染】

```jsx
import React from 'react';
import { useCountRenders } from './useCountRenders';

export const Hello = React.memo(({ increment }) => {
  useCountRenders();
  
  return <button onClick={increment}>hello</button>
});
```

- useCounterRenders.js

```jsx
import { useRef } from 'react';

export const useCountRenders = () => {
  const renders = useRef(0);
  console.log("renders: ", renders.current++);
}
```



### (5.2) useCallback解决上面的问题

- App.js 【useCallback中，当依赖项count，setCount发生变化时，重新创建() => setCount(count + 1)方法，放入increment里】【现在只有当count，setCount发生变化时才重新创建这个方法】【这时候我们在页面上点击hello按钮，控制台还是一直会打印renders: 次数】
- 进一步改进，我们现在的依赖项有两个count和setCount，我们改成只依赖setCount，现在我们发现当点击hello按钮，控制台只打印了一次renders: 0
- Hello.js组件中调用了`useCountRenders()`，只打印了一次，说明Hello.js组件只渲染了一次 ==> 说明Hello中React.memo监听的props的increment方法只创建了一次！！

```jsx
import React, { useState, useCallback } from 'react';
import Hello from './Hello';

const App = () => {
  const [count, setCount] = useState(0);
  
  //const increment = useCallback(() => {
  //  setCount(count + 1);
  //}, [count, setCount]);
  
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, [setCount]);

  return (
    <div>
      <Hello increment={increment} />
      <div>count: {count}</div>
    </div>
  );
};

export default App;
```



**每次点击button增加5**

- App.js

```jsx
import React, { useState, useCallback } from 'react';
import Hello from './Hello';

const App = () => {
  const [count, setCount] = useState(0);
  
  const increment = useCallback(n => {
    setCount(c => c + n);
  }, [setCount]);

  return (
    <div>
      <Hello increment={increment} />
      <div>count: {count}</div>
    </div>
  );
};

export default App;
```

- Hello.js

```jsx
import React from 'react';
import { useCountRenders } from './useCountRenders';

export const Hello = React.memo(({ increment }) => {
  useCountRenders();
  
  return <button onClick={() => increment(5)}>hello</button>
});
```





### (5.3) 类似的例子

#### 初始版本

- Square.js

```jsx
import React from 'react';
import { useCountRenders } from './useCountRenders';

export const Hello = React.memo(({ n, onClick }) => {
  useCountRenders();
  
  return <button onClick={onClick}>{n}</button>
});
```

- App.js

```jsx
import React, { useState, useCallback } from 'react';
import { Square } from './Square';

const App = () => {
  const [count, setCount] = useState(0);
  const favoriteNums = [7, 21, 37];
  
  const increment = useCallback(n => {
    setCount(c => c + n);
  }, [setCount]);

  return (
    <div>
      <div>count: {count}</div>
      <div>
      {
        favoriteNums.map(n => {
          return <Square onClick={() => increment(n)} n={n} key={n} />;
        })
      }
      </div>
    </div>
  );
};

export default App;
```

- useCountRenders.js 【用来监控子组件是否重新渲染了】

```jsx
import { useRef } from 'react';

export const useCountRenders = () => {
  const renders = useRef(0);
  console.log("renders: ", renders.current++);
}
```



**上面实现了页面7，21，37三个button，点击哪个就按照那个的值增加，每次点击控制台都打印了renders: 次数(1, 2, 3, ....)，说明子组件React.memo监听到props里的onClick每次都是新创建的**

#### 改进：

- App.js

```jsx
import React, { useState, useCallback } from 'react';
import { Square } from './Square';

const App = () => {
  const [count, setCount] = useState(0);
  const favoriteNums = [7, 21, 37];
  
  const increment = useCallback(n => {
    setCount(c => c + n);
  }, [setCount]);

  return (
    <div>
      <div>count: {count}</div>
      <div>
      {
        favoriteNums.map(n => {
          return <Square increment={increment} /*onClick={() => increment(n)}*/ n={n} key={n} />;
        })
      }
      </div>
    </div>
  );
};

export default App;
```

- Square.js

```jsx
import React from 'react';
import { useCountRenders } from './useCountRenders';

export const Hello = React.memo(({ n, increment }) => {
  useCountRenders();
  
  return <button onClick={() => increment(n)}>{n}</button>
});
```





## 6. useMemo

### 1. 如果是函数的话使用useCallback+useMemo

### 2. 如果只是属性的话，直接useMemo

#### 控制台只打印了一次computing longest word

```jsx
import React, {useMemo, useState, useCallback} from 'react';
import {useFetch} from './useFetch';

const App = () => {
  const [count, setCount] = useState(0);
  const { data } = useFetch("https://raw.githubusercontent.com/xxxx.json");
  
  const computedLongestWord = useCallback((arr) => {
    if(!arrr) {
      return [];
    }
    
    console.log("computing longest word");
    
    let longestWord = "";
    
    // 因为我们自己写的useFetch里是返回data.text()不是data.json()
    JSON.parse(arr).forEach(sentence => {
      sentence.split(" ").forEach(word => {
        if(word.length > longestWord.length) {
          longestWord = word;
        }
      })
    })
   	return longestWord;
  }, []);
  
  const longestWord = useMemo(() => computeLongestWord(data), [computeLongestWord, data])
  
  return (
  	<div>
    	<div>count: {count}</div>
      <button onClick={() => setCount(count + 1)}>increment</button>
      <div>{longestWord}</div>
    </div>
  );
};
```







## 7. useReducer

### (7.1) 简单例子

- `useReducer`：第一个参数是reducer函数，第二个参数是initialState

```jsx
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch(action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default: 
      return state;
  }
}

const App = () => {
  const [count, dispatch] = useReducer(reducer, 0);   
  
  return (
  	<div>
    	<div>count: {count}</div>
      <button onClick={() => dispatch({ type: "increment" })}>increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>decrement</button>
    </div>
  )
}

export default App;
```



### (7.2) todo list

```jsx
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch(action.type) {
    case "add-todo":
      return {
        todos: [...state.todos, {text: action.payload.text, completed: false}]
      };
    default: 
      return state;
  }
}

const App = () => {
  const [{ todos }, dispatch] = useReducer(reducer, { todos: [] });   
  const [text, setText] = useState();
  
  return (
  	<div>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch({ type: 'add-todo', payload: text })
          setText("");
        }}
        >
      	<input value={text} onChange={e => setText(e.target.value)} />
      </form>
      {todos.map(t => (
      	<div key={t.text}>{t.text}</div>
      ))}
    </div>
  )
}

export default App;
```



#### 加toggle功能

```jsx
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch(action.type) {
    case "add-todo":
      return {
        todos: [...state.todos, {text: action.payload.text, completed: false}]
      };
    case "toggle-todo":
      return {
        todos: state.todos.map((todo, idx) => 
          idx === action.idx ? {...todo, completed: !todo.completed} : todo                      
        )
      }
    default: 
      return state;
  }
}

const App = () => {
  // state, action = useReducer(reducer, initialState)
  const [{ todos }, dispatch] = useReducer(reducer, { todos: [] });   
  const [text, setText] = useState();
  
  return (
  	<div>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch({ type: 'add-todo', payload: text })
          setText("");
        }}
        >
      	<input value={text} onChange={e => setText(e.target.value)} />
      </form>
      {todos.map((t, idx) => (
      	<div key={t.text} onClick={() => dispatch({type: 'toggle-todo', idx})}
          style={{ textDecoration: t.completted ? "line-through" : "" }}  
        >{t.text}</div>
      ))}
    </div>
  )
}

export default App;
```







## 8. useContext

- App.js

```jsx
import React, { useState, useMemo } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Index} from './pages';
import {About} from './pages/about';
import {UserContext} from './UserContext';

const AppRouter = () => {
  const [value, setValue] = useState("hello from context");
  
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);
  
  return (
  	<Router>
    	<div>
      	<nav>
        	<ul>
          	<li>
            	<Link to="/">Home</Link>
            </li>
            <li>
            	<Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <UserContext.Provider value={providerValue}>
        	<Route path="/" exact component={Index} />
          <Route path="/about" exact component={About} />
        </UserContext.Provider>
      </div>
    </Router>
  )
}
```

- UserContext.js

```jsx
import { createContext } from 'react';

export const UserContext = createContext(null);
```

- Index.js

```jsx
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export const Index = () => {
  const { value, setValue } = useContext(UserContext);
  
  return (
  	<div>
    	<h2>Index Page</h2>
      <div>{value}</div>
      <button onClick={() => setValue("hey")}>change value</button>
    </div>
  )
}
```

- About.js

```jsx
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export const Index = () => {
  const { value, setValue } = useContext(UserContext);
  
  return (
  	<div>
    	<h2>About Page</h2>
      <div>{value}</div>
      <button onClick={() => setValue("hey")}>change value</button>
    </div>
  )
}
```





### (8.2) 模拟login、logout

#### 效果：默认初始时没有login，index，about页面都显示null，然后在index里login，显示了user信息，然后到about页面看，也显示了user信息

- App.js

```jsx
import React, { useState, useMemo } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Index} from './pages';
import {About} from './pages/about';
import {UserContext} from './UserContext';

const AppRouter = () => {
  const [user, setUser] = useState(null);
  
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  
  return (
  	<Router>
    	<div>
      	<nav>
        	<ul>
          	<li>
            	<Link to="/">Home</Link>
            </li>
            <li>
            	<Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <UserContext.Provider value={value}>
        	<Route path="/" exact component={Index} />
          <Route path="/about" exact component={About} />
        </UserContext.Provider>
      </div>
    </Router>
  )
}
```

- 模拟的用户数据 /utils/login.js

```jsx
export const login = async() => {
  return {
    id: 4,
    username: "bob",
    email: "bob@bob.com"
  };
};
```

- Index.js

```jsx
import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { login } from '../utils/login';

export const Index = () => {
  const { user, setUser } = useContext(UserContext);
  
  return (
  	<div>
    	<h2>Home Page</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {user ? (
      	<button onClick={() => {
            // call logout
            setUser(null);
          }}>logout</button>
      ) : (
      	<button onClick={async () => {
            const user = await login();
            setUser(user);
          }}>login</button>
      )}
    </div>
  )
}
```

- About.js

```jsx
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export const Index = () => {
  const { user } = useContext(UserContext);
  
  return (
  	<div>
    	<h2>About Page</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
```