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
    return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">Loading...</div>;
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {series.map((part) => {
            const isRead = readParts.includes(part.part_id);
            const accessible = isPartAccessible(part.part_id);

            return (
              <div
                key={part.id}
                onClick={() => accessible && navigate(`/book/${id}/books/${part.part_id}`)}
                className={`
                  relative aspect-square rounded-xl overflow-hidden shadow-lg
                  ${accessible ? 'cursor-pointer transform hover:scale-105 transition-transform' : 'cursor-not-allowed'}
                `}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={part.image_part || "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop"}
                    alt={part.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                </div>

                {/* Blur Overlay for Locked Parts */}
                {!accessible && (
                  <div className="absolute inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center">
                    <Lock className="w-20 h-20 text-white/80" />
                  </div>
                )}

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-white">
                      Part {part.part_id}
                    </h2>
                    {isRead && (
                      <div className="bg-green-500/90 rounded-full p-1">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      {part.title}
                    </h3>
                    {accessible && (
                      <p className="text-gray-200 text-sm line-clamp-3">
                        {part.text}
                      </p>
                    )}
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
