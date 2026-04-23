import { pool } from '../config/db.js';

export const ReportModel = {
  async getStats() {
    const books = await pool.query('SELECT COUNT(*) FROM books');
    const authors = await pool.query('SELECT COUNT(*) FROM authors');
    const categories = await pool.query('SELECT COUNT(*) FROM categories');
    const borrowed = await pool.query("SELECT COUNT(*) FROM loans WHERE status = 'BORROWED'");

    return {
      total_books: parseInt(books.rows[0].count),
      total_authors: parseInt(authors.rows[0].count),
      total_categories: parseInt(categories.rows[0].count),
      total_borrowed_loans: parseInt(borrowed.rows[0].count)
    };
  }
};