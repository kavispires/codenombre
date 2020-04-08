import React from 'react';
import FolderSpecial from '@material-ui/icons/FolderSpecial';
import { green, yellow } from '@material-ui/core/colors';

import useGlobalState from '../useGlobalState';

const rounds = new Array(11).fill(null).map((c, i) => i + 1);

const GameTimeline = () => {
  // Global States
  const [game] = useGlobalState('game');

  return (
    <div className="grid-timeline game-timeline">
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
    </div>
  );
};

export default GameTimeline;
