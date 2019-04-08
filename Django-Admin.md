## Django中创建、注册、定制化admin

1. 创建管理员

   ```
   python manage.py createsuperuser
   ```

2. 注册admin

   ```python
   #eg:Listing app下的admin.py中
   from django.contrib import admin
   
   from .models import Listing
   
   # Register your models here.
   class ListingAdmin(admin.ModelAdmin):
       list_display = ('id', 'title', 'is_published', 'price', 'list_date', 'realtor')
       list_display_links = ('id', 'title')
       list_filter = ('realtor',)
       list_editable = ('is_published',)
       search_fields = ('title', 'description', 'address', 'city', 'state', 'zipcode', 'price')
       list_per_page = 25
   
   admin.site.register(Listing, ListingAdmin)
   ```

3. 定制admin后台显示页面

   ```html
   (1)在根目录的templates文件夹中新建admin文件夹，在admin文件夹中新建base_sites.html
   (2)在base_sites.html中：
   		{% extends 'admin/base.html' %}   #这个是django自带的admin默认的模板
   		{% load static %}
   		
   		{% block brading %}
   			<h1 id="head">
   				<img src="{% static 'img/logo.png %}" alt="BT Real Estate" height="50" width="50" class="brand_img"> Admin Area
   			</h1>
   		{% endblock %}
   
   		{% block extrastyle %}  
   			<link rel="stylesheet" href="{% static 'css/admin.css %}"
       {% endblock %}
   ```

   ```css
   然后在btre/static/css文件夹中新建admin.css文件，在其中写css
   admin.css中:
   #header {
       height: 50px;
       background: #10284e;
       color: #fff;
   }
   
   #branding h1 {
       color: #fff;
   }
   
   a:link,
   a:visited {
       color: #10284e;
   }
   
   div.breadcrumbs {
       background: #30caa0;
       color: #10284e;
   }
   
   div.breadcrumbs a {
       color: #333;
   }
   
   .module h2, .module caption, .inline-group h2 {
       background: #30caa0;
   }
   
   .button, input[type=submit], input[type=button], .submit-row input, a.button {
       background: #10284e;
       color: #fff;
   }
   ```

   