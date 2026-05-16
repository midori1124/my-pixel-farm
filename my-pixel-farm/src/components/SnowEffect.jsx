import React, { useState, useEffect } from 'react';

const SNOW_IMAGE_URL = "https://img.cdn1.vip/i/6a07d9187eb3e_1778899224.jpg"; 

const SnowEffect = () => {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    const newFlakes = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,      
      duration: Math.random() * 5 + 8, 
      delay: Math.random() * 5,       
      size: Math.random() * 15 + 15,  
      opacity: Math.random() * 0.4 + 0.6, 
      sway: Math.random() * 40 - 20,  
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" aria-hidden="true">
      <style>
        {`
          @keyframes snowfall-sway {
            0% { transform: translate(0, -10vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            50% { transform: translate(20px, 50vh) rotate(180deg); }
            90% { opacity: 1; }
            100% { transform: translate(-20px, 105vh) rotate(360deg); opacity: 0; }
          }
        `}
      </style>
      {flakes.map((flake) => (
        <img
          key={flake.id}
          src={SNOW_IMAGE_URL}
          alt="snow"
          className="absolute top-[-50px] select-none object-contain"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall-sway ${flake.duration}s linear ${flake.delay}s infinite`,
            filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))'
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;