# Cards

1. 简单的卡片(没有title)

   ```html
   <!-- SIMPLE CARD WITHOUT TITLE -->
   <div class="card">
     <div class="card-content">
       <p>
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
         harum enim inventore ullam expedita nesciunt ea voluptatem
         corporis iusto sint?
       </p>
     </div>
   </div>
   
   <!-- ADD COLOR -->
   <div class="card red darken-2">
     <div class="card-content white-text">
       <p>
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
         harum enim inventore ullam expedita nesciunt ea voluptatem
         corporis iusto sint?
       </p>
     </div>
   </div>
   ```

   显示：

   ![image-20190410170709894](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410170709894.png)



2. 卡片(有title) with links

   ```html
   <!-- CARD WITH TITLE -->
   <div class="card">
     <div class="card-content">
       <span class="card-title">Card With Title</span>
       <p>
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
         harum enim inventore ullam expedita nesciunt ea voluptatem
         corporis iusto sint?
       </p>
     </div>
     <!-- ADD LINKS -->
     <div class="card-action">
       <a href="#">Read More</a>
       <a href="#">Read More</a>
     </div>
   </div>
   ```

   显示:

   ![image-20190410170813123](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410170813123.png)



3. Cards with image

   ```html
   <!-- CARD WITH IMAGE -->
   <div class="card">
     <div class="card-image">
       <img src="img/img1.jpg" />
       <span class="card-title">Card Image</span>
     </div>
     <div class="card-content">
       <p>
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
         harum enim inventore ullam expedita nesciunt ea voluptatem
         corporis iusto sint?
       </p>
     </div>
     <div class="card-action">
       <a href="#">Read More</a>
     </div>
   </div>
   ```

   显示：

   ![image-20190410170951513](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410170951513.png)



4. Card with image & floating button

   ```html
   <!-- CARD WITH IMAGE & FLOATING BUTTON -->
   <div class="card blue-grey lighten-4"> 卡片背景blue-grey
     <div class="card-image">
       <img src="img/img2.jpg" />
       <span class="card-title">Image & Button</span>
       <a class="btn-floating halfway-fab waves-effect waves-light blue">
         <i class="material-icons">add</i>
       </a>
     </div>
     <div class="card-content">
       <p>
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
         harum enim inventore ullam expedita nesciunt ea voluptatem
         corporis iusto sint?
       </p>
     </div>
   </div>
   ```

   显示:

   ![image-20190410171123650](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410171123650.png)



5. Horizontal card

   ```html
   <!-- HORIZONTAL CARD -->
   <div class="card horizontal">
     <div class="card-image">
       <img src="img/img3.jpg" />
     </div>
     <div class="card-stacked">
       <div class="card-content">
         <span class="card-title">Horizontal</span>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
       </div>
     </div>
   </div>
   </div>
   ```

   显示：

   ![image-20190410171227669](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410171227669.png)



6. Card Reveal

   ```html
   <!-- CARD REVEAL -->
   <div class="card">
     <div class="card-image waves-effect waves-light waves-block">
       <img class="activateor" src="img/img4.jpg" />
     </div>
     <div class="card-content">
       <span class="card-title activator"
             >Card Reveal
         <i class="material-icons">more_vert</i>
       </span>
       <p>
         <!-- add activator to anything -->
         <a href="#!" class="activator">Read More</a>
       </p>
     </div>
     <!-- inside of reveal -->
     <div class="card-reveal">
       <span class="card-title activator"
             >Card Title
         <i class="material-icons">close</i>
       </span>
       <p>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ad
         repudiandae sequi at quis assumenda iusto dolor in, maxime earum
         debitis ea vero aspernatur ipsum, totam iste molestias natus!
         Ullam?
       </p>
     </div>
   </div>
   ```

   显示：

   ![image-20190410171338869](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410171338869.png)



7. Tabbed Card

   ```html
   <!-- TABBED CARD -->
   <div class="card">
     <div class="card-content">
       <span class="card-title">Tabbed Card</span>
       <p>
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex,
         rem obcaecati. Recusandae laborum, odit commodi fuga dolores
         dolorem, minima hic similique illo, ipsam eos. Perspiciatis
         omnis voluptas sunt delectus ab?
       </p>
     </div>
     <div class="card-tabs">
       <ul class="tabs tabs-width-fixed">
         <li class="tab">
           <a href="#tab1">Tab 1</a>
         </li>
         <li class="tab">
           <a href="#tab2">Tab 2</a>
         </li>
         <li class="tab">
           <a href="#tab3">Tab 3</a>
         </li>
       </ul>
     </div>
     <div class="card-content">
       <div id="tab1">This is the content for tab 1</div>
       <div id="tab2">This is the content for tab 2</div>
       <div id="tab3">This is the content for tab 3</div>
     </div>
   </div>
   ```

   显示:

   ![image-20190410171552378](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410171552378.png)



8. Card Size

   ```html
   <!-- SMALL -->
   <div class="card small">
     <div class="card-image">
       <img src="img/img5.jpg" />
       <span class="card-title">Card Image</span>
     </div>
     <div class="card-content">
       <p>
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
         harum enim inventore ullam expedita nesciunt ea voluptatem
         corporis iusto sint?
       </p>
     </div>
     <div class="card-action">
       <a href="#">Read More</a>
     </div>
   </div>
   </div>
   <div class="col s12 m4">
     <!-- MEDIUM -->
     <div class="card medium">
       <div class="card-image">
         <img src="img/img6.jpg" />
         <span class="card-title">Card Image</span>
       </div>
       <div class="card-content">
         <p>
           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
           harum enim inventore ullam expedita nesciunt ea voluptatem
           corporis iusto sint?
         </p>
       </div>
       <div class="card-action">
         <a href="#">Read More</a>
       </div>
     </div>
   </div>
   <div class="col s12 m4">
   ```

   显示:

   ![image-20190410171700589](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410171700589.png)



9. Card Panels & Shadow

   ```html
   <div class="row">
     <div class="col s12 m3">
       #页面small时占12列，medium时占3列
       <div class="card-panel blue z-depth-2">
         #背景Blue,z-depth-2:阴影2程度，最高为4
         <span
               >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
           magni aut mollitia quis? Ab voluptate quaerat libero voluptatibus
           quisquam in dolorum nobis hic. Suscipit dignissimos laboriosam id
           nesciunt debitis exercitationem.
         </span>
       </div>
     </div>
     <div class="col s12 m3">
       <div class="card-panel indigo z-depth-2">
         <span class="white-text"
               >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
           magni aut mollitia quis? Ab voluptate quaerat libero voluptatibus
           quisquam in dolorum nobis hic. Suscipit dignissimos laboriosam id
           nesciunt debitis exercitationem.
         </span>
       </div>
     </div>
     <div class="col s12 m3">
       <div class="card-panel cyan z-depth-4">
         <span
               >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
           magni aut mollitia quis? Ab voluptate quaerat libero voluptatibus
           quisquam in dolorum nobis hic. Suscipit dignissimos laboriosam id
           nesciunt debitis exercitationem.
         </span>
       </div>
     </div>
     <div class="col s12 m3">
       <div class="card-panel amber">
         <span
               >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
           magni aut mollitia quis? Ab voluptate quaerat libero voluptatibus
           quisquam in dolorum nobis hic. Suscipit dignissimos laboriosam id
           nesciunt debitis exercitationem.
         </span>
       </div>
     </div>
   </div>
   ```

   显示:

   ![image-20190410171847495](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410171847495.png)

