import { GoogleGenAI } from "@google/genai";
import { Meal } from '../types';

// Initialize Gemini
// NOTE: In a real environment, ensure process.env.API_KEY is set.
// For this demo, we assume the environment variable is available.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const askChefGemini = async (meal: Meal, mode: string, userQuery?: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, my AI brain (API Key) is currently missing. Please configure the application with a valid Gemini API Key.";
  }

  const model = 'gemini-2.5-flash';

  let prompt = '';
  const context = `
    You are a world-class Michelin star chef and nutritionist assistant.
    The user is looking at a recipe for "${meal.strMeal}".
    
    Recipe Details:
    - Category: ${meal.strCategory}
    - Area: ${meal.strArea}
    - Ingredients: ${meal.strIngredient1}, ${meal.strIngredient2}, ${meal.strIngredient3}... (and others)
  `;

  switch (mode) {
    case 'nutrition':
      prompt = `${context}
      Provide a concise nutritional estimation for this dish. Focus on calories, protein, carbs, and fats. Mention if it's high in sodium or sugar. Keep it under 150 words. Format with bullet points.`;
      break;
    case 'pairing':
      prompt = `${context}
      Suggest the perfect beverage pairing for this dish. Recommend a wine (type and region), a beer, and a non-alcoholic option. Explain why they pair well in 1-2 sentences each.`;
      break;
    case 'tips':
      prompt = `${context}
      Give 3 pro-chef cooking tips to make this specific "${meal.strMeal}" recipe taste even better or easier to cook. Keep it encouraging and concise.`;
      break;
    case 'chat':
      prompt = `${context}
      User Question: "${userQuery}"
      Answer the user's question specifically about this recipe. Be helpful, friendly, and brief.`;
      break;
    default:
      prompt = `${context} Tell me a fun fact about this dish.`;
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "Sorry, I couldn't think of anything right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my culinary database right now. Please try again later.";
  }
};
