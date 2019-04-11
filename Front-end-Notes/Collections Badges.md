# Collections Badges

1. Collection

   ```html
   <!-- COLLECTION -->
   <ul class="collection">
     <li class="collection-item">First Item</li>
     <li class="collection-item">Second Item</li>
     <li class="collection-item">Third Item</li>
     <li class="collection-item">Fourth Item</li>
   </ul>
   
   <!-- COLLECTION AS LINKS -->
   <div class="collection">
     <a href="#" class="collection-item">First Item</a>
     <a href="#" class="collection-item">Second Item</a>
     <a href="#" class="collection-item">Third Item</a>
     <a href="#" class="collection-item">Fourth Item</a>
     <!-- BADGES -->
     <a href="#!" class="collection-item">
       <span class="badge">44</span>Fifth Item</a
       >
     <a href="#!" class="collection-item">
       <span class="badge new">3</span>Sixth Item</a
       >
   </div>
   ```

   显示：

   ![image-20190410151427993](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410151427993.png)

   ![image-20190410151455435](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410151455435.png)

   

2. With Header / Secondary Content

   ```html
   <!-- WITH HEADER -->
   <ul class="collection with-header">
     <li class="collection-header">
       <h4>Items</h4>
     </li>
     <li class="collection-item">First Item</li>
     <li class="collection-item">Second Item</li>
     <li class="collection-item">Third Item</li>
     <li class="collection-item">Fourth Item</li>
   </ul>
   
   <!-- SECONDARY CONTENT -->
   <ul class="collection with-header">
     <li class="collection-header">
       <h4>Items</h4>
     </li>
     <li class="collection-item">
       <div>
         First Item
         <a href="#" class="secondary-content">
           <i class="material-icons">close</i>
         </a>
       </div>
     </li>
     <li class="collection-item">
       <div>
         Second Item
         <a href="#" class="secondary-content">
           <i class="material-icons">close</i>
         </a>
       </div>
     </li>
     <li class="collection-item">
       <div>
         Third Item
         <a href="#" class="secondary-content">
           <i class="material-icons">close</i>
         </a>
       </div>
     </li>
     <li class="collection-item">
       <div>
         Fourth Item
         <a href="#" class="secondary-content">
           <i class="material-icons">close</i>
         </a>
       </div>
     </li>
   </ul>
   ```

   显示：

   ![image-20190410153631678](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410153631678.png)



3. Avatar Content

   ```html
   <!-- AVATAR CONTENT -->
   <ul class="collection">
     <li class="collection-item avatar">
       <i class="material-icons blue circle">contacts</i>
       <span class="title">John Doe</span>
       <p>
         jdoe@gmail.com <br />
         555-555-5555
       </p>
       <a href="#" class="secondary-content">
         <i class="material-icons">grade</i>
       </a>
     </li>
     <li class="collection-item avatar">
       <i class="material-icons blue circle">contacts</i>
       <span class="title">Steve Smith</span>
       <p>
         steve@gmail.com <br />
         555-555-5555
       </p>
       <a href="#" class="secondary-content">
         <i class="material-icons">grade</i>
       </a>
     </li>
     <li class="collection-item avatar">
       <i class="material-icons blue circle">contacts</i>
       <span class="title">Karen Johnson</span>
       <p>
         karen@gmail.com <br />
         555-555-5555
       </p>
       <a href="#" class="secondary-content">
         <i class="material-icons">grade</i>
       </a>
     </li>
     <li class="collection-item avatar">
       <i class="material-icons blue circle">contacts</i>
       <span class="title">Mary Williams</span>
       <p>
         mary@gmail.com <br />
         555-555-5555
       </p>
       <a href="#" class="secondary-content">
         <i class="material-icons">grade</i>
       </a>
     </li>
   </ul>
   ```

   ![image-20190410153735029](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410153735029.png)



4. Badge in dropdown

   ```html
   <!-- BADGE IN DROPDOWN -->
   <a href="#" class="btn dropdown-button" data-activates="dropdown1"
      >Dropdown
     <i class="material-icons">arrow_drop_down</i>
   </a>
   
   <ul class="dropdown-content" id="dropdown1">
     <li>
       <a href=""
          >Item 1
         <span class="badge">44</span>
       </a>
     </li>
     <li>
       <a href=""
          >Item 2
         <span class="badge new">4</span>
       </a>
     </li>
     <li>
       <a href="">Item 3</a>
     </li>
     <li>
       <a href="">Item 4</a>
     </li>
   </ul>
   ```

   显示：

   ![image-20190410153840857](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410153840857.png)

