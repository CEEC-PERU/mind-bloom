import React, { useState, useEffect } from 'react';


// Dentro de useRotation.ts
export const useRotation = (rotate: boolean) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 1);
    }, 50); // Cambiar a un intervalo más largo, por ejemplo, 50 milisegundos

    return () => clearInterval(rotateInterval);
  }, [rotate]);

  return rotation;
};
