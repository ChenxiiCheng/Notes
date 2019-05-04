//代码优化

1.我们打开控制台里的network，当我们点击一次换一批，它会发一次ajax请求，再点击一次，又发送一次ajax请求。实际我们只需要获取一次就行了。

解决方法：
我们在handleInputFocus()函数里发请求前先根据list中是否有数据来判断要不要发送请求
<NavSearch
  className={focused ? 'focused' : ''}
  //原本：onFocus={handleInputFocus()}
  onFocus={() => handleInputFocus(list)}
  onBlur={handleInputBlur}
/>

然后handleInputFocus(list)函数接收了list，然后做判断：
handleInputFocus(list) {
  console.log(list);
  if (list.size === 0) { //若没数据，则发送ajax请求
    dispatch(actionCreators.getList());
  }
  dispatch(actionCreators.searchFocus());
},

========================================================================

2.当我们鼠标放到 "换一批"和"选装图标"上时，希望出现手型的鼠标图标

在style.js中：
export const SearchInfoSwitch = styled.span
中加入：
cursor: pointer;