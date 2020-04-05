import React, { useEffect } from 'react';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';

import GameTimeline from './GameTimeline';
import GameInstructions from './GameInstructions';
import GameChat from './GameChat';
import GameStage from './GameStage';
import GameActions from './GameActions';

const GameSession = () => {
  // Global states
  const [, setDialog] = useGlobalState('dialog');

  const { dialog } = gameEngine;

  useEffect(() => {
    setDialog({ isVisible: true, duration: 'long', message: dialog });
  }, [dialog, setDialog]);

  return (
    <div className="game-content game-session">
      <GameTimeline />
      <GameInstructions />
      <GameStage />
      <GameChat />
      <GameActions />
    </div>
  );
};

export default GameSession;
