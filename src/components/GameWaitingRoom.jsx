import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';

const GameWaitingRoom = () => {
  const [dbRef, setDbRef] = useGlobalState('dbRef');
  const [game, setGame] = useGlobalState('game');
  const [nickname] = useGlobalState('nickname');

  // Set your nickname on mount
  useEffect(() => {
    console.log(dbRef);
    if (dbRef) {
      gameEngine.setPlayer(nickname);
    }
  }, [dbRef, nickname]);

  // Whenever game has two players, go to pre-game

  return (
    <div className="game-waiting-room">
      <div>
        <CircularProgress />
        <div className="game-waiting-room__message">Waiting for players to join...</div>
      </div>
    </div>
  );
};

export default GameWaitingRoom;
