# Carousel

1. Carousel

   ```html
   <!-- CAROUSEL -->
   <div class="carousel">
     <a class="carousel-item" href="#one!">
       <img src="img/img1.jpg" />
     </a>
     <a class="carousel-item" href="#two!">
       <img src="img/img2.jpg" />
     </a>
     <a class="carousel-item" href="#three!">
       <img src="img/img3.jpg" />
     </a>
     <a class="carousel-item" href="#four!">
       <img src="img/img4.jpg" />
     </a>
     <a class="carousel-item" href="#five!">
       <img src="img/img5.jpg" />
     </a>
   </div>
   
   $('.carousel').carousel();
   ```

   显示:

   ![image-20190410221150403](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410221150403.png)

2. Full Width Carousel

   ```html
   <!-- FULL WIDTH CAROUSEL -->
   <div class="carousel carousel-slider">
     <a class="carousel-item" href="#one!">
       <img src="img/img1.jpg" />
     </a>
     <a class="carousel-item" href="#two!">
       <img src="img/img2.jpg" />
     </a>
     <a class="carousel-item" href="#three!">
       <img src="img/img3.jpg" />
     </a>
     <a class="carousel-item" href="#four!">
       <img src="img/img4.jpg" />
     </a>
     <a class="carousel-item" href="#five!">
       <img src="img/img5.jpg" />
     </a>
   </div>
   
   $('.carousel-slider').carousel({ fullWidth: true });
   ```

   显示:

   ![image-20190410221329812](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410221329812.png)



3. Content Slider

   ```html
   <!-- CONTENT SLIDER -->
   <div class="carousel carousel-slider center" data-indicators="true">
     <div class="carousel-item red white-text" href="#one!">
       <h2>Panel One</h2>
       <p>This is panel one</p>
       <div class="carousel-fixed-item center">
         <a class="btn black">button</a>
       </div>
     </div>
     <div class="carousel-item amber white-text" href="#two!">
       <h2>Panel One</h2>
       <p>This is panel one</p>
       <div class="carousel-fixed-item center">
         <a class="btn black">button</a>
       </div>
     </div>
     <div class="carousel-item green white-text" href="#three!">
       <h2>Panel One</h2>
       <p>This is panel one</p>
       <div class="carousel-fixed-item center">
         <a class="btn black">button</a>
       </div>
     </div>
     <div class="carousel-item blue white-text" href="#four!">
       <h2>Panel One</h2>
       <p>This is panel one</p>
       <div class="carousel-fixed-item center">
         <a class="btn black">button</a>
       </div>
     </div>
   </div>
   ```

   显示:

   ![image-20190410221434438](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410221434438.png)

