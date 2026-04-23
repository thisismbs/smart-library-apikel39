import { AuthorModel } from '../models/authorModel.js';

export const AuthorController = {
  // fungsi untuk mengambil semua penulis beserta fitur pencarian
  async getAuthors(req, res) {
    try {
      const authors = await AuthorModel.getAll(req.query.name);
      res.json(authors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // fungsi untuk mengambil penulis berdasarkan ID spesifik
  async getAuthorById(req, res) {
    try {
      const author = await AuthorModel.getById(req.params.id);
      if (author) res.json(author);
      else res.status(404).json({ message: "Penulis tidak ditemukan" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async addAuthor(req, res) {
    try {
      const { name, nationality } = req.body;
      const author = await AuthorModel.create(name, nationality);
      res.status(201).json(author);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // fungsi untuk memperbarui data penulis
  async updateAuthor(req, res) {
    try {
      const updatedAuthor = await AuthorModel.update(req.params.id, req.body);
      res.json(updatedAuthor);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // fungsi untuk menghapus data penulis
  async deleteAuthor(req, res) {
    try {
      const deletedAuthor = await AuthorModel.delete(req.params.id);
      res.json(deletedAuthor);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
