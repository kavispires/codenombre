import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

import gameEngine from '../engine';
import toastService from '../toastService';
import useGlobalState from '../useGlobalState';

const GameWaitingRoom = () => {
  const [dbRef] = useGlobalState('dbRef');
  const [game] = useGlobalState('game');
  const [, setGameID] = useGlobalState('gameID');
  const [nickname] = useGlobalState('nickname');
  const [, setScreen] = useGlobalState('screen');
  const [toast, setToast] = useGlobalState('toast');

  // Set your nickname on mount
  useEffect(() => {
    try {
      if (dbRef && !gameEngine.amISet()) {
        gameEngine.setPlayer(nickname);
      }
    } catch (err) {
      setToast(toastService.error(toast, 'Game is full, try a different game ID'));
      setGameID(null);
      setScreen('home');
    }
  }, [dbRef, nickname, setGameID, setScreen, setToast, toast]);

  // Whenever game has two players, go to pre-game
  useEffect(() => {
    const isAllOnline = gameEngine.updateOnline().every((s) => s);
    if (isAllOnline) {
      setScreen('game.setup');
    }
  }, [game, setScreen]);

  return (
    <div className="game-waiting-room">
      <div>
        <CircularProgress />
        <div className="game-waiting-room__message">Hi, {nickname}</div>
        <div className="game-waiting-room__message">Waiting for players to join...</div>
      </div>
    </div>
  );
};

export default GameWaitingRoom;
