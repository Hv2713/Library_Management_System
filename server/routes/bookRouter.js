import { isAuthenticated } from '../middlewares/authMiddleware.js';
import {
    addBook,
    deleteBook,
    getAllBooks,
} from '../controllers/bookController.js';

import express from 'express';
import { isAuthroized } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post("/admin/add", isAuthenticated, isAuthroized("Admin") , addBook);
router.get("/all", isAuthenticated, getAllBooks);
router.delete("/delete/:id", isAuthenticated, isAuthroized("Admin"), deleteBook);


export default router;