import React, { useEffect, useState } from 'react';
import { getBooks } from '../api/books';
import { BookCard } from '../components/BookCard';
import { Book } from '../types/book';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';

export function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError('Failed to load books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const getReadParts = (bookId: number) => {
    return JSON.parse(localStorage.getItem(`book-${bookId}-read-parts`) || '[]');
  };

  const { unreadBooks, readBooks } = books.reduce<{
    unreadBooks: Book[];
    readBooks: Book[];
  }>(
    (acc, book) => {
      const readParts = getReadParts(book.id);
      if (readParts.length > 0) {
        acc.readBooks.push(book);
      } else {
        acc.unreadBooks.push(book);
      }
      return acc;
    },
    { unreadBooks: [], readBooks: [] }
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
        <div className="animate-spin mr-2">
          <BookOpen className="w-6 h-6" />
        </div>
        <span>Загрузка книг...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 dark:bg-gray-900">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Библиотека</h1>
          {isAuthenticated && (
            <button
              onClick={() => navigate('/profile')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Мой прогресс
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {unreadBooks.map((book) => (
            <BookCard key={book.id} book={book} id={book.id.toString()} />
          ))}
        </div>

        {readBooks.length > 0 && (
          <>
            <div className="relative my-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-lg">
                  Прочитанные книги
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readBooks.map((book) => (
                <div key={book.id} className="opacity-70 transition-opacity hover:opacity-100">
                  <BookCard book={book} id={book.id.toString()} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}