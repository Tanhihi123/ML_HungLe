import React, { useState, useEffect } from 'react';

const Mouse = () => {
  const [position, setPosition] = useState({
    oldX: 0,
    oldY: 0,
    newX: 0,
    newY: 0,
  });

  const randomColor = () => Math.floor(Math.random() * 361);

  const distance = () => {
    const distX = position.newX - position.oldX;
    const distY = position.newY - position.oldY;
    const dist = Math.pow(distX, 2) + Math.pow(distY, 2);

    if (dist > 7000) {
      setPosition({
        ...position,
        oldX: position.newX,
        oldY: position.newY,
      });
      return true;
    }
    return false;
  };

  const handleMouseMove = (e) => {
    setPosition({
      ...position,
      newX: e.clientX,
      newY: e.clientY,
    });

    const dot = document.createElement('div');
    dot.className = 'fa-solid fa-star-of-david star';
    dot.style.color = `hsl(${randomColor()}, 50%, 75%)`;

    if (!distance()) return;

    dot.style.left = `${position.newX}px`;
    dot.style.top = `${position.newY}px`;

    document.body.appendChild(dot);

    setTimeout(() => document.body.removeChild(dot), 1000);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [position]);

  return null; // You can return some JSX here if needed
};

export default Mouse;
