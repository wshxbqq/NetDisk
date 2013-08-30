# -*- coding: utf-8 -*-
import os,sys
sys.path.append("D:\\chengyu\\chengyu") 
sys.path.append("D:\\chengyu") 
from django.core.management import setup_environ
import settings
setup_environ(settings)

from datetime  import *
import urllib,urllib2,cookielib
from bs4 import BeautifulSoup
from datetime  import *

from fetcher import models

url="http://chengyu.itlearner.com/cy7/7432.html";
html=urllib.urlopen(url).read()
soup = BeautifulSoup(html)
_shili=soup.select("#bdshare")
# z=_chengyu_jinyi.find_next().find_all("a")[0].string
# z=BeautifulSoup(_chengyu_jinyi)
a=222

def hello():
	print(a)
hello()