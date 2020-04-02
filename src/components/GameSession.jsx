import React from 'react';

import useGlobalState from '../useGlobalState';

import GameTimeTrack from './GameTimetrack';
import GameChat from './GameChat';
import GameStage from './GameStage';

const GameSession = () => {
  // Global States
  const [game] = useGlobalState('game');

  return (
    <div className="game-content game-session">
      <GameTimeTrack turn={game.turn} />
      <GameStage />
      <GameChat />
    </div>
  );
};

export default GameSession;
