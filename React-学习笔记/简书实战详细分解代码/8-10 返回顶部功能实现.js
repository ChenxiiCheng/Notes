//返回顶部功能实现
1.条件按钮
iconfont操作走一遍：
<BackTop>
  <i className="iconfont">&#xe62b;</i>
</BackTop>

接着写样式：
export const BackTop = styled.div`
  position: fixed;
  right: 100px;
  bottom: 100px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  border: 1px solid #ccc;
  cursor: pointer;
  .iconfont {
    font-size: 30px;
  }
`;


2.绑定事件：
<BackTop>
  <i className="iconfont" onClick={this.handleScrollTop}>
    &#xe62b;
  </i>
</BackTop>

render()上面写：
//点击了按钮，返回顶部
handleScrollTop() {
  window.scrollTo(0, 0); 
}

============================================================

3.当页面离顶部一段距离后才出现这个图标，如何做呢？
需要一个变量来控制这个图标的现实与否
(1)在reducer.js中：
const defaultState = fromJS({
  topicList: [],
  articleList: [],
  recommendList: [],
  articlePage: 1,
  showScroll: false   -------> 新增！
});


(2)index.js中获取数据：
const mapState = state => ({
  showScroll: state.getIn(['home', 'showScroll'])
});


(3)更改JSX:
{this.props.showScroll ? (
  <BackTop>
    <i className="iconfont" onClick={this.handleScrollTop}>
      &#xe62b;
    </i>
  </BackTop>
) : null}


(4)
componentDidMount() {
  this.props.changeHomeData();
  this.bindEvents();   ---->  从render()完成后就会调用这个函数，用来监听离顶部距离
}

bindEvents() {
  window.addEventListener('scroll', this.props.changeScrollTopShow);
}


(5)当距离顶部>200时，调用dispatch，修改showScroll为true，显示图标
const mapDispatch = dispatch => ({
  changeHomeData() {
    const action = actionCreators.getHomeInfo();
    dispatch(action);
  },

  changeScrollTopShow() {   -------> 新增!
    if (document.documentElement.scrollTop > 200) {
      dispatch(actionCreators.toggleTopShow(true));
    } else {
      dispatch(actionCreators.toggleTopShow(false));
    }
  }
});


(6)在actionCreators.js中：
export const toggleTopShow = show => ({
  type: constants.TOGGLE_SCROLL_TOP,
  show
});


(7)在constants.js中：
export const TOGGLE_SCROLL_TOP = 'home/TOGGLE_SCROLL_TOP';


(8)在reducer.js中：
case constants.TOGGLE_SCROLL_TOP:
  return state.set('showScroll', action.show);


(9)然后我们需要加一个钩子函数，就是当组件将要销毁时，需要解绑那个监听事件
componentWillUnmount() {
  window.removeEventListener('scroll', this.props.changeScrollTopShow);
}












