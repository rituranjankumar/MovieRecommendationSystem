import Favorite from "../models/favoriteModel.js";

// Get All Favorites
export const getFavorites = async (req, res, next) => {
  try {

    const favorites = await Favorite.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      favorites,
    });

  } catch (error) {
    next(error);
  }
};

// Add Favorite
export const addFavorite = async (req, res, next) => {
  try {

    const {
      tmdbId,
      title,
      posterPath,
      releaseDate,
      voteAverage,
    } = req.body;

    if (!tmdbId || !title) {
      return res.status(400).json({
        success: false,
        message: "Movie details are required",
      });
    }

    const alreadyExists = await Favorite.findOne({
      userId: req.user._id,
      tmdbId,
    });

    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "Movie already in favorites",
      });
    }

    const favorite = await Favorite.create({
      userId: req.user._id,
      tmdbId,
      title,
      posterPath,
      releaseDate,
      voteAverage,
    });

    res.status(201).json({
      success: true,
      message: "Movie added to favorites",
      favorite,
    });

  } catch (error) {
    next(error);
  }
};

// Remove Favorite
export const removeFavorite = async (req, res, next) => {
  try {

    const favorite = await Favorite.findOneAndDelete({
      userId: req.user._id,
      tmdbId: req.params.tmdbId,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Favorite removed successfully",
    });

  } catch (error) {
    next(error);
  }
};