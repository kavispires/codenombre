import React from 'react';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';

import Card from './Card';

import { getKeyClass } from '../utils';

const GameSession = () => {
  // Global States
  const [game] = useGlobalState('game');

  return (
    <div className="codenames-grid">
      {game.codenames.map((codename, index) => {
        const keyClass = getKeyClass(index, gameEngine.whoAmI, gameEngine.getMyKeys());
        return <Card codename={codename} type="word" size={5} keyClass={keyClass} />;
      })}
    </div>
  );
};

export default GameSession;
