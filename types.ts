export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource: string | null;
  [key: string]: string | null; // For dynamic ingredient access
}

export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Area {
  strArea: string;
}

export interface IngredientPair {
  ingredient: string;
  measure: string;
}

export interface ApiResponse<T> {
  meals: T[] | null;
}

export interface CategoryResponse {
  categories: Category[];
}

export interface AreaResponse {
  meals: Area[];
}

export enum ChefMode {
  Tips = 'tips',
  Nutrition = 'nutrition',
  Pairing = 'pairing',
  Chat = 'chat'
}
