import { Book, BookPart, Author } from '../types/book';
import { USE_MOCK_DATA, RANDOM_AUTHORS_LIMIT, API_URL } from '../config';
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

  if (!authService.isAuthenticated()) {
    // For unauthenticated users, fetch only free books
    const freeBooks = await Promise.all([
      fetch(`${API_URL}/book/True/3/`).then(res => res.json()),
      fetch(`${API_URL}/book/True/2/`).then(res => res.json())
    ]);
    return freeBooks;
  }

  const response = await fetch(`${API_URL}/book/`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
}

export async function getBook(id: string): Promise<Book> {
  if (USE_MOCK_DATA) {
    return mockBooks[parseInt(id)];
  }

//   const url = !authService.isAuthenticated()
//     ? `${API_URL}/book/True/${id}`
//     : `${API_URL}/book/False/${id}`;

//   const response = await fetch(url, {
//     headers: getHeaders(),
//   });
  if (!authService.isAuthenticated()) {
    // For unauthenticated users, fetch only free books
    const freeBook = await Promise.all([
      fetch(`${API_URL}/book/True/${id}/`).then(res => res.json()),
    ]);
    return freeBook;
  }

  const response = await fetch(`${API_URL}/book/False/${id}/`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }
  return response.json();
}

export async function getBookSeries(bookId: string): Promise<BookPart[]> {
  if (USE_MOCK_DATA) {
    return mockBookSeries[bookId] || [];
  }

  const url = !authService.isAuthenticated()
    ? `${API_URL}/book/${bookId}/books`
    : `${API_URL}/book/${bookId}/books`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch book series');
  }
  return response.json();
}

export async function getBookPart(bookId: string, partId: string): Promise<BookPart> {
  if (USE_MOCK_DATA) {
    const series = mockBookSeries[bookId] || [];
    const part = series.find(p => p.id === partId);
    if (!part) {
      throw new Error('Book part not found');
    }
    return part;
  }

  const url = !authService.isAuthenticated()
    ? `${API_URL}/book/${bookId}/books/${partId}`
    : `${API_URL}/book/${bookId}/books/${partId}`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch book part');
  }
  return response.json();
}

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function getBookAuthors(bookId: string): Promise<Author[]> {
  if (USE_MOCK_DATA) {
    const authors = mockAuthors[bookId] || [];
    return getRandomItems(authors, RANDOM_AUTHORS_LIMIT);
  }

  const url = !authService.isAuthenticated()
    ? `${API_URL}/book/${bookId}/authors`
    : `${API_URL}/book/${bookId}/authors`;

  const response = await fetch(url, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch book authors');
  }
  const authors = await response.json();
  return getRandomItems(authors, RANDOM_AUTHORS_LIMIT);
}