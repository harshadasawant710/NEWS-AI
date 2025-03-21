import express from 'express'
import { googleLogin, login, register, verify} from '../controllers/authController.js';
import verifyToken from '../middleware/verifyToken.js';
import { deleterUser, getUser } from '../controllers/userController.js';
//import { googleLogin } from '../controllers/aiController.js';

const userRoutes = express.Router();

const UserSchema = express.Router();

userRoutes.post('/register', register)
userRoutes.post('/login',login);
userRoutes.get('/verify', verifyToken, verify)
userRoutes.post('/google',googleLogin)

userRoutes.get('/users', getUser)
userRoutes.patch('/users/:id', deleterUser)
export default userRoutes