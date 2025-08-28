from django.urls import include, path, re_path
from .views import BookSerializerView, BookPartSerializerView, AuthorSerializerView, Logout, RegisterView, BookFreeDetailSerializerView


book_part = BookPartSerializerView.as_view({
    'get': 'list',
    'post': 'create',
})


author_book = AuthorSerializerView.as_view({
    'get': 'list',
    'post': 'create',
})


urlpatterns = [
    # Список бесплатных книг
    path('book/<str:free>/', BookSerializerView.as_view(), name='book-free'),
    # Список частей бесплатной книги
    path('book/<str:free>/<int:pk>/', BookFreeDetailSerializerView.as_view({
        'get': 'retrieve',
    })),

    # Список частей в книге (нужна авторизация)
    path('book/<int:part_number>/books', book_part),
    path('book/', BookSerializerView.as_view(), name='book-list'),
    # выход
    path('logout/', Logout.as_view(), name='logout'),
    # регистрация
    path('register/', RegisterView.as_view(), name='register'),
    # автор книги
    path('book/<int:book_author>/authors', author_book),
    # просмотр определнной части книги
    path('book/<int:part_number>/books/<int:part_id>', BookPartSerializerView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy',
    }), name='bookpart'),
]