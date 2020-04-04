import React from 'react';

import GameTimeTrack from './GameTimetrack';
import GameChat from './GameChat';
import GameStage from './GameStage';

const GameSession = () => {
  return (
    <div className="game-content game-session">
      <GameTimeTrack />
      <GameStage />
      <GameChat />
    </div>
  );
};

export default GameSession;
