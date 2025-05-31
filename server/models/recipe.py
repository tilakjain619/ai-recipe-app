from pydantic import BaseModel
from database import Base
from typing import List, Optional
from sqlalchemy import Column, Integer, String, JSON, DateTime
from datetime import datetime

# SQLAlchemy model
class RecipeModel(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    ingredients = Column(JSON)
    steps = Column(JSON)
    tags = Column(JSON)
    createdAt = Column(DateTime, default=datetime.utcnow)

# Pydantic models
class RecipeRequest(BaseModel):
    ingredients: List[str]

class RecipeResponse(BaseModel):
    title: str
    description: str
    ingredients: List[str]
    steps: List[str]
    tags: List[str]
    createdAt: datetime

    class Config:
        orm_mode = True

class RecipeFilterRequest(BaseModel):
    ingredients: Optional[List[str]] = None