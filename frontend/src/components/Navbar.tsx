import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User } from 'lucide-react';
import { authService } from '../services/auth';

export function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return (
      <div className="fixed top-0 right-0 m-4 z-50">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
        >
          <LogIn className="w-4 h-4" />
          <span>Авторизироваться</span>
        </button>
      </div>
    );
  }

//   return (
//     <div className="fixed top-0 right-0 m-4 z-50">
//       <button
//         onClick={() => navigate('/profile')}
//         className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
//       >
//         <User className="w-4 h-4" />
//         <span>Profile</span>
//       </button>
//     </div>
//   );
}