import Book from "../models/book";
import bookValid from "../validations/book";

class BookController {
  async getAllBook(req, res) {
    try {
      const books = await Book.find({});
      return res.status(200).json({
        message: "Get all books successfully",
        data: books,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async getBookDetail(req, res) {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({
          message: "Not found book",
        });
      }
      return res.status(200).json({
        message: "Get detail book successfully",
        data: book,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async createBook(req, res) {
    try {
      const { error } = bookValid.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({
          message: errorMessages,
        });
      }
      const book = await Book.create(req.body);
      if (!book) {
        return res.status(404).json({
          message: "Not found book",
        });
      }
      return res.status(201).json({
        message: "Create book successfully",
        data: book,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async updateBook(req, res) {
    try {
      const { error } = bookValid.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({
          message: errorMessages,
        });
      }
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!book) {
        return res.status(404).json({
          message: "Not found book",
        });
      }
      return res.status(200).json({
        message: "Update book successfully",
        data: book,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async deleteBook(req, res) {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).json({
          message: "Not found book",
        });
      }
      return res.status(200).json({
        message: "Delete book successfully",
        data: book,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default BookController;
