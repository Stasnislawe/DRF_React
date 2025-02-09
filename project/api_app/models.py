from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []


class Author(models.Model):
    name = models.CharField(max_length=60, verbose_name='Имя')
    bio = models.TextField(verbose_name='Биография')
    photo = models.ImageField(upload_to='authors/%Y/%m/%d/', verbose_name='Фото')


# Модель Книги
class Book(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название')
    added_at = models.DateTimeField(auto_now_add=True, verbose_name='Время опубликования')
    time_to_read = models.CharField(max_length=50, verbose_name='Среднее время прочтения')
    text = models.CharField(verbose_name='Краткое описание чтобы заинтересовать читателя', max_length=120)
    cover = models.ImageField(upload_to='cover/%Y/%m/%d/', verbose_name='Обложка книги')
    author = models.ManyToManyField(Author, related_name='book_author', verbose_name='Автор книги')
    book_free = models.BooleanField(default=False, verbose_name='Просмотр незарегестированным')


class BookPart(models.Model):
    title_part = models.CharField(max_length=120, verbose_name='Название части')
    image_part = models.ImageField(upload_to='parts/', verbose_name='Изображение части', null=True)
    text_part = models.TextField(verbose_name='Содержание')
    part_number = models.ForeignKey(Book, on_delete=models.CASCADE, verbose_name='Часть книги')
    page_count = models.IntegerField(verbose_name='Количество страниц')
    part_id = models.IntegerField(verbose_name='Номер части', blank=True)

