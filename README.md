<div align="center">
  <h1>🍽️ Mealify – Recipe Finder App</h1>
  <p><b>A modern recipe search application built with React Native</b></p>

  <p>
    🔍 Search meals • 📖 View recipe details • ❤️ Save favorites • 🌗 Theme toggle
  </p>
</div>

---

## 📌 Project Overview

**Mealify** is a recipe finder application that allows users to search for meals, view detailed recipes, and save their favorite dishes.  
The app fetches data from **TheMealDB API** and is designed with a clean UI, smooth navigation, and scalable architecture.

**Duration:** 1–2 Days  
**Difficulty:** Medium  
**Task by:** Dev Innovation Lab

---

## 🚀 Features

### ✅ Core Features
- 🔍 Search meals by name
- 🧾 Display recipe cards (image, name, category)
- 📖 Recipe details screen
- ⏳ Loading indicators
- ❌ Error handling for API failures

### ⭐ Bonus Features
- ❤️ Save favorite meals
- 🌗 Light / Dark theme toggle
- 🎞️ Smooth screen transitions

---

## 🛠 Tech Stack

- React Native CLI
- React Navigation
- AsyncStorage / Redux Toolkit
- TheMealDB API
- JavaScript (Optional: TypeScript)

---

## 📂 Project Structure

```bash
Mealify/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── MealCard.js
│   │
│   ├── screens/             # Application screens
│   │   ├── HomeScreen.js
│   │   ├── RecipeDetailsScreen.js
│   │   └── FavoritesScreen.js
│   │
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.js
│   │
│   ├── services/            # API calls & external services
│   │   └── api.js
│   │
│   └── App.js               # Root application component
│
├── package.json             # Project dependencies & scripts
├── babel.config.js          # Babel configuration
├── README.md                # Project documentation
