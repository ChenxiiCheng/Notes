# Chips

1. Chips

   ```html
   <div class="chip">
     Web development
   </div>
   <div class="chip">
     Web design
   </div>
   <div class="chip">
     Programming
   </div>
   ```

   显示：

   ![image-20190410215207523](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410215207523.png)



2. Chips with close

   ```html
   <div class="chip">
   	Web development
   	<i class="close material-icons">close</i>
   </div>
   <div class="chip">
   	Web design
   	<i class="close material-icons">close</i>
   </div>
   <div class="chip">
   	Programming
   	<i class="close material-icons">close</i>
   </div>
   ```

   显示:

   ![image-20190410215013748](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410215013748.png)



3. Chips with image

   ```html
   <!-- CHIPS WITH IMAGES -->
   <div class="chip"><img src="img/img1.jpg" /> John Doe</div>
   <div class="chip"><img src="img/img2.jpg" /> Brian Jackson</div>
   <div class="chip"><img src="img/img3.jpg" /> Lori Smith</div>
   ```

   显示:

   ![image-20190410215219635](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410215219635.png)



4. Chips input with autocomplete

   ```html
   <!-- CHIPS INPUT WITH AUTOCOMPLETE-->
   <div class="chips-input"></div>
   
   $('.chips-input').material_chip({
   	placeholder: 'Enter a tag',
   	secondaryPlaceholder: '+tag',
   	autocompleteOptions: {
   		data: {
   		html: null,
   		css: null,
   		javascript: null
   		}
   	}
   });
   
   // ADD CHIP EVENT
   $('.chips-input').on('chip.add', function(e, chip) {
   console.log('You added a chip - ${chip.tag}');
   });
   ```

   显示:

   ![image-20190410215617136](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410215617136.png)



5. Pagination

   ```html
   <!-- PAGINATION -->
   <ul class="pagination">
     <li class="disabled">
       <a href="#!">
         <i class="material-icons">chevron_left</i>
       </a>
     </li>
     <li class="waves-effect">
       <a href="#!">1</a>
     </li>
     <li class="waves-effect active">
       <a href="#!">2</a>
     </li>
     <li class="waves-effect">
       <a href="#!">3</a>
     </li>
     <li class="waves-effect">
       <a href="#!">4</a>
     </li>
     <li class="waves-effect">
       <a href="#!">5</a>
     </li>
     <li class="waves-effect">
       <a href="#!">
         <i class="material-icons">chevron_right</i>
       </a>
     </li>
   </ul>
   ```

   显示:

   ![image-20190410215555325](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410215555325.png)

