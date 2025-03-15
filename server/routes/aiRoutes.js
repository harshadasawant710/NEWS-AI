import express from 'express'
import { newsSummerize } from '../controllers/aiController.js';

const aiRoutes = express.Router();

aiRoutes.post('/summarize',newsSummerize);


export default aiRoutes