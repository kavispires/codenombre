import React from 'react';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';

import Card from './Card';

import { getKeyClass } from '../utils';

const GameBoard = () => {
  // Global States
  const [game] = useGlobalState('game');

  const showButtons = game.phase === 'guessing' && gameEngine.turnRole === 'passive';

  return (
    <div className="grid-gameboard codenames-grid">
      {game.codenames.map((codename, index) => {
        const keyClass = getKeyClass(index, gameEngine.myDatabaseIndex, game.keyCard);
        const state = '';
        const isButton = showButtons && !state.startsWith('revaled');
        return (
          <Card
            key={codename}
            codename={codename}
            codenameID={index}
            type="word"
            size={5}
            keyClass={keyClass}
            isButton={isButton}
            state={state}
          />
        );
      })}
    </div>
  );
};

export default GameBoard;
