from django.db import models

# Create your models here.


# Модель Книги
class Book(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название')
    added_at = models.DateTimeField(auto_now_add=True, verbose_name='Время опубликования')
    time_to_read = models.CharField(max_length=50, verbose_name='Среднее время прочтения')
    text = models.TextField(verbose_name='Содержание')
    cover = models.ImageField(upload_to='cover/%Y/%m/%d/', verbose_name='Обложка книги')
    author = models.CharField(max_length=100, verbose_name='Автор')


class BookPart(models.Model):
    title_part = models.CharField(max_length=120, verbose_name='Название части')
    text_part = models.TextField(verbose_name='Содержание')
    part_number = models.IntegerField(verbose_name='Номер части')


class Author(models.Model):
    name = models.CharField(max_length=60, verbose_name='Имя')
    bio = models.TextField(verbose_name='Биография')
    photo = models.ImageField(upload_to='authors/%Y/%m/%d/', verbose_name='Фото')
