import React, { useEffect, useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Book } from '../types/book';
import { authService } from '../services/auth';
import { getBookSeries } from '../api/books';

interface BookCardProps {
  book: Book;
  id: string;
}

export function BookCard({ book, id }: BookCardProps) {
  const navigate = useNavigate();
//   const location = useLocation();
  const formattedDate = new Date(book.added_at).toLocaleDateString();
    const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const calculateProgress = async () => {
      try {
        const readParts = JSON.parse(localStorage.getItem(`book-${id}-read-parts`) || '[]');
        if (readParts.length > 0) {
          const series = await getBookSeries(id);
          const progressValue = (readParts.length / series.length) * 100;
          setProgress(progressValue);
        }
      } catch (error) {
        console.error('Failed to calculate progress:', error);
      }
    };

    calculateProgress();
  }, [id]);

  const handleBookClick = () => {
    if (book.book_free) {
      navigate(`/book/${id}/books`);
    } else if (!authService.isAuthenticated()) {
      navigate('/login', { state: { from: `/book/${id}/books` } });
    } else {
      navigate(`/book/${id}/books`);
    }
  };

  return (
    <div
      onClick={handleBookClick}
      className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 bg-white dark:bg-gray-800"
    >
      <div className="absolute inset-0">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
      </div>

      <div className="relative p-6 h-full flex flex-col justify-end">
        <h3 className="text-2xl font-bold text-white mb-2">{book.title}</h3>
        <p className="text-gray-200 mb-4">by {book.author}</p>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-200">
              <Clock className="w-4 h-4 mr-1" />
              <span>{book.time_to_read}</span>
            </div>
            <div className="flex items-center text-gray-200">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {progress !== null && (
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-gray-200 text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}