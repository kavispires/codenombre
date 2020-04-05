import React from 'react';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';

const GameInstructions = () => {
  const texts = gameEngine.dialog.split('<br>');

  return (
    <div className="grid-instructions dialog-container">
      <h3>Instructions</h3>
      <div className="dialog-box">
        {texts.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </div>
  );
};

export default GameInstructions;
