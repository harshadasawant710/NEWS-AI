import express from 'express';
import { addBookmarks,getBookmarks,removeBookmarks } from '../controllers/bookmarksControllers.js';

const bookmarksRoutes = express.Router();

bookmarksRoutes.get('/:id/bookmarks', getBookmarks);
bookmarksRoutes.post('/:id/bookmarks', addBookmarks);
bookmarksRoutes.delete('/:id/bookmarks', removeBookmarks);

export default bookmarksRoutes


