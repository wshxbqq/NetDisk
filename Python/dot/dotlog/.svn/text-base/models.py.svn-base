from django.db import models

class logData(models.Model):
    appName = models.CharField(max_length=200)
    dotName = models.CharField(max_length=200)
    userName=models.CharField(max_length=200)
    userIP=models.CharField(max_length=200)
    userAgent=models.CharField(max_length=300)
    userExternal = models.CharField(max_length=1000)
    createTime = models.DateTimeField(auto_now_add=True)
    def __unicode__(self):
        return self.title
