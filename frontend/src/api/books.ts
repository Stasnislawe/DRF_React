import { Book, BookPart, Author } from '../types/book';
import { USE_MOCK_DATA, RANDOM_AUTHORS_LIMIT, API_BASE_URL } from '../config';
import { mockBooks, mockBookSeries, mockAuthors } from '../mocks/books';
import { authService } from '../services/auth';

// Helper function to get headers with auth token
const getHeaders = () => {
  const token = authService.getAccessToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function getBooks(): Promise<Book[]> {
  if (USE_MOCK_DATA) {
    return mockBooks;
  }

  const response = await fetch(`${API_BASE_URL}/book/`);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
}

export async function getBook(id: string): Promise<Book> {
  if (USE_MOCK_DATA) {
    return mockBooks[parseInt(id)];
  }

  const response = await fetch(`${API_BASE_URL}/book/${id}`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }
  return response.json();
}

export async function getBookSeries(id: string): Promise<BookPart[]> {
  if (USE_MOCK_DATA) {
    return mockBookSeries[bookId] || [];
  }

  const response = await fetch(`${API_BASE_URL}/book/${id}/books`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch book series');
  }
  return response.json();
}

export async function getBookPart(id: string, partId: string): Promise<BookPart> {
  if (USE_MOCK_DATA) {
    const series = mockBookSeries[bookId] || [];
    const part = series.find(p => p.part_id === partId);
    if (!part) {
      throw new Error('Book part not found');
    }
    return part;
  }

  const response = await fetch(`${API_BASE_URL}/book/${id}/books/${partId}`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch book part');
  }
  return response.json();
}

// Helper function to get random items from array
// function getRandomItems<T>(array: T[], count: number): T[] {
//   const shuffled = [...array].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// }

export async function getBookAuthors(id: string): Promise<Author[]> {
  if (USE_MOCK_DATA) {
    const authors = mockAuthors[bookId] || [];
//     return getRandomItems(authors, RANDOM_AUTHORS_LIMIT);
  }

  const response = await fetch(`${API_BASE_URL}/book/${id}/authors`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch book authors');
  }
//   const authors = await response.json();
  return response.json();
//   getRandomItems(authors, RANDOM_AUTHORS_LIMIT);
}