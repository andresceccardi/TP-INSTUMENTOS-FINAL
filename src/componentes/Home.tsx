import React from 'react';
import Slider from './Slider';
import './css/Home.css';

const Home: React.FC = () => {
  return (
    <div className="container text-center my-5">
      <div className="home-container">
      <h2 className="display-4">Sounds Of A Town</h2>
      <p>Tu tienda de intrumentos musicales de confianza</p>
        <Slider />
        <p>
          En SOAT (Sounds Of A Town) encontrarás una amplia variedad de instrumentos musicales, desde guitarras, bajos, baterías, teclados, micrófonos, hasta accesorios y equipo de audio profesional.
        </p>
      </div>
    </div>
  );
};

export default Home;

/* 
      
        
        
*/