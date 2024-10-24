import './App.css';
import CompShowBlogs from './blog/ShowBlog';
import CompCreateBlog from './blog/CreateBlog';
import CompEditBlog from './blog/EditBlog';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>CESTI - Registro de post</p>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>
      <Routes>
        <Route path='/' element={<CompShowBlogs />} />
        <Route path='/create' element={<CompCreateBlog />} />
        <Route path='/edit/:id' element={<CompEditBlog />} />
      </Routes>
    </div>
  );
}

export default App;
