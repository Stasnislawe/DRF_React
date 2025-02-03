from django.http import Http404
from rest_framework.permissions import IsAuthenticated
from .models import Book, BookPart, Author
from .serializer import BookSerializer, BookPartSerializer, AuthorSerializer, UserSerializer
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


class Logout(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class AuthorSerializerView(viewsets.ModelViewSet):
    serializer_class = AuthorSerializer

    def get_queryset(self):
        qs = self.kwargs['book_author']
        return Author.objects.filter(book_author=qs)


class BookPartSerializerView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    serializer_class = BookPartSerializer
    queryset = BookPart.objects.all()
    lookup_field = 'part_id'

    def get_queryset(self):
        qs = self.kwargs['part_number']
        return BookPart.objects.filter(part_number=qs)


class BookFreeDetailSerializerView(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def retrieve(self, request, *args, **kwargs):
        free_param = self.kwargs.get('free')
        book = self.get_object()

        if free_param == 'True' and not book.book_free:
            return Response({"detail": 'Книга не доступна'}, status=status.HTTP_404_NOT_FOUND)
        elif free_param == 'False' and book.book_free:
            return Response({"detail": 'Книга доступна бесплатно'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(book)
        return Response(serializer.data)
        # return Response(f'{book.book_free}')


# Вью для DRF --> вывод всех объектов модели Book
class BookSerializerView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_queryset(self):
        free_param = self.kwargs.get('free', None)

        if free_param == 'True':
            return Book.objects.filter(book_free=True)
        elif free_param == 'False':
            return Book.objects.filter(book_free=False)
        else:
            return Book.objects.all()

    # def get_queryset(self):
    #     if self.request.path == '/book/True/':
    #         # book_free = self.kwargs['book_free']
    #         return Book.objects.filter(book_free=True)
    #     elif self.request.path == 'book/False/':
    #         return Book.objects.filter(book_free=False)
    #     return self.queryset.all()

    def create(self, request, *args, **kwargs):
        if self.action == 'create':
            serializer = BookSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        'status': status.HTTP_200_OK,
                        'message': 'Успех!',
                        'id': serializer.instance.pk,
                    }
                )

            if status.HTTP_400_BAD_REQUEST:
                return Response(
                    {
                        'status': status.HTTP_400_BAD_REQUEST,
                        'message': 'Некорректный запрос',
                        'id': None,
                    }
                )

            if status.HTTP_500_INTERNAL_SERVER_ERROR:
                return Response(
                    {
                        'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                        'message': 'Ошибка при выполнении операции',
                        'id': None,
                    }
                )
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        book = self.get_object()
        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    'state': '1',
                    'message': 'Изменения в записи внесены'
                }
            )
        else:
            return Response(
                {
                    'state': '0',
                    'message': serializer.errors
                }
            )
