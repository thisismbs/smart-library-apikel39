import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import memberRoutes from './routes/memberRoutes.js'; 
import authorRoutes from './routes/authorRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import { BookController } from './controllers/bookController.js';
import { LoanController } from './controllers/loanController.js';

dotenv.config();

const app = express();
app.use(express.json());

// Grouping Routes
app.use(cors());
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => res.send('Smart Library API is Running...'));
app.get('/api/reports/top-books', BookController.getTopBooks);
app.put('/api/loans/return', LoanController.returnBook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

