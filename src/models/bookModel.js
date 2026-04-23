import { pool } from '../config/db.js'; 
export const BookModel = { 
  
async getAll(title = '') { 
    let query = ` 
      SELECT b.*, a.name as author_name, c.name as category_name  
      FROM books b 
      LEFT JOIN authors a ON b.author_id = a.id 
      LEFT JOIN categories c ON b.category_id = c.id 
    `; 
    let params = [];
    if (title) {
      query += ` WHERE b.title ILIKE $1`;
      params.push(`%${title}%`);
    }
    const result = await pool.query(query, params); 
    return result.rows; 
  }, 

  // fungsi untuk mengambil buku berdasarkan ID spesifik
  async getById(id) {
    const query = 'SELECT * FROM books WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // fungsi untuk memperbarui data buku
  async update(id, data) {
    const { isbn, title, author_id, category_id, total_copies } = data;
    const query = `
      UPDATE books 
      SET isbn = $1, title = $2, author_id = $3, category_id = $4, total_copies = $5 
      WHERE id = $6 RETURNING *
    `;
    const result = await pool.query(query, [isbn, title, author_id, category_id, total_copies, id]);
    return result.rows[0];
  },

async create(data) { 
const { isbn, title, author_id, category_id, total_copies } 
= data; 
 
    const query = ` 
      INSERT INTO books (isbn, title, author_id, category_id, 
total_copies, available_copies) 
      VALUES ($1, $2, $3, $4, $5, $5) RETURNING * 
    `; 
    const result = await pool.query(query, [isbn, title, 
author_id, category_id, total_copies]); 
    return result.rows[0]; 
  }, 
 
  async delete(id) { 
    const query = 'DELETE FROM books WHERE id = $1'; 
    await pool.query(query, [id]); 
    return { message: "Buku berhasil dihapus dari sistem." }; 
  }, 

  async getTopBooks() {
    const query = `
      SELECT b.id, b.title, a.name as author_name, c.name as category_name, COUNT(l.id) as borrow_count
      FROM books b
      LEFT JOIN loans l ON b.id = l.book_id
      LEFT JOIN authors a ON b.author_id = a.id
      LEFT JOIN categories c ON b.category_id = c.id
      GROUP BY b.id, b.title, a.name, c.name
      ORDER BY borrow_count DESC
      LIMIT 2;
    `;
    const result = await pool.query(query);
    return result.rows;
  }
};