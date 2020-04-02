import React, { useEffect } from 'react';

import API from '../api';
import gameEngine from '../engine';
import toastService from '../toastService';
import useGlobalState from '../useGlobalState';

import GameHeader from './GameHeader';
import GameWaitingRoom from './GameWaitingRoom';

const Game = () => {
  // Global States
  const [dbRef, setDbRef] = useGlobalState('dbRef');
  const [game, setGame] = useGlobalState('game');
  const [gameID, setGameID] = useGlobalState('gameID');
  const [, setIsLoading] = useGlobalState('isLoading');
  const [screen, setScreen] = useGlobalState('screen');
  const [toast, setToast] = useGlobalState('toast');

  // Create database reference
  useEffect(() => {
    if (game.gameID === null && gameID) {
      setIsLoading(true);

      API.ref(`codenombre/${gameID}`).once('value', (snap) => {
        if (snap.val()) {
          const firebaseReference = API.ref().child('codenombre').child(gameID);
          gameEngine.setGameID(gameID);
          gameEngine.setDbRef(firebaseReference);
          setGame(gameEngine.update(snap.val()));
          setDbRef(firebaseReference);
        } else {
          setGameID(null);
          gameEngine.setGameID(null);
          setToast(toastService.error(toast, 'Failed to start game session'));
          setScreen('home');
        }

        setGame(gameEngine.state());
        setIsLoading(false);
      });
    }
  }, [game.gameID, gameID, setDbRef, setGame, setGameID, setIsLoading, setScreen, setToast, toast]);

  useEffect(() => {
    if (dbRef) {
      const handleGameState = (snap) => {
        setIsLoading(true);
        if (snap.val()) {
          setGame(gameEngine.update(snap.val()));
        }
        setIsLoading(false);
      };
      dbRef.on('value', handleGameState);

      const handleGameDisconnect = (snap) => {
        console.log('DISCONNECT');
        setIsLoading(false);
        setToast(toastService.info(toast, 'Server disconnected'));
        setScreen('home');
      };

      return () => {
        dbRef.off('value', handleGameDisconnect);
      };
    }
  }, [dbRef, setGame, setIsLoading, setScreen, setToast, toast]);

  return (
    <div className="game">
      <GameHeader gameID={gameID} />
      <div className="game-content">{screen === 'game.waiting' && <GameWaitingRoom />}</div>
    </div>
  );
};

export default Game;
