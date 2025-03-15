import express from 'express'
import { fetchAllNews, fetchNewsByCategory, Preferences } from '../controllers/newsController.js';


const newsRoutes = express.Router();


newsRoutes.post('/preferences/:id', Preferences)
newsRoutes.get('/news/:category', fetchNewsByCategory)
newsRoutes.get('/news', fetchAllNews)

export default newsRoutes