import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookPartDetail } from '../hooks/useBookPartDetail';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useBookSeries } from '../hooks/useBookSeries';
import { authService } from '../services/auth';

export function BookPartDetail() {
  const { id, partId } = useParams<{ id: string; partId: string }>();
  const navigate = useNavigate();
  const { part, loading, error } = useBookPartDetail(id, partId);
//   console.log(part);
  const { series } = useBookSeries(id);

  useEffect(() => {
    if (part && !authService.isAuthenticated()) {
      // Track free book progress
      const readFreeBooks = JSON.parse(localStorage.getItem('readFreeBooks') || '[]');
      if (!readFreeBooks.includes(id)) {
        readFreeBooks.push(id);
        localStorage.setItem('readFreeBooks', JSON.stringify(readFreeBooks));
      }

      // If this is the second free book, show registration prompt
      if (readFreeBooks.length === 2) {
        const shouldPrompt = !localStorage.getItem('registrationPromptShown');
        if (shouldPrompt) {
          localStorage.setItem('registrationPromptShown', 'true');
        }
      }
    }
  }, [part, id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !part) {
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
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Part Not Found</h1>
            <p className="text-gray-600 mb-6">This part doesn't exist or is not available yet.</p>
            <button
              onClick={() => navigate(`/book/${id}/books`)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Return to Series
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentPartIndex = part.part_id;
//   console.log(series);
  const hasNextPart = currentPartIndex < series.length;
//   console.log(currentPartIndex);
//   console.log(series.length);
  const hasPreviousPart = currentPartIndex > 1;

  const readFreeBooks = JSON.parse(localStorage.getItem('readFreeBooks') || '[]');
  const showRegistrationPrompt = !authService.isAuthenticated() &&
    readFreeBooks.length === 2 &&
    !localStorage.getItem('registrationPromptShown');

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

          {showRegistrationPrompt && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                You've completed both free books!
              </h3>
              <p className="text-indigo-700 mb-4">
                Register now to access our full library and keep track of your reading progress.
              </p>
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Register Now
              </button>
            </div>
          )}

          <div className="flex justify-between">
            {hasPreviousPart && (
              <button
                onClick={() => navigate(`/book/${id}/books/${Number(partId) - 1}`)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous Part
              </button>
            )}
            {hasNextPart && (
              <button
                onClick={() => navigate(`/book/${id}/books/${Number(partId) + 1}`)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 ml-auto"
              >
                Next Part
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}