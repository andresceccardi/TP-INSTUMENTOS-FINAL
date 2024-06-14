import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../controlAcceso/AuthContext';
import './css/login.css';  // Importa el archivo CSS

const Login: React.FC = () => {
  const { login } = useAuth();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(nombreUsuario, clave);
      setError('');
      navigate('/home'); // Redirigir al home
      window.location.reload();
    } catch (error) {
      setError('Usuario y/o Clave incorrectos, vuelva a intentar');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card login">
        <h2 className="text-center mb-4">S O A T </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="nombreUsuario" className="form-label">Nombre de Usuario</label>
            <input
              type="text"
              className="form-control"
              id="nombreUsuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clave" className="form-label">Clave</label>
            <input
              type="password"
              className="form-control"
              id="clave"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar Sesion</button>
        </form>
        {error && <p className="text-danger text-center">{error}</p>}
        <br />
        <p className="text-center">¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
      </div>
    </div>
  );
};

export default Login;
