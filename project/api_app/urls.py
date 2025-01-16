from django.urls import include, path
from rest_framework import routers
from .views import BookSerializerView, BookPartSerializerView, AuthorSerializerView

router = routers.DefaultRouter()
router.register(r'book', BookSerializerView)


book_part = BookPartSerializerView.as_view({
    'get': 'list',
    'post': 'create',
})


author_book = AuthorSerializerView.as_view({
    'get': 'list',
    'post': 'create',
})


urlpatterns = [
    path('', include(router.urls)),
    path('book/<int:book_author>/authors', author_book),
    path('book/<int:part_number>/books', book_part),
    path('book/<int:part_number>/books/<int:part_id>', BookPartSerializerView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy',
    })),
]