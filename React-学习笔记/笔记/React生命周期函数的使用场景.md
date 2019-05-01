# React生命周期函数的使用场景

1. 当需要些ajax时，我们添加第三方库，yarn add axios

   ```javascript
   componentDidMount() {
     axios.get('/api/todolist')
     .then(() => { alert('succ') })
     .catch(() => { alert('error') })
   }
   ```

   

