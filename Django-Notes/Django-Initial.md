## Django项目初始化流程

1. 新建一个目录 eg: dev文件，进入该文件目录

   (1) ```mkdir dev```

   (2) ```cd dev```



2. 新建项目文件名

   (1) ```mkdir btre_project```

   (2) ``cd btre_project``

   (3) ```code .```  #会在vscode里开启该目录



3. 新建虚拟环境venv

​      (1) ```python3 -m venv ./venv```   # 在当前文件路径里新建venv虚拟环境

​      (2) 启动虚拟环境 ```source ./venv/bin/activate```



4. pip install 【在虚拟环境中】

   (1)```pip install django==2.1.1```

   (2) ```pip freeze```  可以查看当前环境中装了哪些库



5. 创建项目 【在虚拟环境中】

   (1) ```django-admin startproject btre .```  btre是这个项目的名称，可以任意，生成后能看到manage.py等文件

   (2) ```git init```  

   (3) 在项目根路径下创建一个.gitignore文本 （和.vscode, btre同个目录）

   加入： 【.gitignore作用是提交到仓库时会自动帮我们忽略gitignore里的那些文件，这些文件是我们不想上传公开的】

   ```
   *.log
   *.pot
   *.pyc
   __pycache__/
   local_settings.py
   db.sqlite3
   /media
   venv
   /static
   ```

   (4) ```git add . && git commit -m 'Initial commit'```  提交到local仓库里

   

6. 启动server【在虚拟环境中】

   (1) ```python manage.py runserver```



7. 新建app

   (1) ```python manage.py startapp pages```

   (2) 在settings.py中注册

   ​	settings.py -> INSTALLED_APPS中:

   ​	```'pages.apps.PagesConfig'```      PagesConfig其实就是这个app里apps.py文件里的那个class类名

   (3) 在pages这个app里 新建一个urls.py文件

   ```python
   from django.urls import path
   
   from . import views
   
   urlpatterns = [
     path('', views.index, name='index')   #index是views.py文件中一个函数名，这个url对应这个函数
   ]
   ```



8. 根目录urls.py中添加app中的urls.py

   ```python
   from django.contrib import admin
   from django.urls import path, include
   
   urlpatterns = [
     path('', include('pages.urls')),
     path('admin/', admin.site.urls),
   ]
   ```



9. 在根目录下新建templates文件夹

   在templates文件中为每一个app新建一个同名文件夹放对应app的前端模板

   Eg: templates/pages

   ```python
   #在settings.py文件中：
   TEMPLATES = [
     {
       ...
       'DIRS': [os.path.join(BASE_DIR, 'templates')],
       ...
     }
   ]
   ```



10. 在templates文件夹目录里新建一个base.html

    ```html
    # 把每个页面公用的元素放在base.html中，其他模板继承base.html
    # 继承语法： {% extends 'base.html' %}
    
    <body>
    	{% block content %} {% endblock %}
    </body>
    ```



11. 在btre文件夹(也就是根urls.py那个目录) 新建一个static文件夹，用于存放静态资源。把需要用到的css文件夹、js文件夹、img文件夹放入static文件夹中

    ```python
    #然后我们在settings.py中添加
    # STATIC_ROOT:我们在项目部署服务器的时候会用到collectstatic，它的作用是把所有目录下的static文件夹都复制一份放到根目录的static文件夹中
    # STATICFILES_DIRS: 是指明我们当前把staic放的位置，我们开发的时候把static文件夹放在btre文件夹里
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')
    STATICFILES_DIRS = [
      os.path.join(BASE_DIR, 'btre/static')
    ]
    添加好上面的语句后，接着我们输入语句： python manage.py collectstatic
    则在根目录下生成了一个static文件夹，注意这个是涉及到后面部署服务器时候的事，我们使用的static文件夹是btre/static这个，为什么要做这一步呢？这是因为当部署在服务器上时，服务器只会去根目录的static文件夹中找需要的静态资源，所以我们需要将所有文件夹下的static文件夹收集放到根目录的static中.
    ```



12. Media文件设置(在models.py中有字段是上传资源的，需要设置上传的路径，我们在数据库里保存的是资源的路径而不是直接把资源存在数据库里)

    (1) 在settings.py里：

    ```
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
    
    MEDIA_URL = '/media/'
    ```

    (2) 在根urls.py中

    ```python
    from django.contrib import admin
    from django.urls import path, include
    from django.conf import settings
    from django.conf.urls.static import static
    
    urlpatterns = [
      path('', include('pages.urls')),
      path('listings/', include('listings.urls')),
      path('admin/', admin.site.urls),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    ```
    
    (3) 需要在虚拟环境里安装```pip install Pillow```


13. 新建app

    ```python
    python manage.py startapp listings
    
    python manage.py startapp realtors
    
    在settings.py中
    INSTALLED_APPS = [
      ...
      'listings.apps.ListingsConfig',
      'realtors.apps.RealtorsConfig',
      ...
    ]
    ```

    

13. 为listings app添加urls.py, 前端模板

    ```python
    urlpatterns = [
      path('', views.index, name='listings'),
      path('<int:listing_id>', views.listing, name='listing'), #每个listing_id对应自己的页面
      path('search', views.search, name='search'),
    ]
    
    <a href="{% url 'listing' listing.id %})">More Info</a>
    ```

