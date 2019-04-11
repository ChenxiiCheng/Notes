# Button

1. 如何显示成按钮

   ```html
   <!-- STANDARD BUTTON -->
   <button class="btn">Read More</button>
   <a class="btn">Read More</a>
   ```



2. 点击按钮时出现波浪动态效果

   ```html
   <!-- WAVES EFFECT -->
   <button class="btn waves-effect waves-light">Read More</button>
   <a class="btn waves-effect waves-light">Read More</a>
   
   <!-- WAVE COLORS --> 
   <button class="btn white red-text waves-effect waves-red">
     Read More   #按钮背景是白色，里面文本红色，当点击按钮时出现红色波浪
   </button>
   <button class="btn white teal-text waves-effect waves-teal">
     Read More
   </button>
   <button class="btn white green-text waves-effect waves-green">
     Read More
   </button>
   <button class="btn white grey-text waves-effect waves-yellow">
     Read More
   </button>
   <button class="btn white purple-text waves-effect waves-purple">
     Read More
   </button>
   ```

   显示：

   ![image-20190410114002327](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410114002327.png)



3. 图标icon

   ```html
   <!-- MATERIAL ICONS (https://material.io/icons) -->
   <i class="material-icons">shopping_cart</i>
   <i class="material-icons red-text">settings</i>
   <i class="material-icons blue-text">search</i>
   <i class="material-icons">stars</i>
   ```

   显示：

   ![image-20190410114443489](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410114443489.png)

   ```html
   <!-- ICON SIZES -->
   <i class="material-icons large">done</i>
   <i class="material-icons medium">done</i>
   <i class="material-icons small">done</i>
   <i class="material-icons tiny">done</i>
   ```

   显示：

   ![image-20190410114528072](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410114528072.png)

   ```html
   <!-- BUTTON WITH MATERIAL ICON -->
   <!--Import Google Icon Font-->
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
   
   <a class="btn waves-effect waves-light" href="#!">
     <i class="material-icons left">shopping_cart</i>
     Buy Now
   </a>
   <a class="btn waves-effect waves-light" href="#!">
     <i class="material-icons right">shopping_cart</i>
     Buy Now
   </a>
   
   <!-- BUTTON WITH FONT AWESOME ICON -->
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
   crossorigin="anonymous"/>
   
   <a class="btn waves-effect waves-light" href="#!">
     <i class="fa fa-shopping-cart left"></i>
     Buy Now
   </a>
   ```

   显示：

   ![image-20190410114818690](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410114818690.png)



4. Color buttons / Large button / Disabled button

   ```html
   <!-- COLORED BUTTONS -->
   <button class="btn red">Read More</button>
   <button class="btn purple">Read More</button>
   <button class="btn orange">Read More</button>
   <button class="btn teal">Read More</button>
   <button class="btn black">Read More</button>
   <button class="btn amber">Read More</button>
   
   <!-- LARGE BUTTON -->
   <button class="btn-large">Large Button</button>
   <!-- DISABLED BUTTON -->
   <button class="btn-large disabled">Disabled Button</button>
   ```

   显示：

   ![image-20190410115124610](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410115124610.png)

