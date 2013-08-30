from django.db import models

class Chengyu(models.Model):
    chengyu_id = models.AutoField(primary_key=True ,null=False , unique=True)
    chengyu_title = models.CharField(max_length=200)
    chengyu_text = models.CharField(max_length=600)
    chengyu_fayin = models.CharField(max_length=300)
    chengyu_chuchu = models.CharField(max_length=500)
    chengyu_lizi = models.CharField(max_length=500)
    chengyu_jinyi = models.CharField(max_length=200)
    chengyu_fanyi = models.CharField(max_length=200)
    chengyu_read_count = models.IntegerField()
    chengyu_creat_time = models.DateTimeField()
    chengyu_last_modify_time = models.DateTimeField(auto_now=True)
    chengyu_popularity = models.IntegerField()
    chengyu_from_url = models.URLField(max_length=50)
    ext_1 = models.CharField(max_length=500)
    ext_2 = models.CharField(max_length=500)

