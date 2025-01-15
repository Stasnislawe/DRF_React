from django.contrib import admin
from .models import Book, BookPart, Author

# Register your models here.

admin.site.register(Book)
admin.site.register(BookPart)
admin.site.register(Author)