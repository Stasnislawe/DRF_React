import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookList } from './pages/BookList';
import { BookDetail } from './pages/BookDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;