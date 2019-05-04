//页面路由参数的传递

1.我们希望当点击第一条数据，进入详情页的时候，把这条数据的id带给详情页，怎么做呢？
两种方式，第一种动态路由：
home/List.js中：
<Link key={index} to={'/detail/' + item.get('id')}>

然后在浏览器点击，详情页没显示，这是为什么呢？
打开App.js文件，修改：
<Route path="/detail/:id" exact component={Detail} />
然后浏览器里就显示出了详情页面

=====================================================================

2.这个详情页面的id如何在发送异步请求的时候告诉后端呢？（需要的是哪个id页面）
(1)在detail/index.js中：
render()里console.log(this.props)看下，props里有个match，match里有个params
里有个id，所以通过this.props.match.params.id就可以拿到上一个页面传过来的id

然后改写：
componentDidMount() {
  this.props.getDetail(this.props.match.params.id);
}

const mapDispatch = dispatch => ({
  getDetail(id) {
    dispatch(actionCreators.getDetail(id));  ->把id传过去
  } 
});


在actionCreators.js中，在ajax请求时将这个id传给后端，这样后端就能获取到id了：
export const getDetail = id => {
  return dispatch => {
    axios.get('/api/detail.json?id=' + id).then(res => {
      const result = res.data.data;
      console.log(result);
      dispatch(changeDetail(result.title, result.content));
    });
  };
};


==================================================================

3.第二种方式：
home/List.js中：
<Link key={index} to={'/detail?id=' + item.get('id')}>
然后在浏览器点击，详情页没显示，这是为什么呢？
打开App.js文件，修改：
<Route path="/detail" exact component={Detail} />
然后浏览器里就显示出了详情页面

(1)在detail/index.js中：
render()里console.log(this.props)看下，props里有个location，里有个search
里有个id，eg:search: '?id=2'，所以我们需要手动解析出这个id，把2取出来,这种方法比较麻烦


所以还是用动态路由最简单！！！！









