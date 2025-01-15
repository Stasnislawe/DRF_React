from rest_framework import serializers
from .models import Book, BookPart, Author


# сериалайзер модели Book со всеми полями
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'added_at', 'time_to_read',
                  'text', 'cover', 'author']


class BookPartSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookPart
        fields = ['id', 'title_part', 'text_part', 'part_number', 'page_count', 'part_id']


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'bio', 'photo']