import React, { useState, useEffect } from 'react';
import { searchMeals, getRandomMeal, getCategories, getMealsByCategory, getAreas, getMealsByArea } from '../services/mealDb';
import { Meal, Category, MealSummary, Area } from '../types';
import RecipeCard from '../components/RecipeCard';
import { Search, Loader2, Shuffle, UtensilsCrossed, Globe, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type FilterType = 'Category' | 'Area';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState<(Meal | MealSummary)[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>('Category');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const navigate = useNavigate();

  // Initial load
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const [cats, areaData] = await Promise.all([
        getCategories(), 
        getAreas()
      ]); 
      
      if (cats) setCategories(cats.categories);
      if (areaData) setAreas(areaData.meals);
      
      // Load some default meals
      const defaults = await searchMeals('Chicken');
      if (defaults) setMeals(defaults);
      
      setLoading(false);
    };
    init();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setActiveFilter('All');
    const results = await searchMeals(query);
    setMeals(results || []);
    setLoading(false);
  };

  const handleFilterClick = async (type: FilterType, value: string) => {
    setActiveFilter(value);
    setFilterType(type);
    setLoading(true);
    setQuery('');
    
    if (value === 'All') {
       const defaults = await searchMeals('Chicken');
       setMeals(defaults || []);
    } else {
      let results: MealSummary[] | null = null;
      if (type === 'Category') {
        results = await getMealsByCategory(value);
      } else {
        results = await getMealsByArea(value);
      }
      setMeals(results || []);
    }
    setLoading(false);
  };

  const handleRandom = async () => {
    setLoading(true);
    const meal = await getRandomMeal();
    setLoading(false);
    if (meal) {
      navigate(`/recipe/${meal.idMeal}`);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Modern Hero Search Section */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-gray-900/20 overflow-hidden text-center isolate">
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/30 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating Elements (Decorative) */}
        <div className="hidden md:block absolute top-10 left-10 text-4xl animate-float opacity-20 hover:opacity-100 transition-opacity cursor-default">🥑</div>
        <div className="hidden md:block absolute bottom-10 right-10 text-4xl animate-float opacity-20 hover:opacity-100 transition-opacity cursor-default" style={{ animationDelay: '2s' }}>🍜</div>
        <div className="hidden md:block absolute top-10 right-20 text-4xl animate-float opacity-20 hover:opacity-100 transition-opacity cursor-default" style={{ animationDelay: '1.5s' }}>🌶️</div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-orange-200 text-sm font-medium animate-slide-up">
                <Sparkles size={16} />
                <span>Discover over 50,000+ recipes</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-tight animate-slide-up" style={{ animationDelay: '100ms' }}>
               Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">World</span>
             </h1>
             <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
               From quick weeknight dinners to gourmet weekend feasts, find the perfect dish for any occasion.
             </p>
          </div>
          
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto group animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative flex items-center bg-white dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl p-2 transition-all border border-transparent focus-within:border-orange-500/50">
              <Search className="ml-4 text-gray-400" size={24} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try 'Pasta', 'Curry', or 'Vegan'..."
                className="w-full px-4 py-3 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 text-lg"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
              >
                Search
              </button>
            </div>
          </form>

          <button 
            onClick={handleRandom}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors animate-slide-up"
            style={{ animationDelay: '400ms' }}
          >
            <Shuffle size={16} />
            <span>Surprise me with a random recipe</span>
          </button>
        </div>
      </div>

      {/* Modern Filter Tabs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-1">
          <div className="flex gap-8">
            <button
              onClick={() => setFilterType('Category')}
              className={`flex items-center gap-2 pb-3 text-sm font-semibold tracking-wide transition-all relative ${
                filterType === 'Category' 
                  ? 'text-orange-600 dark:text-orange-400' 
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
              }`}
            >
              <UtensilsCrossed size={18} />
              CATEGORIES
              {filterType === 'Category' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-t-full layout-id-active-tab" />
              )}
            </button>
            <button
              onClick={() => setFilterType('Area')}
              className={`flex items-center gap-2 pb-3 text-sm font-semibold tracking-wide transition-all relative ${
                filterType === 'Area' 
                  ? 'text-orange-600 dark:text-orange-400' 
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
              }`}
            >
              <Globe size={18} />
              CUISINES
              {filterType === 'Area' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-t-full layout-id-active-tab" />
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar items-center mask-linear-fade">
          <button
            onClick={() => handleFilterClick(filterType, 'All')}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === 'All'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
            }`}
          >
            All
          </button>
          
          {filterType === 'Category' ? (
            categories.map((cat) => (
              <button
                key={cat.idCategory}
                onClick={() => handleFilterClick('Category', cat.strCategory)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === cat.strCategory
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
                }`}
              >
                {activeFilter === cat.strCategory && (
                  <img src={cat.strCategoryThumb} alt="" className="w-5 h-5 object-cover rounded-full" />
                )}
                {cat.strCategory}
              </button>
            ))
          ) : (
            areas.map((area) => (
              <button
                key={area.strArea}
                onClick={() => handleFilterClick('Area', area.strArea)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === area.strArea
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
                }`}
              >
                {area.strArea}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Results Grid with Staggered Animation */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="animate-spin text-orange-500" size={48} />
          <p className="text-gray-500 font-medium animate-pulse">Curating delicious recipes...</p>
        </div>
      ) : meals && meals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {meals.map((meal, index) => (
            <RecipeCard key={meal.idMeal} meal={meal} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
          <div className="text-6xl mb-4">🍳</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No recipes found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try searching for a different ingredient or cuisine.</p>
        </div>
      )}
    </div>
  );
};

export default Home;