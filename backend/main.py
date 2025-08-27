from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd
import numpy as np
from tavily_utils import fetch_gold_news, get_sentiment_score, ask_tavily
import os
import pickle

# Get the directory of the current file
BASE_DIR = os.path.dirname(__file__)

# Build the full path to the model
model_path = os.path.join(BASE_DIR, "SarimaxModel.pkl")

# Load the model
with open(model_path, "rb") as f:
    model = pickle.load(f)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Prediction ----------------
class PredictInput(BaseModel):
    exog: list  # last 7 days prices

@app.post("/predict")
def predict(input_data: PredictInput):
    try:
        if len(input_data.exog) != 7:
            return {"error": "Please provide exactly 7 past prices."}
        exog_input = pd.DataFrame([input_data.exog], columns=[f"lag{i}" for i in range(1, 8)])
        pred = model.forecast(steps=1, exog=exog_input)
        return {"prediction": [float(pred.iloc[0])]}
    except Exception as e:
        return {"error": str(e)}

# ---------------- News ----------------
@app.get("/news")
def news():
    articles = fetch_gold_news()
    return {"articles": articles[:8] if articles else []}

# ---------------- Sentiment ----------------
@app.get("/sentiment")
def sentiment():
    score = get_sentiment_score()
    return {"score": score}

# ---------------- Tavily Q&A ----------------
class QuestionInput(BaseModel):
    question: str
    
@app.get("/")
def home():
    return {"message": "API is running correctly!"}

@app.post("/ask")
def ask_question(q: QuestionInput):
    if not q.question:
        return {"error": "No question provided."}
    answer = ask_tavily(q.question)
    return {"answer": answer}
