import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import RecipeCard from '../components/RecipeCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex items-center gap-3">
         <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-2xl">
           <Heart size={24} className="fill-current" />
         </div>
         <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Your Favorites</h1>
       </div>

       {favorites.length === 0 ? (
         <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
           <Heart size={48} className="mx-auto text-gray-200 dark:text-gray-700 mb-4" />
           <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No favorites yet</h3>
           <p className="text-gray-500 dark:text-gray-400 mb-6">Start exploring and save the recipes you love!</p>
           <Link to="/" className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors">
             Explore Recipes
           </Link>
         </div>
       ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {favorites.map((meal) => (
             <RecipeCard key={meal.idMeal} meal={meal} />
           ))}
         </div>
       )}
    </div>
  );
};

export default Favorites;
