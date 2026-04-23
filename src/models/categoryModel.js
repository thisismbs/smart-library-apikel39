import { pool } from '../config/db.js';

export const CategoryModel = {
  // fungsi untuk mengambil semua kategori beserta fitur pencarian
  async getAll(name = '') {
    let query = 'SELECT * FROM categories';
    let params = [];
    if (name) {
      query += ' WHERE name ILIKE $1';
      params.push(`%${name}%`);
    }
    query += ' ORDER BY name ASC';
    const result = await pool.query(query, params);
    return result.rows;
  },

  // fungsi untuk mengambil kategori berdasarkan ID spesifik
  async getById(id) {
    const query = 'SELECT * FROM categories WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // fungsi untuk memperbarui data kategori
  async update(id, name) {
    const query = `
      UPDATE categories 
      SET name = $1 
      WHERE id = $2 RETURNING *
    `;
    const result = await pool.query(query, [name, id]);
    return result.rows[0];
  },

  // fungsi untuk menghapus data kategori
  async delete(id) {
    const query = 'DELETE FROM categories WHERE id = $1';
    await pool.query(query, [id]);
    return { message: "Kategori berhasil dihapus." };
  },
  
  async create(name) {
    const query = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [name]);
    return result.rows[0];
  }
};
