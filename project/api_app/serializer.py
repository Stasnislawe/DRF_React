from rest_framework import serializers
from .models import Book


# сериалайзер модели Book со всеми полями
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'added_at', 'time_to_read',
                  'text', 'cover', 'author']