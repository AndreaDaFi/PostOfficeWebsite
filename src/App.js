import React from 'react';
import Button from './components/Button.js';

const App = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <Button label="Primary Button" onClick={handleClick} styleType="primary" />
      <Button label="Secondary Button" onClick={handleClick} styleType="secondary" />
      <Button label="Danger Button" onClick={handleClick} styleType="danger" />
      <Button label="Disabled Button" onClick={handleClick} disabled />
    </div>
  );
};

export default App;