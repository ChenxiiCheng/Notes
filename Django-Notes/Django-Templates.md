## Django模板使用静态资源、高亮导航栏入口

1. 将前端模板放进templates中相应文件夹中

   (1) 模板中静态资源的引用写法：

   ```html
   {% load static %}
   <link rel="stylesheet" href="{% static 'css/all.css' %}  #这个all.css文件是放在static文件夹中css文件夹里
   ```

   (2) 模板中跳转url写法：

   ```html
    <a href="{% url 'index' %}"
    #这个index是对应哪里呢？在pages的urls.py中
    ulrpatterns = [
        path('', views.index, name='index')
    ]       对！就是这里的name='index'!!!
   ```

   (3) templates/partials

   ```html
   为了模板目录更加整洁，讲Top Bar, Navbar, Footer放在templates/partials目录下
   然后再base.html中加入这些元素部分：
     <!-- Top Bar -->
   {% include 'partials/_topbar.html' %}
     <!-- Navbar -->
   {% include 'partials/_navbar.html' %}
     <!-- Footer -->
   {% include 'partials/_footer.html' %}
   ```

   

2. 导航栏里跳转到其他页面如何高亮该页面的入口

   eg: Home  About  当点击了导航栏里的About时 跳转到about页面，如何让About高亮

   解决方案：

   ```html
   <li
   	{% if '/' == request.path %}
   		class="nav-item active mr-3"
   	{% else %}
   	  class="nav-item mr-3"
   	{% endif %}
   >
   <a class="nav-link" href="{% url 'home' %}">Home</a>
     
   <li
   	{% if 'about' in request.path %}
   		class="nav-item active mr-3"
   	{% else %}
   	  class="nav-item mr-3"
   	{% endif %}
   >
   <a class="nav-link" href="{% url 'about' %}">About</a>
   ```

   