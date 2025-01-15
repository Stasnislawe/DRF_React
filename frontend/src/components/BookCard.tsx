import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();
  const formattedDate = new Date(book.added_at).toLocaleDateString();

  return (
    <div
      onClick={() => navigate(`/book/${book.id}/books/`)}
      className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
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
        <p className="text-gray-200 mb-4 min-h-28 max-h-35">{book.text}</p>

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
      </div>
    </div>
  );
}