# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.template.loader import get_template
from django.shortcuts import render_to_response
from jokes.models import Jokes
import datetime
from django.template import Context, Template

def jokeView(request):
	now=datetime.datetime.now
	#t = get_template('current_datetime.html') //get_template  获得模板文件
	# html = t.render(Context({'current_date': now}))
	#html=render_to_response('index.html', {'current_date': now})  快捷拼装末班
	html="text"
	return HttpResponse(html)