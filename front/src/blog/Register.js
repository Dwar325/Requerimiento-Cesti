import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
        setTimeout(() => {
          navigate('/login'); 
        }, 2000);
      } else {
        setError(data.message || 'Error en el registro');
      }
    } catch (error) {
      setError('Error en el servidor');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Registrarse
        </button>
      </form>
      <button
        className="btn btn-link mt-3"
        onClick={() => navigate('/login')}
      >
        Volver al login
      </button>
    </div>
  );
};

export default Register;
