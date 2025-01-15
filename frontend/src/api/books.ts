import { Book, BookPart, Author } from '../types/book';
import { USE_MOCK_DATA } from '../config';
import { mockBooks, mockBookSeries, mockAuthors } from '../mocks/books';

const API_BASE_URL = 'http://127.0.0.1:8000';

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

  const response = await fetch(`${API_BASE_URL}/book/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }
  return response.json();
}

export async function getBookSeries(id: number): Promise<BookPart[]> {
  if (USE_MOCK_DATA) {
    return mockBookSeries[bookId] || [];
  }

  const response = await fetch(`${API_BASE_URL}/book/${id}/books`);
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

  const response = await fetch(`${API_BASE_URL}/book/${bookId}/books/${partId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch book part');
  }
  return response.json();
}

export async function getBookAuthors(bookId: string): Promise<Author[]> {
  if (USE_MOCK_DATA) {
    return mockAuthors[bookId] || [];
  }

  const response = await fetch(`${API_BASE_URL}/book/${bookId}/authors`);
  if (!response.ok) {
    throw new Error('Failed to fetch book authors');
  }
  return response.json();
}