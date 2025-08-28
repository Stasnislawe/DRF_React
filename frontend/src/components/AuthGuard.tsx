import { ReactNode } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { authService } from '../services/auth';
import { getBook } from '../api/books';
import { useState, useEffect } from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const location = useLocation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isFreeBook, setIsFreeBook] = useState(false);

  useEffect(() => {
    const checkBookAccess = async () => {
      if (id) {
        try {
          const book = await getBook(id);
          setIsFreeBook(book.book_free);
        } catch (error) {
          console.error('Error checking book access:', error);
          setIsFreeBook(false);
        }
      }
      setIsLoading(false);
    };

    checkBookAccess();
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  // Allow access if the book is free or user is authenticated
  if (isFreeBook || authService.isAuthenticated()) {
    return <>{children}</>;
  }

  // Redirect to login if not free and not authenticated
  return <Navigate to="/login" state={{ from: location }} replace />;
}