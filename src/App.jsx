import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Routes akan memilihkan halaman mana yang tampil berdasarkan URL */}
      <Routes>
        {/* Halaman Utama (Main View) */}
        <Route path="/" element={<Home />} />

        {/* Halaman Detail - ":id" adalah parameter dinamis */}
        <Route path="/restaurant/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;