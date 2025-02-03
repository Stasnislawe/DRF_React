import { useState, useEffect } from 'react';
import { getBookSeries } from '../api/books';
import { BookPart } from '../types/book';

export function useBookSeries(id: string | undefined) {
  const [series, setSeries] = useState<BookPart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readParts, setReadParts] = useState<string[]>([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        if (id) {
          const data = await getBookSeries(id);
//           console.log(getBookSeries(id));
          setSeries(data);
          // Get read parts from localStorage
          const storedReadParts = JSON.parse(localStorage.getItem(`book-${id}-read-parts`) || '[]');
          setReadParts(storedReadParts);
        }
      } catch (error) {
        setError('Failed to fetch book series');
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [id]);

  return { series, loading, error, readParts };
}