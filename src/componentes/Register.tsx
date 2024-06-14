import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [rol, setRol] = useState('Visor');
  const [mensaje, setMensaje] = useState('');


  //quiero mostrar en el console log el mensaje de error
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/register', { nombreUsuario, clave, rol });
      alert('Usuario registrado exitosamente');
      navigate('/login'); // Redirige a la página de login
    } catch (error) {
      setMensaje('Error al registrar el usuario');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card p-4">
        <h2 className="text-center mb-4">Registrarse</h2>
        <form onSubmit={handleRegister}>
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
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">Rol</label>
            <select
              className="form-select"
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Operador">Operador</option>
              <option value="Visor">Visor</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
        {mensaje && <p className="text-danger text-center">{mensaje}</p>}
      </div>
    </div>
  );
};


export default Register;
