import React from 'react';
import { Button } from '@material-ui/core';
import FolderSpecial from '@material-ui/icons/FolderSpecial';
import { green, yellow } from '@material-ui/core/colors';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';

const rounds = new Array(9).fill(null);

const GameTimeTrack = ({ turn }) => {
  // Global States
  const [isLoading] = useGlobalState('isLoading');

  console.log({ turn });
  return (
    <div className="game-timeline">
      <div className="game-timeline__title">Round Tracker</div>
      {rounds.map((round, index) => (
        <FolderSpecial
          key={`counter-${round}-${index}`}
          className="round-marker"
          style={turn - 1 === index ? { color: yellow[50] } : { color: green[500] }}
          fontSize="large"
        />
      ))}
      <div className="game-timeline__actions">
        {turn === 0 && (
          <Button
            className="mui-block"
            variant="contained"
            color="primary"
            style={{ background: green[500] }}
            onClick={() => gameEngine.setTurnOrder()}
            disabled={isLoading}
          >
            I want to start!
          </Button>
        )}
      </div>
    </div>
  );
};

export default GameTimeTrack;
