from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import pickle
from sklearn.metrics.pairwise import cosine_similarity
from pydantic import BaseModel

# Create FastAPI Application
app = FastAPI()

 
# Enable CORS

app.add_middleware(
    CORSMiddleware,
   allow_origins=[
    "http://localhost:5173",  # React
    "http://localhost:5000",  # Node  # no need for node as cors is only for browser request
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

 
# Request Model
class RecommendationRequest(BaseModel):
    movie_ids: list[int]
 

with open("movies.pkl", "rb") as file:
    movies = pickle.load(file)

with open("tfidf.pkl", "rb") as file:
    tfidf = pickle.load(file)

with open("tfidf_matrix.pkl", "rb") as file:
    tfidf_matrix = pickle.load(file)

print(movies[["id", "title"]].head(20))
print(movies.iloc[17]["id"])
print(type(movies.iloc[17]["id"]))
 

def recommend_by_id(movie_id: int, n: int = 10):

    # Find the movie using TMDB ID
    movie = movies[movies["id"] == movie_id]

    # Movie not found
    if movie.empty:
        return []

    # Get DataFrame index
    idx = movie.index[0]

    # Calculate cosine similarity
    similarity_scores = cosine_similarity(
        tfidf_matrix[idx],
        tfidf_matrix
    ).flatten()

    # Get indices of top similar movies
    similar_indices = similarity_scores.argsort()[::-1][1:n+1]

    recommendations = []

    for index in similar_indices:

        recommendations.append({
            "tmdbId": int(movies.iloc[index]["id"]),
            "title": movies.iloc[index]["title"],
            "score": round(float(similarity_scores[index]), 4)
        })

    return recommendations
 

@app.get("/")
def home():

    return {
        "message": "Movie Recommendation API Running 🚀"
    }


@app.get("/health")
def health():

    return {
        "status": "OK"
    }

@app.get("/recommend/similar/{movie_id}")
def similar_movies(movie_id: int):

    recommendations = recommend_by_id(movie_id)

    if not recommendations:
        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    return recommendations


def recommend_from_favorites(movie_ids, n=10):

    scores = {}

    for movie_id in movie_ids:

        recommendations = recommend_by_id(movie_id, 20)

        for rec in recommendations:

            tmdb_id = rec["tmdbId"]

            # Skip movies already liked by the user
            if tmdb_id in movie_ids:
                continue

            if tmdb_id not in scores:

                scores[tmdb_id] = {
                    "tmdbId": tmdb_id,
                    "title": rec["title"],
                    "score": rec["score"]
                }

            else:

                scores[tmdb_id]["score"] += rec["score"]

    final = sorted(
        scores.values(),
        key=lambda x: x["score"],
        reverse=True
    )

    return final[:n]

@app.post("/recommend/personalized")
def personalized_recommendations(request: RecommendationRequest):

    recommendations = recommend_from_favorites(request.movie_ids)

    return recommendations