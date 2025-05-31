# Recipe Manager + Meal Planner

An AI-powered web app that helps users generate, store, and explore recipes based on ingredients. Built with **FastAPI** for the backend and **React** for the frontend.

---

## Features

### Core Functionalities

* 🔮 Generate recipes using AI based on ingredients
* 💾 Save recipes to a SQLite database
* 📋 View all saved recipes
* 🧠 Get recommended recipes based on ingredients

### Tech Stack

* **Frontend**: React, Axios, Tailwind
* **Backend**: FastAPI, SQLAlchemy, Pydantic, SQLite
* **AI Integration**: Gemini API

---

## Project Structure

```
.
├── server/
│   ├── main.py
│   ├── database.py
│   ├── models/
│   │   └── recipe.py
│   ├── .env
│   └── recipes.db
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── App.jsx
    │   └── ...
    ├── public/
    ├── package.json
    └── ...
```

---

## Getting Started

### Backend (FastAPI)

#### 1. Navigate to backend folder

```bash
cd server
```

#### 2. Create virtual environment & install dependencies

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

pip install fastapi uvicorn sqlalchemy pydantic python-dotenv requests
```

#### 3. Create `.env` file

```
GEMINI_KEY=your_openrouter_api_key
```

#### 4. Run the backend server

```bash
uvicorn main:app --reload
```

The API will run at `http://127.0.0.1:8000`

---

### Frontend (React)

#### 1. Navigate to frontend folder

```bash
cd client
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Start the development server

```bash
npm run dev
```

React app runs at `http://localhost:5173`

---

## API Endpoints (FastAPI)

### `POST /generate_recipe`

> Generate and store a recipe using AI
> **Body**:

```json
{
  "ingredients": ["garlic", "onion"]
}
```

---

### `GET /recipes`

> Fetch all stored recipes

---

### `POST /recommended_recipes`

> Get recipes that match any of the given ingredients or tags
> **Body**:

```json
{
  "ingredients": ["tomato", "onion"],
  "tags": ["dinner"]
}
```

---

## Example .env File

```env
GEMINI_KEY=gemini_api_key
```

---

## Future Improvements

* 🗓️ Add meal planning calendar
* 👤 User authentication
* 📦 Export recipe as PDF
* 🐳 Dockerize backend and frontend

---

## Author

**Tilak Jain**

> Student with Passion for Web Dev + AI 🍳