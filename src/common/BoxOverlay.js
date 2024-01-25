import React from 'react';

const BoxOverlay = ({ position }) => {
  const { x0, x1, y0, y1 } = position;

  const padding = 3; // Set the desired padding value

  const boxStyle = {
    position: 'absolute',
    left: `${x0 - padding}px`, // Adjust left position by subtracting padding
    top: `${y0 - padding}px`, // Adjust top position by subtracting padding
    width: `${x1 - x0 + 2 * padding}px`, // Include padding in the width
    height: `${y1 - y0 + 2 * padding}px`, // Include padding in the height
    border: '2px solid red',
    boxSizing: 'border-box',
    pointerEvents: 'none', // Make the box non-interactable
  };

  return <div style={boxStyle}></div>;
};

export default BoxOverlay;