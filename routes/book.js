import expess from "express";
import BookController from "../controllers/book";
const router = expess.Router();

const bookController = new BookController();

router.get("/books", bookController.getAllBook);
router.get("/books/:id", bookController.getBookDetail);
router.post("/books", bookController.createBook);
router.delete("/books/:id", bookController.deleteBook);
router.put("/books/:id", bookController.updateBook);

export default router;
