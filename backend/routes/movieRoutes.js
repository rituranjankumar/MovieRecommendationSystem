import express from 'express';
import { getTrending, getPopular, getTopRated, getNowPlaying, search, details } from '../controllers/movieController.js';

const router = express.Router();

router.get('/trending', getTrending);
router.get('/popular', getPopular);
router.get('/top-rated', getTopRated);
router.get('/now-playing', getNowPlaying);
router.get('/search', search);
router.get('/details/:id', details);

export default router;
