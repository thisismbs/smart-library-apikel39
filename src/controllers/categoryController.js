import { CategoryModel } from '../models/categoryModel.js';

export const CategoryController = {
  // fungsi untuk mengambil semua kategori beserta fitur pencarian
  async getCategories(req, res) {
    try {
      const categories = await CategoryModel.getAll(req.query.name);
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // fungsi untuk mengambil kategori berdasarkan ID spesifik
  async getCategoryById(req, res) {
    try {
      const category = await CategoryModel.getById(req.params.id);
      if (category) res.json(category);
      else res.status(404).json({ message: "Kategori tidak ditemukan" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async addCategory(req, res) {
    try {
      const category = await CategoryModel.create(req.body.name);
      res.status(201).json(category);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // fungsi untuk memperbarui data kategori
  async updateCategory(req, res) {
    try {
      const updatedCategory = await CategoryModel.update(req.params.id, req.body.name);
      res.json(updatedCategory);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // fungsi untuk menghapus data kategori
  async deleteCategory(req, res) {
    try {
      const deletedCategory = await CategoryModel.delete(req.params.id);
      res.json(deletedCategory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

