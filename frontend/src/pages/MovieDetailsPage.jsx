import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  fetchMovieDetails,
  
} from "../services/movieService";
import { fetchRecommendations,fetchSimilarMovies } from "../services/recommendationService";

import {
  addFavorite,
  removeFavorite,
} from "../services/favoriteService";

import MovieHero from "../components/movie/MovieHero";
import MovieOverview from "../components/movie/MovieOverview";
import MovieStats from "../components/movie/MovieStats";
import CastSection from "../components/movie/CastSection";
import RecommendationSection from "../components/movie/RecommendationSection";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("similar");

  const {
    selectedMovie,
    similarMovies,
    personalizedMovies,
  } = useSelector((state) => state.movies);

  const favorites = useSelector(
    (state) => state.favorites.items
  );

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const requests = [
          fetchMovieDetails(id, dispatch),
          fetchSimilarMovies(id, dispatch),
        ];

        if (isAuthenticated) {
          requests.push(fetchRecommendations(dispatch));
        }

        await Promise.all(requests);
      } catch (error) {
        console.error(error);
      }
    };

    loadMovie();
  }, [dispatch, id, isAuthenticated]);

  if (!selectedMovie) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-lg text-zinc-400">
          Loading movie details...
        </p>
      </div>
    );
  }

  const isFavorite = favorites.some(
    (item) => item.tmdbId === Number(id)
  );

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to save favorites");
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(Number(id), dispatch);

        // Refresh personalized recommendations
        await fetchRecommendations(dispatch);

        toast.success("Removed from favorites");
      } else {
        await addFavorite(
          {
            id: selectedMovie.id,
            title:
              selectedMovie.title ||
              selectedMovie.name,
            poster_path:
              selectedMovie.poster_path,
            release_date:
              selectedMovie.release_date,
            vote_average:
              selectedMovie.vote_average,
          },
          dispatch
        );

        // Refresh personalized recommendations
        await fetchRecommendations(dispatch);

        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="space-y-10">
      <MovieHero
        movie={selectedMovie}
        isFavorite={isFavorite}
        isAuthenticated={isAuthenticated}
        onFavoriteToggle={handleFavoriteToggle}
      />

      <MovieOverview movie={selectedMovie} />

      <MovieStats movie={selectedMovie} />

      <CastSection
        cast={selectedMovie.credits?.cast || []}
      />

      <div className="space-y-4">
        <div className="flex gap-4 border-b border-zinc-700">
          <button
            onClick={() => setActiveTab("similar")}
            className={`pb-2 transition ${
              activeTab === "similar"
                ? "border-b-2 border-red-500 text-white"
                : "text-zinc-400"
            }`}
          >
            Similar Movies
          </button>

          {isAuthenticated && (
            <button
              onClick={() =>
                setActiveTab("recommended")
              }
              className={`pb-2 transition ${
                activeTab === "recommended"
                  ? "border-b-2 border-red-500 text-white"
                  : "text-zinc-400"
              }`}
            >
              Recommended For You
            </button>
          )}
        </div>

        <RecommendationSection
          movies={
            activeTab === "similar"
              ? similarMovies
              : personalizedMovies
          }
          activeTab={activeTab}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
};

export default MovieDetailsPage;