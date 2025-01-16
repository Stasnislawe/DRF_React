import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookAuthors } from '../api/books';
import { Author } from '../types/book';
import { ArrowLeft } from 'lucide-react';

export function BookAuthors() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        if (id) {
          const data = await getBookAuthors(id);
          setAuthors(data);
        }
      } catch (error) {
        console.error('Failed to fetch authors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(`/book/${id}/books`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад к списку частей
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Authors</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {authors.map((author) => (
            <div key={author.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={author.photo}
                alt={author.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{author.name}</h2>
                <p className="text-gray-600">{author.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}