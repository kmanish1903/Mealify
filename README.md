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
Mealify/
├── android/
├── ios/
├── src/
│   ├── components/
│   │   ├── MealCard.js
│   │   ├── Loader.js
│   │   ├── ErrorView.js
│   │   └── ThemeToggle.js
│   │
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── RecipeDetailsScreen.js
│   │   └── FavoritesScreen.js
│   │
│   ├── navigation/
│   │   └── AppNavigator.js
│   │
│   ├── services/
│   │   └── mealApi.js
│   │
│   ├── store/
│   │   ├── index.js
│   │   └── favoritesSlice.js
│   │
│   ├── theme/
│   │   └── theme.js
│   │
│   ├── utils/
│   │   └── constants.js
│   │
│   └── App.js
│
├── .gitignore
├── package.json
├── README.md
└── babel.config.js

---

## 🔗 API Used

**TheMealDB API**


---

## ⚙️ Run Locally

### Prerequisites
- Node.js
- React Native CLI
- Android Studio / Xcode

### Steps

```bash
npm install
npx react-native run-android
# or
npx react-native run-ios
