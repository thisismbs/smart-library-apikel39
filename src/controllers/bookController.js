import { BookModel } from '../models/bookModel.js';

export const BookController = {
  
  async getAllBooks(req, res) {
    try {
      const books = await BookModel.getAll(req.query.search);
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // get by id
  async getBookById(req, res) {
    try {
      const book = await BookModel.getById(req.params.id);
      if (book) res.json(book);
      else res.status(404).json({ message: "Buku tidak ditemukan" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // update
  async updateBook(req, res) {
    try {
      const updatedBook = await BookModel.update(req.params.id, req.body);
      res.json(updatedBook);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Tdelete
  async deleteBook(req, res) {
    try {
      const deletedBook = await BookModel.delete(req.params.id);
      res.json(deletedBook);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async createBook(req, res) {
    try {
      const newBook = await BookModel.create(req.body);
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  
  async getTopBooks(req, res) {
    try {
      const topBooks = await BookModel.getTopBooks();
      res.status(200).json(topBooks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

