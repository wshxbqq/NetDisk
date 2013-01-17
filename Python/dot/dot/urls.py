from django.conf.urls import patterns, include, url
import dotlog.views
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',

	url(r'^$', 'dotlog.views.dotlog', name='home'),
    # Examples:
    # url(r'^$', 'dot.views.home', name='home'),
    # url(r'^dot/', include('dot.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    #url(r'^admin/', include(admin.site.urls)),
)
