import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookList } from './pages/BookList';
import { BookDetail } from './pages/BookDetail';
import { BookSeries } from './pages/BookSeries';
import { BookPartDetail } from './pages/BookPartDetail';
import { BookAuthors } from './pages/BookAuthors';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/book/:id/books" element={<BookSeries />} />
        <Route path="/book/:id/books/:partId" element={<BookPartDetail />} />
        <Route path="/book/:id/authors/" element={<BookAuthors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;