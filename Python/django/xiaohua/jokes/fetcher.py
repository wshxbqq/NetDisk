# -*- coding: utf-8 -*-
import os,sys
reload(sys)  
sys.setdefaultencoding('utf8') 

sys.path.append("D:\\NetDisk\\Python\\django\\xiaohua") 
sys.path.append("D:\\NetDisk\\Python\\django\\xiaohua\\xiaohua") 


from django.core.management import setup_environ
import settings
setup_environ(settings)
import os.path
from jokes.models import Jokes
from datetime  import *
import urllib,urllib2,cookielib
from bs4 import BeautifulSoup
from datetime  import *
import threading
import json

list_contain=Jokes.objects.all()
f=open("data",'r')
strs=f.read()
list_array=json.loads(strs)






def isContains(joke_from_url):
	flag=False;
	for d in list_contain:
		if d.joke_from_url==joke_from_url:
			flag= True
	return flag




def let_us_do_it(data):
		if 	False==isContains(data["src"]):
			try:
				insertJoke(data["src"],data["liulan"]);
				print "add 1"
			except Exception, e:
				print "error"
			else:
				pass
			finally:
				pass
			
			
		else:
			print "jump"
		let_us_do_it(list_array.pop())



def insertJoke(url,popular):
	html=urllib.urlopen(url).read()
	soup = BeautifulSoup(html)
	title_bar=soup.find("a",title="查看此类型的所有笑话").find_parent().get_text()
	title_bar_array=title_bar.split("->")
	print str(soup.find("span",id="text110"))
	j=Jokes(
		joke_title = str(title_bar_array[2]),
		joke_type = str(title_bar_array[1]),
		joke_text = str(soup.find("span",id="text110")),
		joke_read_count = popular,
		joke_creat_time = datetime.now(),
		joke_last_modify_time = datetime.now(),
		joke_popularity = popular,
		joke_from_url = url
		)
	j.save()







for x in xrange(1,50):
	t=threading.Thread(target=let_us_do_it,args=(list_array.pop(),  )     )
	t.start()







# url_template="http://chengyu.itlearner.com/list/{word}_{page}.html"
# global_success_count=0
# def start_with_word(word):
# 	page_count=1
# 	soup=get_soup(word,str(page_count))

# 	while have_page(soup):
# 		get_word_from_page(soup)
# 		page_count=page_count+1
# 		soup=get_soup(word,page_count)
	
	


# def contains(url):
	
# 	result=False
# 	for objs in list_contain:
# 		if objs.chengyu_from_url==url:
# 			result=True
# 	return result


# def have_page(soup):
# 	count=soup.find_all("h1",text="404 Not Found")
# 	if len(count)>0:
# 		return False
# 	else:
# 		return True





# def get_word_from_page(soup):
# 	ary=soup.select(".listw li a")
# 	for x in ary:
# 		try:
# 			href_short=x["href"]
# 			all_url="http://chengyu.itlearner.com"+href_short
# 			if contains(all_url)==False:
# 				insert_page_to_db(href_short)
# 			else:
# 				print(href_short+"   存在")
# 		except Exception, e:
# 			raise e
# 		else:
# 			pass
		
		



# def insert_page_to_db(url):
# 	html=urllib.urlopen("http://chengyu.itlearner.com"+url).read()
# 	current_chengyu_soup = BeautifulSoup(html)
# 	chengyu_title="empty"
# 	chengyu_text="empty"
# 	chengyu_fayin="empty"
# 	chengyu_lizi="empty"
# 	chengyu_jinyi="empty"
# 	chengyu_fanyi="empty"
# 	chengyu_from_url="http://chengyu.itlearner.com"+url
# 	chengyu_chuchu="empty"
# 	ext_1="empty"
# 	_chengyu_title=current_chengyu_soup.find("td",text="词目")
# 	if _chengyu_title:
# 		chengyu_title=_chengyu_title.find_next().get_text()
		


# 	_chengyu_text=current_chengyu_soup.find("td",text="释义")
# 	if _chengyu_text:
# 		chengyu_text=_chengyu_text.find_next().get_text()


# 	_chengyu_fayin=current_chengyu_soup.find("td",text="发音")
# 	if _chengyu_fayin:
# 		chengyu_fayin=_chengyu_fayin.find_next().get_text()


# 	_chengyu_lizi=current_chengyu_soup.find("td",text="示例")
# 	if _chengyu_lizi:
# 		chengyu_lizi=_chengyu_lizi.find_next().get_text()

# 	_chengyu_jinyi=current_chengyu_soup.find("td",text="近义词")
# 	if _chengyu_jinyi:
# 		chengyu_jinyi=_chengyu_jinyi.find_next()
# 		jinyis=_chengyu_jinyi.find_next().find_all("a")
# 		result="";
# 		for x in jinyis:
# 			result=result+x.get_text()
# 			result=result+","
# 		chengyu_jinyi=result

# 	_chengyu_fanyi=current_chengyu_soup.find("td",text="反义词")
# 	if _chengyu_fanyi:
# 		chengyu_fanyi=_chengyu_fanyi.find_next()
# 		fanyis=_chengyu_fanyi.find_next().find_all("a")
# 		result="";
# 		for x in fanyis:
# 			result=result+x.get_text()
# 			result=result+","
# 		chengyu_fanyi=result

# 	_chengyu_chuchu=current_chengyu_soup.find("td",text="出处")
# 	if _chengyu_chuchu:
# 		chengyu_chuchu=_chengyu_chuchu.find_next().get_text()




# 	_ext_1=current_chengyu_soup.find("a",text="成语")
# 	if _ext_1:
# 		ext_1=_ext_1.find_next().get_text()










# 	now=datetime.now()
# 	c=Chengyu(
# 		chengyu_title=chengyu_title ,
# 		chengyu_text=chengyu_text,
# 		chengyu_fayin=chengyu_fayin,
# 		chengyu_chuchu=chengyu_chuchu,
# 		chengyu_lizi=chengyu_lizi,
# 		chengyu_jinyi=chengyu_jinyi,
# 		chengyu_fanyi=chengyu_fanyi,
# 		chengyu_from_url=chengyu_from_url,
# 		chengyu_read_count=0,
# 		chengyu_popularity=0,
# 		chengyu_last_modify_time=now,
# 		chengyu_creat_time=now,
# 		ext_1=ext_1.replace("字母开头的成语","")
# 	)
# 	c.save()
# 	global global_success_count
# 	global_success_count=global_success_count+1
# 	print (chengyu_title+"   完成"+"当前第 "+str(global_success_count)+"个")


# def get_soup(word,page_count):
# 	current_url=url_template.replace("{word}",word).replace("{page}",str(page_count))
# 	html=urllib.urlopen(current_url).read()
# 	soup = BeautifulSoup(html)
# 	return soup

# allTaskArray1="EF"
# allTaskArray2="GHJKLM"
# allTaskArray3="NOPQRS"
# allTaskArray4="TWXYZ"


# def t1(o):
# 	for x in allTaskArray1:
# 		start_with_word(x)

# def t2(o):
# 	for x in allTaskArray2:
# 		start_with_word(x)


# def t3(o):
# 	for x in allTaskArray3:
# 		start_with_word(x)


# def t4(o):
# 	for x in allTaskArray4:
# 		start_with_word(x)



# t1({})

# tt1 = threading.Thread(target=t1,args=(1,))
# tt1.start()#启动线程

# tt2 = threading.Thread(target=t2,args=(1,))
# tt2.start()#启动线程

# tt3 = threading.Thread(target=t3,args=(1,))
# tt3.start()#启动线程

# tt4 = threading.Thread(target=t4,args=(1,))
# tt4.start()#启动线程

