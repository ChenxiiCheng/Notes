# Form

1. Text Field

   ```html
   <!-- TEXT FIELD -->
   <div class="input-field">
     <input placeholder="Name" id="name" type="text" />
     <label for="name">Name</label>
   </div>
   ```

   显示：

   ![image-20190410175220213](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410175220213.png)



2. Value & Disabled

   ```html
   <!-- VALUE & DISABLED -->
   <div class="input-field">
     <input
            disabled
            placeholder="Email"
            id="email"
            type="email"
            value="chenxi@gamil.com"
            />
     <label for="email">Email</label>
   </div>
   ```

   显示：

   ![image-20190410175309933](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410175309933.png)



3. TextArea

   ```html
   <!-- TEXTAREA -->
   <div class="input-field">
     <textarea
               placeholder="Message"
               id="message"
               class="materialize-textarea"
               ></textarea>
     <label for="message">Message</label>
   </div>
   ```

   显示:

   ![image-20190410175352429](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410175352429.png)



4. Inline Field

   ```html
   <!-- INLINE FIELD -->
   Number of users:
   <div class="input-field inline">
     <input id="users" type="text" />
     <label for="users">#</label>
   </div>
   ```

   显示:

   ![image-20190410175434586](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410175434586.png)



5. Icon Prefix

   ```html
   <!-- ICON PREFIX -->
   <div class="input-field">
     <i class="material-icons prefix">phone</i>
     <input id="phone" type="tel" />
     <label for="phone">Phone Number</label>
   </div>
   ```

   显示:

   ![image-20190410175713957](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410175713957.png)



6. Validation & Error

   ```html
   <!-- VALIDATION & ERROR -->
   <div class="input-field">
     <input placeholder="Email" id="email" type="email" class="validate" />
     <label data-error="Invalid" data-success="Valid" for="email"
            >Email</label
       >
   </div>
   ```

   显示：

   ![image-20190410175759397](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410175759397.png)

   ![image-20190410175834038](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410175834038.png)



7. Select

   ```html
   <!-- SELECT (Must be initialized) -->
   <div class="input-field">
     <select>
       <option value="" disabled selected>Select Option</option>
       <option value="1">Option1</option>
       <option value="2">Option2</option>
       <option value="3">Option3</option>
     </select>
     <label>Select List</label>
   </div>
   ```

   显示:

   ![image-20190410175919135](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410175919135.png)

   ![image-20190410175932415](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410175932415.png)



8. Option Groups

   ```html
   <!-- OPTION GROUPS -->
   <div class="input-field">
     <select>
       <optgroup label="Option Group 1">
         <option value="1">Option 1</option>
         <option value="2">Option 2</option>
       </optgroup>
       <optgroup label="Option Group 2">
         <option value="1">Option 3</option>
         <option value="2">Option 4</option>
       </optgroup>
     </select>
     <label>Option Group Select</label>
   </div>
   ```

   显示:

   ![image-20190410180011367](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410180011367.png)

   ![image-20190410180027433](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410180027433.png)



9. Mutiple Select

   ```html
   <!-- MULTIPLE SELECT -->
   <div class="input-field">
     <select multiple>
       <option value="" disabled selected>Select Option</option>
       <option value="1">Option1</option>
       <option value="2">Option2</option>
       <option value="3">Option3</option>
     </select>
     <label>Select List</label>
   </div>
   ```

   显示:

   ![image-20190410180122244](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410180122244.png)

   ![image-20190410180136622](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410180136622.png)



10. Radio Buttons

    ```html
    <!-- RADIO BUTTONS -->
    <p>
      <input type="radio" name="gender" id="male" />
      <label for="male">Male</label>
    </p>
    <p>
      <input class="with-gap" type="radio" name="gender" id="female" />
      <label for="female">Female</label>
    </p>
    ```

    显示:

    ![image-20190410180217095](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410180217095.png)

    ![image-20190410180229739](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410180229739.png)



11. CheckBoxes

    ```html
    <!-- CHECKBOXES -->
    <p>
      <input type="checkbox" name="tech" id="html" />
      <label for="html">HTML</label>
    </p>
    <p>
      <input type="checkbox" name="tech" id="css" checked />
      <label for="css">CSS</label>
    </p>
    <p>
      <input type="checkbox" class="filled-in" name="tech" id="js" />
      <label for="js">JavaScript</label>
    </p>
    <p>
      <input disabled type="checkbox" name="tech" id="php" />
      <label for="php">PHP</label>
    </p>
    ```

    显示：

    ![image-20190410180331225](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410180331225.png)

