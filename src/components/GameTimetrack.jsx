import React from 'react';
import { Button } from '@material-ui/core';
import FolderSpecial from '@material-ui/icons/FolderSpecial';
import { green, yellow } from '@material-ui/core/colors';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';

const rounds = new Array(11).fill(null).map((c, i) => i + 1);

const GameTimeTrack = () => {
  // Global States
  const [game] = useGlobalState('game');

  const texts = gameEngine.dialog.split('<br>');

  return (
    <div className="game-timeline">
      <div className="game-timeline__title">Round Tracker</div>
      {rounds.map((round, index) => (
        <div key={`counter-${round}-${index}`} className="game-timeline__round">
          <span className="game-timeline__round-number">{round}</span>
          <FolderSpecial
            className="round-marker"
            style={game.turn - 1 === index ? { color: yellow[50] } : { color: green[500] }}
            fontSize="large"
          />
        </div>
      ))}
      <div className="dialog-box">
        {texts.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </div>
  );
};

export default GameTimeTrack;
