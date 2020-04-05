import React, { useEffect } from 'react';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';

import GameTimeTrack from './GameTimetrack';
import GameChat from './GameChat';
import GameStage from './GameStage';

const GameSession = () => {
  // Global states
  const [, setDialog] = useGlobalState('dialog');

  const { dialog } = gameEngine;

  useEffect(() => {
    setDialog({ isVisible: true, duration: 'long', message: dialog });
  }, [dialog, setDialog]);

  return (
    <div className="game-content game-session">
      <GameTimeTrack />
      <GameStage />
      <GameChat />
    </div>
  );
};

export default GameSession;
