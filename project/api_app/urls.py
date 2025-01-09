from django.urls import include, path
from rest_framework import routers
from .views import BookSerializerView

router = routers.DefaultRouter()
router.register(r'book', BookSerializerView)


urlpatterns = [
    path('', include(router.urls))
]