import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookPart } from '../api/books';
import { BookPart } from '../types/book';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function BookPartDetail() {
  const { id, partId } = useParams<{ id: string; partId: string }>();
  const navigate = useNavigate();
  const [part, setPart] = useState<BookPart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPart = async () => {
      try {
        if (id && partId) {
          const data = await getBookPart(id, partId);
          setPart(data);
        }
      } catch (error) {
//         setError('Failed to fetch book part:', error));
        navigate(`/book/${id}/authors`);
      } finally {
        setLoading(false);
      }
    };

    fetchPart();
  }, [id, partId]);

  if (loading || !part) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(`/book/${id}/books`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Series
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">{part.title_part}</h1>

          <div className="prose max-w-none mb-8">
            {part.text_part}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => navigate(`/book/${id}/books/${Number(partId) + 1}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              Next Part
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}