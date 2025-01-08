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

