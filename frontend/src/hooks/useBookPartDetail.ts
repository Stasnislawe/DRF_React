import { useState, useEffect } from 'react';
import { getBookPart } from '../api/books';
import { BookPart } from '../types/book';

export function useBookPartDetail(id: string | undefined, partId: string | undefined) {
  const [part, setPart] = useState<BookPart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPart = async () => {
      try {
        if (id && partId) {
          const data = await getBookPart(id, partId);
          setPart(data);
          // Mark this part as read
          const readParts = JSON.parse(localStorage.getItem(`book-${id}-read-parts`) || '[]');
          if (!readParts.includes(partId)) {
            readParts.push(partId);
            localStorage.setItem(`book-${id}-read-parts`, JSON.stringify(readParts));
          }
        }
      } catch (error) {
        console.error('Failed to fetch book part:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPart();
  }, [id, partId]);

  return { part, loading };
}