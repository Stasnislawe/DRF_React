from django.urls import include, path, re_path
from rest_framework import routers
from .views import BookSerializerView, BookPartSerializerView, AuthorSerializerView, Logout, RegisterView, BookFreeDetailSerializerView

# router = routers.DefaultRouter()
# router.register(r'book/(?P<free>True|False)', BookFreeDetailSerializerView)


book_part = BookPartSerializerView.as_view({
    'get': 'list',
    'post': 'create',
})


author_book = AuthorSerializerView.as_view({
    'get': 'list',
    'post': 'create',
})


urlpatterns = [
    # path('', include(router.urls)),
    path('book/<str:free>/', BookSerializerView.as_view(), name='book-free'),
    path('book/<str:free>/<int:pk>/', BookFreeDetailSerializerView.as_view({
        'get': 'retrieve',
    })),
    path('book/<int:part_number>/books', book_part),

    path('book/', BookSerializerView.as_view(), name='book-list'),
    # path('book/<str:free>/<int:pk>/', BookFreeDetailSerializerView.as_view({
    #     'get': 'retrieve',
    #     'put': 'update',
    #     'delete': 'destroy',
    # })),
    # re_path('book', BookSerializerView.as_view()),
    # re_path('book/(?P<book_free>.+)/', BookSerializerView.as_view()),
    # re_path('book/<int:pk>/(?P<book_free>.+)/', BookFreeDetailSerializerView.as_view({
    #     'get': 'retrieve',
    #     'put': 'update',
    #     'delete': 'destroy',
    # })),
    # path('', include(router.urls)),
    path('logout/', Logout.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('book/<int:book_author>/authors', author_book),
    # path('book/<int:part_number>/books', book_part),
    path('book/<int:part_number>/books/<int:part_id>', BookPartSerializerView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy',
    }), name='bookpart'),
]