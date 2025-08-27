import requests
import streamlit as st
from textblob import TextBlob
import os

# Load API key from environment variable
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

if not TAVILY_API_KEY:
    st.error("TAVILY_API_KEY not set. Please set it in environment variables.")

# 📰 Fetch latest gold-related news
def fetch_gold_news():
    url = "https://api.tavily.com/search"
    headers = {"Authorization": f"Bearer {TAVILY_API_KEY}"}
    params = {
        "query": "gold price news",
        "max_results": 8
    }

    response = requests.post(url, json=params, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return data.get("results", [])
    else:
        st.error(f"Error fetching news: {response.status_code}")
        return []

# 📊 Compute sentiment score from news articles
def get_sentiment_score():
    articles = fetch_gold_news()
    scores = []

    for article in articles:
        text = article.get("body", "")
        if text:
            blob = TextBlob(text)
            scores.append(blob.sentiment.polarity)

    return sum(scores) / len(scores) if scores else 0.0

# 🤖 Ask Tavily a custom question using search endpoint
def ask_tavily(question):
    url = "https://api.tavily.com/search"
    headers = {"Authorization": f"Bearer {TAVILY_API_KEY}"}
    data = {
        "query": question,
        "include_answer": True,
        "include_links": False,
        "include_images": False,
        "max_results": 3
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        return response.json().get("answer", "No answer found.")
    else:
        return f"Error: {response.status_code} - {response.text}"
