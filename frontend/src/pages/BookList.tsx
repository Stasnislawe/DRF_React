import React, { useEffect, useState } from 'react';
import { getBooks } from '../api/books';
import { BookCard } from '../components/BookCard';
import { Book } from '../types/book';
import { BookOpen } from 'lucide-react';
import { useBooks } from '../hooks/useBooks'

export function BookList() {
  const { books, loading, error } = useBooks();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin mr-2">
          <BookOpen className="w-6 h-6" />
        </div>
        <span>Загрузка книг...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Библиотека</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}