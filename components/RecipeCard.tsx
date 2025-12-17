import React from 'react';
import { Link } from 'react-router-dom';
import { MealSummary, Meal } from '../types';
import { Clock, Users, ChevronRight } from 'lucide-react';

interface RecipeCardProps {
  meal: MealSummary | Meal;
  index?: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ meal, index = 0 }) => {
  // MealSummary sometimes doesn't have area/category depending on the endpoint used
  const category = (meal as Meal).strCategory;
  const area = (meal as Meal).strArea;

  return (
    <Link 
      to={`/recipe/${meal.idMeal}`}
      className="group bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 border border-gray-100 dark:border-gray-800 flex flex-col h-full animate-slide-up"
      style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Floating Category Tag */}
        {(category || area) && (
          <div className="absolute top-4 left-4 flex flex-col gap-1 items-start opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
             {category && (
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-orange-600 text-xs font-bold rounded-full shadow-sm">
                  {category}
                </span>
             )}
          </div>
        )}

        <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <ChevronRight size={20} />
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        {area && (
          <span className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2">
            {area} Cuisine
          </span>
        )}
        
        <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors flex-grow">
          {meal.strMeal}
        </h3>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm">
          <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full">
            <Clock size={14} className="text-orange-500" />
            <span className="font-medium">30m</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full">
            <Users size={14} className="text-orange-500" />
            <span className="font-medium">2-4</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;