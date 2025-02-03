import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookList } from './pages/BookList';
import { BookDetail } from './pages/BookDetail';
import { BookSeries } from './pages/BookSeries';
import { BookPartDetail } from './pages/BookPartDetail';
import { BookAuthors } from './pages/BookAuthors';
import { Navbar } from './components/Navbar';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthGuard } from './components/AuthGuard';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          }
        />
        <Route
          path="/book/:id/books"
          element={
            <AuthGuard>
              <BookSeries />
            </AuthGuard>
          }
        />
        <Route
          path="/book/:id/books/:partId"
          element={
            <AuthGuard>
              <BookPartDetail />
            </AuthGuard>
          }
        />
        <Route
          path="/book/:id/authors"
          element={
            <AuthGuard>
              <BookAuthors />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
