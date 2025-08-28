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
    return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">Загрузка...</div>;
  }

  if (error || !part) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => navigate(`/book/${id}/books`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              Назад к списку частей
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Часть книги не найдена</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Эта часть не существует или пока недоступна.</p>
            <button
              onClick={() => navigate(`/book/${id}/books`)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Назад к списку частей
            </button>
          </div>
        </div>
      </div>
    );
  }

//   const currentPartIndex = series.findIndex(p => p.id === partId) + 2;
  const currentPartIndex = part.part_id;
  const hasNextPart = currentPartIndex < series.length;
  const hasPreviousPart = currentPartIndex > 0;

  const readFreeBooks = JSON.parse(localStorage.getItem('readFreeBooks') || '[]');
  const showRegistrationPrompt = !authService.isAuthenticated() &&
    readFreeBooks.length === 2 &&
    !localStorage.getItem('registrationPromptShown');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(`/book/${id}/books`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
              Назад к списку частей
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{part.title_part}</h1>

          <div className="prose dark:prose-invert max-w-none mb-8">
            {part.text_part}
          </div>

          {showRegistrationPrompt && (
            <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                Вы прочитали обе бесплатные книги!
              </h3>
              <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                Зарегистрируйтесь прямо сейчас, чтобы получить доступ к нашей полной библиотеке и следить за своим прогрессом в чтении.              </p>
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Зарегестрироваться сейчас
              </button>
            </div>
          )}

          <div className="flex justify-between">
            {hasPreviousPart && (
              <button
                onClick={() => navigate(`/book/${id}/books/${Number(currentPartIndex - 1)}`)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
                Предыдущая часть книги
              </button>
            )}
            {hasNextPart && (
              <button
                onClick={() => navigate(`/book/${id}/books/${Number(currentPartIndex + 1)}`)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ml-auto"
              >
                Следующая часть книги
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}