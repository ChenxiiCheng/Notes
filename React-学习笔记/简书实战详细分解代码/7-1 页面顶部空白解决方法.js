//页面顶部空白
发现页面顶部有一定的空白，通过查看发现是body:有margi:8px
解决方案：我在根目录style.css，我没有把它写成style.js，使用styled-components，
我直接在style.css中：
body {
  margin: 0;
}
视频里是把根目录的style.css改成style.js，然后网上搜reset.css，把内容放进这个style.js中
同时在style.js中使用了styled-components,注意这个第三方库改了写法