import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ChefHat, Heart, Home, Moon, Sun } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50 transition-all supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500 rounded-xl rotate-0 group-hover:rotate-6 transition-transform duration-300 opacity-20 dark:opacity-40"></div>
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-xl text-white transform group-hover:-rotate-3 transition-transform duration-300 shadow-lg shadow-orange-500/20">
                  <ChefHat size={24} />
                </div>
              </div>
              <span className="font-serif text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Mealify
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to="/favorites"
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                  isActive('/favorites')
                    ? 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400 shadow-sm'
                    : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                }`}
                aria-label="Favorites"
              >
                <Heart size={22} className={isActive('/favorites') ? 'fill-current' : ''} />
              </Link>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-all duration-300 hover:rotate-12"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={22} /> : <Moon size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-2xl z-50 p-2">
        <div className="flex justify-around items-center">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 p-2 w-full rounded-xl transition-colors ${
              isActive('/') ? 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Home size={20} />
            <span className="text-[10px] font-bold uppercase tracking-wide">Home</span>
          </Link>
          <Link
            to="/favorites"
            className={`flex flex-col items-center gap-1 p-2 w-full rounded-xl transition-colors ${
              isActive('/favorites') ? 'text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Heart size={20} />
            <span className="text-[10px] font-bold uppercase tracking-wide">Saved</span>
          </Link>
        </div>
      </nav>
      
      {/* Spacer for bottom nav on mobile */}
      <div className="h-24 md:hidden"></div>
    </div>
  );
};

export default Layout;