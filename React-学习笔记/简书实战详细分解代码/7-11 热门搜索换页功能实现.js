//热门搜索换页功能实现
1.在header/store/reducer.js中:
//添加了page, totalPage
const defaultState = fromJS({
  focused: false,
  mouseIn: false,
  list: [],
  page: 1,
  totalPage: 1
});

=========================================================

2.在发送ajax请求，拿到数据后，我们在这个里面添加一个算页面个数的变量
actionCreator.js中：
//添加了totalPage -> 我们是打算每次显示10个，所以这边算多少页用/10
const changeList = data => ({
  type: constants.CHANGE_LIST,
  data: fromJS(data),
  totalPage: Math.ceil(data.length / 10)
});

对应的在reducer.js中，我们要把获取到的totalPage更新到store里：
    case constants.CHANGE_LIST:
      return state.set('list', action.data).set('totalPage', action.totalPage);

==========================================================

3.然后在header/index.js中：
我们先把store里的page取出来放到props里
const mapStateToProps = state => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),   -> 这里！
    mouseIn: state.getIn(['header', 'mouseIn'])
  };
};

然后index.js getListArea()里：
//把数据转化成普通的数组,因为我们想直接通过使用数组索引获取数据newList[i]
const newList = list.toJS();
const pageList = [];

for (let i = (page - 1) * 10; i < page * 10; i++) {
  pageList.push(
    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
  );
}


<SearchInfoList>{pageList}</SearchInfoList>

===============================================================

4.接着我们希望当我们点击那个搜索栏弹出来的页面时，它不会自动消失，当点击弹出页面外区域它才消失
//我们需要用到onMouseEnter和onMouseLeave
在reducer.js中：
const defaultState = fromJS({
  focused: false,
  mouseIn: false,   -----> 添加这个变量
  list: [],
  page: 1,
  totalPage: 1
});

在index.js中绑定事件：
//如果focuse或者mouseIn弹框页面都显示
if (focused || mouseIn) {
  return (
    <SearchInfo
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

接着就是绑定事件里派发action:
handleMouseEnter() {
  dispatch(actionCreators.mouseEnter());
},

handleMouseLeave() {
  dispatch(actionCreators.mouseLeave());
}


在actionCreators.js中：
export const mouseEnter = () => ({
  type: constants.MOUSE_ENTER
});

export const mouseLeave = () => ({
  type: constants.MOUSE_LEAVE
});


在constants.js中：
export const MOUSE_ENTER = 'header/MOUSE_ENTER';
export const MOUSE_LEAVE = 'header/MOUSE_LEAVE';


在reducer.hs中处理：
case constants.MOUSE_ENTER:
  return state.set('mouseIn', true);
case constants.MOUSE_LEAVE:
  return state.set('mouseIn', false);


在header/index.js中取出store里的mouseIn值
const mapStateToProps = state => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    mouseIn: state.getIn(['header', 'mouseIn'])   -----> 这里
  };
};


放到这里：
if (focused || mouseIn) {   -----> 这里 【当foucsed或者mouseIn都显示弹出的页面框】
  return (
    <SearchInfo
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

==================================================================

5.接着来实现换一换功能
(1)给换一换添加一个onClick事件
<SearchInfoSwitch onClick={handleChangePage}>
  换一批
</SearchInfoSwitch>

handleChangePage(page, totalPage) {
  dispatch(actionCreators.changePage());
}

(2)在actionCreators中：
export const changePage = () => ({
  type: constants.CHANGE_PAGE,
});

在constants中：
export const CHANGE_PAGE = 'header/CHANGE_PAGE';

在reducer.js中：    
case constants.CHANGE_PAGE:
  return state.set('page', action.page);

我们在reducer.js中应该要更新page成page+1，这个如何实现呢？

（4）A:在index.js中，我们在dispatch时候（changePage），需要知道当前页码和总页码
我们发现还没把totalPage从store中拿出来，所以，我们先把totalPage拿出来.
totalPage: state.getIn(['header', 'totalPage']),

(B):然后修改上面:把当前page和totalPage传给绑定事件函数里
<SearchInfoSwitch onClick={() => handleChangePage(page, totalPage)}>
  换一批
</SearchInfoSwitch>

(C):然后绑定事件里做个判断：
//如果当前页面小于总页面数，则page+1,若已经是最后一页，那么接着换成第一页
handleChangePage(page, totalPage) {
  if (page < totalPage) {
    dispatch(actionCreators.changePage(page + 1));
  } else {
    dispatch(actionCreators.changePage(1));
  }
}

(D):在actionCreators中：就接收到了即将替换成的page，一起传给reducer做更新处理
export const changePage = page => ({
  type: constants.CHANGE_PAGE,
  page
});

(E):在reducer中：更新page
case constants.CHANGE_PAGE:
  return state.set('page', action.page);

===================================================================

6.接着我们发现控制台会报一个警告，说child key
for (let i = (page - 1) * 10; i < page * 10; i++) {
  console.log(newList[i]);  -----> 打印看看
  pageList.push(
    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
  );
}

//发现会控制台出现10个undefine，这是为什么呢？
是因为一开始list为空(还没有发ajax请求获取到数据)，page=1，会执行这段代码
我们是希望执行完ajax请求后，我们获取到了代码，再执行这个就没问题，所以更改下，添加个判断：
if (newList.length) {
  for (let i = (page - 1) * 10; i < page * 10; i++) {
    console.log(newList[i]);
    pageList.push(
      <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
    );
  }
}

===================================================================

7.代码优化：
//在reducer中：
原本代码：
case constants.CHANGE_LIST:
  return state.set('list', action.data).set('totalPage', action.totalPage);

另种简洁写法：
case constants.CHANGE_LIST:
  return state.merge({
    list: action.data,
    totalPage: action.totalPage
  });