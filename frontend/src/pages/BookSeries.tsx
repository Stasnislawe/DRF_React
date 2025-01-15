import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookSeries } from '../api/books';
import { BookPart } from '../types/book';
import { ArrowLeft, BookOpen } from 'lucide-react';

export function BookSeries() {
  const { id } = useParams<{ id: number }>();
  const navigate = useNavigate();
  const [series, setSeries] = useState<BookPart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        if (id) {
          const data = await getBookSeries(id);
          setSeries(data);

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
        <span>Loading series...</span>
      </div>
    );
  }

  if (error) {
    return null; // The navigation will handle the redirect
  }

  const firstPart = series[0];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(`/`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {firstPart && (
            <div
              onClick={() => navigate(`/book/${id}/books/${firstPart.id}`)}
              className="p-6 border-b cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {firstPart.title_part}
              </h2>
              <p className="text-gray-600">Part 1</p>
            </div>
          )}

          {series.slice(1).map((part) => (
            <div
              key={part.id}
              className="p-6 border-b opacity-50"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {part.title_part}
              </h2>
              <p className="text-gray-600">Part {part.page_count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}