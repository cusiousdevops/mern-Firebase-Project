import React from 'react';
import './InteractiveImage.css';

const InteractiveImage = () => {
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const image = document.querySelector('.interactive-image');
    const rect = image.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    image.style.transform = `rotateX(${y / 10}deg) rotateY(${x / 10}deg)`;
  };

  return (
    <div className="interactive-image-container" onMouseMove={handleMouseMove}>
      <img src="https://www.montagnes-du-jura.fr/uploads/2020/06/1-rando-reculet-cret-de-la-neige-jura-massif-800x920-1641541612.jpg" alt="Interactive" className="interactive-image" />
    </div>
  );
};

export default InteractiveImage;
