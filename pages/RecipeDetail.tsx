import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMealById, getIngredients } from '../services/mealDb';
import { searchYouTubeVideo } from '../services/youtube';
import { Meal } from '../types';
import { ArrowLeft, PlayCircle, Heart, Share2, Sparkles, MapPin, List, Check, Loader2 } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import ChefAssistant from '../components/ChefAssistant';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isChefOpen, setIsChefOpen] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  
  // Video State
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      if (!id) return;
      
      const data = await getMealById(id);
      if (mounted && data) {
        setMeal(data);
        setLoading(false);

        // Handle Video Logic
        let vidId = null;
        if (data.strYoutube) {
           // Extract from direct URL
           const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
           const match = data.strYoutube.match(regExp);
           if (match && match[2].length === 11) {
             vidId = match[2];
           }
        }
        
        // Fallback: Search YouTube if no ID found
        if (!vidId) {
           vidId = await searchYouTubeVideo(data.strMeal);
        }
        
        if (mounted) {
            setVideoId(vidId);
            setVideoLoading(false);
        }
      } else if (mounted) {
          setLoading(false);
      }
    };

    loadData();

    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-500" size={40} /></div>;
  if (!meal) return <div className="text-center py-20 text-xl font-serif">Recipe not found</div>;

  const ingredients = getIngredients(meal);
  const isFav = isFavorite(meal.idMeal);

  const toggleFav = () => {
    if (isFav) removeFavorite(meal.idMeal);
    else addFavorite(meal);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: meal.strMeal,
        text: `Check out this recipe for ${meal.strMeal}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard');
    }
  };

  const toggleIngredient = (ingredientName: string) => {
    const next = new Set(checkedIngredients);
    if (next.has(ingredientName)) {
        next.delete(ingredientName);
    } else {
        next.add(ingredientName);
    }
    setCheckedIngredients(next);
  };

  return (
    <div className="animate-fade-in pb-20">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 group flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors px-4 py-2 rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/10"
      >
        <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm group-hover:-translate-x-1 transition-transform">
            <ArrowLeft size={18} />
        </div>
        <span className="font-medium">Back</span>
      </button>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Image & Quick Stats (Sticky on Desktop) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 space-y-6">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-orange-900/10 relative group border-[6px] border-white dark:border-gray-800">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full aspect-[3/4] object-cover" />
                
                {/* Floating Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  <button 
                    onClick={toggleFav}
                    className={`p-3.5 backdrop-blur-xl rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 ${isFav ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600'}`}
                  >
                    <Heart size={22} className={isFav ? 'fill-current' : ''} />
                  </button>
                  <button 
                     onClick={handleShare}
                     className="p-3.5 bg-white/90 backdrop-blur-xl rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 text-blue-600"
                  >
                    <Share2 size={22} />
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                        <List size={20} className="text-orange-500 mb-2" />
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Category</span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">{meal.strCategory}</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                        <MapPin size={20} className="text-orange-500 mb-2" />
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Cuisine</span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">{meal.strArea}</span>
                    </div>
                 </div>
              </div>

              {/* AI CTA */}
              <button
                onClick={() => setIsChefOpen(true)}
                className="w-full relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-1 rounded-3xl shadow-xl shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40 hover:-translate-y-1"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-[1.3rem] p-6 h-full flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles size={16} className="text-yellow-300 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Chef Gemini</span>
                        </div>
                        <h3 className="text-lg font-serif font-bold">Ask the AI Chef</h3>
                        <p className="text-indigo-100 text-xs opacity-80">Pairings, Tips & Nutrition</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                         <Sparkles size={24} />
                    </div>
                </div>
              </button>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-8 space-y-10">
           <div className="space-y-4">
             <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white leading-tight">
               {meal.strMeal}
             </h1>
             <div className="flex flex-wrap gap-2">
                {meal.strTags?.split(',').map(tag => (
                   <span key={tag} className="text-sm font-semibold text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-300 px-4 py-1.5 rounded-full border border-orange-100 dark:border-orange-900/30">
                     #{tag.trim()}
                   </span>
                ))}
             </div>
           </div>

           {/* Ingredients Checklist */}
           <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-800">
             <div className="flex items-center justify-between mb-8">
                 <h2 className="text-3xl font-serif font-bold dark:text-white">Ingredients</h2>
                 <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    {ingredients.length} Items
                 </span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {ingredients.map((item, idx) => {
                 const isChecked = checkedIngredients.has(item.ingredient);
                 return (
                 <button 
                    key={idx} 
                    onClick={() => toggleIngredient(item.ingredient)}
                    className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left ${
                        isChecked 
                        ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30 opacity-60' 
                        : 'bg-gray-50 dark:bg-gray-800/50 border-transparent hover:bg-white hover:shadow-md dark:hover:bg-gray-800'
                    }`}
                 >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600 group-hover:border-orange-500'
                    }`}>
                        {isChecked && <Check size={14} className="text-white" />}
                    </div>
                    
                    <div className="flex-1">
                      <p className={`font-semibold capitalize transition-all ${isChecked ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                          {item.ingredient}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.measure}</p>
                    </div>

                    <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-xl p-1 shadow-sm flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                      <img 
                        src={`https://www.themealdb.com/images/ingredients/${item.ingredient}-Small.png`} 
                        alt={item.ingredient}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                 </button>
               )})}
             </div>
             <p className="mt-6 text-center text-xs text-gray-400 italic">Tap ingredients to mark them as done</p>
           </div>

           {/* Instructions */}
           <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-800">
             <h2 className="text-3xl font-serif font-bold mb-8 dark:text-white">Instructions</h2>
             <div className="space-y-8">
               {meal.strInstructions.split('\r\n').filter(i => i.trim()).map((step, idx) => (
                 <div key={idx} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center font-bold text-lg border-2 border-orange-200 dark:border-orange-800 group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                      {step}
                    </p>
                 </div>
               ))}
             </div>
           </div>

           {/* Video Embed */}
           {videoId && (
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video border-4 border-white dark:border-gray-800 bg-black">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${videoId}`} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
           )}
           
           {/* Loading State for Video Search */}
           {videoLoading && !videoId && !meal.strYoutube && (
              <div className="rounded-[2.5rem] overflow-hidden shadow-inner aspect-video bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center gap-2">
                 <Loader2 className="animate-spin text-orange-500" size={32} />
                 <p className="text-sm text-gray-500">Searching for cooking video...</p>
              </div>
           )}
        </div>
      </div>

      <ChefAssistant 
        meal={meal} 
        isOpen={isChefOpen} 
        onClose={() => setIsChefOpen(false)} 
      />
    </div>
  );
};

export default RecipeDetail;