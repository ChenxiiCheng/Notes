## Django中使用Postgres数据库

1. 安装Postgres和PgAdmin

   ```
   打开postgres，双击postgres数据库(owner)，进入了该数据库命令行：
   (1) 为这个postgres数据库(owner)设置密码
   		\password postgres
   (2) 在这个postgres(owner)里创建一个新的数据库
   		CREATE DATABASE btredb OWNER postgres;
   		\l可以查看有哪些数据库
   (3)\q 退出数据库
   
   打开pgAdmin
   (1)点击Servers，在跳出的窗口General栏中 Name写dbserver
   (2)Connection栏中, Host name/address写 localhost
   (3)Connection栏中, Username写postgres就是刚才那个owner，password写我们上面设置的密码
   然后save即可
   
   点开左侧的btredb，右键属性，Security栏中 Grantee选postgres, Privileges选All
   ```

2. 上面我们安装了postgres数据库，我们现在把数据库和django连接起来

   (1) 在虚拟环境中, ```pip install psycopg2``` ```pip install psycopg2-binary```
         安装```pip install psycopg2```报错了，```Error: pg_config executable not found. pg_config is required to build psycopg2 from source.```，在python官网查了下，You can also obtain a stand-alone package, not requiring a compiler or external libraries, by installing the psycopg2-binary package from PyPI: ```$ pip install psycopg2-binary```. The binary package is a practical choice for development and testing but in production it is advised to use the package built from sources. 先用psycopg2-binary吧，之后再考虑解决第一个指令的报错。

   (2) 在settings.py中

   ```python
   DATABASES = {
     'default': {
       'ENGINE': 'django.db.backends.postgresql',
       'NAME': 'btredb',    #在postgres 这个owner里创建的数据库名称
       'USER': 'postgres',  #owner
       'PASSWORD': '',
       'HOST': 'localhost'
     }
   }
   ```

   (3) 接着可以生成数据了

   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

   

