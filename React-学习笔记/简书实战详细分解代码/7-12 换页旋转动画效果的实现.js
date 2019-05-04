//换页旋转动画效果的实现

1.(1)先在iconfont网站上找一个旋转的图标加入到项目中，重新下载到本地
然后将.eot/.svg/.ttf/.woff/.iconfont.css/.woff2文件到项目所在目录
static/iconfont下。
在iconfont.css文件中，src:url('./') 加上./前缀
(2)在header/index.js中，在换一换前面加上这个图标
<SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
  <iclassName="iconfont">&#xe851;</i>
  换一批
</SearchInfoSwitch>

(3)返现旋转图标位置有点问题
修改：<i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>
加个了zoom，export const SearchWrapper = styled.div`中, .iconfont改成.zoom

//给旋转图标加个spin className
<i className="iconfont spin">
&#xe851;
</i>

export const SearchInfoSwitch = styled.span`
  float: right;
  font-size: 13px;
  .spin {
    display: block;
    float: left
    font-size: 12px;
    margin-right: 2px;
    transition: all 0.4s ease-in;
    transform-origin: center center;
  }
`;


2.如何修改旋转图标的角度呢？
(1)通过ref获取到结点元素
<i ref={icon => (this.spinIcon = icon)} className="iconfont spin">
&#xe851;
</i>

(2)点击事件时，传个参数过去，其实就是dom结点
<SearchInfoSwitch
  onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
>

handleChangePage(page, totalPage, spin)里就能使用这个传过来当的dom参数了

(3)添加逻辑处理
handleChangePage(page, totalPage, spin) {
  //通过正则匹配找到当前的角度值
  let originAngle = spin.style.transform.replace(/[^0-9]/gi, '');

  if (originAngle) {
    originAngle = parseInt(originAngle, 10);
  } else {
    originAngle = 0;
  }
  spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
  if (page < totalPage) {
    dispatch(actionCreators.changePage(page + 1));
  } else {
    dispatch(actionCreators.changePage(1));
  }
}









