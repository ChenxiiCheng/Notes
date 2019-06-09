# SideNavbar

1. SideNav

   ```html
   <!-- SIDENAV -->
   <ul id="slide-out" class="side-nav">
     <li>
       <div class="user-view">
         <div class="background">
           <img src="img/img4.jpg" />
         </div>
         <a href="#!">
           <img class="circle" src="img/img5.jpg" />
         </a>
         <a href="#!">
           <span class="white-text name">John Doe</span>
         </a>
         <a>
           <span class="white-text email">jdoe@gmail.com</span>
         </a>
       </div>
     </li>
     <li>
       <a href="#!"> <i class="material-icons">dashboard</i>Dashboard</a>
     </li>
     <li>
       <a href="#!">Posts</a>
     </li>
     <li>
       <div class="divider"></div>
     </li>
     <li>
       <a class="subheader">Account Info</a>
     </li>
     <li>
       <a class="waves-effect" href="#!">Logout</a>
     </li>
   </ul>
   <a href="#!" data-activates="slide-out" class="button-collapse">
     <i class="material-icons">menu</i>
   </a>
   
   
   $('.button-collapse').sideNav({
   	menuWidth: 400,
   	edge: 'left',
   	closeOnClick: false,
   	draggable: true,
   	onOpen: function() {
   	console.log('Menu Open');
   	},
   	onClose: function() {
   	console.log('Menu Close');
   	}
   });
   ```

   显示:

   ![image-20190410230322233](/Users/chenxi/Library/Application%20Support/typora-user-images/image-20190410230322233.png)

