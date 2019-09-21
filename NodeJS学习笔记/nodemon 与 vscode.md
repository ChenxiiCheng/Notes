## nodemon 与 vscode

#### 1. nodemon的安装与使用

1. 安装  `npm install nodemon -g`  这里是全局安装
2. 使用：`nodemon app.js`   修改代码后保存，会自动帮我们重启



#### 2. 如何把vscode的调试和nodemon的自动重启结合起来

1. 给vscode配置调试启动方式

   ```js
   {
     "type": "node",
     "request": "launch",
     "name": "当前文件",
     "program": "${file}"
   }
   
   点击add Configuration
   nodemon那项即可
   ```

   

