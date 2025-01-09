const API_BASE_URL = 'http://127.0.0.1:8000';

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(`${API_BASE_URL}/book/`);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
}

export async function getBook(id: number): Promise<Book> {
  const response = await fetch(`${API_BASE_URL}/book/${id}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }
  return response.json();
}