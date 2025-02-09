from rest_framework import serializers
from .models import Book, BookPart, Author, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


# сериалайзер модели Book со всеми полями
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'added_at', 'time_to_read',
                  'text', 'cover', 'author', 'book_free']


class BookPartSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookPart
        fields = ['id', 'title_part', 'image_part', 'text_part', 'part_number', 'page_count', 'part_id']


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'bio', 'photo']