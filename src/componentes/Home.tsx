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
      </div>
    </div>
  );
};

export default Home;

/* 
      
        
        
*/