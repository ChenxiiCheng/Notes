# Floating Fixed Action Buttons

1. 悬浮圆形按钮 / 震动按钮

   ```html
   <!-- FLOATING BUTTONS -->
   <button class="btn-floating btn-large waves-effect waves-light red">
     <i class="material-icons">add</i> #悬浮大按钮，当点击按钮时，出现红色波浪
   </button>
   <button class="btn-floating btn-large waves-effect waves-light blue">
     <i class="material-icons">edit</i>
   </button>
   
   <!-- PULSE EFFECT -->
   <button class="btn-floating btn-large waves-effect waves-light green pulse">
     <i class="material-icons">publish</i> #悬浮大按钮一直震动，当点击时，出现绿色波浪
   </button>
   ```

   显示：

   ![image-20190410121514930](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410121514930.png)

2. Fab Toolbar

   ```html
   <!-- FAB TOOLBAR -->
   <div class="fixed-action-btn toolbar">
     <a class="btn-floating btn-large red">
       <i class="material-icons">mode_edit</i>
     </a>
     <ul>
       <li class="waves-effect waves-light">
         <a href="#!">
           <i class="material-icons">insert_chart</i>
         </a>
       </li>
       <li class="waves-effect waves-light">
         <a href="#!">
           <i class="material-icons">format_quote</i>
         </a>
       </li>
       <li class="waves-effect waves-light">
         <a href="#!">
           <i class="material-icons">publish</i>
         </a>
       </li>
       <li class="waves-effect waves-light">
         <a href="#!">
           <i class="material-icons">attach_file</i>
         </a>
       </li>
     </ul>
   </div>
   ```

   显示：

   初始状态：在页面右下角![image-20190410121646511](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410121646511.png)

   当点击按钮后：页面下方

   ![image-20190410121720145](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410121720145.png)





3. Fix Action Button

   ```html
   <!-- FIXED ACTION BUTTON [horizontal, click-to-toggle] -->
   #若<div class="fixed-action-btn horizontal"> 则出现的子列是横向显示
   <div class="fixed-action-btn">
     <a class="btn-floating btn-large red">
       <i class="material-icons">mode_edit</i>
     </a>
     <ul>
       <li>
         <a class="btn-floating red">
           <i class="material-icons">insert_chart</i>
         </a>
       </li>
       <li>
         <a class="btn-floating blue">
           <i class="material-icons">format_quote</i>
         </a>
       </li>
       <li>
         <a class="btn-floating yellow">
           <i class="material-icons">publish</i>
         </a>
       </li>
       <li>
         <a class="btn-floating green">
           <i class="material-icons">attach_file</i>
         </a>
       </li>
     </ul>
   </div>
   ```

   显示：

   初始状态: ![image-20190410121646511](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410121646511.png)

   鼠标放在按钮上后：

   ![image-20190410122037262](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410122037262.png)

