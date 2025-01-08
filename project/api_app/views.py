from .models import Book
from serializer import BookSerializer
from rest_framework import viewsets


class BookSerializerView(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

