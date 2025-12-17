import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import RecipeCard from '../components/RecipeCard';
import { Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="space-y-10 animate-fade-in pb-10">
       <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
         <div className="p-4 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-[1.5rem] shadow-sm">
           <Heart size={32} className="fill-current" />
         </div>
         <div>
             <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">Your Favorites</h1>
             <p className="text-gray-500 dark:text-gray-400 mt-1">{favorites.length} recipes saved</p>
         </div>
       </div>

       {favorites.length === 0 ? (
         <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-gray-900 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-800 text-center space-y-6">
           <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-2">
                <Heart size={40} className="text-gray-300 dark:text-gray-600" />
           </div>
           <div className="max-w-md mx-auto px-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No favorites yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                    Recipes you love will appear here. Tap the heart icon on any recipe to save it for later.
                </p>
                <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 transition-all hover:-translate-y-1">
                    <Search size={20} />
                    Explore Recipes
                </Link>
           </div>
         </div>
       ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {favorites.map((meal, index) => (
             <RecipeCard key={meal.idMeal} meal={meal} index={index} />
           ))}
         </div>
       )}
    </div>
  );
};

export default Favorites;