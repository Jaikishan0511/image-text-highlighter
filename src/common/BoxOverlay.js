import React from 'react';

const BoxOverlay = ({ position }) => {
  const { x0, x1, y0, y1 } = position;

  const padding = 3; 

  const boxStyle = {
    position: 'absolute',
    left: `${x0 - padding}px`,
    top: `${y0 - padding}px`, 
    width: `${x1 - x0 + 2 * padding}px`, 
    height: `${y1 - y0 + 2 * padding}px`, 
    border: '2px solid red',
    boxSizing: 'border-box',
    pointerEvents: 'none', 
  };

  return <div style={boxStyle}></div>;
};

export default BoxOverlay;