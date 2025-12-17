import { ApiResponse, AreaResponse, CategoryResponse, Meal, MealSummary } from '../types';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMeals = async (query: string): Promise<Meal[] | null> => {
  try {
    const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data: ApiResponse<Meal> = await res.json();
    return data.meals;
  } catch (error) {
    console.error('Error searching meals:', error);
    return null;
  }
};

export const getMealById = async (id: string): Promise<Meal | null> => {
  try {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data: ApiResponse<Meal> = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error getting meal by ID:', error);
    return null;
  }
};

export const getRandomMeal = async (): Promise<Meal | null> => {
  try {
    const res = await fetch(`${BASE_URL}/random.php`);
    const data: ApiResponse<Meal> = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error getting random meal:', error);
    return null;
  }
};

export const getCategories = async (): Promise<CategoryResponse | null> => {
  try {
    const res = await fetch(`${BASE_URL}/categories.php`);
    const data: CategoryResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error getting categories:', error);
    return null;
  }
};

export const getAreas = async (): Promise<AreaResponse | null> => {
  try {
    const res = await fetch(`${BASE_URL}/list.php?a=list`);
    const data: AreaResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error getting areas:', error);
    return null;
  }
};

export const getMealsByCategory = async (category: string): Promise<MealSummary[] | null> => {
  try {
    const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data: ApiResponse<MealSummary> = await res.json();
    return data.meals;
  } catch (error) {
    console.error('Error getting meals by category:', error);
    return null;
  }
};

export const getMealsByArea = async (area: string): Promise<MealSummary[] | null> => {
  try {
    const res = await fetch(`${BASE_URL}/filter.php?a=${area}`);
    const data: ApiResponse<MealSummary> = await res.json();
    return data.meals;
  } catch (error) {
    console.error('Error getting meals by area:', error);
    return null;
  }
};

// Helper to extract ingredients and measures into a clean array
export const getIngredients = (meal: Meal): { ingredient: string; measure: string }[] => {
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : '',
      });
    }
  }
  return ingredients;
};
