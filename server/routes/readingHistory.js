import express from 'express';
import { addReadingHistroy, clearReadingHistory, getReadingHistroy } from '../controllers/readingHistoryController.js';

const readingHistoryRoute = express.Router();

readingHistoryRoute.get('/:id/reading-history', getReadingHistroy)
readingHistoryRoute.post('/:id/reading-history', addReadingHistroy)
readingHistoryRoute.delete('/:id/reading-history', clearReadingHistory)

export default readingHistoryRoute