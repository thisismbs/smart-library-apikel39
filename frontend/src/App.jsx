import { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const [borrowData, setBorrowData] = useState({ book_id: '', member_id: '', due_date: '' });
  const [returnLoanId, setReturnLoanId] = useState('');

  const API_URL = 'http://localhost:3000/api';

  const fetchData = async () => {
    try {
      const resBooks = await fetch(`${API_URL}/books`);
      const dataBooks = await resBooks.json();
      setBooks(dataBooks);

      const resTop = await fetch(`${API_URL}/reports/top-books`);
      const dataTop = await resTop.json();
      setTopBooks(dataTop);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleBorrow = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/loans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(borrowData)
      });
      if(res.ok) { 
        alert('Berhasil meminjam buku'); 
        fetchData(); 
      } else {
        alert('Gagal meminjam buku');
      }
    } catch(err) { console.error(err); }
  };

  const handleReturn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/loans/return`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loan_id: returnLoanId })
      });
      if(res.ok) { 
        alert('Buku berhasil dikembalikan'); 
        fetchData(); 
      } else {
        alert('Gagal mengembalikan buku');
      }
    } catch(err) { console.error(err); }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#000000', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Smart Library Dashboard</h1>
      <hr />
      
      <div>
        <h2>Top Books</h2>
        <ul>
          {topBooks.map(b => (
            <li key={b.id}>
              {b.title} - {b.author_name} ({b.category_name}) | Total Peminjaman: {b.borrow_count}
            </li>
          ))}
        </ul>
      </div>

      <hr />

      <h2>Daftar Buku dan Stok</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Judul Buku</th>
            <th>Nama Penulis</th>
            <th>Kategori</th>
            <th>Sisa Stok</th>
            <th>ID Buku</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author_name}</td>
              <td>{b.category_name}</td>
              <td>{b.available_copies}</td>
              <td>{b.id}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h2>Form Peminjaman</h2>
      <form onSubmit={handleBorrow}>
        <div>
          <label>ID Buku: </label>
          <input type="text" onChange={e => setBorrowData({...borrowData, book_id: e.target.value})} required />
        </div>
        <br />
        <div>
          <label>ID Member: </label>
          <input type="text" onChange={e => setBorrowData({...borrowData, member_id: e.target.value})} required />
        </div>
        <br />
        <div>
          <label>Tenggat Waktu: </label>
          <input type="date" onChange={e => setBorrowData({...borrowData, due_date: e.target.value})} required />
        </div>
        <br />
        <button type="submit">Pinjam Buku</button>
      </form>

      <hr />

      <h2>Form Pengembalian</h2>
      <form onSubmit={handleReturn}>
        <div>
          <label>ID Peminjaman (Loan ID): </label>
          <input type="text" onChange={e => setReturnLoanId(e.target.value)} required />
        </div>
        <br />
        <button type="submit">Kembalikan Buku</button>
      </form>

    </div>
  );
}

export default App;