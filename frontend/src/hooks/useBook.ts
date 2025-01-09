import { useState, useEffect } from 'react';
import type { Book } from '../types';
import { getBook } from '../api/books';

export function useBook(id: number) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBook() {
      try {
        const data = await getBook(id);
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load book');
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  return { book, loading, error };
}