from django.db import models

class Jokes(models.Model):
    joke_id = models.AutoField(primary_key=True ,null=False , unique=True)
    joke_title = models.CharField(max_length=200)
    joke_type = models.CharField(max_length=200)
    joke_text = models.TextField()
    joke_read_count = models.IntegerField()
    joke_creat_time = models.DateTimeField()
    joke_last_modify_time = models.DateTimeField(auto_now=True)
    joke_popularity = models.IntegerField()
    joke_from_url = models.URLField(max_length=500)
    ext_1 = models.CharField(max_length=500)
    ext_2 = models.CharField(max_length=500)

