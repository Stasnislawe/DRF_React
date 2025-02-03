import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Moon, Sun } from 'lucide-react';
import { authService } from '../services/auth';
import { useTheme } from '../context/ThemeContext';

export function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-0 right-0 m-4 z-50 flex gap-2">
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {!isAuthenticated && (
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In</span>
        </button>
      )}
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
