import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Book } from '../types/book';
import { getBooks, getBookSeries } from '../api/books';
import { BookOpen, ArrowLeft, Percent, LogOut, User } from 'lucide-react';
import { authService } from '../services/auth';

interface BookProgress {
  book: Book;
  progress: number;
  readParts: number;
  totalParts: number;
}

export function Profile() {
  const navigate = useNavigate();
  const [readBooks, setReadBooks] = useState<BookProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('username');

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const fetchReadBooks = async () => {
      try {
        const allBooks = await getBooks();
        const progressData = await Promise.all(
          allBooks.map(async (book) => {
            const readParts = JSON.parse(localStorage.getItem(`book-${book.id}-read-parts`) || '[]');
            if (readParts.length === 0) return null;

            const series = await getBookSeries(book.id.toString());
            const progress = (readParts.length / series.length) * 100;

            return {
              book,
              progress,
              readParts: readParts.length,
              totalParts: series.length
            };
          })
        );

        setReadBooks(progressData.filter((book): book is BookProgress => book !== null));
      } catch (error) {
        console.error('Failed to fetch read books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReadBooks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin mr-2">
          <BookOpen className="w-6 h-6" />
        </div>
        <span>Loading your reading progress...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Library
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 text-gray-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{username || 'User'}</h2>
              <p className="text-gray-500">Reading Progress</p>
            </div>
          </div>
        </div>

        {readBooks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No books read yet</h2>
            <p className="text-gray-600">Start reading to track your progress!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readBooks.map(({ book, progress, readParts, totalParts }) => (
              <div
                key={book.id}
                onClick={() => navigate(`/book/${book.id}/books`)}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              >
                <div className="relative h-48">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Percent className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-2xl font-bold">{Math.round(progress)}%</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-600">
                    {readParts} of {totalParts} parts read
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}