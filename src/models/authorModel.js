import { pool } from '../config/db.js';

export const AuthorModel = {
  // fungsi untuk mengambil semua penulis dengan fitur pencarian
  async getAll(name = '') {
    let query = 'SELECT * FROM authors';
    let params = [];
    if (name) {
      query += ' WHERE name ILIKE $1';
      params.push(`%${name}%`);
    }
    query += ' ORDER BY name ASC';
    const result = await pool.query(query, params);
    return result.rows;
  },

  // fungsi untuk mengambil penulis berdasarkan ID spesifik
  async getById(id) {
    const query = 'SELECT * FROM authors WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // fungsi untuk memperbarui data penulis
  async update(id, data) {
    const { name, nationality } = data;
    const query = `
      UPDATE authors 
      SET name = $1, nationality = $2 
      WHERE id = $3 RETURNING *
    `;
    const result = await pool.query(query, [name, nationality, id]);
    return result.rows[0];
  },

  // fungsi untuk menghapus data penulis
  async delete(id) {
    const query = 'DELETE FROM authors WHERE id = $1';
    await pool.query(query, [id]);
    return { message: "Penulis berhasil dihapus." };
  },
  
  async create(name, nationality) {
    const query = 'INSERT INTO authors (name, nationality) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [name, nationality]);
    return result.rows[0];
  }
};
