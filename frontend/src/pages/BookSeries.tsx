import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookSeries } from '../hooks/useBookSeries';
import { BookOpen, Lock, CheckCircle, ArrowLeft } from 'lucide-react';

export function BookSeries() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { series, loading, error, readParts } = useBookSeries(id);
//   console.log(id);
//   console.log(useBookSeries(id));

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
    // Redirect to authors page if there are no parts
//     navigate(`/book/${id}/authors`);
    return null;
  }

  const isPartAccessible = (partNumber: number) => {
    // First part is always accessible
    if (partNumber === 1) return true;
    // Check if previous part has been read
    return readParts.includes((partNumber - 1).toString());
  };

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
                    <p className="text-gray-600">Part {part.part_id}</p>
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