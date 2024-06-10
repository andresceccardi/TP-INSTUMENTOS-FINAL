import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import carritoIcono from '../../img/carrito-icono.png';
import { useAuth } from '../controlAcceso/AuthContext';
import { CartContext } from '../context/CarritoContext';
import Usuario from '../entidades/Usuario';
import { Roles } from '../entidades/Roles';
import './css/encabezado.css';

const Encabezado: React.FC = () => {
  const { isLoggedIn, usuario, logout } = useAuth();
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const totalItemsEnCarrito = cart.reduce((total, item) => total + item.cantidad, 0);
  const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">S O A T (Sounds Of a Town)</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dondeestamos">Ubicación</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/productos">Productos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/googlecharts">Estadisticas</Link>
                </li>
                {!usuarioLogueado || usuarioLogueado.rol !== Roles.VISOR ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/grilla">Listado</Link>
                  </li>
                ) : null}
                <li className="nav-item">
                  <Link className="nav-link" to="/carrito">
                    <img src={carritoIcono} alt="Carrito" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
                    Carrito ({totalItemsEnCarrito})
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link">Bienvenido {usuario?.nombreUsuario}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>Cerrar sesión</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar Sesion</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registrarse</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Encabezado;
