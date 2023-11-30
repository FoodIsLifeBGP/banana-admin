import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import './style.css';

const overlay = {
  position: 'fixed',
  'z-index': 99999,
  top: '50%',
  left: '50%',
  opacity: 1,
};

const defualt = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  opacity: 1,
};

function Spinner({ loading, fullscreen }) {
  const style = fullscreen ? overlay : defualt;

  return (
    <div className={loading && fullscreen && 'spinner-overlay'}>
      <HashLoader
        color="#FFE145"
        loading={loading}
        cssOverride={style}
        size={50}
        aria-label="Loading Spinner"
      />
    </div>
  );
}

export default Spinner;
