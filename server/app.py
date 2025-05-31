from fastapi import FastAPI, Depends, Body
import requests, json, os
from dotenv import load_dotenv
from models.recipe import RecipeModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import recipe  # Assuming this has both RecipeRequest and RecipeModel
from database import Base, engine, SessionLocal
from sqlalchemy import or_

# Create tables
Base.metadata.create_all(bind=engine)

# Load environment variables
load_dotenv()

# Setup FastAPI
app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def say_hello():
    return "Home for Recipe Manager and Meal Planner"

@app.post("/generate_recipe")
async def generate_recipe_using_ai(
    recipe_request: recipe.RecipeRequest,
    db: Session = Depends(get_db)
):
    ingredients = recipe_request.ingredients

    # Prepare prompt
    prompt = f"""Generate a recipe using these ingredients: {', '.join(ingredients)}.
Strictly return the results in this JSON format:
{{
    "title": "Generated Recipe Title",
    "description": "Description about generated recipe, upto 30 words",
    "ingredients": ["ingredient1", "ingredient2", "ingredient3"],
    "steps": ["step1", "step2", "stepN"],
    "tags": ["category1", "category2"]
}}
Do **not** include any additional text outside of this JSON format."""

    # Call Gemini API
    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {os.getenv('GEMINI_KEY')}",
            "Content-Type": "application/json"
        },
        data=json.dumps({
            "model": "google/gemma-3n-e4b-it:free",
            "messages": [{
                "role": "user",
                "content": [{"type": "text", "text": prompt}]
            }]
        })
    )

    response_json = response.json()

    if "choices" in response_json and response_json["choices"]:
        raw_content = response_json["choices"][0]["message"]["content"]

        # Remove code block markers if any
        if raw_content.startswith("```json"):
            raw_content = raw_content[7:]
        if raw_content.endswith("```"):
            raw_content = raw_content[:-3]

        try:
            parsed_recipe = json.loads(raw_content)

            # Store in DB
            recipe_model = RecipeModel(
                title=parsed_recipe["title"],
                description=parsed_recipe["description"],
                ingredients=parsed_recipe["ingredients"],
                steps=parsed_recipe["steps"],
                tags=parsed_recipe["tags"]
            )
            db.add(recipe_model)
            db.commit()
            db.refresh(recipe_model)

            return {"message": "Recipe generated successfully!", "recipe": parsed_recipe}
        except Exception as e:
            return {"error": f"Failed to parse/store recipe: {str(e)}"}

    return {"error": "API response structure is invalid. Check your request or API status."}


@app.get("/recipes", response_model=List[recipe.RecipeResponse])
def get_all_recipes(db: Session = Depends(get_db)):
    recipes = db.query(RecipeModel).all()
    return [
        {
            "title": r.title,
            "description": r.description,
            "ingredients": r.ingredients,
            "steps": r.steps,
            "tags": r.tags,
            "createdAt": r.createdAt
        }
        for r in recipes
    ]


@app.post("/recommended_recipes", response_model=List[recipe.RecipeResponse])
def get_recommended_recipes(
    filters: recipe.RecipeFilterRequest = Body(...),
    db: Session = Depends(get_db)
):
    query = db.query(RecipeModel)
    
    if filters.ingredients:
        query = query.filter(or_(*[RecipeModel.ingredients.contains(ingredient) for ingredient in filters.ingredients]))

    results = query.all()
    
    return results
