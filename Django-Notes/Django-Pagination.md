## Django中实现分页

```python
def index(request):
    listings = Listing.objects.order_by('-list_date').filter(is_published=True)

    paginator = Paginator(listings, 6)   #每页显示6个listing
    page = request.GET.get('page')       #这个是固定写法
    paged_listings = paginator.get_page(page) #等号右边固定写法

    context = {
        'listings': paged_listings
    }
    
    return render(request, 'listings/listings.html', context)
  
前端模板：
<div class="row">
	<div class="col-md-12">
		{% if listings.has_other_pages %} #如果总共6个数据我们是一页放6个那就没有显示后面的页数 先判断下
			<ul class="pagination">
				{% if listings.has_previous %}
					<li class="page-item">
						<a href="?page={{ listings.previous_page_number }}" class="page-link">&laquo;						 </a>
					</li>
				{% else %}
					<li class="page-item disabled">
						<a class="page-link">&laquo;</a>
					</li>
				{% endif %}
        
				{% for i in listings.paginator.page_range %}
					{% if listings.number == i %}
						<li class="page-item active">
							<a class="page-link">{{ i }}</a>
						</li>
					{% else %}
						<li class="page-item">
							<a href="?page={{ i }}" class="page-link">{{ i }}</a>
						</li>  
					{% endif %}
				{% endfor %}
        
				{% if listings.has_next %}
					<li class="page-item">
						<a href="?page={{ listings.next_page_number }}" class="page-link">&raquo;</a>
					</li>
				{% else %}
					<li class="page-item disabled">
						<a class="page-link">&raquo;</a>
					</li>
				{% endif %}
			</ul>
		{% endif %}
	</div>
</div>
```

