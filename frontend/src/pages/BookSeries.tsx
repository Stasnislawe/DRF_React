import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookSeries } from '../api/books';
import { BookPart } from '../types/book';
import { ArrowLeft, BookOpen, Lock, CheckCircle } from 'lucide-react';

export function BookSeries() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [series, setSeries] = useState<BookPart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readParts, setReadParts] = useState<string[]>([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        if (id) {
          const data = await getBookSeries(id);
          setSeries(data);
          // Get read parts from localStorage
          const storedReadParts = JSON.parse(localStorage.getItem(`book-${id}-read-parts`) || '[]');
          setReadParts(storedReadParts);
        }
      } catch (error) {
        setError('Failed to fetch book series');
        // If there are no parts, redirect to authors page
        navigate(`/book/${id}/authors`);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin mr-2">
          <BookOpen className="w-6 h-6" />
        </div>
        <span>Загрузка серий</span>
      </div>
    );
  }

  if (error) {
    return null; // The navigation will handle the redirect
  }

  const isPartAccessible = (partId: number) => {
    // First part is always accessible
    if (partId === 1) return true;
    // Check if previous part has been read
    return readParts.includes((partId - 1).toString());
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(`/`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {series.map((part) => {
            const isRead = readParts.includes(part.part_id);
            const accessible = isPartAccessible(part.part_id);

            return (
              <div
                key={part.part_id}
                onClick={() => accessible && navigate(`/book/${id}/books/${part.part_id}`)}
                className={`p-6 border-b ${accessible ? 'cursor-pointer hover:bg-gray-50' : 'opacity-50'} transition-colors`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {part.title_part}
                    </h2>
                    <p className="text-gray-600">Часть {part.part_id}</p>
                    <p className="text-gray-600">{part.page_count} страниц</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isRead && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {!accessible && <Lock className="w-5 h-5 text-gray-400" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}