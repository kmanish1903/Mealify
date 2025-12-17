import { useState, useEffect } from 'react';
import { Meal } from '../types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('mealify_favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  const saveFavorites = (updatedFavorites: Meal[]) => {
    setFavorites(updatedFavorites);
    localStorage.setItem('mealify_favorites', JSON.stringify(updatedFavorites));
  };

  const addFavorite = (meal: Meal) => {
    if (!favorites.some(f => f.idMeal === meal.idMeal)) {
      saveFavorites([...favorites, meal]);
    }
  };

  const removeFavorite = (id: string) => {
    saveFavorites(favorites.filter(f => f.idMeal !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(f => f.idMeal === id);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
