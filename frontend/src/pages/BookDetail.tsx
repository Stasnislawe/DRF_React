import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook } from '../api/books';
import { Book } from '../types/book';
import { useBook } from '../hooks/useBook';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

export function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { book, loading, error } = useBook(Number(id));

  if (loading || !book) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative h-96">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <button
          onClick={() => navigate(`/`)}
          className="absolute top-4 left-4 text-white flex items-center gap-2 hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Обратно в библиотеку
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl mb-4">by {book.author}</p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{book.time_to_read}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{new Date(book.added_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose max-w-none">
            {book.text}
          </div>
        </div>
      </div>
    </div>
  );
}