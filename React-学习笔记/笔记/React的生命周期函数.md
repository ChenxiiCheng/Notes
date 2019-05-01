# React的生命周期函数

**1. 生命周期函数指在某一个时刻组件会自动调用执行的函数**

​    (1) 初始化过程 constructor

​    (2) 组件渲染挂载： 

```
1. 当组件即将被挂载到页面的时刻自动执行componentWillMount
2. shouldComponentUpdate: 组件被更新之前，它会自动被执行
3. componentWillUpdate: 组件被更新之前，它会自动执行，但是他在shouldComponentUpdate之后被执行，如果shouldComponentUpdate返回true它才执行，如果返回false，这个函数就不会被执行了
4.componentWillReceiveProps: 一个组件要从父组件接收参数，如果这个组件第一次存在于父组件中，不会执行，如果这个组件之前已经存在于父组件中，才会执行
5. conponentWillUnmount: 当这个组件即将被从页面中剔除的时候，会被执行
```



![image-20190419161551091](/Users/chenxi/Library/Application Support/typora-user-images/image-20190419161551091.png)

