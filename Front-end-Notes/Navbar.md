# Navbar

1. Standard menu

   ```html
   <!-- STANDARD MENU -->
   <nav>
     <div class="nav-wrapper">
       <div class="container">
         <a class="brand-logo" href="#">Logo</a>
         <ul id="nav-mobile" class="right hide-on-small-and-down">
           <li>                 #当页面小于Small时，navbar里右边的东西隐藏
             <a href="#">Home</a>
           </li>
           <li>
             <a href="#">About</a>
           </li>
           <li>
             <a href="#">Contact</a>
           </li>
         </ul>
       </div>
     </div>
   </nav>
   ```

   显示：

   ![image-20190410144859740](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410144859740.png)

   ![image-20190410144926492](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410144926492.png)



2. Responsive with side menu

   ```html
   <!-- RESPONSIVE WITH SIDE MENU -->
   <nav class="blue darken-4"> 
     <div class="container">
       <div class="nav-wrapper">
         <a href="#" class="brand-logo">Logo</a>
         <a class="button-collapse" data-activates="mobile-nav" href="#">
           #响应式的导航栏 -> 后面写成的是侧边栏
           <i class="material-icons">menu</i>
         </a>
         <ul class="right hide-on-medium-and-down">
           <li>
             <a href="#">Home</a>
           </li>
           <li class="active">
             <a href="#">About</a>
           </li>
           <li>
             <a href="#">Contact</a>
           </li>
   
           <!-- DROPDOWN TRIGGER -->
           <li>
             <a class="dropdown-button" data-activates="my-dropdown" href="#!"
                >Dropdown
               <i class="material-icons right">
                 arrow_drop_down
               </i>
             </a>
           </li>
           <!-- BUTTON LINK -->
           <li>
             <a class="btn waves-effect waves-light">Login</a>
           </li>
           <!-- ICON LINK -->
           <li>
             <a href="#">
               <i class="material-icons">person</i>
             </a>
           </li>
         </ul>
         #侧边栏
         <ul class="side-nav" id="mobile-nav">
           <li>
             <a href="#">Home</a>
           </li>
           <li>
             <a href="#">About</a>
           </li>
           <li>
             <a href="#">Contact</a>
           </li>
         </ul>
       </div>
     </div>
   </nav>
   
   <!-- DROPDOWN MENU -->
   <ul id="my-dropdown" class="dropdown-content">
     <li>
       <a href="#">Link 1</a>
     </li>
     <li>
       <a href="#">Link 2</a>
     </li>
     <li>
       <a href="#">Link 3</a>
     </li>
   </ul>
   ```

   显示：

   ![image-20190410145319135](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410145319135.png)

   ![image-20190410145339403](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410145339403.png)



3. 固定导航栏

4. ```html
   <!-- FIXED NAVBAR -->
   <div class="navbar-fixed">
     <nav class="black">
       <div class="nav-wrapper">
         <div class="container">
           <a class="brand-logo" href="#">Logo</a>
           <ul id="nav-mobile" class="right hide-on-small-and-down">
             <li>
               <a href="#">Home</a>
             </li>
             <li>
               <a href="#">About</a>
             </li>
             <li>
               <a href="#">Contact</a>
             </li>
           </ul>
         </div>
       </div>
     </nav>
   </div>
   ```

   显示：

   ![image-20190410145508838](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410145508838.png)



4. 搜索栏

   ```html
   <!-- SEARCH BAR -->
   <nav class="green">
     <div class="nav-wrapper">
       <form>
         <div class="input-field">
           <input type="search" id="search" required />
           <label for="search" class="label-icon">
             <i class="material-icons">search</i>
           </label>
           <i class="material-icons">close</i>
         </div>
       </form>
     </div>
   </nav>
   ```

   显示：

   ![image-20190410145630261](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410145630261.png)

