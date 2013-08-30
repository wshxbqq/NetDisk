from django.http import HttpResponse
from django.template.loader import get_template
from django.template import Context
from django.shortcuts import render_to_response
from fetcher.models import Chengyu
from  datetime  import *
from django.template import Context, Template
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

@require_http_methods(["GET", "POST"])
@csrf_exempt
def hello(request):  
	now=datetime.now()
	c=Chengyu(
		chengyu_title="text_cheng_yu" ,
		chengyu_text="some explane",
		chengyu_read_count=0,
		chengyu_popularity=0,
		chengyu_last_modify_time=now,
		chengyu_creat_time=now
	)
	#c.save()

	return render_to_response('index.html', {'chengyu_title': request.REQUEST.get('chengyu_title','xxx')})