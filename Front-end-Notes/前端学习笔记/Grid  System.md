# Grid  System

1. 布局：一行多少列

   ```html
   <!-- 3 4 COLUMNS -->
   <div class="row">
     <div class="col s4">  #每个占用4列，总共一行是12个列(最小单位),所以共放12/4=3个
       <div class="box">1</div>
     </div>
     <div class="col s4">
       <div class="box">2</div>
     </div>
     <div class="col s4">
       <div class="box">3</div>
     </div>
   </div>
   
   <!-- 2 6 COLUMNS -->
   <div class="row">
     <div class="col s6">
       <div class="box">1</div>
     </div>
     <div class="col s6">
       <div class="box">2</div>
     </div>
   </div>
   ```

   显示：

   ![image-20190410171950158](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410171950158.png)



2. 响应式布局

   ```html
   <!-- RESPONSIVE GRIDS / SPECIFIC SCREEN SIZES -->
   <div class="row">
     <div class="col m4 s12"> #当页面是medium时，每个占4列共显示3个，当small时每个占12列
       <div class="box">1</div>
     </div>
     <div class="col m4 s12">
       <div class="box">2</div>
     </div>
     <div class="col m4 s12">
       <div class="box">3</div>
     </div>
   </div>
   
   <div class="row">  #当页面是xlarge时每个占9列，当时large时每个占8列，当medium 6列
     <div class="col xl9 l8 m6 s12">
       <div class="box">1</div>
     </div>
     <div class="col xl3 l4 m6 s12">
       <div class="box">2</div>
     </div>
   </div>
   ```

