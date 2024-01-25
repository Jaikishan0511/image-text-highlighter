// CustomLoader.js
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

const LoaderContainer = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white color
});

const CustomLoader = () => {
  return (
    <LoaderContainer>
      <CircularProgress size={40} />
    </LoaderContainer>
  );
};

export default CustomLoader;
