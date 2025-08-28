import { Book, BookPart, Author } from '../types/book';
import { USE_MOCK_DATA, RANDOM_AUTHORS_LIMIT, API_URL } from '../config';
import { mockBooks, mockBookSeries, mockAuthors } from '../mocks/books';
import { authService } from '../services/auth';

export async function getBooks(): Promise<Book[]> {
  if (USE_MOCK_DATA) {
    return mockBooks;
  }

  if (!authService.isAuthenticated()) {
    // For unauthenticated users, fetch only free books
    try {
      const [freeBooks1, freeBooks2] = await Promise.all([
        fetch(`${API_URL}/book/True/3/`).then(res => res.json()),
        fetch(`${API_URL}/book/True/2/`).then(res => res.json())
      ]);
      return [...freeBooks1, ...freeBooks2];
    } catch (error) {
      console.error('Error fetching free books:', error);
      throw new Error('Failed to fetch free books');
    }
  }

  try {
    const response = await authService.authenticatedFetch(`${API_URL}/book/`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

export async function getBook(id: string): Promise<Book> {
  if (USE_MOCK_DATA) {
    return mockBooks[parseInt(id)];
  }

  if (!authService.isAuthenticated()) {
    // For unauthenticated users, fetch only free books
    try {
      const response = await fetch(`${API_URL}/book/True/${id}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch free book');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching free book:', error);
      throw error;
    }
  }

  try {
    const response = await authService.authenticatedFetch(`${API_URL}/book/False/${id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch book');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
}

export async function getBookSeries(bookId: string): Promise<BookPart[]> {
  if (USE_MOCK_DATA) {
    return mockBookSeries[bookId] || [];
  }

  const url = `${API_URL}/book/${bookId}/books`;

  try {
    if (authService.isAuthenticated()) {
      const response = await authService.authenticatedFetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch book series');
      }
      return response.json();
    } else {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch book series');
      }
      return response.json();
    }
  } catch (error) {
    console.error('Error fetching book series:', error);
    throw error;
  }
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

  const url = `${API_URL}/book/${bookId}/books/${partId}`;

  try {
    if (authService.isAuthenticated()) {
      const response = await authService.authenticatedFetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch book part');
      }
      return response.json();
    } else {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch book part');
      }
      return response.json();
    }
  } catch (error) {
    console.error('Error fetching book part:', error);
    throw error;
  }
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

  const url = `${API_URL}/book/${bookId}/authors`;

  try {
    if (authService.isAuthenticated()) {
      const response = await authService.authenticatedFetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch book authors');
      }
      const authors = await response.json();
      return getRandomItems(authors, RANDOM_AUTHORS_LIMIT);
    } else {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch book authors');
      }
      const authors = await response.json();
      return getRandomItems(authors, RANDOM_AUTHORS_LIMIT);
    }
  } catch (error) {
    console.error('Error fetching book authors:', error);
    throw error;
  }
}