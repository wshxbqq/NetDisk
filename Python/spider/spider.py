# coding: UTF-8
import urllib,urllib2,cookielib
import os
from bs4 import BeautifulSoup

import thread  

html_src = urllib.urlopen('http://www.baidu.com').read()
parser = BeautifulSoup(html_src)
#soup = BeautifulSoup(markup, "xml") #转换XML也是可以的


baikeDOM=parser.find("a",text="百科")
print baikeDOM.find_parent() #返回父元素
print baikeDOM.find_next_siblings()
#print parser.find_all("div",id="m") #含有某属性的元素
#print parser.find_all("a",text="百科") #包含某些文字的内容的DOM

# soup = BeautifulSoup(open("index.html"))  #本地文件 soup = BeautifulSoup(open("index.html"))  




for x in xrange(1,5000):
	html_src1 = urllib.urlopen('http://www.baidu.com/s?wd=python&pn='+str(x)+'0&ie=utf-8&usm=1&rsv_page=1').read()
	parser1 = BeautifulSoup(html_src1)
	fileHandle = open('scra_data/test'+str(x)+'.txt','w')
	fileHandle.write(str(parser))
	fileHandle.close()



