import express from "express";
import {
  borrowedBooks,
  getBorrowedBooksForAdmin,
  recordBorrowedBook,
  returnBorrowBook,
} from "../controllers/borrowController.js";

import {
  isAuthenticated,
  isAuthroized,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/record-borrow-book/:id",
  isAuthenticated,
  isAuthroized("User"),
  recordBorrowedBook
);

router.get(
  "/borrowed-books-by-users",
  isAuthenticated,
  isAuthroized("Admin"),
  getBorrowedBooksForAdmin
);

router.get(
  "/my-borrowed-books",
  isAuthenticated,
  isAuthroized("User"),
  borrowedBooks
);

router.put(
    "/return-borrowed-book/:bookId",
    isAuthenticated,
    isAuthroized("Admin"),
    returnBorrowBook
);

export default router;