//首页性能优化及路由跳转

1.首页的每个组件基本都调用了connect方法和store做了连接，这就产生了一个问题
当store里的数据改变了，与之相连接的组件都会重新渲染，也就是每个组件的render函数
都会重新执行，那么可能有个数据改变了，但是那个数据和我们这个小组件一点关系也没有
但是这个小组件会被重新渲染，所以性能不高。如何提高我们的组件性能呢？

之前说过一个shouldComponentUpdate这个生命周期函数，我们可以在这里做一些性能优化的代码
判断只有跟我这个小组件相关的数据发生改变时，才让我这个组件的render函数执行，否则就return
false，不让这个render重新执行，通过这种方式实现减少虚拟Dom的比对。React官方也考虑到了这
个问题，如果在每个组件里你都自己去写shouldComponentUpdate这个生命周期函数，太麻烦了。
所以React里内置了一个新的组件类型，PureComponent，这叫纯组件。它和Component的区别是
PureComponent在底层上自己实现了一个shouldComponentUpdate,这样就不需要我们自己手写
shouldComponentUpdate做性能优化了，所以在这里我们把我们所有组件的Component改成PureCompoent,就可以很好的提升我们组件的性能了。

===========================================================================

2.在react中路由跳转的时候，使用react-router-dom的第三方模块，这样的跳转是单页面跳转
什么是单页跳转？就是不管你跳转几个网页，整个网站只加载了一次html文件。
(1)在home/components/List.js中：
当点击ListItem区域时，跳转到detail页面
import { Link } from 'react-router-dom';

<Link key={index} to="/detail">
  <ListItem>
    <img className="pic" src={item.get('imgUrl')} alt="" />
    <ListInfo>
      <h3 className="title">{item.get('title')}</h3>
      <p className="desc">{item.get('desc')}</p>
    </ListInfo>
  </ListItem>
</Link> 


(2)header/index.js中：
点击简书图标 跳回首页
import { Link } from 'react-router-dom';

<Link to="/">
  <Logo />
</Link>
但是会被错，说要在Router里使用Link

去App.js中看,<Header>组件在Router外面，我们改下，放在里面即可。
<Provider store={store}>
	<BrowserRouter>
		<Header />
	  <Route path="/" exact component={Home} />
	  <Route path="/detail" exact component={Detail} />
	</BrowserRouter>
</Provider>
