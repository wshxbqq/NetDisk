# Create your views here.
from django.http import HttpResponse
from django.template import Template, Context
from dotlog.models import logData
from datetime import *

def dotlog(request):
	responseTxt=""
	if 'appname' in request.GET and request.GET['appname']:
		appname=request.GET["appname"]
		aDot = logData(appName=appname)
		aDot.save()
		responseTxt=aDot.id
	else:
		responseTxt="None"
	return HttpResponse(responseTxt)




