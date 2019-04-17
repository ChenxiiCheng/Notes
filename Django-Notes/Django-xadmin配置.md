# Django-xadmin配置

1. **将对应django版本的xadmin文件夹放入项目根目录或者extra_app目录中**



2. **每个app下新建xadmin.py文件，里面写该app的xadmin配置**



3. **在```settings.py```中配置**

   ```python
   INSTALLED_APPS = [
     ...,
     'crispy_forms,
     'xadmin',
   ]
   ```

   

4. **安装xadmin的依赖包**

   ```
   在项目虚拟环境中：
   pip install django-crispy-forms django-reversion django-formtools future httplib2 six django-import_export
   
   #xadmin可以支持导出excel格式
   安装相关库：
   pip install xlwt xlsxwriter
   ```

   

5. **创建后台的超级用户**

   ```
   python manage.py createsuperuser
   ```

   

6. **个性化xadmin设置**

   (1) 后台显示语言、时间设置

   ```python
   # LANGUAGE_CODE = 'en-us'
   LANGUAGE_CODE = 'zh-hans'
   
   # TIME_ZONE = 'UTC'
   TIME_ZONE = 'Asia/Shanghai'
   
   USE_I18N = True
   
   USE_L10N = True
   
   # 默认是Ture，时间是utc时间，因为我们用本地时间，所以手动修改为false
   USE_TZ = False
   ```

​	

​	(2) 后台中每项显示中文

```python
	在每个app中的apps.py文件中：
	eg: goods 这个app
	
	from django.apps import AppConfig

	class GoodsConfig(AppConfig):
    	name = 'goods' 
    	verbose_name = '商品'   #增加这条语句
```





